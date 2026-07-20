(function () {
  const rules = [
    {
      part: "車高調・サスペンション",
      key: "suspension_sag",
      keywords: ["へた", "ヘタ", "抜けた", "抜ける"],
      lines: [
        "{product}はへたりましたが、その変化を感じ取れる感覚が残りました。消耗品で一生使えるセンサーを買えたので、実質得しています。",
        "新品とへたった後、二種類の乗り味を一本で比較できました。車高調一本で二度試せたので、実質半額です。",
        "普通なら数年かかるへたりを、{product}なら短期間で体験できます。足回りの経年変化まで先取りできる、時間短縮パーツです。"
      ]
    },
    {
      part: "車高調・サスペンション",
      key: "suspension_oil_leak",
      keywords: ["オイル漏れ", "油漏れ", "にじみ", "滲み", "漏れ"],
      lines: [
        "ショックからオイルが漏れたことで、交換時期が目で分かるようになりました。判断に迷う時間がなくなるので、実質時短です。",
        "オイル漏れを一度見たので、次からはにじみの段階で気づけます。ショックは消耗しても、点検する目は残ります。",
        "床に跡を残して不調を知らせてくれるので、見逃す心配がありません。交換時期のお知らせ機能まで付いた車高調です。"
      ]
    },
    {
      part: "車高調・サスペンション",
      key: "suspension_noise",
      keywords: ["異音", "コトコト", "ゴトゴト", "カタカタ", "音が出"],
      lines: [
        "異音を避けて段差を丁寧に越えるようになるので、運転は自然とうまくなります。車高調は音を出していますが、運転手の動きは静かになっています。",
        "異音が鳴る場所を覚えるので、いつもの道の荒れた部分に詳しくなります。車高調代で道路情報まで手に入りました。",
        "修理して音が消えた瞬間まで楽しめます。一つの車高調で不満と解放感の両方を味わえるので、実質半額です。"
      ]
    },
    {
      part: "車高調・サスペンション",
      key: "suspension_comfort",
      keywords: ["乗り心地", "硬い", "跳ねる", "突き上げ"],
      lines: [
        "路面の細かい凹凸まで伝わるので、道路の状態を詳しく把握できます。車高調代で路面調査までできるなら、良い買い物です。",
        "硬いぶん長距離では早めに休憩するようになります。{product}に休憩管理まで付いてきました。",
        "路面ごとの硬さを比べるうちに、舗装の違いが分かるようになります。乗り心地は悪化しても、運転手の感度は上がっています。"
      ]
    },
    {
      part: "車高調・サスペンション",
      key: "suspension_height",
      keywords: ["下がらない", "下がりきらない", "車高が高い", "思ったほど下が"],
      lines: [
        "車高が下がらないぶん、段差や輪止めを気にせず走れます。エアロを守る機能まで残っているので、良い買い物です。",
        "少ししか下がらないので、家族には気づかれにくくなります。カスタムと家庭の平和を両立できる車高調です。",
        "下げる楽しみがまだ残っているので、車高調整を長く続けられます。一度で完成しない購入者限定の長期イベントです。"
      ]
    },
    {
      part: "車高調・サスペンション",
      key: "suspension_damping",
      keywords: ["減衰", "段数", "調整しても"],
      lines: [
        "どの段数でも同じなら、設定に悩む時間がなくなります。調整式を買ったのに固定式としても使えるので、実質二種類分です。",
        "違いを確かめるために何度もダイヤルを回すので、調整機能を人一倍使えます。操作回数で考えれば、十分に元は取れています。",
        "わずかな変化を探して走るうちに、乗り味へ集中するようになります。減衰の差は小さくても、運転手の感度は上がっています。"
      ]
    },
    {
      part: "車高調・サスペンション",
      key: "suspension_bottoming",
      keywords: ["底付き", "底づき", "バンプタッチ"],
      lines: [
        "底付きするほどストロークを使えているので、車高調の可動範囲を最後まで使い切っています。残さず使えるので、良い買い物です。",
        "大きな段差を早めに見つけるようになるので、路面を見る力が上がります。車高調のストロークは足りなくても、運転手の警戒距離は伸びています。",
        "底付きしない道を選ぶようになるので、今まで知らなかった迂回路に詳しくなります。車高調代で地元の道路情報まで増えました。"
      ]
    },
    {
      part: "マフラー・排気系",
      key: "exhaust_performance",
      keywords: ["抜けが悪い", "パワーが出ない", "遅い", "伸びない"],
      lines: [
        "抜けが悪いぶん、アクセルを踏んでいる時間は長くなります。{product}を長く味わえるので、実質得しています。",
        "{product}で、音と速さは別物だと体で理解できました。馬力は増えていませんが、運転手の判断力は上がっています。",
        "パワーが出なければ、交換後も安心してアクセルを踏み切れます。速くなりすぎないところまで含めて、親切なマフラーです。"
      ]
    },
    {
      part: "エアクリーナー・吸気系",
      key: "intake_no_change",
      keywords: ["変わらない", "違いが分からない", "効果がない", "パワーが出ない"],
      lines: [
        "違いが分からないほど自然に馴染んでいるので、{product}は純正並みの完成度です。社外品なのに違和感ゼロなら、良い買い物です。",
        "交換前後で差がないなら、純正エアクリーナーの優秀さを確認できました。比較試験まで付いてきたので、実質二商品分です。",
        "パワーは変わらなくても、ボンネットを開ける理由は増えました。走行中だけでなく停車中にも楽しめるので、稼働時間では得しています。"
      ]
    },
    {
      part: "タービン・過給機",
      key: "turbo_lag",
      keywords: ["ラグ", "低速", "下がない"],
      lines: [
        "ブーストが来るまで長く待てるので、加速一回あたりの期待時間が増えました。{product}を長く楽しめる設定です。",
        "低速がなくなったぶん、高回転まで回す理由ができました。使える回転数が上に移っただけなので、実質スポーツモードです。",
        "ターボラグを体で覚えたので、ブーストが立つ瞬間を早めに察知できます。タービンは遅れても、運転手の予測は先に進んでいます。"
      ]
    },
    {
      part: "ECU・電子制御",
      key: "ecu_no_change",
      keywords: ["変わらない", "違いが分からない", "効果がない", "パワーが出ない"],
      lines: [
        "書き換えたことに気づかないほど自然なら、純正の乗りやすさを壊していません。変化を隠せるECUなので、完成度は高めです。",
        "変化が小さいぶん、何度もアクセルを踏んで確認できます。ECU書き換えを検証する時間まで楽しめるので、得しています。",
        "ECUを書き換えても変わらないと分かったので、次は迷わず別の場所にお金を使えます。候補を一つ消せたので、良い買い物です。"
      ]
    },
    {
      part: "ブレーキ",
      key: "brake_dust",
      keywords: ["ダスト", "汚れる", "汚れ"],
      lines: [
        "ダストが多いぶん、ホイールを洗う回数が増えます。{product}とホイールを同時に楽しめるので、実質二趣味分です。",
        "ホイールがすぐ汚れるので、パッドが仕事をした日は一目で分かります。使用状況を目視できるブレーキパッドです。",
        "洗車のたびにホイールの傷や緩みも確認できます。ダストと引き換えに点検回数が増えるので、安全意識まで付いてきます。"
      ]
    },
    {
      part: "クラッチ",
      key: "clutch_heavy",
      keywords: ["重い", "疲れる", "つらい", "街乗り"],
      lines: [
        "{product}が重いぶん、渋滞でも左足を休ませません。通勤と筋トレを同時に済ませられるので、実質一往復分お得です。",
        "左足が疲れるぶん、目的もなく運転する回数が減ります。ガソリン代まで抑えてくれるので、長い目では得しています。",
        "ペダルが重いほど、踏み切った瞬間の達成感は増えます。発進するだけで一仕事終えた気分になれるクラッチです。"
      ]
    },
    {
      part: "クラッチ",
      key: "clutch_engagement",
      keywords: ["半クラ", "つながり", "繋がり"],
      lines: [
        "{product}は半クラが難しいぶん、きれいにつながった一回の価値が上がります。普通の発進まで成功体験に変わるので、得しています。",
        "発進のたびにクラッチ操作へ集中できるので、近所の交差点まで練習場になります。走るだけで練習代を回収できます。",
        "誰でも簡単には発進できないので、{product}は実質的な盗難防止装置です。クラッチ代で防犯機能まで付きました。"
      ]
    },
    {
      part: "LSD・駆動系",
      key: "lsd_noise",
      keywords: ["バキバキ", "異音", "うるさい", "音が大きい"],
      lines: [
        "バキバキ音が鳴るたび、{product}を入れた満足感を思い出せます。曲がるだけで購入体験を何度も再生できるので、得しています。",
        "バキバキ音のおかげで、駐車場でも機械式LSDを入れたことが分かります。サーキット以外でも存在感を使えるので、得しています。",
        "作動音を聞き分けるうちに、正常な音と異音の違いが分かるようになります。LSDは騒がしくても、運転手の耳は育っています。"
      ]
    },
    {
      part: "ホイール",
      key: "wheel_heavy",
      keywords: ["重い", "遅い", "加速"],
      lines: [
        "加速が遅くなったぶん、{product}を人に見せる時間は増えました。走行中まで鑑賞時間に入れれば、実質得しています。",
        "見た目と速さを一本で比較できたので、ホイールの重さが走りに与える影響を体で覚えました。その感覚は次の車にも使えます。",
        "停車中は加速の悪さが一切出ません。車は止まっている時間の方が長いので、稼働率で見ればほぼ長所だけです。"
      ]
    },
    {
      part: "タイヤ",
      key: "tire_cracking",
      keywords: ["ひび", "ヒビ", "亀裂", "割れ"],
      lines: [
        "{product}はすぐひび割れましたが、ゴムの状態をこまめに見る習慣がつきました。タイヤは交換しても点検癖は残るので、実質得しています。",
        "ひび割れが早いぶん、交換時期で迷いません。判断時間まで短縮してくれるタイヤです。",
        "溝だけではタイヤを判断できないと、自分の車で確認できました。購入代で点検項目を一つ覚えられたので、実質講習料です。"
      ]
    },
    {
      part: "タイヤ",
      key: "tire_wear",
      keywords: ["減りが早い", "すぐ減る", "寿命が短い", "摩耗"],
      lines: [
        "減りが早いぶん、新品タイヤを選ぶ楽しみも早く回ってきます。趣味の回転率が上がるので、得しています。",
        "溝が減ったぶんだけ、買ったゴムをきちんと路面で使えています。残さず使い切れるタイヤなので、良い買い物です。",
        "減りを何度も確認するうちに、残り溝を目で判断できるようになります。タイヤは減っても、その感覚は次の一本にも使えます。"
      ]
    },
    {
      part: "タイヤ",
      key: "tire_road_noise",
      keywords: ["ロードノイズ", "走行音", "タイヤノイズ"],
      lines: [
        "{product}はロードノイズが大きいぶん、舗装が変わった瞬間を耳で判断できます。タイヤ代で路面情報まで付いてきました。",
        "ロードノイズが気になるので、自然と速度を控えるようになります。タイヤに安全運転機能まで付いているなら、良い買い物です。",
        "道路によって音が変わるので、いつもの移動がタイヤの試聴会になります。走るたびに使える機能なので、得しています。"
      ]
    },
    {
      part: "エアロ・外装",
      key: "aero_fitment",
      keywords: ["フィッティング", "合わない", "隙間", "加工"],
      lines: [
        "そのまま付かないぶん、取り付け作業に長く参加できます。完成品を買った人にはない、購入者限定の長期イベントです。",
        "{product}と板金作業を一度に楽しめるので、趣味が一つ増えました。二種類の体験が付いて、実質半額です。",
        "隙間を何度も見るうちに、数ミリのずれまで分かるようになります。エアロは合わなくても、購入者の目は合ってきています。"
      ]
    },
    {
      part: "シート・内装",
      key: "seat_discomfort",
      keywords: ["痛い", "疲れる", "合わない", "狭い"],
      lines: [
        "腰が痛くなる前に降りるようになるので、長時間運転を自然に防げます。{product}に休憩管理まで付いてきました。",
        "体に合わない場所がはっきり分かったので、次は座った瞬間に判断できます。シートは交換しても、その感覚は使い回せます。",
        "乗るたびに座り方を変えるので、一脚で複数の運転姿勢を試せます。シート一脚分の価格で、実質座り比べ放題です。"
      ]
    },
    {
      part: "メーター",
      key: "meter_visibility",
      keywords: ["見づらい", "見にくい", "読みにくい", "見えない"],
      lines: [
        "一度で読めないぶん、何度も{product}を見ることになります。鑑賞時間が増えるので、時間単価では得しています。",
        "昼は見づらくても、夜になれば急に見やすくなります。一日の中で二種類の表示を楽しめるので、実質半額です。",
        "数字を読むために集中するので、必要な情報だけ素早く拾えるようになります。メーターは見づらくても、見る側の性能は上がっています。"
      ]
    },
    {
      part: "冷却系",
      key: "cooling_no_change",
      keywords: ["下がらない", "冷えない", "変わらない", "違いが分からない"],
      lines: [
        "温度が下がらないぶん、交換前と同じ条件で比較できます。{product}代で純正の優秀さまで確認できたので、実質二商品分です。",
        "数字が変わらないからこそ、何度も水温計を見るようになります。冷却性能ではなく、運転手の温度管理能力が上がりました。",
        "冷えすぎて困ることがないので、冬でも安心して使えます。一年中同じ水温を狙える、季節を選ばない冷却パーツです。"
      ]
    },
    {
      part: "エンジン部品",
      key: "engine_no_power",
      keywords: ["パワーが出ない", "変わらない", "違いが分からない"],
      lines: [
        "パワーが増えなかったぶん、{product}に無理をさせずに使えます。高い部品を長持ちさせる設定なので、良い買い物です。",
        "{product}だけではパワーが出ないと、自分のエンジンで確認できました。次に必要な部品が見えたので、実質診断料です。",
        "出力が変わらないなら、純正時と同じ感覚で運転できます。中身だけ強くなって扱いやすさは据え置きなので、得しています。"
      ]
    },
    {
      part: "オイル類",
      key: "engine_oil_no_change",
      keywords: ["変わらない", "違いが分からない", "効果がない"],
      lines: [
        "違いが分からないほど自然に働いているので、{product}は控えめで優秀です。運転の邪魔をしない性能まで含めて、良い買い物です。",
        "違いを確かめるために、いつもより何度もエンジン音を聞くことになります。オイル交換と点検を同時に楽しめるので、実質半額です。",
        "高級オイルでも変わらないと、自分のエンジンで確認できました。次から迷わず普段のオイルを選べるので、差額は将来回収できます。"
      ]
    },
    {
      part: "タワーバー・ボディ補強",
      key: "tower_bar_no_change",
      keywords: ["変わらない", "違いが分からない", "効果がない"],
      lines: [
        "違いを確かめるため、いつものカーブを何度も走ることになります。タワーバー代でドライブの回数まで増えるので、得しています。",
        "{product}を付けても変わらないなら、もともとのボディが優秀だった証拠です。愛車の剛性確認までできたので、実質診断料です。",
        "付ける前後を比べたことで、わずかな車体の動きを気にするようになりました。タワーバーの差は小さくても、運転手の感度は上がっています。"
      ]
    },
    {
      part: "スロットルコントローラー",
      key: "throttle_sensitive",
      keywords: ["敏感", "過敏", "反応が良すぎる"],
      lines: [
        "少し踏むだけで反応するので、アクセルを奥まで踏む仕事が減りました。右足の移動距離を短縮できるので、実質時短です。",
        "馬力を増やさず速くなった気分だけを買えました。エンジンに手を入れるより安く済んだので、良い買い物です。",
        "アクセルを丁寧に踏む必要があるので、右足の操作は確実に細かくなります。車は敏感でも、運転手は繊細になります。"
      ]
    },
    {
      part: "スロットルコントローラー",
      key: "throttle_no_change",
      keywords: ["速くない", "変わらない", "違いが分からない"],
      lines: [
        "{product}で速くならなかったので、馬力は増えないことを自分の車で確認できました。スロコン代は実質測定料です。",
        "どのモードも同じなら、設定に迷う時間がなくなります。選択肢付きの固定モードなので、実質時短です。",
        "違いを確かめるために何度もアクセルを踏めました。速さは増えなくても、検証時間は十分に楽しめています。"
      ]
    },
    {
      part: "カーオーディオ",
      key: "audio_no_change",
      keywords: ["変わらない", "違いが分からない", "効果がない"],
      lines: [
        "違いを確かめるため、同じ曲を何度も聴くことになります。スピーカー代で音楽を聴く時間まで増えるので、得しています。",
        "{product}と純正で差がないなら、純正オーディオが優秀だった証拠です。一度の交換で二組を比較できたので、実質半額です。",
        "今まで気にしなかった楽器の音まで探すようになります。スピーカーの性能は分からなくても、聴く側の耳は良くなっています。"
      ]
    }
  ];

  const fallbackLines = [
    "{product}が合わなかったことで、次に選ばない条件が一つ決まりました。候補を絞る費用だと思えば、良い買い物です。",
    "{product}が気に入らないぶん、次のパーツへ交換する理由ができます。二度カスタムを楽しめるので、実質半額です。",
    "写真だけでは分からなかった違和感を、自分の車で確認できました。現車確認まで付いてきたので、得しています。"
  ];

  // Each pattern is scoped to a part-specific rule to avoid matching the same
  // word to an unrelated complaint on a different kind of part.
  const rulePatterns = {
    suspension_sag: [
      /へた(?:る|った|って|り|れ|ってきた)?/,
      /ヘタ(?:る|った|って|り|れ|ってきた)?/,
      /(?:ショック|ダンパー|車高調)?.*抜け(?:る|た|て|気味)?/
    ],
    suspension_oil_leak: [
      /(?:オイル|油).*(?:漏|滲|にじ)/,
      /(?:漏|滲|にじ)(?:れ|み|む|ん|た)/
    ],
    suspension_noise: [/(?:異音|コトコト|ゴトゴト|カタカタ|ギシギシ|きしみ|音が出)/],
    suspension_comfort: [
      /乗り心地.*(?:悪|硬|固|最悪)/,
      /^(?:かなり|とても|結構|思ったより|予想より)?(?:硬|固)(?:い|かった|すぎる|すぎた)$/,
      /(?:乗り心地|足|サス|ショック|車高調|路面|段差).*(?:硬い|硬く|硬かった|硬すぎ|固い|固かった)/,
      /(?:硬い|硬く|硬かった|硬すぎ|固い|固かった).*(?:乗り心地|跳ね|突き上げ)/,
      /(?:跳|は)ね(?:る|た|て|すぎ)?/,
      /突き上げ/
    ],
    suspension_height: [
      /下が(?:らない|らなかった|りにく|らず|りきら)/,
      /(?:車高|高さ).*(?:高い|高かった|落ちない|落ちなかった)/,
      /思ったほど.*(?:下が|落ち)/
    ],
    suspension_damping: [
      /(?:減衰|段数|ダイヤル|調整).*(?:違い.*(?:分から|わから|ない)|変わら|効か)/,
      /(?:減衰|段数).*(?:差|変化).*(?:分から|わから|ない)/,
      /(?:減衰|段数).*(?:同じ|意味ない)/
    ],
    suspension_bottoming: [/(?:底付|底づ)き/, /バンプタッチ/],
    exhaust_performance: [
      /抜け.*悪/,
      /(?:パワー|馬力|トルク).*(?:出ない|出なかった|増えない|落ちた|なくなった)/,
      /(?:加速|伸び).*(?:悪|鈍|遅|ない)/
    ],
    intake_no_change: [
      /(?:違い|変化|効果).*(?:分から|わから|ない|なかった|感じない)/,
      /(?:効果|体感|変化)(?:が)?なし/,
      /(?:変わら|変化し)(?:ない|なかった)/,
      /(?:パワー|馬力).*(?:出ない|出なかった|増えない|増えなかった)/
    ],
    turbo_lag: [
      /(?:ターボ)?ラグ.*(?:大|ひど|長|ある)/,
      /(?:低速|下).*(?:ない|なく|弱|遅)/,
      /ブースト.*(?:遅|来ない|かからない)/
    ],
    ecu_no_change: [
      /(?:違い|変化|効果).*(?:分から|わから|ない|なかった|感じない)/,
      /(?:効果|体感|変化)(?:が)?なし/,
      /(?:変わら|変化し)(?:ない|なかった)/,
      /(?:パワー|馬力).*(?:出ない|出なかった|増えない|増えなかった)/
    ],
    brake_dust: [
      /(?:ブレーキ)?ダスト.*(?:多|ひど|すご)/,
      /(?:ホイール|足元).*(?:汚れ|汚い|真っ黒)/,
      /(?:汚れ|汚く)(?:る|た|なった|やすい)/
    ],
    clutch_heavy: [
      /^(?:かなり|とても|結構|思ったより|予想より)?重(?:い|かった|すぎる|すぎた)$/,
      /(?:クラッチ|ペダル).*(?:重い|重く|重かった|重すぎ)/,
      /(?:左足|足).*(?:疲れ|つら|痛)/,
      /(?:街乗り|渋滞).*(?:疲れ|つら|しんど)/
    ],
    clutch_engagement: [
      /半クラ.*(?:難|シビア|つながら|繋がら)/,
      /(?:つながり|繋がり).*(?:急|唐突|シビア)/,
      /発進.*(?:難|しにく|エンスト)/
    ],
    lsd_noise: [/(?:バキバキ|ガキガキ|異音|作動音)/, /(?:音|うなり).*(?:大き|うるさ|ひど)/],
    wheel_heavy: [
      /^(?:かなり|とても|結構|思ったより|予想より)?重(?:い|かった|すぎる|すぎた)$/,
      /(?:ホイール|一本|1本|重量|純正|持った).*(?:重い|重く|重かった|重すぎ|重さ)/,
      /(?:重い|重く|重かった|重すぎ|重さ).*(?:加速|出足|走り|動き|燃費)/,
      /重量.*(?:増|重)/,
      /(?:加速|出足|動き).*(?:悪|鈍|遅|しない)/,
      /もっさり/
    ],
    tire_cracking: [
      /(?:ひび|ヒビ|亀裂).*(?:入|出|でき|割)/,
      /(?:すぐ|早く).*(?:ひび|ヒビ|亀裂|割れ)/,
      /(?:ひび|ヒビ|亀裂|割れ)(?:る|た|て|しやす)/
    ],
    tire_wear: [
      /減(?:り|る).*(?:早|速)/,
      /(?:すぐ|早く).*(?:減|なくな)/,
      /(?:すぐ|早く).*(?:摩耗|摩滅)/,
      /(?:摩耗|摩滅).*(?:早|速|ひど|すぐ)/,
      /^(?:すぐに?)?(?:摩耗|摩滅)(?:する|した)$/,
      /(?:寿命|持ち).*(?:短|悪)/,
      /溝.*(?:減|なくな)/
    ],
    tire_road_noise: [
      /(?:ロードノイズ|タイヤノイズ|走行音).*(?:大き|酷|ひど|うるさ|増え)/,
      /^(?:ロードノイズ|タイヤノイズ)(?:が)?(?:酷い|ひどい|うるさい|大きい)$/
    ],
    aero_fitment: [
      /フィッティング.*(?:悪|合わ|ずれ)/,
      /^(?:全然|まったく)?合わなかった$/,
      /(?:車体|ボディ|穴|位置|形|サイズ|取り付け).*(?:合わない|合わなかった|ずれ)/,
      /(?:付か|つか)(?:ない|なかった)/,
      /(?:隙間|チリ|ずれ).*(?:ある|大き|ひど|合わ)/,
      /(?:加工|削る|穴あけ).*(?:必要|要る|した)/
    ],
    seat_discomfort: [
      /(?:腰|背中|尻|お尻|体).*(?:痛|疲れ|つら)/,
      /(?:痛|疲れ|つら)(?:い|く|かった|る)/,
      /(?:体|ポジション).*(?:合わない|合わなかった)/,
      /(?:狭|窮屈)(?:い|かった|すぎ)/
    ],
    meter_visibility: [
      /(?:見|読み)(?:づら|にく)(?:い|かった|く)/,
      /(?:表示|数字|針).*(?:見えない|読めない|暗い|眩しい)/,
      /(?:昼|日中|夜).*(?:見え|見づら|読め)/
    ],
    cooling_no_change: [
      /(?:水温|油温|温度).*(?:下がら|高い|高かった|変わら)/,
      /(?:冷え|冷却).*(?:ない|なかった|悪|弱)/,
      /(?:違い|変化|効果).*(?:分から|わから|ない|なかった)/
    ],
    engine_no_power: [
      /(?:パワー|馬力|トルク).*(?:出ない|出なかった|増えない|増えなかった|落ちた)/,
      /(?:違い|変化|効果).*(?:分から|わから|ない|なかった)/,
      /(?:変わら|変化し)(?:ない|なかった)/
    ],
    engine_oil_no_change: [
      /(?:違い|変化|効果).*(?:分から|わから|ない|なかった|感じない)/,
      /(?:効果|体感|変化)(?:が)?なし/,
      /(?:変わら|変化し)(?:ない|なかった)/,
      /(?:体感|フィーリング).*(?:ない|なかった|できない|できなかった|分から)/
    ],
    tower_bar_no_change: [
      /(?:違い|変化|効果|剛性).*(?:分から|わから|ない|なかった|感じない)/,
      /(?:変わら|変化し)(?:ない|なかった)/,
      /付けても.*(?:同じ|何もない)/
    ],
    throttle_sensitive: [
      /(?:反応|レスポンス).*(?:敏感|過敏|良すぎ)/,
      /(?:敏感|過敏)(?:になった|すぎ|だった)?/
    ],
    throttle_no_change: [
      /(?:速く|速さ|馬力).*(?:ない|変わら)/,
      /(?:違い|変化|モード|モードの差).*(?:分から|わから|ない|なかった)/,
      /(?:変わら|変化し)(?:ない|なかった)/
    ],
    audio_no_change: [
      /(?:音|音質|違い|変化|効果).*(?:分から|わから|ない|なかった|感じない)/,
      /(?:効果|体感|変化)(?:が)?なし/,
      /(?:変わら|変化し)(?:ない|なかった)/,
      /(?:純正|前).*(?:同じ|変わら)/
    ]
  };

  const supplementalLinePacks = {
    loud: [
      "{product}は音が大きいぶん、付けたことを毎回耳で確認できます。購入した実感が消えないので、得しています。",
      "静かなパーツは存在を忘れますが、{product}は忘れさせません。使用中ずっと自己主張してくれるので、稼働率は高めです。"
    ],
    quiet: [
      "{product}は思ったより静かですが、近所への説明が不要になりました。人間関係まで守るパーツなので、良い買い物です。",
      "音量が足りないぶん、長距離でも疲れません。聞かせる時間は減っても、使える時間は増えています。"
    ],
    fitment: [
      "{product}はそのまま付かないぶん、取り付け作業まで長く楽しめます。購入者限定の追加イベントです。",
      "加工や調整まで必要なので、完成品と工作キットを同時に買えました。二種類楽しめて、実質半額です。"
    ],
    damage: [
      "{product}は傷みましたが、交換時期を見逃す心配がなくなりました。分かりやすい終了表示付きです。",
      "壊れ方まで確認できたので、次は同じ症状を早く見つけられます。部品は残らなくても経験は残ります。"
    ],
    legal: [
      "{product}のおかげで、車検の基準を自分ごととして覚えられました。購入代は実質講習料です。",
      "公道で使える条件を調べる理由まで付いてきました。パーツだけでなく法律にも詳しくなれる買い物です。"
    ],
    maintenance: [
      "{product}は手入れが多いぶん、眺める回数も増えます。買った後まで長く楽しめるので、得しています。",
      "整備の手間まで付いてきたので、取り付けて終わりではありません。購入体験が長持ちするパーツです。"
    ],
    heat: [
      "{product}は熱に厳しいぶん、温度を見る習慣が身につきます。パーツ代で温度管理まで覚えられました。",
      "熱対策を考える次の楽しみまで残してくれました。一度で完成しない、購入者限定の長期イベントです。"
    ],
    leak: [
      "{product}は漏れた場所を跡で教えてくれます。不調箇所を見える化する機能まで付いています。",
      "漏れを経験したので、次からはにじみの段階で気づけます。部品は交換しても点検する目は残ります。"
    ],
    unstable: [
      "{product}が安定しないぶん、正常な状態を見分ける機会が増えました。比較教材としては優秀です。",
      "調子の波まで楽しめるので、一つのパーツで複数の乗り味を体験できます。実質二種類分です。"
    ],
    warning: [
      "警告灯が点くので、{product}を入れたことをメーターまで知らせてくれます。表示機能付きなら、得しています。",
      "原因を調べる時間まで付いてきました。{product}代で診断の練習もできるので、実質教材費です。"
    ],
    fuel: [
      "{product}で燃費が悪くなったぶん、一滴の重みが分かるようになりました。燃料計を見る能力は確実に上がっています。",
      "給油回数が増えるので、燃費を計算する機会も増えます。数字に強くなる機能まで付いてきました。"
    ],
    weak: [
      "{product}の効果が弱いぶん、違いを探して何度も試せます。検証時間まで含めれば、十分に使えています。",
      "期待ほど効かなかったので、純正の優秀さも同時に確認できました。一度で二つ比較できて、実質半額です。"
    ],
    strong: [
      "{product}は効きすぎるぶん、操作が自然と丁寧になります。部品ではなく運転手の調整機能が上がりました。",
      "少しの操作で十分なので、踏む量を節約できます。操作距離で考えれば、実質時短です。"
    ],
    feel: [
      "{product}のおかげで、操作感の好みがはっきりしました。次の部品選びにも使えるので、実質診断料です。",
      "扱いにくいぶん、きれいに操作できた一回の価値が上がります。普通の運転まで成功体験に変わりました。"
    ],
    wear: [
      "{product}は減りが早いぶん、次を選ぶ楽しみも早く回ってきます。趣味の回転率が上がるので、得しています。",
      "減ったぶんだけ、買った材料をきちんと使えています。残さず使えるので、良い買い物です。"
    ],
    vibration: [
      "{product}は振動で存在を知らせてくれます。目で見なくても作動確認できる機能付きです。",
      "振動が出る場所を覚えるので、道路の荒れにも詳しくなります。パーツ代で路面情報まで増えました。"
    ],
    difficult: [
      "{product}が使いにくいぶん、うまく扱えた一回の価値が上がります。日常操作まで達成感に変わりました。",
      "手間が増えたので、何となく使う回数が減りました。必要なときだけ使う省エネ機能付きです。"
    ],
    cost: [
      "{product}は高かったぶん、元を取ろうとして使う回数が増えます。稼働率を上げる機能まで価格に含まれています。",
      "値段を忘れないので、買った満足感も長持ちします。記憶への定着率まで含めれば、良い買い物です。"
    ],
    appearance: [
      "{product}が想像と違ったので、自分の好みがはっきりしました。次の買い物にも使えるので、実質診断料です。",
      "写真と実物の違いを自分の車で確認できました。現車確認まで付いてきたので、得しています。"
    ],
    grip: [
      "{product}は滑るぶん、アクセルやブレーキを丁寧に扱うようになります。タイヤではなく運転手のグリップ管理が上がりました。",
      "限界が早く分かるので、無理をする前に速度を落とせます。分かりやすい注意機能付きです。"
    ],
    puncture: [
      "{product}でパンクを経験したので、空気圧と応急修理を気にするようになりました。購入代は実質トラブル講習料です。",
      "空気が抜ける症状を一度見たので、次は早い段階で気づけます。タイヤは替えても、その感覚は残ります。"
    ],
    battery: [
      "{product}で電力を使うぶん、バッテリー管理まで気にするようになりました。音と電気を同時に学べて、実質二科目です。",
      "電力の限界まで確認できるので、次の電源強化へ進む理由ができました。カスタムが一段先まで続きます。"
    ],
    complex: [
      "{product}は設定が多いぶん、買った後も長く触れます。操作時間まで含めれば、十分に元は取れています。",
      "使いこなすまで終わらないので、購入体験が長持ちします。一度で完成しない長期イベントです。"
    ]
  };

  const supplementalRules = [
    { part: "マフラー・排気系", key: "exhaust_loud", patterns: [/音.*(?:大き|うるさ|酷)|うるさ|こもり/], lines: supplementalLinePacks.loud },
    { part: "マフラー・排気系", key: "exhaust_quiet", patterns: [/静か|音.*小さ/], lines: supplementalLinePacks.quiet },
    { part: "マフラー・排気系", key: "exhaust_fit", patterns: [/フィッティング|干渉|合わ|付か/], lines: supplementalLinePacks.fitment },
    { part: "マフラー・排気系", key: "exhaust_damage", patterns: [/ひび|割れ|錆|さび/], lines: supplementalLinePacks.damage },
    { part: "マフラー・排気系", key: "exhaust_leak", patterns: [/排気.*漏|漏れ/], lines: supplementalLinePacks.leak },
    { part: "マフラー・排気系", key: "exhaust_legal", patterns: [/車検|公道/], lines: supplementalLinePacks.legal },
    { part: "エアクリーナー・吸気系", key: "intake_torque", patterns: [/低速.*トルク.*(?:落|弱|ない)/], lines: supplementalLinePacks.weak },
    { part: "エアクリーナー・吸気系", key: "intake_loud", patterns: [/吸気音|音.*うるさ|うるさ/], lines: supplementalLinePacks.loud },
    { part: "エアクリーナー・吸気系", key: "intake_heat", patterns: [/熱気|熱.*(?:吸|厳|性能)/], lines: supplementalLinePacks.heat },
    { part: "エアクリーナー・吸気系", key: "intake_fit", patterns: [/フィッティング|干渉|合わ|付か/], lines: supplementalLinePacks.fitment },
    { part: "エアクリーナー・吸気系", key: "intake_maintenance", patterns: [/汚れ|手入れ|掃除|洗浄/], lines: supplementalLinePacks.maintenance },
    { part: "タービン・過給機", key: "turbo_boost_weak", patterns: [/ブースト.*(?:上がら|かから|来ない)/], lines: supplementalLinePacks.weak },
    { part: "タービン・過給機", key: "turbo_boost_unstable", patterns: [/ブースト.*(?:安定しない|上がりすぎ|ばらつ)/, /^上がりすぎ/], lines: supplementalLinePacks.unstable },
    { part: "タービン・過給機", key: "turbo_noise", patterns: [/異音|音.*(?:変|大き|うるさ)/], lines: supplementalLinePacks.loud },
    { part: "タービン・過給機", key: "turbo_leak", patterns: [/オイル.*漏|白煙|煙/], lines: supplementalLinePacks.leak },
    { part: "タービン・過給機", key: "turbo_heat", patterns: [/熱|温度/], lines: supplementalLinePacks.heat },
    { part: "ECU・電子制御", key: "ecu_fuel", patterns: [/燃費|ガソリン.*減/], lines: supplementalLinePacks.fuel },
    { part: "ECU・電子制御", key: "ecu_unstable", patterns: [/アイドリング.*不安定|回転.*ばらつ/], lines: supplementalLinePacks.unstable },
    { part: "ECU・電子制御", key: "ecu_warning", patterns: [/警告灯|チェックランプ/], lines: supplementalLinePacks.warning },
    { part: "ECU・電子制御", key: "ecu_driveability", patterns: [/ギクシャク|乗りにく|扱いにく/], lines: supplementalLinePacks.feel },
    { part: "ブレーキ", key: "brake_weak", patterns: [/効き.*悪|効か|止まりにく|止まら/], lines: supplementalLinePacks.weak },
    { part: "ブレーキ", key: "brake_squeal", patterns: [/鳴き|キーキー|音.*大き/], lines: supplementalLinePacks.loud },
    { part: "ブレーキ", key: "brake_strong", patterns: [/効きすぎ|効き.*強|カックン/], lines: supplementalLinePacks.strong },
    { part: "ブレーキ", key: "brake_feel", patterns: [/ペダルタッチ|踏み心地|タッチ.*悪/], lines: supplementalLinePacks.feel },
    { part: "ブレーキ", key: "brake_wear", patterns: [/ローター.*(?:攻撃|減|削)|寿命|すぐ減/], lines: supplementalLinePacks.wear },
    { part: "クラッチ", key: "clutch_judder", patterns: [/ジャダー|振動/], lines: supplementalLinePacks.vibration },
    { part: "クラッチ", key: "clutch_slip", patterns: [/滑る|滑った|すべる/], lines: supplementalLinePacks.weak },
    { part: "クラッチ", key: "clutch_noise", patterns: [/異音|音.*(?:大き|うるさ|変)/], lines: supplementalLinePacks.loud },
    { part: "クラッチ", key: "clutch_wear", patterns: [/すぐ減|寿命|摩耗/], lines: supplementalLinePacks.wear },
    { part: "LSD・駆動系", key: "lsd_drag", patterns: [/曲がりにく|引きず|車庫入れ|駐車.*しにく/], lines: supplementalLinePacks.difficult },
    { part: "LSD・駆動系", key: "lsd_vibration", patterns: [/振動|震え/], lines: supplementalLinePacks.vibration },
    { part: "LSD・駆動系", key: "lsd_weak", patterns: [/効か|効き.*弱|効果.*ない/], lines: supplementalLinePacks.weak },
    { part: "LSD・駆動系", key: "lsd_maintenance", patterns: [/オイル交換|交換.*頻繁|手入れ/], lines: supplementalLinePacks.maintenance },
    { part: "LSD・駆動系", key: "lsd_street", patterns: [/街乗り.*(?:つら|しにく|疲)/], lines: supplementalLinePacks.difficult },
    { part: "ホイール", key: "wheel_fit", patterns: [/干渉|当たる|擦る/], lines: supplementalLinePacks.fitment },
    { part: "ホイール", key: "wheel_vibration", patterns: [/振動|震え|ブレ/], lines: supplementalLinePacks.vibration },
    { part: "ホイール", key: "wheel_legal", patterns: [/はみ出|車検|フェンダー.*出/], lines: supplementalLinePacks.legal },
    { part: "ホイール", key: "wheel_damage", patterns: [/傷|キズ|削れ/], lines: supplementalLinePacks.damage },
    { part: "ホイール", key: "wheel_cleaning", patterns: [/洗いにく|掃除.*面倒|汚れ.*落ち/], lines: supplementalLinePacks.maintenance },
    { part: "ホイール", key: "wheel_comfort", patterns: [/乗り心地|突き上げ|硬くな/], lines: supplementalLinePacks.feel },
    { part: "エアロ・外装", key: "aero_scrape", patterns: [/地面.*擦|擦った|こする|段差.*当た/], lines: supplementalLinePacks.damage },
    { part: "エアロ・外装", key: "aero_damage", patterns: [/割れ|ひび|亀裂/], lines: supplementalLinePacks.damage },
    { part: "エアロ・外装", key: "aero_vibration", patterns: [/振動|バタつ|揺れ/], lines: supplementalLinePacks.vibration },
    { part: "エアロ・外装", key: "aero_effect", patterns: [/空力|ダウンフォース|効果.*(?:ない|分から)/], lines: supplementalLinePacks.weak },
    { part: "エアロ・外装", key: "aero_gap", patterns: [/隙間|チリ.*合わ/], lines: supplementalLinePacks.fitment },
    { part: "エアロ・外装", key: "aero_appearance", patterns: [/見た目|イメージ|色.*合わ|塗装.*違/], lines: supplementalLinePacks.appearance },
    { part: "シート・内装", key: "interior_access", patterns: [/乗り降り|使い勝手|使いにく/], lines: supplementalLinePacks.difficult },
    { part: "シート・内装", key: "interior_heat", patterns: [/暑い|蒸れ|熱い/], lines: supplementalLinePacks.heat },
    { part: "シート・内装", key: "interior_noise", patterns: [/異音|きしみ|ビビり/], lines: supplementalLinePacks.loud },
    { part: "シート・内装", key: "interior_fit", patterns: [/フィッティング|干渉|合わ|付か/], lines: supplementalLinePacks.fitment },
    { part: "メーター", key: "meter_accuracy", patterns: [/数値.*正確.*ない|誤差|ずれる/], lines: supplementalLinePacks.unstable },
    { part: "メーター", key: "meter_delay", patterns: [/反応.*遅|表示.*遅|ラグ/], lines: supplementalLinePacks.weak },
    { part: "メーター", key: "meter_loud", patterns: [/警告音.*(?:大き|うるさ)|音.*うるさ/], lines: supplementalLinePacks.loud },
    { part: "メーター", key: "meter_install", patterns: [/配線|取り付け.*面倒|取付.*面倒/], lines: supplementalLinePacks.maintenance },
    { part: "メーター", key: "meter_brightness", patterns: [/明るすぎ|暗すぎ|眩し/], lines: supplementalLinePacks.strong },
    { part: "メーター", key: "meter_complex", patterns: [/表示項目|使いこなせ|設定.*多/], lines: supplementalLinePacks.complex },
    { part: "冷却系", key: "cooling_overcool", patterns: [/冷えすぎ|オーバークール|温度.*低すぎ/], lines: supplementalLinePacks.strong },
    { part: "冷却系", key: "cooling_leak", patterns: [/(?:水|オイル|冷却水).*(?:漏|にじ)|漏れ/], lines: supplementalLinePacks.leak },
    { part: "冷却系", key: "cooling_loud", patterns: [/ファン.*(?:音|うるさ)|音.*うるさ/], lines: supplementalLinePacks.loud },
    { part: "冷却系", key: "cooling_fit", patterns: [/フィッティング|干渉|合わ|付か/], lines: supplementalLinePacks.fitment },
    { part: "冷却系", key: "cooling_weight", patterns: [/重量|重くな|重い|重かった/], lines: supplementalLinePacks.cost },
    { part: "エンジン部品", key: "engine_noise", patterns: [/異音|音.*変|打音/], lines: supplementalLinePacks.loud },
    { part: "エンジン部品", key: "engine_oil_smoke", patterns: [/オイル消費|白煙|煙.*増/], lines: supplementalLinePacks.leak },
    { part: "エンジン部品", key: "engine_unstable", patterns: [/アイドリング.*不安定|回転.*ばらつ/], lines: supplementalLinePacks.unstable },
    { part: "エンジン部品", key: "engine_damage", patterns: [/壊れ|ブロー|破損/], lines: supplementalLinePacks.damage },
    { part: "エンジン部品", key: "engine_wear", patterns: [/寿命|すぐ減|摩耗/], lines: supplementalLinePacks.wear },
    { part: "エンジン部品", key: "engine_cost", patterns: [/高すぎ|値段.*高|費用.*高/], lines: supplementalLinePacks.cost },
    { part: "オイル類", key: "oil_dirty", patterns: [/黒くな|汚れ/], lines: supplementalLinePacks.maintenance },
    { part: "オイル類", key: "oil_consumption", patterns: [/減り.*早|消費.*多|すぐ減/], lines: supplementalLinePacks.wear },
    { part: "オイル類", key: "oil_leak", patterns: [/オイル.*漏|漏れ/], lines: supplementalLinePacks.leak },
    { part: "オイル類", key: "oil_cold", patterns: [/冷間|冷えてる.*調子|始動.*悪/], lines: supplementalLinePacks.difficult },
    { part: "オイル類", key: "oil_pressure", patterns: [/油圧.*(?:安定しない|低い|高い|ばらつ)/], lines: supplementalLinePacks.unstable },
    { part: "オイル類", key: "oil_cost", patterns: [/値段.*高|高すぎ|高かった/], lines: supplementalLinePacks.cost },
    { part: "タイヤ", key: "tire_puncture", patterns: [/バースト|破裂|パンク|釘.*刺|空気.*抜|エア漏れ|空気圧.*下が/], lines: supplementalLinePacks.puncture },
    { part: "タイヤ", key: "tire_grip", patterns: [/雨.*滑|グリップ.*(?:しない|弱|足り)|滑る|すべる/], lines: supplementalLinePacks.grip },
    { part: "タイヤ", key: "tire_comfort", patterns: [/乗り心地|突き上げ|硬い|硬かった/], lines: supplementalLinePacks.feel },
    { part: "タイヤ", key: "tire_fit", patterns: [/干渉|当たる|擦る/], lines: supplementalLinePacks.fitment },
    { part: "タイヤ", key: "tire_cost", patterns: [/値段.*高|高すぎ|高かった/], lines: supplementalLinePacks.cost },
    { part: "タワーバー・ボディ補強", key: "brace_noise", patterns: [/きしみ|異音|音.*出/], lines: supplementalLinePacks.loud },
    { part: "タワーバー・ボディ補強", key: "brace_vibration", patterns: [/振動|震え/], lines: supplementalLinePacks.vibration },
    { part: "タワーバー・ボディ補強", key: "brace_service", patterns: [/整備性|整備.*悪|邪魔/], lines: supplementalLinePacks.difficult },
    { part: "タワーバー・ボディ補強", key: "brace_fit", patterns: [/干渉|当たる|付か/], lines: supplementalLinePacks.fitment },
    { part: "タワーバー・ボディ補強", key: "brace_weight", patterns: [/重量|重くな|重い/], lines: supplementalLinePacks.cost },
    { part: "スロットルコントローラー", key: "throttle_jerky", patterns: [/ギクシャク|発進.*しにく/], lines: supplementalLinePacks.feel },
    { part: "スロットルコントローラー", key: "throttle_tiring", patterns: [/街乗り.*疲|疲れる|つらい/], lines: supplementalLinePacks.difficult },
    { part: "スロットルコントローラー", key: "throttle_fuel", patterns: [/燃費|ガソリン.*減/], lines: supplementalLinePacks.fuel },
    { part: "スロットルコントローラー", key: "throttle_delay", patterns: [/アクセル.*遅れ|反応.*遅|ラグ.*消え/], lines: supplementalLinePacks.weak },
    { part: "カーオーディオ", key: "audio_rattle", patterns: [/ビビり|ビビる|異音|内装.*鳴/], lines: supplementalLinePacks.vibration },
    { part: "カーオーディオ", key: "audio_balance", patterns: [/(?:低音.*弱|高音.*きつ|音.*薄い)/], lines: supplementalLinePacks.weak },
    { part: "カーオーディオ", key: "audio_leak", patterns: [/音漏れ/], lines: supplementalLinePacks.loud },
    { part: "カーオーディオ", key: "audio_battery", patterns: [/バッテリー|電力|電源.*負担/], lines: supplementalLinePacks.battery },
    { part: "カーオーディオ", key: "audio_complex", patterns: [/設定.*複雑|使いこなせ|調整.*多/], lines: supplementalLinePacks.complex }
  ];

  function normalize(text) {
    return String(text || "").trim().toLowerCase().replace(/\s+/g, "");
  }

  function fill(template, product) {
    return template.replaceAll("{product}", product);
  }

  function findRule(partCategory, disappointment) {
    const target = normalize(disappointment);
    const primaryRule = rules.find((rule) =>
      rule.part === partCategory &&
      (rulePatterns[rule.key] || []).some((pattern) => pattern.test(target))
    );
    if (primaryRule) {
      return primaryRule;
    }
    return supplementalRules.find((rule) =>
      rule.part === partCategory && rule.patterns.some((pattern) => pattern.test(target))
    );
  }

  function chooseIndex(length, excludedIndex) {
    if (length <= 1) {
      return 0;
    }
    const candidates = Array.from({ length }, (_, index) => index)
      .filter((index) => index !== excludedIndex);
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function generateJustification(productText, disappointmentText, options) {
    const product = String(productText || "").trim();
    const disappointment = String(disappointmentText || "").trim();
    const partCategory = window.TuningClassifier.classifyPart(product);
    const complaintCategory = window.TuningClassifier.classifyComplaint(disappointment);
    const rule = findRule(partCategory, disappointment);
    const lines = rule ? rule.lines : fallbackLines;
    const variantIndex = chooseIndex(lines.length, options && options.excludeVariantIndex);

    return {
      generatedText: fill(lines[variantIndex], product),
      partCategory,
      complaintCategory,
      safetyWarning: window.TuningClassifier.detectSafetyWarning(product, disappointment),
      showSpecificityHint: !rule && window.TuningClassifier.isVagueDisappointment(disappointment),
      variantIndex,
      ruleKey: rule ? rule.key : "fallback"
    };
  }

  window.TuningGenerator = { generateJustification };
})();
