(function () {
  const titles = [
    "正当化できました",
    "今回の買い物は無罪です",
    "これは必要経費です",
    "経験値として回収済みです"
  ];

  const specialRules = [
    {
      parts: ["マフラー・排気系"],
      complaints: ["性能"],
      keywords: [
        "パワーが出ない", "パワーが出なかった", "遅い", "伸びない", "変わらない", "変わらなかった",
        "変化がない", "変化がなかった", "レスポンス", "トルク感", "効果がない",
        "純正より出力が低い", "出力が低い", "低速トルクが無くなった", "低速トルクがなくなった",
        "純正より重い", "絞られてる", "絞り酷い", "絞りが酷い", "中がすっげー絞られてる"
      ],
      lines: [
        "{product}でパワーが増えなかったなら、そのぶんアクセルを踏んでいられる時間が長くなります。交換したマフラーへ排気を流す時間も、愛車を全開で楽しむ時間も増えたので、速さではなく使用時間で元を取るタイプです。",
        "{product}でパワーやトルクが落ちたなら、車が勝手に安全方向へ進化したということです。以前より深くアクセルを踏んでも速度が出すぎないので、免許を守りながら全開時間を増やせます。",
        "{product}の中が絞られているなら、パワーを出すよりアクセルを長く踏ませることに全振りした排気系です。速さは増えなくても、踏んでいる時間はしっかり増えるので、愛車を楽しめる時間も増えています。"
      ]
    },
    {
      parts: ["エアクリーナー・吸気系"],
      complaints: ["性能"],
      keywords: ["パワーが出ない", "パワーが出なかった", "パワーが増えない", "効果がない"],
      lines: [
        "{product}でパワーが増えなかったなら、そのぶんアクセルを踏んで吸気音を楽しめる時間が長くなります。交換したインテークへ空気を通す時間も、愛車を全開で楽しむ時間も増えたので、速さではなく吸わせた時間で元を取るタイプです。"
      ]
    },
    {
      parts: ["エアクリーナー・吸気系"],
      complaints: ["性能"],
      keywords: ["レスポンス", "トルク感", "変わらない", "変わらなかった", "変化がない", "変化がなかった"],
      lines: [
        "{product}でレスポンスやトルク感が変わらなかったなら、純正の扱いやすさを一切崩さず吸気系だけ交換できたということです。速さはそのままでも、アクセルを踏むたび社外インテークを働かせられる、純正性能保証付きの吸気チューンです。"
      ]
    },
    {
      parts: ["エアクリーナー・吸気系"],
      complaints: ["性能"],
      keywords: ["低速トルク", "トルクが落ちた", "トルクがなくなった", "出力が低い"],
      lines: [
        "{product}で低速トルクが落ちたなら、以前よりアクセルを多く開けられます。そのぶん交換したインテークに多く空気を吸わせられるので、パワーは減ってもパーツの仕事量は増えています。"
      ]
    },
    {
      parts: ["マフラー・排気系"],
      complaints: ["音"],
      keywords: ["うるさい", "爆音", "音が大きい"],
      lines: [
        "{product}がうるさいなら、交換したことが誰にでも一発で分かります。静かなマフラーのように説明する必要がなく、アクセルを踏むたびに購入代金を音で回収できるので、交換した実感の費用対効果はかなり高めです。"
      ]
    },
    {
      parts: ["マフラー・排気系"],
      complaints: ["音"],
      keywords: ["こもる", "こもり音"],
      lines: [
        "{product}の音が車内にこもるなら、車外へ逃げるはずだった排気音を乗員が優先的に楽しめる仕様です。どこへ移動しても購入したマフラーの音が付いてくるので、使用時間だけは非常に長くなっています。"
      ]
    },
    {
      parts: ["車高調・サスペンション"],
      complaints: ["耐久性"],
      keywords: ["へたる", "へたった", "抜ける", "抜けた"],
      lines: [
        "{product}がへたったことに気づけたなら、新品時と消耗後の違いを体で判別できるほど、人間側のセンサーが磨かれたということです。車高調はへたりましたが、サスペンションの良し悪しを感じ取る能力は残ります。"
      ]
    },
    {
      parts: ["車高調・サスペンション"],
      complaints: ["耐久性"],
      keywords: ["オイル漏れ", "漏れ"],
      lines: [
        "{product}からオイルが漏れたことで、車高調本体までこまめに見る習慣が付きます。装着して放置するだけの部品ではなく、定期的にオーナーを車の下へ呼び戻してくれる点検機能付きです。"
      ]
    },
    {
      parts: ["車高調・サスペンション"],
      complaints: ["快適性"],
      keywords: ["硬い", "乗り心地", "疲れる", "つらい"],
      lines: [
        "{product}が硬いなら、タイヤだけでなく体でも路面を読めるようになります。車高調を買った金額で、足回りの変化と道路の傷み具合を同時に楽しめるので二度おいしい仕様です。"
      ]
    },
    {
      parts: ["車高調・サスペンション"],
      complaints: ["快適性"],
      keywords: ["跳ねる", "跳ねた"],
      lines: [
        "{product}で車が跳ねるなら、平らな道でも足回りが積極的に仕事を作ってくれます。普通なら何も起きない移動までサスペンション体験に変わるので、車高調を使っている時間は確実に増えています。"
      ]
    },
    {
      parts: ["車高調・サスペンション"],
      complaints: ["性能"],
      keywords: ["ネジ式", "下がらない", "下がりすぎる"],
      lines: [
        "{product}で思ったほど車高が下がらなかったなら、段差と駐車場を避けずに車高調装着車を楽しめます。低さは手に入りませんでしたが、行ける場所を減らさず交換した事実だけは残せました。"
      ]
    },
    {
      parts: ["車高調・サスペンション"],
      complaints: ["性能"],
      keywords: ["セッティング", "決まらない"],
      lines: [
        "{product}のセッティングが決まらないなら、完成して飽きる心配がありません。減衰や車高を触るたびに別の足回りとして遊べるので、一度の購入で何度も仕様変更を楽しめます。"
      ]
    },
    {
      parts: ["ブレーキ"],
      complaints: ["耐久性"],
      keywords: ["剥離", "割れた"],
      safety: true,
      lines: [
        "{product}の剥離や破損は正当化せず、使用を止めて点検してください。ブレーキだけは、味わう時間より安全に止まれることを優先します。"
      ]
    },
    {
      parts: ["ブレーキ"],
      complaints: ["耐久性"],
      keywords: ["錆び", "固着", "減りが早い"],
      safety: true,
      lines: [
        "{product}の錆びや固着に気づいたことで、ホイールの奥まで確認する点検項目が増えました。見えにくいブレーキまで定期的に確認させる、強制点検機能付きのパーツです。"
      ]
    },
    {
      parts: ["ブレーキ"],
      complaints: ["音"],
      keywords: ["鳴く", "鳴き", "キーキー", "うるさい"],
      lines: [
        "{product}が鳴くなら、ブレーキを踏むたびに交換したことを音で知らせてくれます。見えにくい場所に付く部品なのに毎回存在を主張するので、交換した実感の費用対効果は高めです。"
      ]
    },
    {
      parts: ["ブレーキ"],
      complaints: ["性能"],
      keywords: ["効かない", "効きにくい", "効きが悪い", "効きが弱い", "止まらない"],
      safety: true,
      lines: [
        "{product}が効きにくいなら、止まるまでブレーキを踏んでいる時間が長くなります。交換したブレーキの感触を味わう時間も伸びるので、使用時間あたりではむしろ元を取りやすくなっています。"
      ]
    },
    {
      parts: ["ホイール", "タイヤ"],
      complaints: ["取付精度"],
      keywords: ["干渉", "キャリパー"],
      lines: [
        "{product}が干渉したなら、買って装着するだけでは終わらないオーダーメイド仕様です。スペーサー、車高、キャンバーまで巻き込んで、ホイール一組から車全体の仕様変更を楽しめます。"
      ]
    },
    {
      parts: ["ホイール", "タイヤ"],
      complaints: ["取付精度"],
      keywords: ["オフセット", "表記と違う", "ツラガバ"],
      lines: [
        "{product}のオフセットが想定と違ったなら、予定していなかったツラ合わせまでセットで付いてきました。ホイール代だけで計測、調整、現物合わせまで楽しめる拡張パックです。"
      ]
    },
    {
      parts: ["シート・内装"],
      complaints: ["音"],
      keywords: ["ビビリ音", "ビビる", "異音"],
      lines: [
        "{product}がビビるなら、目だけでなく耳でも交換したことを確認できます。運転中に見えない位置でも自分から存在を知らせてくれるので、装着したパーツを忘れる心配がありません。"
      ]
    },
    {
      parts: ["その他", "未分類"],
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
      justificationType: specialRule ? "specific" : "generic",
      ruleKey: specialRule ? "special" : "fallback",
      safetyWarning: Boolean(detectedSafetyWarning || (specialRule && specialRule.safety))
    };
  }

  window.TuningGenerator = { generateJustification };
})();
