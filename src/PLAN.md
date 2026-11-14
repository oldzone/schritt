# Çok dilli Schritt (DE + EN + FR + IT) — çalışma planı
Kullanıcı isteği (10 Kas 2026): Almanca widget'a İngilizce, İtalyanca, Fransızca ekle; diller arası geçiş,
her dilin ilerlemesi ayrı korunur; oyunlar, kitaplar vs. her şey her dilde olsun. Token biterse reset bekle, devam et.
Cevaplar TÜRKÇE ve kısa. Kitaplar: şimdilik sadece A1 (Almancadaki kural: üst seviye kitaplar kullanıcı o seviyeye gelince).

## Mimari
- Tek dosya index.html. Motor = /home/claude/fr/index.html (Almanca master) türevi.
- Veri paketleri: window.PACK.<lang>=function(){ window.LV=[];BANK=[];CONJ=[];X={};BOOKS=[];BGL=`` ... }
- Açılışta lang = localStorage "schritt-lang" (yoksa "de"); PACK[lang]() çağrılır, sonra motor.
- Dil değişimi: save() → localStorage lang yaz → location.reload().
- İlerleme: de için eski anahtarlar korunur (localStorage "schritt-v1", db doc "progress").
  Diğerleri: "schritt-v1-en", db "progress_en" vb. Ortak tercihler (tema, ad, figür, sfx, hatırlatma) "schritt-prefs".
- Native (iOS/Android) store: tek blob {v:2,cur,langs:{de:{..},en:{..}}}; eski blob (langs yok) = de.
- LANG yapılandırması (motor içinde LANGS[lang]): ad, bayrak, tts kodu, artikel regex/sınıf, ninja butonları,
  Wort-Rätsel klavyesi, ses adı regexleri, g2p (sadece de), marka adı.

## Dosyalar
- /home/claude/multi/engine.html  (motor; veri yerine <!--PACKS--> yer tutucu)
- /home/claude/multi/packs/<lang>/*.js  (her dilin veri parçaları; de = mevcut veri)
- /home/claude/multi/build.py → /home/claude/multi/index.html → /home/claude/de/index.html (yayın)
- Yayın: artifact 3bb52656-ac6e-40e1-a0b7-a765a620b8b6 (public ise yayın reddedilir → kullanıcıdan paylaşımı kapatmasını iste)
- Mac klasörü: /Users/mahsunak/Projeler/DIL (Schritt iOS, android) — bitince index.html oraya da kopyalanır.

## Veri formatı (her dil için, Almancadakiyle aynı)
- Ders: LV.push({id:"A1",name:"Başlangıç",units:[{t,s,g(HTML teori, Türkçe),w:[[kelime,tr,okunuş,örnek,örnekTr]...12],p:[[cümle,tr]...4-6], ...}]})
  (Almanca birim alanlarını kontrol et: de_a1.js)
- X["A1-1"]=[[cümle,tr]x12]  (ek örnek cümleler, ders başına)
- H(lv,cat,`kelime|tr|okunuş` satırları)  (Hazine kelime bankası)
- C(kelime,fonksiyon,lv,tr,örnek(**vurgu**),not,sıra) + CONJ_THEORY (bağlaçlar)
- BOOKS.push({id,lv,t,tr,em,c:[renk,renk],p:[30 sayfa metin]}) ; BGL=`kelime|tr` sözlük (kitaplardaki tüm kelimeler)
- Birim sayıları (Almanca): A1 16, A2 17, B1 16, B2 12, C1 11.

## Durum (her adım bitince güncelle)
- [x] 1. Motor çok dilli hale getirildi + dil değiştirici + ayrı ilerleme + build.py (de ile regresyon testi)
- [x] 2. EN A1 (ders+X+bank+conj A1 + 10 kitap A1 + BGL)
- [x] 3. FR A1 (conj tüm seviyeler dahil)
- [x] 4. IT A1 (conj tüm seviyeler dahil)
- [ ] 5. A2 (EN, FR, IT)
- [ ] 6. B1 (EN, FR, IT)
- [ ] 7. B2 (EN, FR, IT)
- [ ] 8. C1 (EN, FR, IT)
- [ ] 9. Bağlaçlar tüm seviyeler (EN, FR, IT)
Her adımdan sonra: build → test (playwright) → yayınla (mümkünse) → Mac DIL klasörüne kopyala.

## Notlar (ilerleme)
- EN A1 bitti: packs/en/lessons_a1a/b, x_a1, bank_a1, conj (A1–C1 tümü!), books_a1a-e (10 kitap), lex_en (LIRR/LFUNC/BGL/LEXTRA).
- Kitap sözlük kontrolü: python3 tests/unknown.py <lang> → /tmp/miss_<lang>.txt (sadece özel isimler kalmalı).
- Ders testi: python3 tests/tlesson.py <lang> ; dil geçişi: tests/tswitch.py
- Sonraki diller de aynı dosya düzeni: lessons_a1a.js (LV.push A1 ilk 8 ders), lessons_a1b.js (LV.find(A1).units.push kalan 8),
  x_a1.js, bank_a1.js, conj.js (CONJ_THEORY.push + C(...)), books_a1a..e.js, lex_<lang>.js
- Üst seviye dersler: lessons_a2a.js → LV.push({id:"A2",name:"Temel",units:[...]}) vb. X["A2-1"]...

- READY dosyası: build'e dahil edilecek diller (eksik dil 'Yakında' görünür). Yayın: artifact son versiyon 1794321377-60c7 (de,en,fr). Kullanıcı paylaşımı kapattı (owner).
- Yayın 1794322367-7f88: de, en, fr, it A1 hepsi canlı.
- SIRADAKİ: 5. A2 dersleri (her dil 17 ders, X["A2-n"] 12 cümle, bank_a2 kategoriler). Dosyalar: packs/<lang>/lessons_a2a.js (LV.push({id:"A2",name:"Temel",units:[...]})), lessons_a2b.js (LV.find(A2).units.push), x_a2.js, bank_a2.js.
  Almanca A2 konu listesi referans: node ile packs/de/data.js'den LV[1].units.map(u=>u.t+' | '+u.s).
- Native (iOS/Android) güncellemesi henüz yapılmadı: Speech.swift dil parametresi (payload l), voicesJSON tüm diller + lang alanı; Android Bridge aynı. index.html Mac DIL klasörüne kopyalanmadı.
- A2–C1 (EN/FR/IT) TAMAM, yayınlandı. Ses: vScore voiceURI (premium/enhanced/compact) kullanıyor, id=voiceURI; cinsiyet tercihi vg ortak prefs. Kalan: native güncelleme, Mac kopyası, (istenirse) A2+ kitaplar.
- Seviye belirleme testi eklendi (placement(), S.placed, tests/tplace.py).
- UX: ilk açılış karşılama (onboard), günlük hedef (S.goal), haftalık grafik (S.act, weekCard), ses uyarısı. tests/tonb.py
- Senkron: 600ms debounce, sayfa gizlenince flushNow, cloudInit 6 kez tekrar, syncNote uyarısı. tests/tsync.py
- Kitaplar: A2 (2/dil) eklendi; dosyalar packs/<l>/books_a2.js + lexb_a2.js (de: bgl_a2.js). B1, B2 tamam. Sırada C1.
- KİTAPLAR HEDEF (kullanıcı 12 Kas): her seviye x her dil 10 kitap, daha uzun (~20 paragraf), güncel konular (ekonomi, siyaset-tarafsız, turizm, bilim, teknoloji, günlük hayat). Kopya yok, hepsi özgün.
  Mevcut: A2–C1 her dilde 2 kitap. Kalan: her seviye/dil 8 kitap (128 kitap). Dosya adları: books_a2b.js, books_a2c.js... + glossary lexb_*/bgl_* ; unknown.py ile eksik kelime kontrol (/tmp/old_*.txt farkı).
  - A2 batch b (Istanbul, Preise) tamam → A2 4/10. Kullanıcı: roman tarzı, betimlemeli, iç dünya; B1+ bölümlü uzun hikâyeler.
  - A2 batch c (Wahl, Handy) tamam → A2 6/10. Sırada A2 d: Arzt/Gesundheit(bilim), Klimatag; A2 e: Tourismus-Job, E-Auto.
- A2: 10 kitap/dil tamam (a2d doktor+iklim, a2e otel+e-araba). Sıradaki: B1 roman tarzı 8 kitap/dil
- Konuşma pratiği eklendi (Oyunlar kartı: Sohbet[AI, sadece Claude app sample], Tekrar et, Çevir&söyle; ders arası mola her 2. w/s bölümünde; ders sonu 'Bu konuyla konuş'). Test: tests/tspeak.py
- B1: 10 kitap/dil tamam (b1b uzaktan çalışma+girişim, b1c dükkân/enflasyon+yerel seçim, b1d yapay zekâ+gözlemevi, b1e kalp/tıp+sıcak yaz/iklim). Sıradaki: B2 8 kitap/dil (books_b2b..e).
- Artifact (3bb52656) 12 Kas'tan beri güncellenmiyor: Artifact aracı yayından önce canlı sürümün tamamının okunmasını istiyor (2 MB, bağlama sığmıyor). Kullanıcı: şimdilik kalsın; GitHub index.html güncel. Yayın adımını atla, özette belirt.
- 13 Kas: Yazım toleransı (nearEq/wclose: 4+ harfli kelimede 1 harf, 10+ harfte 2 harf hata doğru sayılır; artikel tam olmalı). Konuşma kartı: 📞 Ara (serbest sesli arama, callStart; SR otomatik dinler, yoksa klavye dikte), 🎯 Kelime soru-cevap (chat mode words, gWords'tan 8 kelime). AI özellikleri sadece Claude app (sample). Test: tests/tcall.py
- 13 Kas: GitHub sürümünde AI: Profil→Yapay zekâ→Claude API anahtarı (localStorage schritt-aikey, doğrudan api.anthropic.com, claude-haiku-5-5). Claude app'te sample öncelikli.
- Kullanıcı ücretli API istemiyor: anahtar arayüzü kaldırıldı (kod pasif duruyor). AI özellikleri sadece Claude app.
- 13 Kas: Safari (GitHub, top-level iOS) için efekt sesleri <audio> havuzu ile (SFX_EL/elBuild/elUnlock/elPlay); WebAudio yedek.
- Sesler gecikiyordu: tekrar WebAudio (hızlı) + iOS sessiz modu için döngülü sessiz <audio> (silKeep); <audio> efekt sadece ctx çalışmazsa yedek.
- B2: 10 kitap/dil tamam (13 Kas: b2b konut krizi+otomasyon, b2c yerel gazetecilik/dezenformasyon+belediye meclisi oylaması, b2d aşırı turizm+gen tedavisi, b2e rüzgâr enerjisi kooperatifi+uzay çöpü; sözlükler bgl_b2b..e / lexb_b2b..e). Artifact yayını yine atlandı. Sıradaki: C1 8 kitap/dil (books_c1b..e).
- 14 Kas: Eski widget (8NdcDXARWE5aVBTNWGSwJD / 3bb52656) güncellenemedi (2.4 MB tam okuma şartı). Güncel sürüm YENİ widget olarak yayınlandı: https://claude.ai/artifact/WfsDkPwkBhN8zvVij5Su27 (db, dictation, sample, user:profile). Not: başka bir oturumdan bu widgeti güncellemek de aynı okuma şartına takılır.
- 14 Kas: Mikrofon: Claude içinde önce dictation capability (iframe'de tarayıcı SpeechRecognition izni engelleniyordu), cümle bitince otomatik durur; olmazsa SpeechRecognition yedek. Test: /tmp/tdict.py benzeri sahte dictation.
- 14 Kas: iPhone Claude app: SpeechRecognition başlamıyor (Dinliyorum… takılı). 5 sn ses yoksa/izin hatasında REC.bad=true → canMic false, klavye dikte moduna geçer; aramada yazı kutusu hep görünür; ders 🎤 butonu inputa odaklanır. Test: /tmp/tsr.py (sahte başlamayan SR).
