# Duolingo recon map (Dilbaz için) — 19 Kas 2026

Kapsam: Duolingo mobil uygulamasının **çekirdek öğrenme döngüsü** (yol → ders → geri bildirim → tekrar). Kaynak: yalnızca herkese açık sayfalar (blog.duolingo.com, yorum siteleri). Hesap, kod, özel API kullanılmadı. Hedef: Dilbaz'ı (DE/EN/FR/IT, A1–C1, Türkçe arayüz, ücretsiz) Duolingo kadar akıcı ama **anlatarak öğreten** bir uygulamaya çevirmek.

## Kaynaklar
| kaynak | verdiği |
|---|---|
| https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo | yol, ünite, egzersiz türleri, kalpler |
| https://blog.duolingo.com/guide-to-duolingo-practice-hub/ | Practice Hub: Mistakes, Words, Speak, Listen, Stories |
| https://blog.duolingo.com/new-duolingo-home-screen-design | Guidebook (ünite ipuçları), hikâyeler yolda, Quests |
| https://blog.duolingo.com/ways-to-practice-in-duolingo | side quest (süreli), yeni ders, tekrar |
| https://www.techradar.com/computing/websites-apps/duolingo | yol yapısı, kişisel tekrar düğümleri, ders sonu hata tekrarı |
| Trustpilot / unstar.app 2026 analizleri | şikayetler (bkz. gaps.md) |

## Ekranlar
| ID | ekran | amaç | bileşenler | durumlar |
|---|---|---|---|---|
| S01 | Yol (Path) | sıradaki dersi seç | ünite başlığı, düğümler (ders, hikâye, tekrar, sesli), Guidebook butonu | kilitli/açık/bitmiş, tekrar zamanı |
| S02 | Guidebook | ünitenin kalıpları + örnek cümleler | kural kartı, örnek, ses | — |
| S03 | Ders | 10–15 egzersiz | ilerleme çubuğu, kalp, egzersiz kartı, kontrol çubuğu | doğru/yanlış/yazım hatası |
| S04 | Geri bildirim çubuğu | doğru cevap, "Explain my answer" | yeşil/kırmızı çubuk, açıklama | — |
| S05 | Ders sonu | XP, doğruluk, süre | istatistik kartları | mükemmel/normal |
| S06 | Practice Hub | Mistakes, Words, Speak, Listen, Stories | kartlar | boş (henüz hata yok) |
| S07 | Hikâyeler | bağlamda okuma/dinleme | diyalog, ara sorular | — |
| S08 | Lig / Quests / Profil | motivasyon | sıralama, görevler, seri | — |
| S09 | Video call (Max) | yapay zekâ ile konuşma | karakter, altyazı | ücretli |

## Akışlar
- F01 Günlük ders: S01 → S03 (≈12 egzersiz) → S04 ×12 → S05. Mutlu yol ≈ 2 dokunuş + egzersizler.
- F02 Hata tekrarı: S06 → Mistakes → S03.
- F03 Ünite ipucu: S01 → S02 (çoğu kullanıcı atlıyor).
- F04 Hikâye: S01 hikâye düğümü → S07.
- F05 Yapay zekâ konuşma (ücretli): S01 → S09.

## Egzersiz türleri
çeviri (kelime blokları/yazma), dinle-yaz, eşleştir, boşluk doldur, resim seç, konuş, hikâye soruları, süreli (side quest).

## Çıkarılan veri modeli
- Course(lang) → Section → Unit(guidebook) → Level/Node(type) → Lesson → Exercise(type, prompt, answers[])
- UserProgress(xp, streak, hearts, gems, league), Mistake(exercise_id, at), Word(strength, last_seen) — güven: orta (blog anlatımından)

## Kopyalanamayan / atlanan
- Duo/karakterler, marka, sesler, ders içerikleri (telif) → skip
- Ligler (sosyal ağ ve kullanıcı kitlesi gerekir) → skip
- Ücretli katmanlar (Super/Max), reklam → skip (Dilbaz tamamen ücretsiz)

## Boyut
Dilbaz zaten S01–S07'nin karşılığına sahip. Eksik olan çekirdek fark: **açıklama derinliği ve örnek bolluğu**. Boyut: M.
