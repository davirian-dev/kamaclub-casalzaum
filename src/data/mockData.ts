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
    title: '69 Clássico Real',
    subtitle: 'Vocês dois ficarão bem ocupados com prazer simultâneo',
    category: 'oral',
    complexity: 'Intermediário',
    intensity: 'Média',
    location: 'Cama',
    focus: 'Estímulo Oral Simultâneo',
    rating: 5,
    illustrationUrl: '/assets/pos-69.webp',
    description: 'O clássico mais desejado. Permite que ambos deem e recebam estímulo ao mesmo tempo, sem disputa de atenção.',
    instructions: [
      'Um deita de costas com a cabeça virada para os pés do outro.',
      'O segundo participante posiciona-se por cima, invertido, encaixando confortavelmente a boca na intimidade do parceiro.',
      'Usem as mãos livres para carícias extras nas coxas e nádegas.'
    ],
    comfortTip: 'Use travesseiros sob a cabeça e pescoço de quem está embaixo para evitar tensão muscular cervical.',
    activeTip: 'Controle o peso do corpo sobre os joelhos e cotovelos para não pressionar o parceiro embaixo.',
    passiveTip: 'Relaxe o quadril e guie com carinho a velocidade dos movimentos.',
    versatileTip: 'Deitem-se de lado em conchinha invertida se quiserem uma variação onde ninguém sustenta peso.',
    isVip: false
  },
  {
    id: 'flor-de-lotus',
    title: 'Flor de Lótus Sagrada',
    subtitle: 'O máximo de intimidade e conexão tântrica',
    category: 'profundidade',
    complexity: 'Avançado',
    intensity: 'Média',
    location: 'Chão / Tapete',
    focus: 'Conexão Espiritual & Respiração',
    rating: 5,
    illustrationUrl: '/assets/pos-lotus.webp',
    description: 'Inspirada nas práticas tântricas orientais, essa posição estimula a troca de energia e o prazer lento e prolongado.',
    instructions: [
      'O parceiro base senta-se de pernas cruzadas (posição de lótus).',
      'O parceiro que recebe senta-se no colo, envolvendo a cintura com as pernas.',
      'Respiração sincronizada e beijos demorados aumentam a intensidade.'
    ],
    comfortTip: 'Pratiquem sobre um tapete macio com almofadas nas costas para apoio das vértebras.',
    activeTip: 'Mantenha a coluna ereta e faça movimentos de compressão pélvica.',
    passiveTip: 'Abrace o pescoço e deixe o peso fluir naturalmente com o balanço.',
    versatileTip: 'Ambos podem alternar momentos de conduzir a respiração e os sussurros.',
    isVip: false
  },
  {
    id: 'avanco-lunges',
    title: 'Avanço Dinâmico (Lunges)',
    subtitle: 'Apoio firme e penetração em ângulo profundo',
    category: 'profundidade',
    complexity: 'Intermediário',
    intensity: 'Alta',
    location: 'Cama',
    focus: 'Ponto G & Estímulo Profundo',
    rating: 5,
    illustrationUrl: '/assets/pos-avanco.webp',
    description: 'O parceiro que recebe apoia uma perna dobrada para a frente, permitindo grande mobilidade e encaixe perfeito.',
    instructions: [
      'O parceiro de baixo deita de costas com pernas abertas.',
      'O parceiro de cima encaixa com uma perna flexionada de lado para apoio de peso.',
      'Ritmo lento com fricção constante maximiza as sensações.'
    ],
    comfortTip: 'Apoie uma das mãos no colchão para dividir o esforço das coxas.',
    activeTip: 'Controle o ângulo de inclinação do tronco para variar entre estímulo na parede anterior ou posterior.',
    passiveTip: 'Flexione os joelhos levemente para relaxar a pélvis.',
    isVip: false
  },
  {
    id: 'amazona-controle',
    title: 'Amazona Imperial',
    subtitle: 'Ela no comando absoluto do ritmo e ângulo',
    category: 'controle',
    complexity: 'Iniciante',
    intensity: 'Alta',
    location: 'Cama',
    focus: 'Estímulo Clitoriano & Ponto G',
    rating: 5,
    illustrationUrl: '/assets/pos-amazona.webp',
    description: 'Ideal para quem gosta de ditar a velocidade, controlar a profundidade e escolher o ângulo exato de prazer.',
    instructions: [
      'O parceiro deita-se relaxado de costas.',
      'A pessoa por cima senta-se ereta, apoiando os joelhos ao lado do corpo do parceiro.',
      'Movimentos circulares de quadril geram estímulo duplo sem fadiga.'
    ],
    comfortTip: 'Quem está embaixo pode colocar as mãos nos quadris para ajudar a dar segurança.',
    activeTip: 'Aproveite o controle total para encontrar o ponto mais sensível sem pressa.',
    passiveTip: 'Mantenha as mãos livres para acariciar os seios, cintura e rosto da parceira.',
    isVip: false
  },
  {
    id: 'arco-triunfal',
    title: 'Arco do Triunfo',
    subtitle: 'Roma não foi construída em um dia: flexibilidade e entrega',
    category: 'acrobaticas',
    complexity: 'Avançado',
    intensity: 'Intensa',
    location: 'Cama',
    focus: 'Curvatura Lombar & Sensação Intensa',
    rating: 5,
    illustrationUrl: '/assets/pos-arco.webp',
    description: 'Uma postura exuberante onde o quadril se eleva em arco, criando um ângulo íngreme de prazer e estética arrebatadora.',
    instructions: [
      'Quem recebe apoia as costas na cama e eleva o quadril contraindo levemente os glúteos.',
      'O parceiro ativo ajoelha-se entre as pernas e mantém firmeza nos ombros ou cintura.',
      'Movimentos firmes com pausas para contato visual intensificam o clímax.'
    ],
    comfortTip: 'Empilhem dois travesseiros sob a lombar para sustentar o arco sem sobrecarregar a musculatura.',
    activeTip: 'Mantenha o peso nos joelhos e guie os quadris para cima com as mãos.',
    passiveTip: 'Respire pausadamente e desfrute da sensação de expansão pélvica.',
    isVip: false
  },
  {
    id: 'bailarina-em-pe',
    title: 'Bailarina em Pé',
    subtitle: 'Se sentir dormência, basta trocar a perna de apoio',
    category: 'acrobaticas',
    complexity: 'Acrobático',
    intensity: 'Intensa',
    location: 'Em Pé',
    focus: 'Adrenalina, Paixão & Contato em Pé',
    rating: 5,
    illustrationUrl: '/assets/pos-bailarina.webp',
    description: 'Perfeita para momentos de desejo impulsivo na parede, no corredor ou no chuveiro.',
    instructions: [
      'Ambos ficam de pé; um parceiro eleva uma das pernas envolvendo a cintura do outro.',
      'O parceiro base sustenta a perna elevada com uma das mãos e abraça as costas com a outra.',
      'Apoiar as costas em uma parede firme garante equilíbrio absoluto.'
    ],
    comfortTip: 'Usem a parede ou o batente da porta como ponto fixo de sustentação.',
    activeTip: 'Mantenha os joelhos levemente destravados para não forçar as articulações.',
    passiveTip: 'Abrace firme o pescoço e deixe a perna de apoio firme no chão.',
    isVip: false
  },
  {
    id: 'cachorrinho-sentado',
    title: 'Cachorrinho Acolhedor',
    subtitle: 'O preferido com mais conforto e proximidade',
    category: 'classicas',
    complexity: 'Iniciante',
    intensity: 'Média',
    location: 'Cama',
    focus: 'Penetração Traseira & Carícias nas Costas',
    rating: 5,
    illustrationUrl: '/assets/pos-cachorrinho.webp',
    description: 'A clássica posição por trás adaptada para um encaixe mais relaxado, permitindo puxões de cabelo suaves e beijos na nuca.',
    instructions: [
      'Quem recebe fica de quatro na cama com cotovelos apoiados no colchão para descansar os punhos.',
      'O parceiro ativo posiciona-se por trás de joelhos, segurando firme nos quadris.',
      'A mão livre pode ser usada para estimular o clitóris ou os mamilos simultaneamente.'
    ],
    comfortTip: 'Coloquem um travesseiro sob o peito para descansar o pescoço e ombros.',
    activeTip: 'Ajuste a altura da bacia para garantir conforto muscular ao parceiro.',
    passiveTip: 'Arqueie a lombar suavemente para facilitar o ritmo.',
    isVip: false
  },
  {
    id: 'triangulo-dourado-menage',
    title: 'Triângulo Dourado (Ménage)',
    subtitle: 'Conexão a três com contato contínuo',
    category: 'menage',
    complexity: 'Avançado',
    intensity: 'Intensa',
    location: 'Cama',
    focus: 'Prazer Compartilhado sem Ninguém de Fora',
    rating: 5,
    illustrationUrl: '/assets/pos-69.webp',
    description: 'Especial para dinâmicas a três (HMM ou MHF), garantindo que todos os participantes estejam conectados visual e fisicamente.',
    instructions: [
      'A pessoa central fica deitada ou semi-sentada apoiada em travesseiros.',
      'O segundo participante posiciona-se à frente para carícias ou penetração.',
      'O terceiro participante conecta-se lateralmente ou por trás com massagem e estímulo oral.'
    ],
    comfortTip: 'Comunicação verbal aberta: chequem o conforto e o ritmo da pessoa central a cada minuto.',
    activeTip: 'Mantenha ritmo harmonioso com o outro parceiro ativo para não desequilibrar o toque.',
    passiveTip: 'Entregue-se às sensações múltiplas e indique com gemidos ou palavras onde o prazer está maior.',
    isVip: true
  },
  {
    id: 'espelho-lgbt-ativo-passivo',
    title: 'Espelho Versátil (LGBTQIA+)',
    subtitle: 'Ângulo de precisão e relaxamento',
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
  // MODO AMIGOS (LEVE / RESENHA / ZERO EXPLÍCITO)
  {
    id: 'amigo-1',
    type: 'verdade',
    mode: 'amigos',
    level: 1,
    text: 'Qual foi o maior mico que você já pagou na frente de alguém que você estava a fim?',
    points: 20,
    refusalOption: 'Beber 1 gole ou pagar prenda'
  },
  {
    id: 'amigo-2',
    type: 'desafio',
    mode: 'amigos',
    level: 1,
    text: 'Imite uma celebridade ou alguém da roda por 45 segundos até que alguém adivinhe!',
    timeSeconds: 45,
    points: 30,
    refusalOption: 'Cantar o refrão de uma música brega bem alto'
  },
  {
    id: 'amigo-3',
    type: 'eu_nunca',
    mode: 'amigos',
    level: 1,
    text: 'Eu nunca stalkeei os stories de alguém por uma conta falsa.',
    points: 15,
    refusalOption: 'Quem já fez, bebe 1 gole!'
  },
  {
    id: 'amigo-4',
    type: 'garrafa',
    mode: 'amigos',
    level: 1,
    text: 'O sorteado do fundo deve contar uma fofoca inofensiva sobre o sorteado do gargalo!',
    points: 25,
    refusalOption: 'Tomar 1 shot de água ou drink'
  },

  // MODO ESQUENTA (TOQUES / BEIJOS / PRELIMINARES)
  {
    id: 'esquenta-1',
    type: 'desafio',
    mode: 'esquenta',
    level: 2,
    text: 'Vende os olhos de Pessoa B e sussurre no ouvido dela 3 coisas que mais te atraem no corpo dela, seguido de um beijo de 15 segundos no pescoço.',
    timeSeconds: 15,
    points: 50,
    refusalOption: 'Beber 1 gole ou tirar 1 peça de roupa leve'
  },
  {
    id: 'esquenta-2',
    type: 'verdade',
    mode: 'esquenta',
    level: 2,
    text: 'Qual é a fantasia secreta que você mais tem vontade de realizar com a pessoa da sua frente?',
    points: 40,
    refusalOption: 'Beber 1 shot de drink'
  },
  {
    id: 'esquenta-3',
    type: 'garrafa',
    mode: 'esquenta',
    level: 2,
    text: 'A pessoa da ponta da garrafa deve dar uma massagem sensual de 1 minuto nos ombros e nuca da pessoa da base.',
    timeSeconds: 60,
    points: 60,
    refusalOption: 'Fazer 10 agachamentos sem camisa'
  },

  // MODO KAMA (+18 / SEM TABU)
  {
    id: 'kama-1',
    type: 'desafio',
    mode: 'kama',
    level: 3,
    text: 'Escolham uma posição do catálogo (ex: O Abraço do Sol) e pratiquem por 2 minutos ininterruptos mantendo contato visual.',
    timeSeconds: 120,
    points: 100,
    refusalOption: 'Beber 2 shots e ceder a vez de escolher o próximo desafio'
  },
  {
    id: 'kama-2',
    type: 'garrafa',
    mode: 'kama',
    level: 3,
    text: 'A pessoa do gargalo deve tirar uma peça de roupa da pessoa da base usando apenas uma das mãos ou a boca.',
    points: 80,
    refusalOption: 'Pagar prenda sorteada pelo grupo'
  },
  {
    id: 'kama-3',
    type: 'verdade',
    mode: 'kama',
    level: 3,
    text: 'Se você pudesse chamar qualquer pessoa aqui da roda para um ménage ou swing hoje, quem seria e como começaria?',
    points: 90,
    refusalOption: 'Beber até o fundo do copo'
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
