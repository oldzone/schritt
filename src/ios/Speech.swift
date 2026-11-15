import AVFoundation

/// Çok dilli konuşma (Almanca, İngilizce, Fransızca, İtalyanca).
/// Web arayüzü ses listesini ve seçimi buradan alır; her ses "lang" alanı taşır.
/// Daha doğal ses için: Ayarlar › Erişilebilirlik › Seslendirilen İçerik › Sesler
/// bölümünden ilgili dilin "Premium" / "Geliştirilmiş" seslerini indir.
final class Speech: NSObject, AVSpeechSynthesizerDelegate {
    private let synth = AVSpeechSynthesizer()
    /// Konuşma bitince JavaScript'e haber vermek için (kitap sesli okuma, arama)
    var onFinished: ((Int) -> Void)?
    private var callbacks: [ObjectIdentifier: Int] = [:]

    static let languages = ["de", "en", "fr", "it"]

    override init() {
        super.init()
        synth.delegate = self
    }

    private static func voices(for prefix: String) -> [AVSpeechSynthesisVoice] {
        AVSpeechSynthesisVoice.speechVoices().filter { $0.language.lowercased().hasPrefix(prefix) }
    }

    /// 3 = çok doğal (premium), 2 = doğal (geliştirilmiş), 1 = standart, 0 = oyuncak/robotik
    private static func quality(_ v: AVSpeechSynthesisVoice) -> Int {
        if #available(iOS 17.0, *), v.voiceTraits.contains(.isNoveltyVoice) { return 0 }
        if #available(iOS 16.0, *), v.quality == .premium { return 3 }
        if v.quality == .enhanced { return 2 }
        let toys = ["Eddy", "Flo", "Grandma", "Grandpa", "Reed", "Rocko", "Sandy", "Shelley",
                    "Albert", "Bad News", "Bahh", "Bells", "Boing", "Bubbles", "Cellos", "Good News",
                    "Jester", "Organ", "Superstar", "Trinoids", "Whisper", "Wobble", "Zarvox", "Junior", "Ralph", "Fred", "Kathy"]
        if toys.contains(where: { v.name.hasPrefix($0) }) { return 0 }
        return 1
    }

    private static func gender(_ v: AVSpeechSynthesisVoice) -> String {
        switch v.gender {
        case .female: return "f"
        case .male: return "m"
        default:
            let female = ["Anna", "Helena", "Petra", "Marlene", "Vicki", "Samantha", "Karen", "Moira", "Tessa",
                          "Serena", "Kate", "Amélie", "Amelie", "Audrey", "Aurélie", "Marie", "Alice", "Federica",
                          "Emma", "Paola", "Sandy", "Shelley", "Grandma"]
            let male = ["Markus", "Yannick", "Viktor", "Martin", "Daniel", "Arthur", "Oliver", "Tom", "Aaron",
                        "Thomas", "Nicolas", "Jacques", "Luca", "Diego", "Eddy", "Reed", "Rocko", "Grandpa"]
            if female.contains(where: { v.name.hasPrefix($0) }) { return "f" }
            if male.contains(where: { v.name.hasPrefix($0) }) { return "m" }
            return "?"
        }
    }

    /// Web arayüzüne verilecek liste: [{id,name,g,q,lang}] — dört dilin hepsi
    static func voicesJSON() -> String {
        var list: [[String: Any]] = []
        for l in languages {
            for v in voices(for: l) {
                let q = quality(v)
                let tag = q == 3 ? " (Premium)" : q == 2 ? " (Gelişmiş)" : ""
                list.append(["id": v.identifier, "name": v.name + tag, "g": gender(v), "q": q, "lang": v.language])
            }
        }
        let data = (try? JSONSerialization.data(withJSONObject: list)) ?? Data("[]".utf8)
        return String(data: data, encoding: .utf8) ?? "[]"
    }

    private func pickVoice(id: String?, gender g: String, lang: String) -> AVSpeechSynthesisVoice? {
        let prefix = String(lang.lowercased().prefix(2))
        if let id, !id.isEmpty, let v = AVSpeechSynthesisVoice(identifier: id),
           v.language.lowercased().hasPrefix(prefix) { return v }
        let all = Self.voices(for: prefix).filter { Self.quality($0) > 0 }
            .sorted { a, b in
                let qa = Self.quality(a), qb = Self.quality(b)
                if qa != qb { return qa > qb }
                // aynı kalitede bölgeyi tercih et (de-DE, en-GB, fr-FR, it-IT)
                return a.language.caseInsensitiveCompare(lang) == .orderedSame
            }
        return all.first(where: { Self.gender($0) == g }) ?? all.first ?? AVSpeechSynthesisVoice(language: lang)
    }

    /// rate: web ölçeği (1.0 = normal hız); lang: "de-DE", "en-GB", "fr-FR", "it-IT"
    func say(_ text: String, rate: Double, voiceId: String?, gender: String, lang: String, callback: Int) {
        if synth.isSpeaking { synth.stopSpeaking(at: .immediate) }
        let u = AVSpeechUtterance(string: text)
        u.voice = pickVoice(id: voiceId, gender: gender, lang: lang)
        let r = Float(rate) * AVSpeechUtteranceDefaultSpeechRate * 0.97
        u.rate = min(max(r, AVSpeechUtteranceMinimumSpeechRate + 0.1), 0.62)
        u.preUtteranceDelay = 0.02
        if callback > 0 { callbacks[ObjectIdentifier(u)] = callback }
        synth.speak(u)
    }

    func stop() {
        callbacks.removeAll()
        if synth.isSpeaking { synth.stopSpeaking(at: .immediate) }
    }

    func speechSynthesizer(_ s: AVSpeechSynthesizer, didFinish u: AVSpeechUtterance) {
        if let id = callbacks.removeValue(forKey: ObjectIdentifier(u)) { onFinished?(id) }
    }

    func speechSynthesizer(_ s: AVSpeechSynthesizer, didCancel u: AVSpeechUtterance) {
        if let id = callbacks.removeValue(forKey: ObjectIdentifier(u)) { onFinished?(id) }
    }
}
