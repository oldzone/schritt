
// MARK: - Cihaz içi yapay zekâ (Apple Intelligence) — "Lena'yı ara", kelime soru-cevap, ders sohbeti
#if canImport(FoundationModels)
import FoundationModels
#endif

enum NativeAI {
    /// Sayfaya verilen durum: {"ok":true} ya da {"ok":false,"why":"..."}
    static func availabilityJSON() -> String {
        #if canImport(FoundationModels)
        if #available(iOS 26.0, *) {
            let a = SystemLanguageModel.default.availability
            if case .available = a { return "{\"ok\":true}" }
            let why = String(describing: a).replacingOccurrences(of: "\"", with: "'")
            return "{\"ok\":false,\"why\":\"\(why)\"}"
        }
        #endif
        return "{\"ok\":false,\"why\":\"os\"}"
    }

    /// msgs: [{role, content}] — ilki talimat (system), gerisi konuşma geçmişi
    static func respond(_ msgs: [[String: Any]], completion: @escaping (String?, String?) -> Void) {
        #if canImport(FoundationModels)
        if #available(iOS 26.0, *) {
            let system = (msgs.first?["content"] as? String) ?? ""
            var convo = ""
            for m in msgs.dropFirst() {
                let role = (m["role"] as? String) ?? "user"
                let text = (m["content"] as? String) ?? ""
                convo += (role == "assistant" ? "YOU: " : "LEARNER: ") + text + "\n"
            }
            let prompt = convo.isEmpty
                ? "Begin now. Reply with the JSON object only."
                : "Conversation so far:\n\(convo)\nWrite your next turn now. Reply with the JSON object only."
            Task {
                do {
                    let session = LanguageModelSession(instructions: system)
                    let r = try await session.respond(to: prompt)
                    completion(r.content, nil)
                } catch {
                    completion(nil, String(describing: error))
                }
            }
            return
        }
        #endif
        completion(nil, "unavailable")
    }
}

// MARK: - Konuşma tanıma (mikrofon → yazı), sessizlikte kendiliğinden biter
import Speech

final class NativeRec: NSObject {
    private let engine = AVAudioEngine()
    private var req: SFSpeechAudioBufferRecognitionRequest?
    private var task: SFSpeechRecognitionTask?
    private var silence: Timer?
    private var active = false
    private var last = ""
    var onPartial: ((String) -> Void)?
    var onEnd: ((String, String?) -> Void)?

    func start(locale: String) {
        stop(send: false)
        SFSpeechRecognizer.requestAuthorization { st in
            DispatchQueue.main.async {
                guard st == .authorized else { self.onEnd?("", "denied"); return }
                AVAudioSession.sharedInstance().requestRecordPermission { ok in
                    DispatchQueue.main.async {
                        if ok { self.begin(locale) } else { self.onEnd?("", "mic") }
                    }
                }
            }
        }
    }

    private func begin(_ locale: String) {
        guard let rec = SFSpeechRecognizer(locale: Locale(identifier: locale)), rec.isAvailable else {
            onEnd?("", "unavailable"); return
        }
        let r = SFSpeechAudioBufferRecognitionRequest()
        r.shouldReportPartialResults = true
        req = r
        last = ""
        let input = engine.inputNode
        let fmt = input.outputFormat(forBus: 0)
        input.removeTap(onBus: 0)
        input.installTap(onBus: 0, bufferSize: 1024, format: fmt) { [weak self] buf, _ in
            self?.req?.append(buf)
        }
        engine.prepare()
        do {
            try AVAudioSession.sharedInstance().setActive(true)
            try engine.start()
        } catch {
            input.removeTap(onBus: 0)
            onEnd?("", "engine"); return
        }
        active = true
        task = rec.recognitionTask(with: r) { [weak self] res, err in
            DispatchQueue.main.async {
                guard let self, self.active else { return }
                if let res {
                    self.last = res.bestTranscription.formattedString
                    self.onPartial?(self.last)
                    self.arm(initial: false)
                    if res.isFinal { self.stop(send: true) }
                } else if err != nil {
                    self.stop(send: true)
                }
            }
        }
        arm(initial: true)
    }

    /// Konuşma başlamazsa 7 sn, konuşma durunca 1.5 sn sonra bitir
    private func arm(initial: Bool) {
        silence?.invalidate()
        silence = Timer.scheduledTimer(withTimeInterval: initial ? 7 : 1.5, repeats: false) { [weak self] _ in
            self?.stop(send: true)
        }
    }

    func stop(send: Bool) {
        silence?.invalidate(); silence = nil
        let wasActive = active
        active = false
        if engine.isRunning { engine.stop() }
        engine.inputNode.removeTap(onBus: 0)
        req?.endAudio(); task?.cancel()
        req = nil; task = nil
        if send && wasActive { let t = last; last = ""; onEnd?(t, nil) }
    }
}
