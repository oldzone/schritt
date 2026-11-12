CONJ_THEORY.push(
{h:"1 · Eş bağlaçlar (mais, ou, et, donc, or, ni, car)",p:"İki eşit öğeyi bağlar; kelime sırası değişmez. Ezber cümlesi: <b>Mais où est donc Ornicar ?</b> (mais, ou, et, donc, or, ni, car).",t:[["Bağlaç","Anlam","Örnek"],["et","ve","Je cuisine <b>et</b> elle met la table."],["mais","ama","C'est vieux, <b>mais</b> ça marche."],["ou","veya","Thé <b>ou</b> café ?"],["donc","bu yüzden","Il pleut, <b>donc</b> je reste."],["car","çünkü (yazı dili)","Je reste, <b>car</b> il pleut."]],tip:"<b>mais</b>, <b>car</b> ve <b>donc</b>'tan önce genelde virgül konur. <b>car</b> cümle başına gelmez; konuşmada yerine <b>parce que</b> kullanılır."},
{h:"2 · Yan cümle bağlaçları (indicatif)",p:"parce que, quand, si, pendant que, depuis que, dès que, alors que, puisque… Arkalarından normal çekimli fiil (indicatif) gelir; kelime sırası değişmez.",list:["<b>si</b> + şimdiki zaman → ana cümlede gelecek: <b>Si</b> il pleut, je <b>resterai</b> à la maison.","<b>si</b>'den sonra asla gelecek zaman (futur) ya da conditionnel kullanılmaz.","<b>si + il</b> → <b>s'il</b>, ama si + elle → si elle."]},
{h:"3 · Subjonctif isteyen bağlaçlar",p:"Bazı bağlaçlardan sonra fiil <b>subjonctif</b> (dilek kipi) olur: <b>bien que, pour que, avant que, à condition que, sans que, jusqu'à ce que, afin que</b>.",t:[["Bağlaç","Örnek"],["bien que (-e rağmen)","<b>Bien qu'</b>il <b>soit</b> malade, il travaille."],["pour que (-sin diye)","Je parle lentement <b>pour que</b> tu <b>comprennes</b>."],["avant que (-meden önce)","Pars <b>avant qu'</b>il <b>fasse</b> nuit."]],tip:"Özne aynıysa bağlaç yerine <b>mastar</b> kullanılır: Je travaille <b>pour gagner</b> de l'argent (pour que je gagne ✗)."},
{h:"4 · Bağlayıcı zarflar",p:"<b>cependant, pourtant, en effet, par conséquent, de plus, ensuite, enfin</b>… Cümle başında ya da fiilden sonra gelir, arkasından genelde virgül konur. Fransız yazı dili bunları çok sever.",t:[["Bağlayıcı","Anlam"],["cependant / pourtant","ancak / yine de"],["en effet","gerçekten de, nitekim"],["par conséquent","dolayısıyla"],["de plus / en outre","üstelik"]]}
);
// A1
C("et","Ekleme","A1","ve","Je bois du café **et** elle boit du thé.","İki tam cümle arasında genelde virgül yok.","eş bağlaç");
C("mais","Zıtlık","A1","ama, fakat","L'appartement est petit, **mais** il est joli.","Önüne virgül konur.","eş bağlaç");
C("ou","Seçenek","A1","veya, ya da","Tu veux du thé **ou** du café ?","Vurgulu hali: ou bien.","eş bağlaç");
C("parce que","Sebep","A1","çünkü","Je reste à la maison **parce que** je suis malade.","Ünlüden önce: parce qu'il… Cevap olarak da kullanılır.","yan cümle");
C("alors","Sonuç","A1","o zaman, öyleyse","Il pleut, **alors** on prend un taxi.","Konuşmada çok yaygın.","zarf");
C("aussi","Ekleme","A1","de, da, ayrıca","Je parle **aussi** allemand.","Fiilden sonra gelir.","zarf");
C("puis","Sıralama","A1","sonra","Je mange, **puis** je vais au travail.","ensuite ile eş anlamlı.","zarf");
C("d'abord","Sıralama","A1","önce, ilk olarak","**D'abord**, je lis mes mails.","Sıra: d'abord – puis / ensuite – enfin.","zarf");
// A2
C("quand","Zaman","A2","-dığında, -ınca","**Quand** j'étais petit, j'habitais à Ankara.","Gelecek için: Quand j'arriverai, je t'appellerai (futur!).","yan cümle");
C("si","Koşul","A2","eğer, -se","**Si** il fait beau, on va à la plage.","si + il → s'il. si'den sonra futur kullanılmaz.","yan cümle");
C("donc","Sonuç","A2","bu yüzden, dolayısıyla","Je suis fatigué, **donc** je rentre.","Fiilden sonra da gelebilir: Je pense, donc je suis.","eş bağlaç");
C("ensuite","Sıralama","A2","ardından","**Ensuite**, nous avons dîné.","puis ile aynı.","zarf");
C("enfin","Sıralama","A2","sonunda, nihayet","**Enfin**, cliquez sur « Enregistrer ».","Rahatlama anlamı da var: Enfin ! (Nihayet!)","zarf");
C("pendant que","Zaman","A2","-ken","J'écoute des podcasts **pendant que** je conduis.","İsimle: pendant le film.","yan cümle");
C("que","Bildirme","A2","ki, -diğini","Je pense **que** tu as raison.","Fransızcada asla düşmez (İngilizce 'that' gibi değil).","yan cümle");
C("par exemple","Örnek","A2","örneğin","J'aime le sport, **par exemple** le tennis.","Kısaltması: p. ex.","zarf");
C("comme","Sebep / Benzerlik","A2","-dığı için / gibi","**Comme** il pleut, je reste ici.","Sebep anlamında cümle başında gelir.","yan cümle");
C("dès que","Zaman","A2","-ir -mez","Appelle-moi **dès que** tu arrives.","Gelecekte: dès que tu arriveras.","yan cümle");
C("avant de","Zaman","A2","-meden önce","Lave-toi les mains **avant de** manger.","Arkasından mastar gelir (özne aynıysa).","edat yapısı");
C("après","Zaman","A2","sonra","**Après** le travail, je vais au sport.","Mastarla: après avoir mangé (geçmiş mastar).","edat");
// B1
C("pourtant","Zıtlık","B1","yine de, oysa","Il est riche, **pourtant** il n'est pas heureux.","Şaşırtıcı bir zıtlık bildirir.","bağlayıcı zarf");
C("cependant","Zıtlık","B1","ancak, bununla birlikte","Le plan est bon. **Cependant**, il est cher.","Yazı dilinde yaygın.","bağlayıcı zarf");
C("bien que","Zıtlık","B1","-e rağmen","**Bien qu'**il fasse froid, nous sortons.","Arkasından subjonctif gelir!","yan cümle + subj.");
C("même si","Zıtlık","B1","-se bile","Je viendrai **même si** je suis fatigué.","indicatif ile kullanılır.","yan cümle");
C("pour que","Amaç","B1","-sin diye","Je parle lentement **pour que** tu comprennes.","Subjonctif. Özne aynıysa: pour + mastar.","yan cümle + subj.");
C("pour","Amaç","B1","-mek için","Je travaille **pour** gagner de l'argent.","Mastar alır.","edat");
C("puisque","Sebep","B1","madem ki","**Puisque** tu es là, aide-moi.","Bilinen bir sebebi belirtir.","yan cümle");
C("depuis que","Zaman","B1","-den beri","**Depuis qu'**il habite à Paris, il est heureux.","İsimle: depuis 2020, depuis trois ans.","yan cümle");
C("alors que","Zıtlık / Zaman","B1","oysa / -ken","Il dort **alors que** je travaille.","Hem zıtlık hem eş zamanlılık.","yan cümle");
C("à cause de","Sebep","B1","yüzünden","Le vol est annulé **à cause de** la neige.","Olumsuz sebep; isim alır.","edat");
C("grâce à","Sebep","B1","sayesinde","J'ai réussi **grâce à** toi.","Olumlu sebep; isim alır.","edat");
C("malgré","Zıtlık","B1","-e rağmen","**Malgré** la pluie, on a joué.","İsim alır, cümle değil.","edat");
C("pendant","Zaman","B1","sırasında, boyunca","Mon téléphone a sonné **pendant** la réunion.","Cümleyle: pendant que.","edat");
C("par conséquent","Sonuç","B1","dolayısıyla","Les données manquent ; **par conséquent**, le rapport est faux.","Resmî; konuşmada donc.","bağlayıcı zarf");
C("au lieu de","Seçenek","B1","yerine","**Au lieu de** prendre le bus, j'ai marché.","İsim veya mastar alır.","edat");
C("soit … soit","Seçenek","B1","ya … ya da","Tu peux **soit** m'appeler, **soit** m'écrire.","Resmî; konuşmada ou … ou.","ikili bağlaç");
C("ni … ni","Olumsuz seçenek","B1","ne … ne de","Je n'aime **ni** le thé **ni** le café.","Fiilin önüne ne gelir.","ikili bağlaç");
C("de plus","Ekleme","B1","üstelik","**De plus**, il faut un nouveau serveur.","Cümle başında, arkasından virgül.","bağlayıcı zarf");
// B2
C("tandis que","Zıtlık","B2","oysa, -iken","J'aime la ville, **tandis que** ma femme préfère la campagne.","Karşılaştırma için; resmî.","yan cümle");
C("sinon","Koşul","B2","yoksa, aksi halde","Dépêche-toi, **sinon** on va rater le train.","Konuşmada çok yaygın.","zarf");
C("en outre","Ekleme","B2","ayrıca, üstelik","**En outre**, le projet est rapide.","Yazı dili.","bağlayıcı zarf");
C("néanmoins","Zıtlık","B2","yine de","C'était difficile. **Néanmoins**, nous avons fini à temps.","cependant'dan daha güçlü.","bağlayıcı zarf");
C("en effet","Açıklama","B2","nitekim, gerçekten de","Il est fatigué. **En effet**, il a travaillé toute la nuit.","Önceki cümleyi doğrular/açıklar.","bağlayıcı zarf");
C("au cas où","Önlem","B2","… ihtimaline karşı","Prends un parapluie **au cas où** il pleuvrait.","Arkasından conditionnel gelir!","yan cümle + cond.");
C("à condition que","Koşul","B2","şartıyla","Tu peux sortir **à condition que** tu rentres tôt.","Subjonctif. Özne aynıysa: à condition de + mastar.","yan cümle + subj.");
C("avant que","Zaman","B2","-meden önce","Pars **avant qu'**il fasse nuit.","Subjonctif; resmîde ne explétif: avant qu'il ne parte.","yan cümle + subj.");
C("jusqu'à ce que","Zaman","B2","-ene kadar","Attends ici **jusqu'à ce que** je revienne.","Subjonctif.","yan cümle + subj.");
C("d'une part … d'autre part","Ekleme","B2","bir yandan … öte yandan","**D'une part** c'est cher, **d'autre part** c'est lent.","Tartışma yazılarında.","ikili bağlaç");
C("en revanche","Zıtlık","B2","buna karşılık","Il est gentil. **En revanche**, il est souvent en retard.","Karşılaştırma için.","bağlayıcı zarf");
C("non seulement … mais aussi","Ekleme","B2","sadece … değil, aynı zamanda","Il est **non seulement** intelligent **mais aussi** gentil.","Vurgulu ekleme.","ikili bağlaç");
C("si bien que","Sonuç","B2","öyle ki, bu yüzden","Il a plu, **si bien que** le match a été annulé.","indicatif ile.","yan cümle");
C("à moins que","Koşul","B2","-medikçe","On sortira, **à moins qu'**il (ne) pleuve.","Subjonctif.","yan cümle + subj.");
C("dès lors","Sonuç / Zaman","B2","o andan itibaren / dolayısıyla","**Dès lors**, tout a changé.","Yazı dili.","bağlayıcı zarf");
C("en attendant","Zaman","B2","bu arada, o zamana kadar","**En attendant**, on peut boire un café.","Konuşmada yaygın.","zarf");
// C1
C("or","Zıtlık / Akıl yürütme","C1","oysa, hâlbuki","Il dit qu'il était chez lui. **Or**, personne ne l'a vu.","Mantık zincirinde yeni bir unsur getirir.","eş bağlaç");
C("quoique","Zıtlık","C1","-e rağmen","**Quoiqu'**il soit tard, il travaille encore.","bien que ile aynı; subjonctif.","yan cümle + subj.");
C("dans la mesure où","Ölçü","C1","… ölçüde, -dığı için","Le plan marche **dans la mesure où** chacun aide.","Resmî ve akademik.","yan cümle");
C("étant donné que","Sebep","C1","… göz önüne alındığında","**Étant donné que** le temps manque, concentrons-nous.","puisque ile benzer; resmî.","yan cümle");
C("de sorte que","Sonuç / Amaç","C1","öyle ki / -sin diye","Parle fort, **de sorte que** tout le monde entende.","Amaç: subjonctif; sonuç: indicatif.","yan cümle");
C("pour autant","Zıtlık","C1","yine de, bu yüzden … değil","C'est difficile ; il ne faut pas **pour autant** abandonner.","Genelde olumsuz cümlede.","bağlayıcı zarf");
C("toutefois","Zıtlık","C1","bununla birlikte","Le résultat est bon ; **toutefois**, il reste des risques.","Çok resmî.","bağlayıcı zarf");
C("ainsi","Sonuç","C1","böylece","Nous avons réduit les coûts ; **ainsi**, les profits augmentent.","Başta gelirse devrik olabilir: Ainsi peut-on…","bağlayıcı zarf");
C("d'autant plus que","Sebep","C1","hele ki, üstelik","Je reste, **d'autant plus qu'**il pleut.","Sebebi güçlendirir.","yan cümle");
C("faute de","Sebep","C1","… olmadığından","**Faute de** temps, nous avons annulé.","İsim veya mastar alır.","edat");
C("quitte à","Kabullenme","C1","… pahasına","Je le fais, **quitte à** perdre de l'argent.","Mastar alır.","edat");
C("encore que","Kısıtlama","C1","gerçi, ama","C'est une bonne idée, **encore que** ce soit cher.","Subjonctif; çok resmî.","yan cümle + subj.");
C("à savoir","Açıklama","C1","yani, şöyle ki","Trois pays, **à savoir** la France, l'Italie et l'Espagne.","Liste açıklamada.","bağlayıcı");
C("en l'occurrence","Açıklama","C1","bu durumda, söz konusu olan","Le responsable, **en l'occurrence** M. Dupont, est absent.","Resmî.","bağlayıcı zarf");
C("autrement dit","Açıklama","C1","başka bir deyişle","Il a été remercié — **autrement dit**, licencié.","Konuşma ve yazıda.","bağlayıcı zarf");
C("sous prétexte que","Sebep","C1","… bahanesiyle","Il n'est pas venu **sous prétexte qu'**il était malade.","Şüpheli bir sebep bildirir.","yan cümle");
