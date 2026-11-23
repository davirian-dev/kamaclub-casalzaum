import { Position, PlaceCategory, Challenge, IdeaCard } from '../types';

export const INITIAL_POSITIONS: Position[] = [
  {
    id: 'abraco-do-sol',
    title: 'O Abraço do Sol',
    subtitle: 'Foco: Intimidade Máxima & Contato Visual',
    category: 'classicas',
    complexity: 'Intermediário',
    intensity: 'Média',
    location: 'Cama',
    focus: 'Contato Pele com Pele e Olhar Fixo',
    rating: 5,
    illustrationUrl: '/assets/pos-abraco-sol.jpg',
    description: 'Uma posição que une proximidade física e emocional absoluta, permitindo carícias na nuca, beijos no pescoço e ritmo controlado.',
    instructions: [
      'Ambos sentam-se de frente, um no colo do outro com pernas entrelaçadas.',
      'Abram os braços para um abraço firme e mantenham contato visual próximo.',
      'O parceiro de cima controla a altura e profundidade através de pequenos movimentos circulares da bacia.'
    ],
    comfortTip: 'Coloquem uma almofada firme sob o parceiro na base para reduzir o esforço lombar e facilitar o ritmo.',
    activeTip: 'Sustente a cintura e os quadris com firmeza para guiar a cadência sem cansar as pernas.',
    passiveTip: 'Apoie o peito e solte o peso dos ombros, sincronizando a respiração com os movimentos.',
    versatileTip: 'Invertam a inclinação do tronco para alternar quem conduz a pressão e os beijos.',
    isVip: false
  },
  {
    id: '69-original',
    title: '69 Original',
    subtitle: 'Vocês dois ficarão bem ocupados.',
    category: 'oral',
    complexity: 'Intermediário',
    intensity: 'Média',
    location: 'Cama',
    focus: 'Estímulo Oral Simultâneo',
    rating: 5,
    illustrationUrl: '/assets/pos-69.webp',
    description: 'Esse clássico não deve ser subestimado. O homem fica em baixo para que o peso do seu corpo não impeça a mulher de desfrutar dessa posição. Assim, vocês dois podem se mover e estimular um ao outro oralmente, ao mesmo tempo.',
    instructions: [
      'Um deita de costas com a cabeça virada para os pés do outro.',
      'O segundo parceiro posiciona-se por cima, invertido, encaixando confortavelmente a boca na intimidade do parceiro.',
      'Usem as mãos livres para carícias extras nas coxas e nádegas.'
    ],
    comfortTip: 'Use travesseiros sob a cabeça e pescoço de quem está embaixo para evitar cansaço cervical.',
    activeTip: 'Controle o peso do corpo sobre os joelhos para não pressionar quem está embaixo.',
    passiveTip: 'Relaxe o quadril e guie suavemente a velocidade dos movimentos.',
    versatileTip: 'Variação em conchinha lateral de lado se quiserem zero sustentação de peso.',
    isVip: false
  },
  {
    id: 'amazona',
    title: 'Amazona',
    subtitle: 'Uau! A mulher no controle. Indispensável.',
    category: 'controle',
    complexity: 'Iniciante',
    intensity: 'Alta',
    location: 'Cama',
    focus: 'Estímulo Clitoriano & Ritmo Feminino',
    rating: 5,
    illustrationUrl: '/assets/pos-amazona.webp',
    description: 'Uma das posições favoritas em todo o mundo. A mulher senta-se sobre o homem deitado e dita as regras do jogo com total liberdade.',
    instructions: [
      'O parceiro deita-se de costas na cama, totalmente relaxado.',
      'A parceira monta de frente, apoiando os joelhos ou os pés firmes no colchão.',
      'Ela movimenta o quadril para frente e para trás, garantindo atrito clitoriano constante.'
    ],
    comfortTip: 'O homem pode segurar as coxas dela para aliviar o peso dos joelhos.',
    activeTip: 'Aproveite o controle total para ditar o ritmo exato que mais dá prazer.',
    passiveTip: 'Acaricie a cintura, seios e coxas da parceira enquanto desfruta do visual.',
    isVip: false
  },
  {
    id: 'arco',
    title: 'Arco',
    subtitle: 'Roma não foi construída em um dia, flexibilidade e entrega.',
    category: 'acrobaticas',
    complexity: 'Avançado',
    intensity: 'Intensa',
    location: 'Cama',
    focus: 'Curvatura Lombar & Penetração Íngreme',
    rating: 5,
    illustrationUrl: '/assets/pos-arco.webp',
    description: 'Uma posição que exige flexibilidade e recompensa com uma sensação de profundidade e êxtase incomparáveis.',
    instructions: [
      'A mulher apoia os ombros na cama e eleva o quadril formando um arco firme.',
      'O parceiro ajoelha-se entre as pernas e penetra segurando firme na bacia.',
      'O ângulo acentuado proporciona contato direto com o ponto G.'
    ],
    comfortTip: 'Coloquem dois travesseiros altos sob a lombar para sustentar o arco sem fadiga.',
    activeTip: 'Mantenha passadas firmes e cadenciadas, sincronizadas com a respiração.',
    passiveTip: 'Concentre-se em relaxar a musculatura pélvica e respirar fundo.',
    isVip: false
  },
  {
    id: 'avanco',
    title: 'Avanço',
    subtitle: 'O homem deve apoiar a mulher se ela cansar.',
    category: 'profundidade',
    complexity: 'Intermediário',
    intensity: 'Alta',
    location: 'Cama',
    focus: 'Ângulo Profundo & Estabilidade',
    rating: 5,
    illustrationUrl: '/assets/pos-avanco.webp',
    description: 'Uma perna fica esticada e a outra dobrada em avanço, abrindo o canal pélvico para um contato visceral e confortável.',
    instructions: [
      'Deitada de costas, a mulher flexiona uma perna para o lado.',
      'O parceiro encaixa-se diagonalmente entre as pernas com apoio dos cotovelos.',
      'Movimentos lentos e profundos com pressão constante.'
    ],
    comfortTip: 'Uma almofada sob o joelho flexionado evita pressão na articulação.',
    activeTip: 'Use o peso do tronco para estabilizar sem esmagar.',
    passiveTip: 'Abrace a perna de apoio ou as costas do parceiro.',
    isVip: false
  },
  {
    id: 'bailarina',
    title: 'Bailarina',
    subtitle: 'Se você sentir dormência, basta trocar a perna de apoio.',
    category: 'acrobaticas',
    complexity: 'Acrobático',
    intensity: 'Intensa',
    location: 'Em Pé',
    focus: 'Adrenalina, Paixão & Contato em Pé',
    rating: 5,
    illustrationUrl: '/assets/pos-bailarina.webp',
    description: 'Perfeita para momentos de desejo impulsivo na parede, no corredor ou no closet.',
    instructions: [
      'Ambos de pé; a mulher eleva uma das pernas envolvendo o quadril do parceiro.',
      'O parceiro sustenta a coxa com uma das mãos e abraça as costas dela com a outra.',
      'Apoiem as costas em uma parede para firmeza total.'
    ],
    comfortTip: 'Usem a parede firme como apoio para não perder o equilíbrio.',
    activeTip: 'Mantenha os joelhos semiflexionados para absorver o impacto.',
    passiveTip: 'Entrelace os braços no pescoço do parceiro para dividir o peso.',
    isVip: false
  },
  {
    id: 'bambole',
    title: 'Bambolê',
    subtitle: 'Certifique-se de ter bastante espaço ao redor.',
    category: 'profundidade',
    complexity: 'Intermediário',
    intensity: 'Média',
    location: 'Cama',
    focus: 'Movimentos Circulares Pélvicos',
    rating: 5,
    illustrationUrl: '/assets/pos-bambole.webp',
    description: 'Em vez de movimentos retos de vai e vem, os quadris giram em círculos contínuos como em uma dança sensual.',
    instructions: [
      'Encaixe clássico de frente com pernas entrelaçadas.',
      'Ambos iniciam giros sincronizados da bacia no sentido horário e anti-horário.',
      'A estimulação das paredes internas é máxima e contínua.'
    ],
    comfortTip: 'Reduzam a velocidade: o segredo do bambolê é o atrito lento e não a rapidez.',
    activeTip: 'Acompanhe o giro da parceira mantendo a base firme.',
    passiveTip: 'Comande a rotação e a intensidade dos círculos.',
    isVip: false
  },
  {
    id: 'bebedouro',
    title: 'Bebedouro',
    subtitle: 'Sacie a sua sede. Beba com as duas mãos.',
    category: 'oral',
    complexity: 'Iniciante',
    intensity: 'Leve',
    location: 'Cama',
    focus: 'Sexo Oral Feminino Focado',
    rating: 5,
    illustrationUrl: '/assets/pos-bebedouro.webp',
    description: 'Uma postura consagrada onde a mulher fica perfeitamente posicionada para receber sexo oral prolongado sem pressa.',
    instructions: [
      'A mulher deita na beirada da cama com pernas abertas e descansadas.',
      'O parceiro ajoelha-se no chão entre as pernas dela na altura ideal.',
      'As mãos do parceiro ficam livres para carícias nos seios e coxas.'
    ],
    comfortTip: 'Coloque um travesseiro macio sob os joelhos do parceiro no chão.',
    activeTip: 'Varie entre toques suaves com a ponta da língua e sucção compassada.',
    passiveTip: 'Puxe os cabelos do parceiro levemente para ditar o ritmo.',
    isVip: false
  },
  {
    id: 'bruto',
    title: 'Bruto',
    subtitle: 'Uma variação potente da Amazona tradicional.',
    category: 'controle',
    complexity: 'Intermediário',
    intensity: 'Intensa',
    location: 'Cama',
    focus: 'Pegada Firme & Dominação Consensual',
    rating: 5,
    illustrationUrl: '/assets/pos-bruto.webp',
    description: 'Para quem gosta de intensidade, pegada nos cabelos e atrito pélvico vigoroso com contato visual elétrico.',
    instructions: [
      'A mulher monta inclinando o tronco para a frente contra o peito do parceiro.',
      'O homem segura firme nos quadris ou nádegas dela ditando um ritmo forte.',
      'Beijos vorazes e sussurros no ouvido intensificam a temperatura.'
    ],
    comfortTip: 'Sincronizem a força para que o atrito não cause desconforto na pele.',
    activeTip: 'Puxe-a contra seu corpo mantendo pressão constante.',
    passiveTip: 'Apoie as mãos no peito dele e entregue-se ao ritmo acelerado.',
    isVip: false
  },
  {
    id: 'cachorrinho',
    title: 'Cachorrinho',
    subtitle: 'O preferido pelos mamíferos desde o início dos tempos.',
    category: 'classicas',
    complexity: 'Iniciante',
    intensity: 'Média',
    location: 'Cama',
    focus: 'Penetração Traseira & Estímulo G',
    rating: 5,
    illustrationUrl: '/assets/pos-cachorrinho.webp',
    description: 'A mais famosa e praticada posição por trás. Permite penetração profunda com carícias simultâneas em todo o corpo.',
    instructions: [
      'A mulher fica de quatro na cama com joelhos na largura dos ombros.',
      'O parceiro ajoelha-se atrás segurando firme na cintura ou quadris.',
      'A mão livre pode alcançar o clitóris para orgasmo duplo.'
    ],
    comfortTip: 'Apoiar os antebraços no colchão alivia a pressão nos punhos.',
    activeTip: 'Ajuste a inclinação do quadril dela para encontrar o ângulo ideal.',
    passiveTip: 'Arqueie levemente as costas para facilitar o encaixe.',
    isVip: false
  },
  {
    id: 'cachorrinho-sentado',
    title: 'Cachorrinho Sentado',
    subtitle: 'Uma forma mais íntima do estilo cachorrinho tradicional.',
    category: 'classicas',
    complexity: 'Intermediário',
    intensity: 'Média',
    location: 'Cama',
    focus: 'Abraço por Trás & Intimidade',
    rating: 5,
    illustrationUrl: '/assets/pos-cachorrinho_sentado.webp',
    description: 'O parceiro senta-se na cama e ela senta-se no colo dele de costas, unindo a penetração traseira ao abraço acolhedor.',
    instructions: [
      'O homem senta de pernas cruzadas ou semiabertas.',
      'A mulher senta-se no colo de costas para ele.',
      'Ele a envolve com os braços, beijando ombros e pescoço enquanto conduzem o ritmo.'
    ],
    comfortTip: 'Excelente para quem cansa de joelhos no cachorrinho tradicional.',
    activeTip: 'Abrace firme a cintura dela e ajude na elevação do quadril.',
    passiveTip: 'Incline a cabeça para trás no ombro dele para receber beijos no pescoço.',
    isVip: false
  },
  {
    id: 'carrinho-de-mao',
    title: 'Carrinho de Mão',
    subtitle: 'Não pense duas vezes sobre isso, se a parceira tiver força nos braços.',
    category: 'acrobaticas',
    complexity: 'Acrobático',
    intensity: 'Intensa',
    location: 'Cama',
    focus: 'Desafio Físico & Prazer Explosivo',
    rating: 5,
    illustrationUrl: '/assets/pos-carrinho_mao.webp',
    description: 'Uma posição visualmente arrebatadora onde a mulher apoia as mãos na cama e o parceiro segura suas pernas no ar.',
    instructions: [
      'A mulher apoia as palmas das mãos firmes na cama.',
      'O parceiro de pé na beirada da cama levanta as pernas dela na altura da cintura.',
      'Ele penetra segurando as coxas ou tornozelos com passadas vigorosas.'
    ],
    comfortTip: 'Pratiquem na beirada da cama para ela poder apoiar o tronco se cansar.',
    activeTip: 'Sustente o peso dela com as pernas firmes e coluna ereta.',
    passiveTip: 'Mantenha os braços esticados e abdômen contraído.',
    isVip: false
  },
  {
    id: 'conchinha',
    title: 'Conchinha',
    subtitle: 'Com certeza, será uma das suas posições mais acolhedoras.',
    category: 'classicas',
    complexity: 'Iniciante',
    intensity: 'Leve',
    location: 'Cama',
    focus: 'Preguiça Gostosa & Relaxamento',
    rating: 5,
    illustrationUrl: '/assets/pos-conchinha.webp',
    description: 'Perfeita para manhãs preguiçosas ou noites cansativas. Zero esforço físico, carinho total e penetração suave.',
    instructions: [
      'Ambos deitam-se de lado virados para a mesma direção.',
      'A mulher flexiona levemente os joelhos e o homem encaixa por trás.',
      'O braço dele envolve o corpo dela com a mão livre nos seios ou clitóris.'
    ],
    comfortTip: 'Um travesseiro entre as pernas da mulher melhora o alinhamento pélvico.',
    activeTip: 'Mantenha movimentos calmos e beijos lentos na nuca.',
    passiveTip: 'Encaixe o quadril para trás e relaxe completamente.',
    isVip: false
  },
  {
    id: 'cruz',
    title: 'Cruz',
    subtitle: 'Cruzem olhares enquanto a conexão acontece.',
    category: 'profundidade',
    complexity: 'Intermediário',
    intensity: 'Média',
    location: 'Cama',
    focus: 'Corpos Perpendiculares em 90 Graus',
    rating: 5,
    illustrationUrl: '/assets/pos-cruz.webp',
    description: 'Os corpos ficam posicionados em formato de cruz (+), proporcionando um ângulo oblíquo que estimula áreas inéditas.',
    instructions: [
      'A mulher deita de costas esticada.',
      'O homem deita de lado perpendicularmente (formando um T ou cruz).',
      'As pernas se cruzam e o movimento acontece em fricção lateral.'
    ],
    comfortTip: 'Usar travesseiros sob as costas dela para nivelar a altura.',
    activeTip: 'Deslize com movimentos laterais em vez de frontais.',
    passiveTip: 'Apoie a perna de cima sobre o quadril dele.',
    isVip: false
  },
  {
    id: 'danca-do-colo',
    title: 'Dança do Colo',
    subtitle: 'As preliminares podem ser muito excitantes.',
    category: 'controle',
    complexity: 'Iniciante',
    intensity: 'Média',
    location: 'Sofá',
    focus: 'Sensualidade, Preliminares & Dança',
    rating: 5,
    illustrationUrl: '/assets/pos-danca_colo.webp',
    description: 'No sofá ou na cadeira, a mulher senta de frente no colo dele e dança ao som da música ambiente antes de permitir o encaixe.',
    instructions: [
      'O parceiro senta-se no sofá ou cadeira confortável.',
      'A parceira monta no colo de lingerie ou despida, roçando o corpo com lentidão.',
      'Após o esquenta, a penetração ocorre sentados com abraço apertado.'
    ],
    comfortTip: 'Mantenha a música ambiente sensual ligada para ditar a cadência.',
    activeTip: 'Aperte a cintura dela e deixe-a comandar o atrito.',
    passiveTip: 'Rebole suavemente usando o peso do corpo a seu favor.',
    isVip: false
  },
  {
    id: 'de-joelhos',
    title: 'De Joelhos',
    subtitle: 'Teste os seus limites. Vocês terão algo inesquecível.',
    category: 'controle',
    complexity: 'Intermediário',
    intensity: 'Alta',
    location: 'Cama',
    focus: 'Ambos de Joelhos Face a Face',
    rating: 5,
    illustrationUrl: '/assets/pos-de_joelhos.webp',
    description: 'Ambos ficam ajoelhados de frente um para o outro, unindo o peito e mantendo contato visual direto e respiração ofegante.',
    instructions: [
      'Homem e mulher ficam de joelhos na cama frente a frente.',
      'Ela envolve o quadril dele com as pernas ou apoia os joelhos na cama.',
      'Abraço firme e ritmo sincronizado de avanço e recuo.'
    ],
    comfortTip: 'Almofadas sob os joelhos de ambos evitam incômodo nas patelas.',
    activeTip: 'Segure-a firme pelos ombros ou cintura para não perder o equilíbrio.',
    passiveTip: 'Abrace o pescoço dele e olhe nos olhos.',
    isVip: false
  },
  {
    id: 'dominador',
    title: 'Dominador',
    subtitle: 'Nada de gracinhas. Ou vocês dois podem se perder no prazer.',
    category: 'controle',
    complexity: 'Avançado',
    intensity: 'Intensa',
    location: 'Cama',
    focus: 'Controle de Ritmo & Dominação Macia',
    rating: 5,
    illustrationUrl: '/assets/pos-dominador.webp',
    description: 'Para quem aprecia sentir o parceiro segurando os punhos ou conduzindo a velocidade com segurança e cumplicidade.',
    instructions: [
      'Ela deita de costas com os braços erguidos acima da cabeça.',
      'O parceiro segura os pulsos dela suavemente contra o colchão.',
      'Ele dita o ritmo com passadas lentas e beijos dominantes.'
    ],
    comfortTip: 'Nunca aperte os pulsos com força excessiva: a pegada deve ser firme e excitante, sem dor.',
    activeTip: 'Alterne entre momentos de contenção e carícias livres no rosto.',
    passiveTip: 'Entregue o controle e foque nas sensações do corpo.',
    isVip: false
  },
  {
    id: 'flor-de-lotus',
    title: 'Flor de Lótus',
    subtitle: 'O máximo de intimidade. Vale a pena.',
    category: 'profundidade',
    complexity: 'Avançado',
    intensity: 'Média',
    location: 'Chão / Tapete',
    focus: 'Conexão Tântrica & Respiração Sincronizada',
    rating: 5,
    illustrationUrl: '/assets/pos-flor_lotus.webp',
    description: 'Consagrada pelo Kama Sutra tradicional, essa postura promove a fusão espiritual e física através do abraço sentado.',
    instructions: [
      'O homem senta-se de pernas cruzadas no estilo lótus.',
      'A mulher senta-se em seu colo, entrelaçando as pernas em suas costas.',
      'Ambos respiram juntos enquanto ela conduz micro-movimentos de fricção.'
    ],
    comfortTip: 'Apoiem as costas em almofadas contra a parede se precisarem de descanso.',
    activeTip: 'Mantenha a coluna reta e faça pequenas pulsações pélvicas.',
    passiveTip: 'Abrace com carinho e solte o peso dos ombros.',
    isVip: false
  },
  {
    id: 'frango-assado',
    title: 'Frango Assado (Alternativo)',
    subtitle: 'Não se preocupe, não é uma jiboia. Sinta a profundidade.',
    category: 'profundidade',
    complexity: 'Avançado',
    intensity: 'Intensa',
    location: 'Cama',
    focus: 'Pernas Elevadas nos Ombros & Ponto G',
    rating: 5,
    illustrationUrl: '/assets/pos-frango_assado.webp',
    description: 'A mulher deita de costas e apoia as pernas sobre os ombros dele, permitindo o encaixe mais profundo possível da anatomia.',
    instructions: [
      'A mulher deita de costas e eleva ambas as pernas.',
      'O homem apoia os tornozelos dela sobre os ombros e penetra de joelhos.',
      'A pélvis dela fica exposta em um ângulo reto perfeito.'
    ],
    comfortTip: 'Travesseiro alto sob o bumbum dela eleva o quadril e elimina pressão nas costas.',
    activeTip: 'Segure firme nas coxas dela para guiar com segurança.',
    passiveTip: 'Deixe as pernas relaxadas sobre os ombros dele.',
    isVip: false
  },
  {
    id: 'garganta-profunda',
    title: 'Garganta Profunda',
    subtitle: 'Vá com calma. Confirme se ambos estão no mesmo clima.',
    category: 'oral',
    complexity: 'Avançado',
    intensity: 'Intensa',
    location: 'Cama',
    focus: 'Estímulo Oral Masculino Profundo',
    rating: 5,
    illustrationUrl: '/assets/pos-garganta_profunda.webp',
    description: 'Na beirada da cama, a mulher posiciona a cabeça para trás facilitando o relaxamento da garganta e eliminando o reflexo de vômito.',
    instructions: [
      'O homem deita de costas com a intimidade à mostra.',
      'A mulher posiciona-se por cima ou com a cabeça inclinada para trás na beira da cama.',
      'Uso generoso de saliva ou lubrificante saborizado garante fluidez total.'
    ],
    comfortTip: 'A respiração profunda pelo nariz ajuda a relaxar a musculatura da garganta.',
    activeTip: 'Nunca empurre a cabeça da parceira sem o consentimento claro dela.',
    passiveTip: 'Dite a profundidade e faça pausas para respirar.',
    isVip: false
  },
  {
    id: 'macaco',
    title: 'Macaco',
    subtitle: 'Cadeiras não são só para sentar. Se ele for criativo...',
    category: 'acrobaticas',
    complexity: 'Intermediário',
    intensity: 'Média',
    location: 'Sofá',
    focus: 'Apoio em Cadeira ou Borda de Móvel',
    rating: 5,
    illustrationUrl: '/assets/pos-macaco.webp',
    description: 'A mulher apoia as mãos em uma cadeira firme ou poltrona e o parceiro encaixa por trás de pé ou semi-ajoelhado.',
    instructions: [
      'Posicione uma cadeira estável no quarto ou sala.',
      'A parceira curva-se apoiando os antebraços no encosto da cadeira.',
      'O homem penetra por trás com postura ereta e pegada na cintura.'
    ],
    comfortTip: 'Certifiquem-se de que a cadeira é estável e não escorrega no chão.',
    activeTip: 'Apoie uma das mãos no encosto da cadeira para ritmo constante.',
    passiveTip: 'Distribua o peso entre as pernas e os braços apoiados.',
    isVip: false
  },
  {
    id: 'mordaca',
    title: 'Mordaça',
    subtitle: 'Todo o prazer e controle para a mulher no comando.',
    category: 'controle',
    complexity: 'Intermediário',
    intensity: 'Média',
    location: 'Cama',
    focus: 'Sensualidade, Provocação & Sussurros',
    rating: 5,
    illustrationUrl: '/assets/pos-mordaca.webp',
    description: 'A mulher domina o homem deitado, cobrindo a boca dele com beijos ou uma das mãos para que ele apenas gema baixinho.',
    instructions: [
      'O parceiro deita de costas rendido ao momento.',
      'A mulher monta por cima e apoia os joelhos na cama.',
      'Ela dita a velocidade e tapa os lábios dele com beijos apaixonados.'
    ],
    comfortTip: 'O clima de submissão consensual aumenta a excitação mental de ambos.',
    activeTip: 'Conduza com movimentos firmes e olhe nos olhos dele.',
    passiveTip: 'Aprecie a beleza da parceira no controle absoluto.',
    isVip: false
  },
  {
    id: 'papai-e-mamae',
    title: 'Papai e Mamãe',
    subtitle: 'Muito prática, com certeza, vocês acham a mais confortável.',
    category: 'classicas',
    complexity: 'Iniciante',
    intensity: 'Leve',
    location: 'Cama',
    focus: 'Conexão Clássica, Beijos & Olhos nos Olhos',
    rating: 5,
    illustrationUrl: '/assets/pos-papai_mamae.webp',
    description: 'A clássica que nunca perde a majestade. O homem por cima e a mulher por baixo, perfeita para beijos na boca e romance ardente.',
    instructions: [
      'A mulher deita de costas com pernas confortavelmente abertas.',
      'O parceiro deita por cima apoiando o peso nos cotovelos para não sufocar.',
      'Encaixe direto com beijos contínuos durante todo o ato.'
    ],
    comfortTip: 'Ela pode colocar as pernas em volta da cintura dele para aprofundar o contato.',
    activeTip: 'Sustente o peso do peito nos cotovelos para não pesar sobre ela.',
    passiveTip: 'Abrace as costas dele e traga-o para perto.',
    isVip: false
  },
  {
    id: 'parafuso',
    title: 'Parafuso',
    subtitle: 'Um giro lateral da borboleta. Basta virar o corpo.',
    category: 'profundidade',
    complexity: 'Intermediário',
    intensity: 'Média',
    location: 'Cama',
    focus: 'Torção Pélvica & Atrito das Paredes Internas',
    rating: 5,
    illustrationUrl: '/assets/pos-parafuso.webp',
    description: 'A mulher deita de lado e o parceiro encaixa frontalmente, criando uma torção pélvica espiralada que comprime o canal.',
    instructions: [
      'A mulher deita de lado com uma perna esticada e a outra dobrada.',
      'O homem ajoelha-se de frente encaixando o quadril em diagonal.',
      'Movimentos de torção helicoidal garantem novas sensações.'
    ],
    comfortTip: 'Excelente posição para quando a cama tem pouco espaço ou querem variar sem cansaço.',
    activeTip: 'Gire o quadril levemente durante cada estocada.',
    passiveTip: 'Ajuste a perna de cima para abrir mais o ângulo.',
    isVip: false
  },
  {
    id: 'portas-do-paraiso',
    title: 'Portas do Paraíso',
    subtitle: 'O grande sucesso. Se estiver incerto, comece por aqui.',
    category: 'classicas',
    complexity: 'Iniciante',
    intensity: 'Média',
    location: 'Cama',
    focus: 'Pernas Fechadas & Máxima Fricção',
    rating: 5,
    illustrationUrl: '/assets/pos-portas_paraiso.webp',
    description: 'A mulher deita de costas com as pernas quase juntas e o homem penetra por cima: a sensação de aperto é incomparável!',
    instructions: [
      'Ela deita de costas e junta as coxas quase por completo.',
      'O homem posiciona-se por cima abrindo levemente espaço apenas para a entrada.',
      'A pressão das pernas dela cria um canal ultra-apertado para ambos.'
    ],
    comfortTip: 'Muito lubrificante é essencial nessa posição devido ao atrito das pernas juntas.',
    activeTip: 'Movimentos curtos e rápidos geram prazer indescritível.',
    passiveTip: 'Aperte as coxas no momento exato do ápice.',
    isVip: false
  },
  {
    id: 'rodeio',
    title: 'Rodeio',
    subtitle: 'Às vezes, o contato visual não é tão necessário: foque no visual traseiro.',
    category: 'controle',
    complexity: 'Intermediário',
    intensity: 'Alta',
    location: 'Cama',
    focus: 'Vaqueira Invertida & Vista Privilegiada',
    rating: 5,
    illustrationUrl: '/assets/pos-rodeio.webp',
    description: 'A mulher senta por cima, mas virada de costas para o parceiro. Ele tem uma visão esplêndida das costas e nádegas dela.',
    instructions: [
      'O parceiro deita de costas.',
      'A mulher monta por cima voltada para os pés dele.',
      'Ela comanda a velocidade inclinando o tronco para a frente ou para trás.'
    ],
    comfortTip: 'O homem pode esticar as mãos para acariciar o bumbum dela durante o galope.',
    activeTip: 'Aproveite o controle e use os pés no colchão para impulsionar.',
    passiveTip: 'Desfrute da visão espetacular e segure nas coxas dela.',
    isVip: false
  },
  {
    id: 'sache-de-cha',
    title: 'Sachê de Chá',
    subtitle: 'Um meio para o seu objetivo. Bumbum empinado.',
    category: 'oral',
    complexity: 'Iniciante',
    intensity: 'Média',
    location: 'Cama',
    focus: 'Sexo Oral Teatral & Dominação Sensual',
    rating: 5,
    illustrationUrl: '/assets/pos-sache_cha.webp',
    description: 'A parceira senta-se suavemente sobre o rosto do parceiro deitado, ditando a pressão e o tempo de cada estímulo oral.',
    instructions: [
      'O homem deita de costas com a cabeça livre de travesseiros.',
      'A mulher agacha-se sobre o rosto dele com controle de peso nos joelhos.',
      'Ela dita a pressão exata que deseja receber da língua dele.'
    ],
    comfortTip: 'A mulher nunca deve soltar todo o peso sobre o nariz do parceiro para permitir a respiração dele.',
    activeTip: 'Use as mãos no colchão para aliviar o peso e regular a proximidade.',
    passiveTip: 'Respire pelo canto da boca e estimule com a ponta da língua.',
    isVip: false
  },
  {
    id: 'tartaruga',
    title: 'Tartaruga',
    subtitle: 'A mulher fica firme. Quem está por cima dita as regras.',
    category: 'profundidade',
    complexity: 'Intermediário',
    intensity: 'Alta',
    location: 'Cama',
    focus: 'Corpo Totalmente Encolhido & Penetração Firme',
    rating: 5,
    illustrationUrl: '/assets/pos-tartaruga.webp',
    description: 'A mulher deita de bruços com o quadril empinado e pernas dobradas (como o casco de uma tartaruga) e o parceiro cobre suas costas.',
    instructions: [
      'A mulher deita de bruços, puxa os joelhos para perto do peito e apoia o rosto na cama.',
      'O parceiro deita-se cobrindo as costas dela e penetra por trás.',
      'Contato pele com pele total e calor corporal concentrado.'
    ],
    comfortTip: 'Um travesseiro sob o peito da mulher torna a postura acolhedora por longos minutos.',
    activeTip: 'Abrace as costelas dela e sussurre no ouvido.',
    passiveTip: 'Feche os olhos e aproveite a sensação de acolhimento e calor.',
    isVip: false
  },
  {
    id: 'terapia-oral',
    title: 'Terapia Oral',
    subtitle: 'Sem muita conversa. Mas alguém vai sair sorrindo.',
    category: 'oral',
    complexity: 'Iniciante',
    intensity: 'Leve',
    location: 'Cama',
    focus: 'Felação Acolhedora na Cama',
    rating: 5,
    illustrationUrl: '/assets/pos-terapia_oral.webp',
    description: 'O homem deita de costas e a parceira posiciona-se ao lado em posição relaxada para um sexo oral sem pressa de acabar.',
    instructions: [
      'O parceiro relaxa de costas na cama.',
      'A parceira deita de lado ou ajoelha-se confortavelmente ao lado das pernas dele.',
      'Carícias manuais nos testículos acompanham o movimento dos lábios.'
    ],
    comfortTip: 'Uso de travesseiros sob o braço da parceira evita fadiga muscular.',
    activeTip: 'Varie entre beijos molhados e sucção na glande.',
    passiveTip: 'Passe as mãos pelos cabelos da parceira em sinal de agradecimento.',
    isVip: false
  },
  {
    id: 'tesoura',
    title: 'Tesoura',
    subtitle: 'Posicionem suas pernas com calma. Vale a pena.',
    category: 'profundidade',
    complexity: 'Intermediário',
    intensity: 'Média',
    location: 'Cama',
    focus: 'Pernas Entrelaçadas & Atrito Clitoriano Mútuo',
    rating: 5,
    illustrationUrl: '/assets/pos-tesoura.webp',
    description: 'As pernas de ambos se entrelaçam como lâminas de uma tesoura, permitindo atrito frontal contínuo e beijos demorados.',
    instructions: [
      'Deitados de lado frente a frente, intercalam as pernas: uma perna dela entre as dele.',
      'O encaixe ocorre lateralmente com pressão da bacia contra a vulva.',
      'A cada movimento, o osso púbico dele esfrega diretamente no clitóris dela.'
    ],
    comfortTip: 'Excelente para quem quer atingir o orgasmo feminino sem cansar os braços.',
    activeTip: 'Mantenha a pressão pélvica constante durante todo o vai e vem.',
    passiveTip: 'Entrelace a perna com firmeza para guiar a fricção.',
    isVip: false
  },
  {
    id: 'vaqueira',
    title: 'Vaqueira Clássica',
    subtitle: 'Porque as vaqueiras são as mais incríveis do mundo.',
    category: 'controle',
    complexity: 'Iniciante',
    intensity: 'Alta',
    location: 'Cama',
    focus: 'Liberdade Feminina & Controle de Velocidade',
    rating: 5,
    illustrationUrl: '/assets/pos-vaqueira.webp',
    description: 'A rainha de todas as posições de controle feminino. Ela escolhe a profundidade, o ângulo e dita quando acelerar.',
    instructions: [
      'O homem deita de costas na cama.',
      'A mulher senta-se por cima dele, apoiando os pés no colchão para impulso.',
      'Ela varia entre reboladas circulares e movimentos verticais cadenciados.'
    ],
    comfortTip: 'O parceiro pode colocar as mãos nos quadris dela para auxiliar no ritmo.',
    activeTip: 'Use a força das coxas para ditar o compasso perfeito.',
    passiveTip: 'Acaricie os quadris e coxas dela enquanto aproveita o show.',
    isVip: false
  },

  // MÓDULOS ESPECIAIS (MÉNAGE, SWING & LGBTQIA+ ATIVO/PASSIVO)
  {
    id: 'triangulo-dourado-menage',
    title: 'Triângulo Dourado (Ménage)',
    subtitle: 'Conexão a três com contato contínuo sem ninguém de fora.',
    category: 'menage',
    complexity: 'Avançado',
    intensity: 'Intensa',
    location: 'Cama',
    focus: 'Prazer Compartilhado a Três (HMM ou MHF)',
    rating: 5,
    illustrationUrl: '/assets/pos-69.webp',
    description: 'Especial para dinâmicas a três (HMM ou MHF), garantindo que todos os participantes estejam conectados visual e fisicamente.',
    instructions: [
      'A pessoa central fica semi-sentada apoiada em travesseiros confortáveis.',
      'O segundo participante posiciona-se à frente para carícias ou penetração.',
      'O terceiro participante conecta-se lateralmente ou por trás com massagem e estímulo oral.'
    ],
    comfortTip: 'Comunicação verbal aberta: chequem o conforto e o ritmo da pessoa central a cada minuto.',
    activeTip: 'Mantenha ritmo harmonioso com o outro parceiro ativo para não desequilibrar o toque.',
    passiveTip: 'Entregue-se às sensações múltiplas e indique com palavras onde o prazer está maior.',
    versatileTip: 'Revezem a posição central a cada 10 minutos.',
    isVip: true
  },
  {
    id: 'espelho-lgbt-ativo-passivo',
    title: 'Espelho Versátil (LGBTQIA+)',
    subtitle: 'Ângulo de precisão, relaxamento e estímulo da próstata.',
    category: 'lgbtqia',
    complexity: 'Intermediário',
    intensity: 'Média',
    location: 'Cama',
    focus: 'Estímulo da Próstata & Contato Pélvico',
    rating: 5,
    illustrationUrl: '/assets/pos-abraco-sol.jpg',
    description: 'Desenhada para máximo conforto de quem recebe, facilitando a entrada suave e proporcionando estabilidade para quem conduz.',
    instructions: [
      'O passivo deita-se de lado, elevando levemente a perna superior.',
      'O ativo posiciona-se por trás em conchinha profunda, ajustando a altura com o quadril.',
      'Movimentos lentos e graduais permitem que a musculatura relaxe e o prazer se intensifique.'
    ],
    comfortTip: 'Uso generoso de lubrificante à base de água ou silicone é essencial desde o início.',
    activeTip: 'Comece devagar com pausas para o parceiro acostumar com o ritmo antes de acelerar.',
    passiveTip: 'Expire fundo no momento da penetração e relaxe os glúteos e abdômen.',
    versatileTip: 'Para inverter os papéis, basta girarem 180 graus na cama sem perder o clima.',
    isVip: true
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  // ==========================================
  // MODO AMIGOS (LEVE / RESENHA / ZERO EXPLÍCITO)
  // ==========================================
  // NÍVEL 1 (Amigos)
  {
    id: 'amigo-v-1',
    type: 'verdade',
    mode: 'amigos',
    level: 1,
    text: 'Qual foi o maior mico que você já pagou na frente de alguém que você estava a fim?',
    points: 20,
    refusalOption: 'Beber 1 gole ou pagar prenda'
  },
  {
    id: 'amigo-v-2',
    type: 'verdade',
    mode: 'amigos',
    level: 1,
    text: 'Se você pudesse apagar um relacionamento ou ficada do seu passado, qual seria?',
    points: 20,
    refusalOption: 'Beber 1 gole'
  },
  {
    id: 'amigo-v-3',
    type: 'verdade',
    mode: 'amigos',
    level: 1,
    text: 'Qual é a mania mais estranha que você tem quando está sozinho em casa?',
    points: 20,
    refusalOption: 'Beber 1 gole'
  },
  {
    id: 'amigo-d-1',
    type: 'desafio',
    mode: 'amigos',
    level: 1,
    text: 'Imite uma celebridade ou alguém da roda por 45 segundos até que alguém adivinhe!',
    timeSeconds: 45,
    points: 30,
    refusalOption: 'Cantar o refrão de uma música brega bem alto'
  },
  {
    id: 'amigo-d-2',
    type: 'desafio',
    mode: 'amigos',
    level: 1,
    text: 'Deixe Pessoa B mandar um emoji aleatório no direct de qualquer contato recente do seu WhatsApp!',
    points: 35,
    refusalOption: 'Pagar 15 polichinelos'
  },
  {
    id: 'amigo-d-3',
    type: 'desafio',
    mode: 'amigos',
    level: 1,
    text: 'Fale com sotaque de outra região ou país pelas próximas duas rodadas sem rir!',
    points: 25,
    refusalOption: 'Beber 1 gole'
  },
  {
    id: 'amigo-en-1',
    type: 'eu_nunca',
    mode: 'amigos',
    level: 1,
    text: 'Eu nunca stalkeei os stories de alguém por uma conta falsa no Instagram.',
    points: 15,
    refusalOption: 'Quem já fez, bebe 1 gole!'
  },
  {
    id: 'amigo-en-2',
    type: 'eu_nunca',
    mode: 'amigos',
    level: 1,
    text: 'Eu nunca fingi que estava dormindo ou ocupado para não atender uma ligação chata.',
    points: 15,
    refusalOption: 'Quem já fez, bebe 1 gole!'
  },
  {
    id: 'amigo-g-1',
    type: 'garrafa',
    mode: 'amigos',
    level: 1,
    text: 'A pessoa do fundo da garrafa deve contar uma fofoca inofensiva e divertida sobre a pessoa do gargalo!',
    points: 25,
    refusalOption: 'Tomar 1 shot de água ou drink'
  },
  {
    id: 'amigo-g-2',
    type: 'garrafa',
    mode: 'amigos',
    level: 1,
    text: 'A pessoa da ponta da garrafa deve dar um abraço de urso de 20 segundos na pessoa da base!',
    timeSeconds: 20,
    points: 25,
    refusalOption: 'Pagar prenda'
  },

  // ==========================================
  // MODO ESQUENTA (TOQUES / BEIJOS / PRELIMINARES)
  // ==========================================
  // NÍVEL 1 (Esquenta Inicial)
  {
    id: 'esquenta-v-1',
    type: 'verdade',
    mode: 'esquenta',
    level: 1,
    text: 'Qual foi o primeiro pensamento que você teve sobre Pessoa B quando a conheceu?',
    points: 30,
    refusalOption: 'Beber 1 gole'
  },
  {
    id: 'esquenta-v-2',
    type: 'verdade',
    mode: 'esquenta',
    level: 1,
    text: 'Qual parte do corpo de Pessoa B você acha mais irresistível e por quê?',
    points: 35,
    refusalOption: 'Beber 1 shot'
  },
  {
    id: 'esquenta-d-1',
    type: 'desafio',
    mode: 'esquenta',
    level: 1,
    text: 'Olhe fixamente nos olhos de Pessoa B a apenas 10 centímetros de distância por 30 segundos sem desviar o olhar nem rir.',
    timeSeconds: 30,
    points: 40,
    refusalOption: 'Beber 1 gole'
  },
  {
    id: 'esquenta-d-2',
    type: 'desafio',
    mode: 'esquenta',
    level: 1,
    text: 'Passe a ponta dos dedos suavemente pelos lábios de Pessoa B enquanto descreve o que está sentindo.',
    timeSeconds: 20,
    points: 40,
    refusalOption: 'Pagar prenda'
  },

  // NÍVEL 2 (Esquenta Intermediário)
  {
    id: 'esquenta-v-3',
    type: 'verdade',
    mode: 'esquenta',
    level: 2,
    text: 'Qual é a fantasia secreta que você mais tem vontade de realizar com Pessoa B?',
    points: 45,
    refusalOption: 'Beber 1 shot'
  },
  {
    id: 'esquenta-v-4',
    type: 'verdade',
    mode: 'esquenta',
    level: 2,
    text: 'Conte um fetiche ou desejo que você nunca teve coragem de confessar em voz alta.',
    points: 50,
    refusalOption: 'Beber 2 goles'
  },
  {
    id: 'esquenta-d-3',
    type: 'desafio',
    mode: 'esquenta',
    level: 2,
    text: 'Vende os olhos de Pessoa B e sussurre no ouvido dela 3 coisas que mais te atraem no corpo dela, seguido de um beijo de 15 segundos no pescoço.',
    timeSeconds: 15,
    points: 55,
    refusalOption: 'Beber 1 gole ou tirar 1 peça de roupa leve'
  },
  {
    id: 'esquenta-d-4',
    type: 'desafio',
    mode: 'esquenta',
    level: 2,
    text: 'Tire uma peça de roupa de Pessoa B usando apenas os dentes!',
    points: 55,
    refusalOption: 'Beber 2 goles seguidos'
  },
  {
    id: 'esquenta-en-1',
    type: 'eu_nunca',
    mode: 'esquenta',
    level: 2,
    text: 'Eu nunca tive um sonho erótico intenso com alguém que está nesta roda hoje.',
    points: 35,
    refusalOption: 'Quem já teve, dá um gole e dá um sorriso sem falar nada!'
  },
  {
    id: 'esquenta-en-2',
    type: 'eu_nunca',
    mode: 'esquenta',
    level: 2,
    text: 'Eu nunca mandei nudes ou fotos ousadas que me deram medo de vazar depois.',
    points: 35,
    refusalOption: 'Quem já fez, bebe 1 shot!'
  },
  {
    id: 'esquenta-g-1',
    type: 'garrafa',
    mode: 'esquenta',
    level: 2,
    text: 'A pessoa da ponta da garrafa deve dar uma massagem sensual de 1 minuto nos ombros e nuca da pessoa da base.',
    timeSeconds: 60,
    points: 60,
    refusalOption: 'Fazer 10 agachamentos sem camisa'
  },
  {
    id: 'esquenta-g-2',
    type: 'garrafa',
    mode: 'esquenta',
    level: 2,
    text: 'A pessoa do gargalo e a pessoa do fundo devem dar um selinho demorado de 10 segundos com as mãos na cintura um do outro.',
    timeSeconds: 10,
    points: 65,
    refusalOption: 'Ambos tomam 1 shot'
  },

  // ==========================================
  // MODO KAMA (+18 / SEM TABU / EXPLÍCITO)
  // ==========================================
  // NÍVEL 2 (Kama Aquecimento)
  {
    id: 'kama-v-1',
    type: 'verdade',
    mode: 'kama',
    level: 2,
    text: 'Qual foi a transa mais selvagem da sua vida e o que você faria de novo hoje?',
    points: 70,
    refusalOption: 'Beber 1 shot generoso'
  },
  {
    id: 'kama-v-2',
    type: 'verdade',
    mode: 'kama',
    level: 2,
    text: 'Se você pudesse chamar qualquer pessoa aqui da roda para um ménage ou swing hoje, quem seria e como começaria?',
    points: 90,
    refusalOption: 'Beber até o fundo do copo'
  },
  {
    id: 'kama-d-1',
    type: 'desafio',
    mode: 'kama',
    level: 2,
    text: 'Dê beijos quentes e mordidinhas suaves na orelha, pescoço e clavícula de Pessoa B por 45 segundos.',
    timeSeconds: 45,
    points: 80,
    refusalOption: 'Beber 2 shots'
  },
  {
    id: 'kama-d-2',
    type: 'desafio',
    mode: 'kama',
    level: 2,
    text: 'Tire a camisa ou blusa e deixe Pessoa B passar uma pedra de gelo pelo seu peito e abdômen até derreter.',
    timeSeconds: 40,
    points: 85,
    refusalOption: 'Beber 2 shots'
  },

  // NÍVEL 3 (Kama Hardcore / Explícito)
  {
    id: 'kama-v-3',
    type: 'verdade',
    mode: 'kama',
    level: 3,
    text: 'Qual posição sexual te faz chegar ao orgasmo mais rápido e qual te faz aguentar mais tempo?',
    points: 95,
    refusalOption: 'Tomar 2 shots'
  },
  {
    id: 'kama-v-4',
    type: 'verdade',
    mode: 'kama',
    level: 3,
    text: 'Você prefere dominar ou ser dominado(a) na cama? Descreva exatamente como gosta de ser tratado(a).',
    points: 95,
    refusalOption: 'Beber 2 shots'
  },
  {
    id: 'kama-d-3',
    type: 'desafio',
    mode: 'kama',
    level: 3,
    text: 'Escolham uma posição do catálogo (ex: O Abraço do Sol ou Amazona) e pratiquem por 2 minutos ininterruptos mantendo contato visual.',
    timeSeconds: 120,
    points: 110,
    refusalOption: 'Beber 2 shots e ceder a vez de escolher o próximo desafio'
  },
  {
    id: 'kama-d-4',
    type: 'desafio',
    mode: 'kama',
    level: 3,
    text: 'Faça carícias íntimas orais ou manuais por 1 minuto em Pessoa B com ela com os olhos vendados.',
    timeSeconds: 60,
    points: 120,
    refusalOption: 'Tomar 3 goles e ficar sem falar por 1 rodada'
  },
  {
    id: 'kama-en-1',
    type: 'eu_nunca',
    mode: 'kama',
    level: 3,
    text: 'Eu nunca transei em um lugar público com risco real de ser pego.',
    points: 50,
    refusalOption: 'Quem já fez bebe e conta onde foi!'
  },
  {
    id: 'kama-en-2',
    type: 'eu_nunca',
    mode: 'kama',
    level: 3,
    text: 'Eu nunca usei brinquedos eróticos ou fantasias ousadas em uma transa.',
    points: 50,
    refusalOption: 'Quem já usou, bebe 1 gole e dá um detalhe!'
  },
  {
    id: 'kama-g-1',
    type: 'garrafa',
    mode: 'kama',
    level: 3,
    text: 'A pessoa do gargalo deve tirar a roupa íntima da pessoa da base usando apenas uma das mãos ou a boca.',
    points: 100,
    refusalOption: 'Pagar prenda sorteada pelo grupo'
  },
  {
    id: 'kama-g-2',
    type: 'garrafa',
    mode: 'kama',
    level: 3,
    text: 'A pessoa do fundo da garrafa deve escolher uma posição de ménage ou sexo oral do catálogo para o grupo simular agora!',
    points: 120,
    refusalOption: 'Beber shot duplo'
  }
];

export const INITIAL_PLACES: PlaceCategory[] = [
  {
    id: 'casa',
    name: 'Casa (Ambientes Íntimos)',
    icon: 'Home',
    items: [
      { id: 'c-1', name: 'Balcão da Cozinha', done: false },
      { id: 'c-2', name: 'Chuveiro Quente', done: false },
      { id: 'c-3', name: 'Banheira com Espuma', done: false },
      { id: 'c-4', name: 'Cadeira de Escritório', done: false },
      { id: 'c-5', name: 'Em Frente ao Espelho Grande', done: false },
      { id: 'c-6', name: 'Tapete da Sala com Lareira/TV', done: false },
      { id: 'c-7', name: 'Armário / Closet Fechado', done: false },
      { id: 'c-8', name: 'Rede na Varanda', done: false }
    ]
  },
  {
    id: 'ao-ar-livre',
    name: 'Ao Ar Livre & Natureza',
    icon: 'Trees',
    items: [
      { id: 'al-1', name: 'Praia Deserta à Noite', done: false },
      { id: 'al-2', name: 'Trilha ou Cachoeira Escondida', done: false },
      { id: 'al-3', name: 'Piscina Privada no Escuro', done: false },
      { id: 'al-4', name: 'Acampamento sob as Estrelas', done: false }
    ]
  },
  {
    id: 'transporte',
    name: 'Meios de Transporte',
    icon: 'Car',
    items: [
      { id: 'tr-1', name: 'Banco Traseiro do Carro com Vidros Escuros', done: false },
      { id: 'tr-2', name: 'Cabine de Navio / Cruzeiro', done: false },
      { id: 'tr-3', name: 'Capô do Carro em um Mirante', done: false }
    ]
  },
  {
    id: 'extravagante',
    name: 'Extravagante & Ousado',
    icon: 'Sparkles',
    items: [
      { id: 'ex-1', name: 'Motel Temático com Jacuzzi', done: false },
      { id: 'ex-2', name: 'Cobertura de Prédio com Vista Panorâmica', done: false },
      { id: 'ex-3', name: 'Provador de Loja / Lugar Semi-Público', done: false }
    ]
  }
];

export const INITIAL_IDEAS: IdeaCard[] = [
  {
    id: 'id-1',
    title: 'Chuva de Pétalas & Visor do Carro',
    category: 'Criativo',
    description: 'Cole um bilhetinho escrito "Te amo e te quero hoje" atrás do visor do passageiro no carro, cheio de pétalas. Peça para abaixar o visor e surpreenda!',
    status: 'novas'
  },
  {
    id: 'id-2',
    title: 'Noite dos Sentidos com Venda',
    category: 'Escandalosos',
    description: 'Vende os olhos do parceiro e use 3 estímulos contrastantes: um cubo de gelo, uma respiração quente e uma pena ou tecido de seda.',
    status: 'novas'
  },
  {
    id: 'id-3',
    title: 'Licença para Lingerie',
    category: 'Acessível',
    description: 'Deixe uma caixinha com uma lingerie nova ou um acessório ousado em cima da cama com um bilhete: "Use hoje às 22h no quarto".',
    status: 'novas'
  },
  {
    id: 'id-4',
    title: 'Massagem Tântrica Rápida',
    category: 'Rápido',
    description: '10 minutos de aquecimento com óleo morno e luz vermelha/âmbar no quarto antes de qualquer beijo.',
    status: 'novas'
  }
];
