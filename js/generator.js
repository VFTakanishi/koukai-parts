(function () {
  const titles = [
    "正当化できました",
    "今回の買い物は無罪です",
    "これは必要経費です",
    "経験値として回収済みです"
  ];

  const specialRules = [
    {
      parts: ["マフラー・排気系", "エアクリーナー・吸気系"],
      complaints: ["性能"],
      keywords: ["パワーが出ない", "パワーが出なかった", "遅い", "伸びない", "変わらない", "効果がない"],
      lines: [
        "{product}でパワーが出なかったなら、速さより先に『期待値の高さ』を証明したことになります。次に何を替えれば効くかを考え始めた時点で、もうただの部品代ではなく作戦会議費です。",
        "{product}で変化が薄かったのは、あなたが数字にうるさい側の人間だという証拠です。少しの差で満足しない人だけが言える不満なので、チューニングの目だけは確実に育っています。",
        "{product}で伸びなかったのは残念ですが、そのぶん『速そうな雰囲気』ではごまかされない体になりました。今後の吸排気選びで、かなり嫌な客になれるので十分元は取れます。"
      ]
    },
    {
      parts: ["マフラー・排気系"],
      complaints: ["性能"],
      keywords: ["純正より出力が低い", "出力が低い", "低速トルクが無くなった", "低速トルクがなくなった", "純正より重い", "絞られてる", "絞り酷い", "絞りが酷い", "中がすっげー絞られてる"],
      lines: [
        "{product}で純正より出力が低いなら、速さを焦って使い切る必要がありません。パワーは逃しましたが、そのぶんアクセルを長く踏める時間を増やしてくれる、妙に気前のいい排気系です。",
        "{product}で低速トルクまで薄くなったなら、街中から全開気分を味わわせるための前振りです。速くはないのに踏んでいる時間だけは増えるので、アクセルワークの練習量だけはかなり稼げます。",
        "{product}の中がすっげー絞られてるなら、パワーを出すよりアクセルを長く踏ませることに全振りした排気系です。速さは増えなくても、踏んでいる時間だけはしっかり増えるので、運転参加率だけはかなり高めです。"
      ]
    },
    {
      parts: ["マフラー・排気系"],
      complaints: ["音"],
      keywords: ["うるさい", "爆音", "音が大きい", "こもる", "こもり音"],
      lines: [
        "{product}がうるさいなら、交換した事実を車内外へ毎回きっちり告知してくれる親切設計です。静かに自己満足する道を捨てて、近所まで巻き込む覚悟を手に入れました。",
        "{product}のこもり音が強いなら、快適性を犠牲にしてでも『替えた感』を守り抜く硬派な排気系です。会話しづらい代わりに、支払った金額だけは毎回耳から思い出せます。",
        "{product}が爆音寄りなら、もはや性能パーツというより決意表明です。音量でしか回収できない満足感を、全回転域で取りにいく姿勢はかなり本気です。"
      ]
    },
    {
      parts: ["車高調・サスペンション"],
      complaints: ["耐久性"],
      keywords: ["へたる", "へたった", "抜ける", "抜けた", "オイル漏れ", "漏れ", "壊れた"],
      lines: [
        "{product}がすぐへたったなら、慣らし期間を一瞬で終えて上級者向けの中古感まで先取りしただけです。一台で新品と消耗後の両方を体験できる、妙に情報量の多い足回りでした。",
        "{product}が抜けたなら、足回りの異変を察知する感覚だけは一気に育っています。乗り心地の変化を言葉にできる人は少ないので、もう立派な減衰力ソムリエです。",
        "{product}からオイルが漏れたなら、車高調のほうから『そろそろ次の仕様を考えよう』と先に話を振ってくれた形です。黙って寿命を迎えるより、ずっと会話のできるパーツでした。"
      ]
    },
    {
      parts: ["車高調・サスペンション"],
      complaints: ["快適性"],
      keywords: ["硬い", "乗り心地", "跳ねる", "疲れる", "つらい"],
      lines: [
        "{product}が硬すぎるなら、快適性より路面情報を優先する報連相の鬼です。段差ひとつ見逃さないので、マンホールまで体で読めるようになります。",
        "{product}で跳ねるなら、街中まで競技路面のつもりで走らせてくれる教育係です。乗り心地は失いましたが、路面の荒れに気づく速度だけはかなり上がっています。",
        "{product}で街乗りがつらいなら、移動をそのまま修行に変える高効率仕様です。目的地に着くころには、足回りの知識より先に腰まわりの忍耐力が鍛えられています。"
      ]
    },
    {
      parts: ["車高調・サスペンション"],
      complaints: ["性能"],
      keywords: ["ネジ式", "下がらない", "下がりすぎる", "セッティング", "決まらない"],
      lines: [
        "{product}が今どきネジ式でも、むしろ調整のたびに『自分でやってる感』を濃く味わえます。便利さを捨ててまで手数を増やしたぶん、チューニングしている顔だけは本物です。",
        "{product}のセッティングが決まらないなら、乗るたびに次の仮説を試せる研究用キットです。正解が遠いぶん、足回りに詳しそうな口ぶりだけはどんどん上達します。",
        "{product}で狙った車高や動きにならないのは、簡単に完成させないことでオーナーの執着心を育てているからです。満足できない時間まで含めて、かなり濃い足回り体験になっています。"
      ]
    },
    {
      parts: ["ブレーキ"],
      complaints: ["耐久性"],
      keywords: ["剥離", "錆び", "固着", "減りが早い", "割れた"],
      safety: true,
      lines: [
        "{product}が剥離したり固着したりする話は、もうジョークで受け流す段階を超えています。面白くできるのは出費までなので、ここは使用を止めて点検した人が勝ちです。",
        "{product}の錆びや固着は、ブレーキのほうから強制的に危機管理講習を始めてきた状態です。笑いに変える前に、まず安全側へ全振りしてください。"
      ]
    },
    {
      parts: ["ブレーキ"],
      complaints: ["音"],
      keywords: ["鳴く", "鳴き", "キーキー", "うるさい"],
      lines: [
        "{product}が鳴くなら、踏むたびに『今ちゃんと仕事してます』と自己申告してくれる勤務態度の良いブレーキです。静かさはありませんが、存在感だけは常に満額回答です。",
        "{product}がキーキー言うなら、効きより先に感情を伝えてくるタイプです。制動のたびに何か訴えてくるので、無音の純正より記憶にはしっかり残ります。"
      ]
    },
    {
      parts: ["ブレーキ"],
      complaints: ["性能"],
      keywords: ["効かない", "効きが悪い", "効きが弱い", "止まらない"],
      safety: true,
      lines: [
        "{product}で止まらない系は正当化しません。ここだけは笑いより点検が先で、無理やり褒めるより使用停止の判断がいちばん賢いです。",
        "{product}の効きが悪い件は、買い物の失敗ではなく安全案件です。ブレーキだけはノリで擁護しないので、そのまま点検に持っていってください。"
      ]
    },
    {
      parts: ["ホイール・タイヤ"],
      complaints: ["取付精度"],
      keywords: ["干渉", "オフセット", "表記と違う", "キャリパー", "ツラガバ"],
      lines: [
        "{product}が干渉したなら、買っただけでは完成させない参加型ホイールです。履くだけで終わらず、計測と現物確認まで叩き込んでくれる実践教材でした。",
        "{product}のオフセットが表記と違うなら、カタログを信じ切らない姿勢を育てる教育系ホイールです。数字より現車確認が大事だと、かなり強めに教えてくれました。"
      ]
    },
    {
      parts: ["シート・内装"],
      complaints: ["音"],
      keywords: ["ビビリ音", "ビビる", "異音"],
      lines: [
        "{product}のビビリ音は、ただ静かに付いているだけでは終わらない自己主張です。見た目パーツのつもりで買っても、最終的には聴覚まで支配してきます。",
        "{product}がビビるなら、車内の静寂に甘えるなというメッセージです。乗るたびに『まだいるぞ』と教えてくれるので、存在感だけはまったく薄れません。"
      ]
    },
    {
      parts: ["その他"],
      complaints: ["性能"],
      keywords: ["妥協", "欲しかった", "本命", "上位グレード", "grヤリス"],
      lines: [
        "{product}を妥協して選んだなら、それは現実と物欲の両方を知っている大人の買い方です。本命を諦めた傷は残りますが、そのぶん次に欲しい車への執着は誰より純度が高くなっています。"
      ]
    },
    {
      parts: ["車高調・サスペンション", "その他"],
      complaints: ["その他"],
      keywords: ["中国産", "海外産", "外国産"],
      lines: [
        "{product}が中国産や海外産なのが引っかかるなら、取り付け前からずっと疑いながら付き合えるパーツです。信じ切れないぶん、様子を見る目だけはかなり育ちます。"
      ]
    }
  ];

  const comboFallbacks = {
    "マフラー・排気系|性能": [
      "{product}で性能に不満が出たなら、数字の響きだけでは満足しない目を手に入れたということです。今後は雰囲気チューンにだまされにくくなるので、授業料としてはかなり実用的です。",
      "{product}で思ったほど速くならなかったぶん、何を替えても絶賛する素直な客ではいられなくなりました。これはもう、排気系を語る側の人間に進化したと考えましょう。"
    ],
    "車高調・サスペンション|耐久性": [
      "{product}の耐久性に不満が出たなら、足回りの変化をちゃんと感じ取れる体になったということです。鈍感な人には言えない感想なので、そこだけはかなり本物です。"
    ],
    "車高調・サスペンション|快適性": [
      "{product}で快適性が死んだなら、足回りに何を求めるかの優先順位がはっきりしました。柔らかさの価値を身をもって学べたので、次の選択はかなり強くなります。"
    ],
    "ブレーキ|音": [
      "{product}がうるさいなら、止まるたびに仕事をアピールしてくるタイプです。静粛性は捨てましたが、交換した実感だけは絶対に薄まりません。"
    ]
  };

  const complaintFallbacks = {
    "性能": [
      "{product}で思った結果が出なかったなら、期待値だけは本気だったということです。満足のハードルが低い人には出てこない不満なので、目だけはしっかり肥えています。",
      "{product}で性能不足を感じたなら、今後はスペック表だけで盛り上がれない体になっています。実測主義の入り口としては、かなり濃い一件です。"
    ],
    "耐久性": [
      "{product}が長持ちしなかったなら、交換タイミングを読む感覚だけは確実に育ちました。次は壊れる前から疑えるので、経験値としてはだいぶ回収できています。",
      "{product}の寿命が短かったぶん、消耗品を見る目はかなりシビアになります。今後の買い物判断が少し嫌味になるくらいには、もう十分学べています。"
    ],
    "快適性": [
      "{product}で快適性に不満が出たなら、日常で効くデメリットをちゃんと把握できたということです。乗りやすさの価値を金で学んだので、次はかなり外しにくくなります。",
      "{product}がつらい系なら、見た目や響きだけでは選べないことを体で覚えました。快適性にうるさい人へ進化したと思えば、かなり実用的な後悔です。"
    ],
    "音": [
      "{product}の音に不満が出たなら、耳がもう素人ではない証拠です。違和感を言語化できる時点で、ただの装着者ではなく完全に評論側へ回っています。",
      "{product}の音が気になるなら、心地いい音とダメな音の境界線がかなり明確になっています。次の一手で失敗しにくくなるので、耳の経験値は十分回収済みです。"
    ],
    "取付精度": [
      "{product}がすんなり付かなかったなら、現物合わせの現実をしっかり踏めたということです。通販ページだけでは学べない濃い授業を受けたので、次はかなり慎重に選べます。",
      "{product}の取り付けで苦労したなら、もう『ポン付け』という言葉を簡単には信じない人になっています。その疑い深さは今後かなり役に立ちます。"
    ],
    "費用": [
      "{product}で費用がかさんだなら、次からは夢と請求額を分けて考えられる人です。高い授業ではありましたが、コスパ判定の精度はかなり上がっています。"
    ]
  };

  const partFallbacks = {
    "マフラー・排気系": [
      "{product}は理想どおりではなくても、交換した事実だけは音か走りで毎回思い出させてくれます。満足度は揺れても、存在感だけはずっと満額です。"
    ],
    "ブレーキ": [
      "{product}の違和感は、まず安全優先で見るのが正解です。そのうえで語れる後悔なら、かなり濃い実体験を積んだことだけは間違いありません。"
    ],
    "車高調・サスペンション": [
      "{product}は狙いどおりでなくても、足回りを替えた車にしか出ない悩みを持ち込んでくれます。その時点で、もう十分にチューニングしている人の顔です。"
    ],
    "その他": [
      "{product}が合わなかったとしても、買わなければずっと気になっていたはずです。後悔に変わったぶんだけ、物欲にはひとまず決着がついています。",
      "{product}で外したなら、ネットの評判を自分の車で検証したことになります。他人の感想で終わらない経験を買ったと思えば、かなり濃い使い道です。"
    ]
  };

  function normalize(text) {
    return String(text || "").trim().toLowerCase().replace(/\s+/g, "");
  }

  function pickRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function includesKeyword(target, keywords) {
    return keywords.some((keyword) => target.includes(normalize(keyword)));
  }

  function findSpecialRule(partCategory, complaintCategory, disappointment) {
    const target = normalize(disappointment);
    return specialRules.find((rule) =>
      rule.parts.includes(partCategory) &&
      (!rule.complaints || rule.complaints.includes(complaintCategory)) &&
      includesKeyword(target, rule.keywords)
    );
  }

  function findFallback(partCategory, complaintCategory) {
    const comboKey = `${partCategory}|${complaintCategory}`;
    if (comboFallbacks[comboKey]) {
      return comboFallbacks[comboKey];
    }
    if (complaintFallbacks[complaintCategory]) {
      return complaintFallbacks[complaintCategory];
    }
    return partFallbacks[partCategory] || partFallbacks["その他"];
  }

  function generateJustification(productText, disappointmentText) {
    const product = String(productText || "").trim();
    const disappointment = String(disappointmentText || "").trim();
    const partCategory = window.TuningClassifier.classifyPart(product);
    const complaintCategory = window.TuningClassifier.classifyComplaint(disappointment);
    const detectedSafetyWarning = window.TuningClassifier.detectSafetyWarning(product, disappointment);
    const specialRule = findSpecialRule(partCategory, complaintCategory, disappointment);
    const candidates = specialRule ? specialRule.lines : findFallback(partCategory, complaintCategory);
    const line = pickRandom(candidates).replace(/\{product\}/g, product);

    return {
      generatedText: line,
      title: specialRule && specialRule.safety ? "これは点検案件です" : pickRandom(titles),
      partCategory,
      complaintCategory,
      safetyWarning: Boolean(detectedSafetyWarning || (specialRule && specialRule.safety))
    };
  }

  window.TuningGenerator = { generateJustification };
})();
