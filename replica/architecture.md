# Mimari (replica-architect)
Dilbaz bilerek **sunucusuz ve ücretsiz**: tek HTML (engine.html + dil paketleri → index.html), iOS'ta WKWebView kabuğu, veriler cihazda (localStorage + JSON yedek).

## Yeni modüller (3.0)
| modül | ne yapar | veri |
|---|---|---|
| Çekim motoru `conjDe` | ~110 güçlü fiil tablosu + düzenli/ayrılabilen/ayrılamayan/-ieren kuralları → Präsens, Präteritum, Perfekt, emir | STRONG tablosu, kurs sözlüğü (LEX) |
| Biçim bulucu `findVerb` | çekimli kelimeden mastarı ve kişi/zamanı bulur | formIndex önbelleği |
| Cümle röntgeni `xrayDe` | yan cümle ayırma, özne/fiil/nesne, artikel+isim → cinsiyet+hâl, edat hâli (Akk/Dat/Wechsel/Gen), zaman (Präsens…Passiv, würde), cümle tipi | XP, XPREP, XDEF, XDETEND |
| Kalıp makinesi `xVariants` | aynı cümleyi başka kişi, soru, Perfekt, modal, olumsuz biçimde üretir | — |
| Kardeş örnekler `xSiblings` | kurstaki ~2100 cümleyi kalıp anahtarına göre (weil, Perfekt, Dativ edatı…) eşleştirir | xKey önbelleği |
| Neden yanlış? `whyWrong` | kelime düzeyinde fark (Levenshtein) + doğru kelimenin röntgen notu | — |
| Dönüştür alıştırması | Sınırsız tekrara ve röntgene eklendi | — |
EN/FR/IT: hafif röntgen (sözlük + işlev kelimeleri + kurallar + aynı işlev kelimeli örnekler).
Ölçüm: tüm Almanca kurs cümleleri (2088) 0,4 sn'de çözümleniyor, 0 hata.
