// ==========================================================================
// TELA DEDICADA DE PRODUTO (PDP) - ZSX OUTLET
// ==========================================================================

// Catálogo Completo de Produtos da Loja
const productsDB = {
    // --- CAMISAS ---
    'camisa-1': {
        id: 'camisa-1',
        name: 'Camiseta Oversized ZSX Graphic',
        category: 'Camisas & Camisetas',
        tag: 'NEW DROP • 2026',
        price: 99.90,
        originalPrice: 149.90,
        discount: '33% OFF',
        installments: '3x de R$ 33,30 sem juros',
        rating: 4.8,
        reviewsCount: 84,
        image: '../images/shirts3d.png',
        gallery: [
            '../images/shirts3d.png',
            '../images/shirts.png',
            '../images/shirts3d.png',
            '../images/shirts.png'
        ],
        colors: [
            { name: 'Preto ZSX', hex: '#111111' },
            { name: 'Off-White', hex: '#ebe7df' },
            { name: 'Cinza Grafite', hex: '#4b5563' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Camiseta oversized confeccionada em meia malha 100% algodão penteado 260 GSM com toque peletizado. Estampa em silk-screen de alta durabilidade com design brutalista contemporâneo.',
        specs: [
            'Modelagem Oversized streetwear ampla',
            'Algodão premium penteado 260 GSM',
            'Gola em ribana canelada de 3cm',
            'Costura ombro a ombro reforçada',
            'Toque aveludado anti-encolhimento'
        ],
        materialsText: '100% algodão penteado de fibra longa com acabamento peletizado.',
        fitText: 'Modelagem ampla oversized. Escolha seu tamanho usual para caimento solto.',
        shippingText: 'Envio rápido em até 24h úteis para todo o Brasil.'
    },

    'camisa-2': {
        id: 'camisa-2',
        name: 'Camiseta Boxy Heavyweight Preta',
        category: 'Camisas & Camisetas',
        tag: 'BESTSELLER • ESSENTIALS',
        price: 109.90,
        originalPrice: 159.90,
        discount: '31% OFF',
        installments: '3x de R$ 36,63 sem juros',
        rating: 4.9,
        reviewsCount: 142,
        image: '../images/shirts.png',
        gallery: [
            '../images/shirts.png',
            '../images/shirts3d.png',
            '../images/shirts.png',
            '../images/shirts3d.png'
        ],
        colors: [
            { name: 'Preto Onix', hex: '#09090b' },
            { name: 'Carvão Mineral', hex: '#27272a' }
        ],
        sizes: ['M', 'G', 'GG', 'XGG'],
        description: 'Camiseta corte boxy com caimento reto e estrutura encorpada. O clássico indispensável para o guarda-roupa streetwear de alto padrão.',
        specs: [
            'Modelagem Boxy Fit quadrada',
            'Malha Heavyweight 280 GSM',
            'Gola estruturada reforçada',
            'Tingimento reativo preto profundo'
        ],
        materialsText: '100% algodão heavyweight fio 20.1 penteado.',
        fitText: 'Caimento reto e encorpado sem sobras excessivas no comprimento.',
        shippingText: 'Entrega com rastreamento em tempo real.'
    },

    'camisa-3': {
        id: 'camisa-3',
        name: 'Camiseta Acid Wash Vintage ZSX',
        category: 'Camisas & Camisetas',
        tag: 'DROP LIMITADO',
        price: 119.90,
        originalPrice: 169.90,
        discount: '29% OFF',
        installments: '3x de R$ 39,96 sem juros',
        rating: 4.8,
        reviewsCount: 56,
        image: '../images/shirts3d.png',
        gallery: [
            '../images/shirts3d.png',
            '../images/shirts.png',
            '../images/shirts3d.png',
            '../images/shirts.png'
        ],
        colors: [
            { name: 'Cinza Chumbo Acid', hex: '#374151' },
            { name: 'Preto Estonado', hex: '#1f2937' }
        ],
        sizes: ['P', 'M', 'G'],
        description: 'Lavanderia acid wash artesanal que confere aspecto vintage único a cada exemplar. Toque ultra macio e maleável.',
        specs: [
            'Lavagem marmorizada artesanal',
            'Algodão 100% amaciado com silicone',
            'Visual vintage streetwear autêntico'
        ],
        materialsText: '100% algodão amaciado pré-lavado.',
        fitText: 'Modelagem solta e confortável.',
        shippingText: 'Envio seguro com garantia de troca.'
    },

    'camisa-4': {
        id: 'camisa-4',
        name: 'Camiseta Streetwear Off-White Minimal',
        category: 'Camisas & Camisetas',
        tag: 'MINIMAL COLLECTION',
        price: 99.90,
        originalPrice: 149.90,
        discount: '33% OFF',
        installments: '3x de R$ 33,30 sem juros',
        rating: 4.7,
        reviewsCount: 71,
        image: '../images/shirts.png',
        gallery: [
            '../images/shirts.png',
            '../images/shirts3d.png',
            '../images/shirts.png',
            '../images/shirts3d.png'
        ],
        colors: [
            { name: 'Off-White', hex: '#f4f4f5' },
            { name: 'Creme Areia', hex: '#e7e5e4' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Tonalidade neutra off-white com microponto discreto no peito. Versatilidade para combinar com qualquer sobreposição.',
        specs: [
            'Tom neutro contemporâneo',
            'Algodão penteado premium',
            'Gola e punhos com costura invisível'
        ],
        materialsText: '100% algodão penteado.',
        fitText: 'Modelagem standard streetwear.',
        shippingText: 'Envio expresso.'
    },

    // --- BERMUDAS ---
    'bermuda-1': {
        id: 'bermuda-1',
        name: 'Bermuda Cargo Streetwear Preta',
        category: 'Bermudas & Shorts',
        tag: 'BESTSELLER • UTILITY',
        price: 129.90,
        originalPrice: 189.90,
        discount: '31% OFF',
        installments: '4x de R$ 32,47 sem juros',
        rating: 4.9,
        reviewsCount: 118,
        image: '../images/shorts3d.png',
        gallery: [
            '../images/shorts3d.png',
            '../images/shorts.png',
            '../images/shorts3d.png',
            '../images/shorts.png'
        ],
        colors: [
            { name: 'Preto ZSX', hex: '#111111' },
            { name: 'Verde Militar', hex: '#374151' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Bermuda cargo com múltiplos bolsos fole utilitários, cós elástico anatômico com cordão reforçado e tecido ripstop flexível.',
        specs: [
            'Bolsos laterais com lapela de velcro',
            'Cós ajustável com cordão esportivo',
            'Tecido resistente a rasgos e abrasão',
            'Comprimento acima do joelho'
        ],
        materialsText: '65% algodão e 35% poliéster ripstop encorpado.',
        fitText: 'Caimento solto e funcional para mobilidade máxima.',
        shippingText: 'Entrega imediata.'
    },

    'bermuda-2': {
        id: 'bermuda-2',
        name: 'Bermuda Moletom Heavyweight Mescla',
        category: 'Bermudas & Shorts',
        tag: 'COMFORT ESSENTIAL',
        price: 119.90,
        originalPrice: 169.90,
        discount: '29% OFF',
        installments: '3x de R$ 39,96 sem juros',
        rating: 4.8,
        reviewsCount: 64,
        image: '../images/shorts.png',
        gallery: [
            '../images/shorts.png',
            '../images/shorts3d.png',
            '../images/shorts.png',
            '../images/shorts3d.png'
        ],
        colors: [
            { name: 'Cinza Mescla', hex: '#9ca3af' },
            { name: 'Preto', hex: '#111111' }
        ],
        sizes: ['M', 'G', 'GG'],
        description: 'Bermuda em moletom felpado 380 GSM com toque aveludado e bolsos faca embutidos.',
        specs: [
            'Moletom 380 GSM felpado macio',
            'Bolsos laterais e bolso traseiro embutido',
            'Barra com acabamento a fio discreto'
        ],
        materialsText: '80% algodão e 20% poliéster.',
        fitText: 'Caimento relaxado e extremamente macio.',
        shippingText: 'Envio seguro com código de rastreamento.'
    },

    'bermuda-3': {
        id: 'bermuda-3',
        name: 'Bermuda Nylon Ripstop Utility',
        category: 'Bermudas & Shorts',
        tag: 'WATER REPELLENT',
        price: 139.90,
        originalPrice: 199.90,
        discount: '30% OFF',
        installments: '4x de R$ 34,97 sem juros',
        rating: 4.8,
        reviewsCount: 79,
        image: '../images/shorts3d.png',
        gallery: [
            '../images/shorts3d.png',
            '../images/shorts.png',
            '../images/shorts3d.png',
            '../images/shorts.png'
        ],
        colors: [
            { name: 'Preto ZSX', hex: '#111111' },
            { name: 'Cinza Concreto', hex: '#64748b' }
        ],
        sizes: ['P', 'M', 'G', 'GG', 'XGG'],
        description: 'Shorts técnico em nylon hidrofóbico ultraleve. Secagem rápida e respirabilidade para os dias mais quentes.',
        specs: [
            'Nylon hidrofóbico de secagem ultrarrápida',
            'Forro interno ventilado em mesh',
            'Zíperes selados contra umidade'
        ],
        materialsText: '100% poliamida ultraleve.',
        fitText: 'Comprimento moderno 5 polegadas.',
        shippingText: 'Envio expresso.'
    },

    'bermuda-4': {
        id: 'bermuda-4',
        name: 'Bermuda ZSX Sport Comfort',
        category: 'Bermudas & Shorts',
        tag: 'EVERYDAY FIT',
        price: 109.90,
        originalPrice: 159.90,
        discount: '31% OFF',
        installments: '3x de R$ 36,63 sem juros',
        rating: 4.7,
        reviewsCount: 48,
        image: '../images/shorts.png',
        gallery: [
            '../images/shorts.png',
            '../images/shorts3d.png',
            '../images/shorts.png',
            '../images/shorts3d.png'
        ],
        colors: [
            { name: 'Preto ZSX', hex: '#111111' },
            { name: 'Azul Marinho', hex: '#1e3a8a' }
        ],
        sizes: ['P', 'M', 'G'],
        description: 'Bermuda casual esportiva com modelagem anatômica para o dia a dia.',
        specs: [
            'Tecido macio com elastano',
            'Cós reforçado com elástico',
            'Bolsos funcionais profundos'
        ],
        materialsText: '95% algodão e 5% elastano.',
        fitText: 'Caimento regular.',
        shippingText: 'Envio garantido.'
    },

    // --- BONÉS ---
    'bone-1': {
        id: 'bone-1',
        name: 'Boné Dad Hat ZSX Logo Bordado',
        category: 'Bonés & Acessórios',
        tag: 'BESTSELLER',
        price: 79.90,
        originalPrice: 119.90,
        discount: '33% OFF',
        installments: '2x de R$ 39,95 sem juros',
        rating: 4.9,
        reviewsCount: 168,
        image: '../images/hats3d.png',
        gallery: [
            '../images/hats3d.png',
            '../images/caps.png',
            '../images/hats3d.png',
            '../images/caps.png'
        ],
        colors: [
            { name: 'Preto ZSX', hex: '#111111' },
            { name: 'Bege Areia', hex: '#d6cebf' }
        ],
        sizes: ['Único (Ajustável)'],
        description: 'Boné dad hat desestruturado em sarja 100% algodão pré-lavada. Fivela de metal antioxidante com passador de tecido embutido.',
        specs: [
            'Copa desestruturada anatômica de 6 gomos',
            'Bordado frontal em alto relevo 3D',
            'Fivela metálica com fecho strapback personalizado',
            'Aba curva com costuras reforçadas'
        ],
        materialsText: '100% sarja de algodão peletizada.',
        fitText: 'Ajuste universal via fivela traseira (circunferência de 54 a 62 cm).',
        shippingText: 'Enviado em caixa protetora rígida para não amassar a aba.'
    },

    'bone-2': {
        id: 'bone-2',
        name: 'Boné 5 Panel Streetwear Preto',
        category: 'Bonés & Acessórios',
        tag: 'URBAN ICON',
        price: 89.90,
        originalPrice: 129.90,
        discount: '31% OFF',
        installments: '3x de R$ 29,96 sem juros',
        rating: 4.8,
        reviewsCount: 82,
        image: '../images/caps.png',
        gallery: [
            '../images/caps.png',
            '../images/hats3d.png',
            '../images/caps.png',
            '../images/hats3d.png'
        ],
        colors: [
            { name: 'Preto ZSX', hex: '#111111' }
        ],
        sizes: ['Único (Ajustável)'],
        description: 'Boné 5-panel em tecido ripstop com ilhoses respiráveis e fecho de fita de nylon com clipe rápido.',
        specs: [
            'Modelagem 5-panel rasa contemporânea',
            'Aba reta moldável',
            'Fecho rápido em nylon com engate esportivo'
        ],
        materialsText: 'Tecido técnico ripstop de alta densidade.',
        fitText: 'Ajuste rápido.',
        shippingText: 'Envio rápido.'
    },

    'bone-3': {
        id: 'bone-3',
        name: 'Boné Trucker Vintage ZSX Racing',
        category: 'Bonés & Acessórios',
        tag: 'VINTAGE DROP',
        price: 84.90,
        originalPrice: 119.90,
        discount: '29% OFF',
        installments: '2x de R$ 42,45 sem juros',
        rating: 4.7,
        reviewsCount: 63,
        image: '../images/hats3d.png',
        gallery: [
            '../images/hats3d.png',
            '../images/caps.png',
            '../images/hats3d.png',
            '../images/caps.png'
        ],
        colors: [
            { name: 'Preto e Branco', hex: '#18181b' }
        ],
        sizes: ['Único (Ajustável)'],
        description: 'Boné trucker com tela traseira respirável e patch emborrachado frontal.',
        specs: [
            'Tela traseira de alta ventilação',
            'Fecho snapback regulável clássico',
            'Patch frontal de alta definição'
        ],
        materialsText: 'Frente em algodão e tela em poliéster.',
        fitText: 'Regulagem snapback.',
        shippingText: 'Embalagem rígida protetora.'
    },

    'bone-4': {
        id: 'bone-4',
        name: 'Gorro Beanie Heavy Knit ZSX',
        category: 'Bonés & Acessórios',
        tag: 'WINTER ESSENTIAL',
        price: 69.90,
        originalPrice: 99.90,
        discount: '30% OFF',
        installments: '2x de R$ 34,95 sem juros',
        rating: 4.9,
        reviewsCount: 95,
        image: '../images/caps.png',
        gallery: [
            '../images/caps.png',
            '../images/hats3d.png',
            '../images/caps.png',
            '../images/hats3d.png'
        ],
        colors: [
            { name: 'Preto ZSX', hex: '#111111' },
            { name: 'Cinza Mescla', hex: '#6b7280' }
        ],
        sizes: ['Único'],
        description: 'Gorro em malha canelada pesada com dobra ajustável e etiqueta bordada exclusiva.',
        specs: [
            'Ponto canelado elástico e encorpado',
            'Etiqueta tecida ZSX no punho',
            'Retenção térmica sem apertar a cabeça'
        ],
        materialsText: '100% acrílico térmico antialérgico.',
        fitText: 'Modelagem elástica adapta-se confortavelmente.',
        shippingText: 'Envio seguro.'
    },

    // --- CAMISAS DE TIME (JERSEYS) ---
    'jersey-1': {
        id: 'jersey-1',
        name: 'Jersey Brasil ZSX Copa Street Edition',
        category: 'Camisas de Time',
        tag: 'COPA DO MUNDO • ICONIC',
        price: 159.90,
        originalPrice: 229.90,
        discount: '30% OFF',
        installments: '5x de R$ 31,98 sem juros',
        rating: 5.0,
        reviewsCount: 224,
        image: '../images/newRelease.png',
        gallery: [
            '../images/newRelease.png',
            '../images/jerseys3d.png',
            '../images/jerseys.png',
            '../images/newRelease.png'
        ],
        colors: [
            { name: 'Amarelo Canarinho Street', hex: '#fbbf24' },
            { name: 'Azul Royal', hex: '#1d4ed8' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'A peça principal do drop da Copa: modelagem esportiva oversized com gola polo vintage em ribana e tecido jacquard texturizado com detalhes em relevo.',
        specs: [
            'Tecido Dry-Fit respirável com controle térmico',
            'Gola polo retrô canelada',
            'Escudo bordado com acabamento dourado',
            'Costuras duplas anti-rasgo'
        ],
        materialsText: '100% poliéster tecnológico texturizado.',
        fitText: 'Caimento oversized casual para uso nas ruas.',
        shippingText: 'Envio expresso rastreado.'
    },

    'jersey-2': {
        id: 'jersey-2',
        name: 'Jersey Vintage Retro Football Black',
        category: 'Camisas de Time',
        tag: 'RETRO DROP',
        price: 149.90,
        originalPrice: 219.90,
        discount: '32% OFF',
        installments: '4x de R$ 37,47 sem juros',
        rating: 4.8,
        reviewsCount: 104,
        image: '../images/jerseys3d.png',
        gallery: [
            '../images/jerseys3d.png',
            '../images/jerseys.png',
            '../images/newRelease.png',
            '../images/jerseys3d.png'
        ],
        colors: [
            { name: 'Preto e Prata', hex: '#111111' }
        ],
        sizes: ['M', 'G', 'GG'],
        description: 'Design inspirado nos anos 90 com gola V estruturada e listras sublimadas de alta definição.',
        specs: [
            'Gola V canelada estruturada',
            'Tecido jacquard com brilho fosco',
            'Secagem ultra rápida'
        ],
        materialsText: '100% poliéster premium sublimado.',
        fitText: 'Modelagem boxy esportiva.',
        shippingText: 'Entrega rápida.'
    },

    'jersey-3': {
        id: 'jersey-3',
        name: 'Jersey Basketball Oversized ZSX 98',
        category: 'Camisas de Time',
        tag: 'STREET HOOPS',
        price: 139.90,
        originalPrice: 199.90,
        discount: '30% OFF',
        installments: '4x de R$ 34,97 sem juros',
        rating: 4.9,
        reviewsCount: 92,
        image: '../images/jerseys.png',
        gallery: [
            '../images/jerseys.png',
            '../images/jerseys3d.png',
            '../images/newRelease.png',
            '../images/jerseys.png'
        ],
        colors: [
            { name: 'Preto e Branco', hex: '#18181b' },
            { name: 'Vermelho ZSX', hex: '#e11d48' }
        ],
        sizes: ['P', 'M', 'G', 'GG', 'XGG'],
        description: 'Regata de basquete em mesh pesado com debrum canelado em dois tons e número 98 aplicado em sarja bordada.',
        specs: [
            'Mesh aberto com forro duplo interno',
            'Aplicações em sarja costurada',
            'Cavas amplas para usar com camiseta por baixo'
        ],
        materialsText: '100% poliéster mesh pesado.',
        fitText: 'Modelagem ampla de basquete.',
        shippingText: 'Envio seguro.'
    },

    'jersey-4': {
        id: 'jersey-4',
        name: 'Jersey Streetwear Blockcore Edition',
        category: 'Camisas de Time',
        tag: 'BLOCKCORE',
        price: 149.90,
        originalPrice: 209.90,
        discount: '28% OFF',
        installments: '4x de R$ 37,47 sem juros',
        rating: 4.8,
        reviewsCount: 76,
        image: '../images/jerseys3d.png',
        gallery: [
            '../images/jerseys3d.png',
            '../images/jerseys.png',
            '../images/newRelease.png',
            '../images/jerseys3d.png'
        ],
        colors: [
            { name: 'Branco e Preto', hex: '#ffffff' }
        ],
        sizes: ['M', 'G', 'GG'],
        description: 'A tendência global do blockcore com caimento streetwear e acabamentos de alfaiataria esportiva.',
        specs: [
            'Tecido jacquard com padrão geométrico',
            'Logo metálico prensado a quente'
        ],
        materialsText: '100% poliéster tecnológico.',
        fitText: 'Caimento regular solto.',
        shippingText: 'Envio imediato.'
    },

    // --- CALÇADOS ---
    'calcado-1': {
        id: 'calcado-1',
        name: 'Tênis ZSX Chunky Runner 3D',
        category: 'Calçados & Tênis',
        tag: 'BESTSELLER • ARCHIVE',
        price: 299.90,
        originalPrice: 449.90,
        discount: '33% OFF',
        installments: '6x de R$ 49,98 sem juros',
        rating: 4.9,
        reviewsCount: 188,
        image: '../images/shoes3d.png',
        gallery: [
            '../images/shoes3d.png',
            '../images/shoes-original.png',
            '../images/shoes3d.png',
            '../images/shoes-original.png'
        ],
        colors: [
            { name: 'Branco & Off-White', hex: '#f4f4f5' },
            { name: 'Preto Total', hex: '#111111' }
        ],
        sizes: ['38', '39', '40', '41', '42', '43'],
        description: 'Tênis chunky futurista com solado robusto em EVA expandido e cabedal multicamadas em couro sintético nobre e mesh respirável.',
        specs: [
            'Solado tratorado em EVA leve e borracha antiderrapante',
            'Cabedal com camadas reforçadas em couro sintético e mesh',
            'Palmilha anatômica anti-impacto com memória',
            'Cadarços tubulares reforçados com passadores metálicos'
        ],
        materialsText: 'Cabedal em couro sintético PU e poliéster mesh. Solado em EVA e borracha natural.',
        fitText: 'Forma padrão brasileira. Recomendamos comprar o tamanho habitual.',
        shippingText: 'Enviado em caixa dupla reforçada ZSX com saco em tecido de proteção.'
    },

    'calcado-2': {
        id: 'calcado-2',
        name: 'Tênis Streetwear Low Profile Black',
        category: 'Calçados & Tênis',
        tag: 'MINIMAL LUXURY',
        price: 279.90,
        originalPrice: 399.90,
        discount: '30% OFF',
        installments: '6x de R$ 46,65 sem juros',
        rating: 4.8,
        reviewsCount: 94,
        image: '../images/shoes-original.png',
        gallery: [
            '../images/shoes-original.png',
            '../images/shoes3d.png',
            '../images/shoes-original.png',
            '../images/shoes3d.png'
        ],
        colors: [
            { name: 'Preto Total', hex: '#111111' }
        ],
        sizes: ['39', '40', '41', '42'],
        description: 'Silhueta baixa clássica em camurça e lona encorpada para um visual clean e versátil.',
        specs: [
            'Solado vulcanizado emborrachado resistente',
            'Cabedal em lona pesada e detalhes em camurça',
            'Palmilha confortável de espuma de alta densidade'
        ],
        materialsText: 'Lona de algodão e camurça bovina.',
        fitText: 'Tamanho padrão.',
        shippingText: 'Envio rápido.'
    },

    'calcado-3': {
        id: 'calcado-3',
        name: 'Tênis Skate Retro ZSX White',
        category: 'Calçados & Tênis',
        tag: 'SKATE ARCHIVE',
        price: 259.90,
        originalPrice: 379.90,
        discount: '31% OFF',
        installments: '6x de R$ 43,31 sem juros',
        rating: 4.8,
        reviewsCount: 78,
        image: '../images/shoes-original.png',
        gallery: [
            '../images/shoes-original.png',
            '../images/shoes3d.png',
            '../images/shoes-original.png',
            '../images/shoes3d.png'
        ],
        colors: [
            { name: 'Branco Puro', hex: '#ffffff' }
        ],
        sizes: ['38', '39', '40', '41', '42'],
        description: 'Tênis retro skate com solado de alta aderência e língua acolchoada.',
        specs: [
            'Língua acolchoada com espuma densa',
            'Solado waffle com alta tração',
            'Costura dupla em toda a biqueira'
        ],
        materialsText: 'Couro sintético microfibra e borracha.',
        fitText: 'Tamanho padrão.',
        shippingText: 'Envio seguro com garantia.'
    },

    'calcado-4': {
        id: 'calcado-4',
        name: 'Slide ZSX Cloud Sandal',
        category: 'Calçados & Tênis',
        tag: 'COMFORT CLOUD',
        price: 129.90,
        originalPrice: 179.90,
        discount: '28% OFF',
        installments: '4x de R$ 32,47 sem juros',
        rating: 4.7,
        reviewsCount: 88,
        image: '../images/shoes3d.png',
        gallery: [
            '../images/shoes3d.png',
            '../images/shoes-original.png',
            '../images/shoes3d.png',
            '../images/shoes-original.png'
        ],
        colors: [
            { name: 'Preto ZSX', hex: '#111111' },
            { name: 'Areia Nude', hex: '#d6cebf' }
        ],
        sizes: ['37/38', '39/40', '41/42', '43/44'],
        description: 'Slide anatômico monobloco em EVA ultra macio. Sensação de caminhar nas nuvens com estilo minimalista.',
        specs: [
            'Moldado em bloco único de EVA injetado',
            'Secagem instantânea e impermeável',
            'Palmilha com relevos de massagem para os pés'
        ],
        materialsText: '100% EVA injetado ultra macio.',
        fitText: 'Forma ampla e confortável.',
        shippingText: 'Envio rápido.'
    },

    'casaco-1': {
        id: 'casaco-1',
        name: 'Moletom Adidas Preto Oversized',
        category: 'Casacos & Moletons',
        tag: 'NEW ARRIVAL • BESTSELLER',
        price: 189.90,
        originalPrice: 299.90,
        discount: '36% OFF',
        installments: '6x de R$ 31,65 sem juros',
        rating: 4.9,
        reviewsCount: 165,
        image: '../images/products/blusao-adidas.jpg',
        gallery: [
            '../images/products/blusao-adidas.jpg',
            '../images/products/corta-vento.jpg',
            '../images/products/bobojaco.jpg',
            '../images/products/sueter.jpg'
        ],
        colors: [
            { name: 'Preto ZSX', hex: '#111111' },
            { name: 'Cinza Mescla', hex: '#6b7280' },
            { name: 'Off-White', hex: '#ebe7df' },
            { name: 'Bege Areia', hex: '#c5b6a3' }
        ],
        sizes: ['P', 'M', 'G', 'GG', 'XGG'],
        description: 'Moletom heavyweight confeccionado em algodão premium 420 GSM felpado. Modelagem oversized com caimento caído nos ombros, capuz duplo estruturado e bolso canguru com costuras reforçadas. O equilíbrio definitivo entre conforto térmico e atitude streetwear contemporânea.',
        specs: [
            'Modelagem Streetwear Oversized autêntica',
            'Tecido 100% Algodão Heavyweight Penteado 420 GSM',
            'Capuz anatômico duplo com ilhós e cordão premium',
            'Punhos e barra canelados com elastano de alta retenção',
            'Costuras duplas reforçadas nos ombros e cavas',
            'Unissex com caimento estruturado e fluido'
        ],
        materialsText: 'Confeccionado com fio 100% algodão penteado de fibra longa, pré-encolhido e com acabamento peletizado de toque ultra aveludado. A gramatura de 420 GSM garante isolamento térmico elevado sem perder a maleabilidade.',
        fitText: 'Modelagem ampla e moderna (oversized). Se você prefere o visual tradicional caído com atitude urbana, escolha o seu tamanho padrão. Para um caimento mais alinhado ao corpo, recomendamos um tamanho menor.',
        shippingText: 'Envio expresso para todo o Brasil em até 24 horas úteis após a confirmação do pagamento. Rastreamento em tempo real via WhatsApp e e-mail. Primeira troca 100% gratuita em até 30 dias.'
    },

    'casaco-2': {
        id: 'casaco-2',
        name: 'Corta-Vento ZSX Preto Ripstop',
        category: 'Casacos & Jaquetas',
        tag: 'WATER RESISTANT',
        price: 219.90,
        originalPrice: 329.90,
        discount: '33% OFF',
        installments: '6x de R$ 36,65 sem juros',
        rating: 4.8,
        reviewsCount: 112,
        image: '../images/products/corta-vento.jpg',
        gallery: [
            '../images/products/corta-vento.jpg',
            '../images/products/corta-vento-nike.jpg',
            '../images/products/blusao-adidas.jpg',
            '../images/products/bobojaco.jpg'
        ],
        colors: [
            { name: 'Preto ZSX', hex: '#111111' },
            { name: 'Verde Militar', hex: '#374151' },
            { name: 'Azul Petróleo', hex: '#1e293b' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Jaqueta corta-vento produzida em tecido técnico ripstop com acabamento repelente a água e vento. Zíper frontal tratorado com puxador emborrachado, capuz com cordões elásticos ajustáveis e forro respirável interno.',
        specs: [
            'Tecido Ripstop impermeável e resistente a rasgos',
            'Forro interno em mesh dry respirável',
            'Zíper frontal reforçado tratorado bidirecional',
            'Ajustes elásticos com stopper no capuz e barra',
            'Bolsos laterais com zíper invisível de segurança',
            'Leveza e proteção para o dia a dia urbano'
        ],
        materialsText: 'Composição 100% poliamida com membrana hidrofóbica DWR (Durable Water Repellent). Bloqueia ventos fortes e garoas leves mantendo o corpo seco.',
        fitText: 'Modelagem regular fit ergonômica com espaço confortável para usar por cima de camisetas ou moletons leves.',
        shippingText: 'Entrega rápida com seguro total contra extravios. Código de rastreamento enviado automaticamente.'
    },

    'casaco-3': {
        id: 'casaco-3',
        name: 'Jaqueta Puffer ZSX Winter Black',
        category: 'Casacos & Jaquetas',
        tag: 'WINTER EDITION • LUXURY',
        price: 249.90,
        originalPrice: 399.90,
        discount: '37% OFF',
        installments: '6x de R$ 41,65 sem juros',
        rating: 5.0,
        reviewsCount: 210,
        image: '../images/products/bobojaco.jpg',
        gallery: [
            '../images/products/bobojaco.jpg',
            '../images/products/blusao-adidas.jpg',
            '../images/products/corta-vento.jpg',
            '../images/products/sueter.jpg'
        ],
        colors: [
            { name: 'Preto Fosco', hex: '#18181b' },
            { name: 'Cinza Chumbo', hex: '#3f3f46' },
            { name: 'Off-White', hex: '#e4e4e7' }
        ],
        sizes: ['M', 'G', 'GG', 'XGG'],
        description: 'Jaqueta puffer acolchoada com isolamento térmico ultra leve e gola alta protetora. Acabamento externo fosco acetinado, punhos elásticos anatômicos e bolsos laterais embutidos com forro térmico especial.',
        specs: [
            'Enchimento sintético featherless de alta densidade',
            'Gola alta estruturada com protetor de queixo',
            'Tecido externo fosco acetinado com toque macio',
            'Bolsos internos para carteira e smartphone',
            'Punhos internos com elástico corta-vento',
            'Design clean brutalista sem costuras aparentes na frente'
        ],
        materialsText: 'Exterior 100% poliéster fosco de alta gramatura. Forro térmico em tafetá e enchimento térmico antialérgico de rápida recuperação de volume.',
        fitText: 'Caimento boxy puffer moderno. Perfeito para compor sobreposições de inverno com camisetas e moletons.',
        shippingText: 'Produto embalado em caixa reforçada com capa protetora de tecido ZSX.'
    },

    'casaco-4': {
        id: 'casaco-4',
        name: 'Suéter High Knit Streetwear',
        category: 'Casacos & Tricôs',
        tag: 'EXCLUSIVE DROP',
        price: 199.90,
        originalPrice: 289.90,
        discount: '31% OFF',
        installments: '6x de R$ 33,31 sem juros',
        rating: 4.7,
        reviewsCount: 78,
        image: '../images/products/sueter.jpg',
        gallery: [
            '../images/products/sueter.jpg',
            '../images/products/blusao-adidas.jpg',
            '../images/products/corta-vento.jpg',
            '../images/products/bobojaco.jpg'
        ],
        colors: [
            { name: 'Estampado Street', hex: '#27272a' },
            { name: 'Grafite ZSX', hex: '#52525b' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Suéter em tricô jacquard encorpado com padrões gráficos de alta definição. Fio de algodão de toque ultra macio, gola redonda reforçada e caimento solto no corpo para um estilo high fashion autêntico.',
        specs: [
            'Trama jacquard densa em ponto inglês',
            'Fio nobre anti-pilling (não forma bolinhas)',
            'Gola careca reforçada com costura invisível',
            'Barra e punhos com elasticidade permanente',
            'Toque térmico e respirável para meia-estação e inverno'
        ],
        materialsText: 'Composição: 70% algodão nobre e 30% poliacrílico termossensível.',
        fitText: 'Modelagem relaxada com mangas amplas e ombros deslocados.',
        shippingText: 'Envio imediato com garantia de devolução sem burocracia.'
    },

    'casaco-5': {
        id: 'casaco-5',
        name: 'Corta-Vento Nike Sport Preto',
        category: 'Casacos & Jaquetas',
        tag: 'ICONIC ATHLETIC',
        price: 219.90,
        originalPrice: 349.90,
        discount: '37% OFF',
        installments: '6x de R$ 36,65 sem juros',
        rating: 4.9,
        reviewsCount: 184,
        image: '../images/products/corta-vento-nike.jpg',
        gallery: [
            '../images/products/corta-vento-nike.jpg',
            '../images/products/corta-vento.jpg',
            '../images/products/blusao-adidas.jpg',
            '../images/products/bobojaco.jpg'
        ],
        colors: [
            { name: 'Preto Athletic', hex: '#09090b' },
            { name: 'Preto e Branco', hex: '#27272a' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Corta-vento técnico de alta mobilidade com tecido corta-vento ultra leve, design dinâmico e logos termocolados de alta durabilidade. Ideal para transição entre treinos e uso urbano moderno.',
        specs: [
            'Tecido corta-vento ultraleve de secagem rápida',
            'Zíper selado frontal com acabamento refletivo',
            'Capuz ergonômico ajustável em múltiplos pontos',
            'Abertura posterior para ventilação estratégica',
            'Punhos elásticos de perfil baixo'
        ],
        materialsText: '100% poliéster reciclado de alta tenacidade.',
        fitText: 'Modelagem atlética com liberdade de movimentos.',
        shippingText: 'Frete Grátis com envio rastreado para todo o país.'
    },

    'polo-1': {
        id: 'polo-1',
        name: 'Camisa Polo ZSX Branca Premium',
        category: 'Camisas Polo',
        tag: 'CLÁSSICO STREETWEAR',
        price: 89.90,
        originalPrice: 139.90,
        discount: '35% OFF',
        installments: '3x de R$ 29,96 sem juros',
        rating: 4.8,
        reviewsCount: 94,
        image: '../images/products/Captura de tela 2026-09-24 113712.png',
        gallery: [
            '../images/products/Captura de tela 2026-09-24 113712.png',
            '../images/products/Captura de tela 2026-09-24 113730.png',
            '../images/products/blusao-adidas.jpg',
            '../images/products/corta-vento.jpg'
        ],
        colors: [
            { name: 'Branco Puro', hex: '#ffffff' },
            { name: 'Off-White', hex: '#f4f4f5' },
            { name: 'Preto ZSX', hex: '#18181b' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Camisa polo confeccionada em piquet 100% algodão de fibra longa, gola e punhos canelados estruturados e peitilho com botões personalizados ZSX.',
        specs: [
            'Tecido Piquet 100% Algodão penteado nobre',
            'Gola firme que não enrola após a lavagem',
            'Peitilho com botões foscos personalizados',
            'Fendas laterais na barra para melhor caimento',
            'Bordado sutil de alta definição'
        ],
        materialsText: '100% algodão penteado de fibra longa.',
        fitText: 'Modelagem custom fit equilibrada.',
        shippingText: 'Envio imediato.'
    },

    'polo-2': {
        id: 'polo-2',
        name: 'Camisa Polo ZSX Preta Night',
        category: 'Camisas Polo',
        tag: 'MAIS VENDIDO',
        price: 89.90,
        originalPrice: 139.90,
        discount: '35% OFF',
        installments: '3x de R$ 29,96 sem juros',
        rating: 4.9,
        reviewsCount: 128,
        image: '../images/products/Captura de tela 2026-09-24 113730.png',
        gallery: [
            '../images/products/Captura de tela 2026-09-24 113730.png',
            '../images/products/Captura de tela 2026-09-24 113712.png',
            '../images/products/blusao-adidas.jpg',
            '../images/products/sueter.jpg'
        ],
        colors: [
            { name: 'Preto Onix', hex: '#09090b' },
            { name: 'Grafite Escuro', hex: '#27272a' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Polo minimalista preta com caimento sob medida, tecido piquet respirável pré-encolhido que não desbota após as lavagens.',
        specs: [
            'Tingimento reativo preto profundo',
            'Piquet respirável pré-encolhido',
            'Costuras duplas reforçadas'
        ],
        materialsText: '100% algodão piquet nobre.',
        fitText: 'Modelagem regular alinhada.',
        shippingText: 'Envio expresso.'
    },

    'polo-3': {
        id: 'polo-3',
        name: 'Camisa Polo ZSX Listrada Classic',
        category: 'Camisas Polo',
        tag: 'DROP LIMITADO',
        price: 89.90,
        originalPrice: 139.90,
        discount: '35% OFF',
        installments: '3x de R$ 29,96 sem juros',
        rating: 4.8,
        reviewsCount: 65,
        image: '../images/products/Captura de tela 2026-09-24 113712.png',
        gallery: [
            '../images/products/Captura de tela 2026-09-24 113712.png',
            '../images/products/Captura de tela 2026-09-24 113730.png',
            '../images/products/bobojaco.jpg',
            '../images/products/corta-vento-nike.jpg'
        ],
        colors: [
            { name: 'Listrada Branco/Preto', hex: '#e4e4e7' },
            { name: 'Preto ZSX', hex: '#18181b' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Polo listrada com referência retrô contemporânea, bordado discreto no tórax e toque extremamente macio.',
        specs: [
            'Listras tecidas fio a fio',
            'Piquet premium de alta durabilidade',
            'Caimento impecável'
        ],
        materialsText: '100% algodão.',
        fitText: 'Modelagem regular.',
        shippingText: 'Entrega rápida em todo o Brasil.'
    },

    'polo-4': {
        id: 'polo-4',
        name: 'Camisa Polo ZSX Dark Shadow',
        category: 'Camisas Polo',
        tag: 'DROP NOTURNO',
        price: 89.90,
        originalPrice: 139.90,
        discount: '35% OFF',
        installments: '3x de R$ 29,96 sem juros',
        rating: 4.7,
        reviewsCount: 51,
        image: '../images/products/Captura de tela 2026-09-24 113730.png',
        gallery: [
            '../images/products/Captura de tela 2026-09-24 113730.png',
            '../images/products/Captura de tela 2026-09-24 113712.png',
            '../images/products/blusao-adidas.jpg',
            '../images/products/corta-vento.jpg'
        ],
        colors: [
            { name: 'Preto ZSX', hex: '#111111' },
            { name: 'Cinza Carvão', hex: '#374151' }
        ],
        sizes: ['M', 'G', 'GG'],
        description: 'Polo com tingimento reativo que preserva o preto profundo, gola reforçada e costuras duplas nos ombros.',
        specs: [
            'Gola firme e estruturada',
            'Piquet 100% algodão',
            'Toque macio e respirável'
        ],
        materialsText: '100% algodão.',
        fitText: 'Modelagem alinhada.',
        shippingText: 'Envio seguro e rastreado.'
    },

    'polo-5': {
        id: 'polo-5',
        name: 'Camisa Polo ZSX White Elegance',
        category: 'Camisas Polo',
        tag: 'ESSENTIALS',
        price: 89.90,
        originalPrice: 139.90,
        discount: '35% OFF',
        installments: '3x de R$ 29,96 sem juros',
        rating: 4.9,
        reviewsCount: 88,
        image: '../images/products/Captura de tela 2026-09-24 113712.png',
        gallery: [
            '../images/products/Captura de tela 2026-09-24 113712.png',
            '../images/products/Captura de tela 2026-09-24 113730.png',
            '../images/products/corta-vento.jpg',
            '../images/products/sueter.jpg'
        ],
        colors: [
            { name: 'Branco Puro', hex: '#ffffff' },
            { name: 'Areia', hex: '#d4c7b8' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Polo clássica branca de alfaiataria casual, corte alinhado ao corpo sem apertar, proporcionando elegância no visual streetwear.',
        specs: [
            'Algodão piquet peletizado',
            'Acabamento acetinado sutil',
            'Alta durabilidade'
        ],
        materialsText: '100% algodão de fibra longa.',
        fitText: 'Modelagem confortável.',
        shippingText: 'Entrega garantida para todo o Brasil.'
    }
};

// Estado da Página do Produto
let currentProduct = null;
let selectedColor = '';
let selectedSize = '';
let currentQuantity = 1;
let currentActiveImgIndex = 0;
let isWishlisted = false;

// Formatador BRL
function formatMoneyBRL(val) {
    return Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Obter ID do Produto da URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id && productsDB[id]) {
        return id;
    }
    // Padrão: casaco-1 (Moletom Adidas Preto, similar à foto de inspiração)
    return 'casaco-1';
}

// Carregar e Renderizar o Produto
function loadProductPage() {
    const prodId = getProductIdFromUrl();
    currentProduct = productsDB[prodId];
    if (!currentProduct) return;

    // Atualiza título da aba do navegador
    document.title = `${currentProduct.name} | ZSX Outlet`;

    // Breadcrumb
    const breadcrumbCat = document.getElementById('pdpBreadcrumbCategory');
    const breadcrumbCurrent = document.getElementById('pdpBreadcrumbCurrent');
    if (breadcrumbCat) {
        const catMap = {
            'Casacos & Moletons': 'casacos',
            'Casacos & Jaquetas': 'casacos',
            'Casacos & Tricôs': 'casacos',
            'Camisas Polo': 'polos',
            'Camisas & Camisetas': 'camisas',
            'Bermudas & Shorts': 'bermudas',
            'Bonés & Acessórios': 'bones',
            'Camisas de Time': 'jerseys',
            'Calçados & Tênis': 'calcados'
        };
        const catKey = catMap[currentProduct.category] || 'all';
        breadcrumbCat.innerHTML = `<a href="category.html?cat=${catKey}">${currentProduct.category}</a>`;
    }
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = currentProduct.name;

    // Badge
    const tagBadge = document.getElementById('pdpTagBadge');
    if (tagBadge) tagBadge.textContent = currentProduct.tag;

    // Categoria e Título
    const catLabel = document.getElementById('pdpCategoryLabel');
    const titleEl = document.getElementById('pdpProductTitle');
    if (catLabel) catLabel.textContent = `ZSX OUTLET • ${currentProduct.category.toUpperCase()}`;
    if (titleEl) titleEl.textContent = currentProduct.name;

    // Avaliações
    const ratingScore = document.getElementById('pdpRatingScore');
    const ratingCount = document.getElementById('pdpRatingCount');
    if (ratingScore) ratingScore.textContent = currentProduct.rating.toFixed(1);
    if (ratingCount) ratingCount.textContent = `(${currentProduct.reviewsCount} avaliações)`;

    // Preços
    const currentPriceEl = document.getElementById('pdpCurrentPrice');
    const originalPriceEl = document.getElementById('pdpOriginalPrice');
    const discountBadgeEl = document.getElementById('pdpDiscountBadge');
    const installmentEl = document.getElementById('pdpInstallmentText');

    if (currentPriceEl) currentPriceEl.textContent = formatMoneyBRL(currentProduct.price);
    if (originalPriceEl) originalPriceEl.textContent = formatMoneyBRL(currentProduct.originalPrice);
    if (discountBadgeEl) discountBadgeEl.textContent = currentProduct.discount;
    
    const pixPrice = currentProduct.price * 0.95;
    if (installmentEl) {
        installmentEl.innerHTML = `em até <strong>${currentProduct.installments}</strong> ou <strong class="pdp-pix-discount">${formatMoneyBRL(pixPrice)} no PIX (-5%)</strong>`;
    }

    // Descrição
    const descEl = document.getElementById('pdpDescription');
    if (descEl) descEl.textContent = currentProduct.description;

    // Cores
    const colorsContainer = document.getElementById('pdpColorsContainer');
    const selectedColorLabel = document.getElementById('pdpSelectedColor');
    if (colorsContainer && currentProduct.colors.length > 0) {
        selectedColor = currentProduct.colors[0].name;
        if (selectedColorLabel) selectedColorLabel.textContent = selectedColor;

        colorsContainer.innerHTML = currentProduct.colors.map((c, idx) => `
            <button type="button" class="pdp-color-swatch ${idx === 0 ? 'active' : ''}" 
                    style="background-color: ${c.hex};" 
                    data-color-name="${c.name}"
                    title="${c.name}"
                    aria-label="${c.name}">
            </button>
        `).join('');

        colorsContainer.querySelectorAll('.pdp-color-swatch').forEach(btn => {
            btn.addEventListener('click', () => {
                colorsContainer.querySelectorAll('.pdp-color-swatch').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedColor = btn.dataset.colorName;
                if (selectedColorLabel) selectedColorLabel.textContent = selectedColor;
            });
        });
    }

    // Tamanhos
    const sizesContainer = document.getElementById('pdpSizesContainer');
    const selectedSizeLabel = document.getElementById('pdpSelectedSize');
    if (sizesContainer && currentProduct.sizes.length > 0) {
        // Seleciona tamanho padrão (M se houver, ou o primeiro)
        selectedSize = currentProduct.sizes.includes('M') ? 'M' : currentProduct.sizes[0];
        if (selectedSizeLabel) selectedSizeLabel.textContent = selectedSize;

        sizesContainer.innerHTML = currentProduct.sizes.map(s => `
            <button type="button" class="pdp-size-btn ${s === selectedSize ? 'active' : ''}" data-size="${s}">
                ${s}
            </button>
        `).join('');

        sizesContainer.querySelectorAll('.pdp-size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                sizesContainer.querySelectorAll('.pdp-size-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedSize = btn.dataset.size;
                if (selectedSizeLabel) selectedSizeLabel.textContent = selectedSize;
            });
        });
    }

    // Galeria de Fotos e Hero Image
    renderGallery();

    // Abas de Detalhes
    renderTabContents();

    // Produtos Relacionados
    renderRelatedProducts();
}

// Renderizar Galeria de Miniaturas e Hero
function renderGallery() {
    const thumbsStrip = document.getElementById('pdpThumbsStrip');
    const heroImg = document.getElementById('pdpHeroImg');
    if (!thumbsStrip || !heroImg) return;

    currentActiveImgIndex = 0;
    heroImg.src = currentProduct.gallery[0];
    heroImg.alt = currentProduct.name;

    thumbsStrip.innerHTML = currentProduct.gallery.map((imgSrc, idx) => `
        <button type="button" class="pdp-thumb-item ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Visualizar foto ${idx + 1}">
            <img src="${imgSrc}" alt="${currentProduct.name} - Ângulo ${idx + 1}">
        </button>
    `).join('');

    thumbsStrip.querySelectorAll('.pdp-thumb-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index, 10);
            currentActiveImgIndex = idx;
            thumbsStrip.querySelectorAll('.pdp-thumb-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Troca suave da foto principal
            heroImg.style.opacity = '0.3';
            setTimeout(() => {
                heroImg.src = currentProduct.gallery[idx];
                heroImg.style.opacity = '1';
            }, 120);
        });
    });
}

// Renderizar Textos das Abas
function renderTabContents() {
    const tabDesc = document.getElementById('pdpTabDescParagraph');
    const specsList = document.getElementById('pdpSpecsList');
    const visualCardImg = document.getElementById('pdpDetailVisualImg');
    const visualCardBadge = document.getElementById('pdpDetailBadgeTitle');

    if (tabDesc) tabDesc.textContent = currentProduct.description;

    if (specsList && currentProduct.specs) {
        specsList.innerHTML = currentProduct.specs.map(spec => `
            <li class="pdp-spec-item">
                <span class="pdp-spec-icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 14.8 9.2 22 12 14.8 14.8 12 22 9.2 14.8 2 12 9.2 9.2 12 2"/></svg></span>
                <span>${spec}</span>
            </li>
        `).join('');
    }

    if (visualCardImg) {
        // Usa a foto de close ou a primeira foto
        visualCardImg.src = currentProduct.gallery[1] || currentProduct.image;
        visualCardImg.alt = currentProduct.name;
    }

    if (visualCardBadge) {
        visualCardBadge.textContent = 'ZSX CRAFTSMANSHIP';
    }

    // Abas de Materiais, Caimento e Envio
    const materialsP = document.getElementById('pdpTabMaterialsText');
    if (materialsP) materialsP.textContent = currentProduct.materialsText;

    const fitP = document.getElementById('pdpTabFitText');
    if (fitP) fitP.textContent = currentProduct.fitText;

    const shippingP = document.getElementById('pdpTabShippingText');
    if (shippingP) shippingP.textContent = currentProduct.shippingText;
}

// Renderizar Produtos Relacionados
function renderRelatedProducts() {
    const grid = document.getElementById('pdpRelatedGrid');
    if (!grid) return;

    // Seleciona 4 produtos diferentes do produto atual
    const relatedIds = Object.keys(productsDB).filter(id => id !== currentProduct.id).slice(0, 4);

    grid.innerHTML = relatedIds.map(id => {
        const p = productsDB[id];
        return `
            <div class="pdp-related-card" onclick="window.location.href='product.html?id=${p.id}'">
                <div class="pdp-related-img-box">
                    <img src="${p.image}" alt="${p.name}">
                </div>
                <div class="pdp-related-info">
                    <h4 class="pdp-related-name">${p.name}</h4>
                    <p class="pdp-related-price">${formatMoneyBRL(p.price)}</p>
                    <div class="pdp-related-actions">
                        <button type="button" class="btn-related-view">Ver Detalhes</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Alterar Quantidade (+ e -)
function setupQuantityControls() {
    const minusBtn = document.getElementById('pdpQtyMinus');
    const plusBtn = document.getElementById('pdpQtyPlus');
    const valEl = document.getElementById('pdpQtyValue');

    if (!minusBtn || !plusBtn || !valEl) return;

    minusBtn.addEventListener('click', () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            valEl.textContent = currentQuantity;
        }
    });

    plusBtn.addEventListener('click', () => {
        if (currentQuantity < 10) {
            currentQuantity++;
            valEl.textContent = currentQuantity;
        } else {
            showToast('Limite de 10 unidades por pedido.', 'info');
        }
    });
}

// Alternar Abas Informativas
function setupTabs() {
    document.querySelectorAll('.pdp-tab-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const tabName = trigger.dataset.tab;
            document.querySelectorAll('.pdp-tab-trigger').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.pdp-tab-pane').forEach(p => p.classList.remove('active'));

            trigger.classList.add('active');
            const targetPane = document.getElementById(`tabPane-${tabName}`);
            if (targetPane) targetPane.classList.add('active');
        });
    });
}

// Modais: Guia de Medidas & Zoom
function setupModals() {
    // Guia de Medidas
    const openGuideBtn = document.getElementById('btnOpenSizeGuide');
    const guideModal = document.getElementById('sizeGuideModal');
    const closeGuideBtn = document.getElementById('closeSizeGuideBtn');

    if (openGuideBtn && guideModal) {
        openGuideBtn.addEventListener('click', () => {
            guideModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeGuideBtn && guideModal) {
        closeGuideBtn.addEventListener('click', () => {
            guideModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (guideModal) {
        guideModal.addEventListener('click', (e) => {
            if (e.target === guideModal) {
                guideModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Modal de Zoom em Tela Cheia
    const zoomBtn = document.getElementById('btnZoomImg');
    const zoomModal = document.getElementById('zoomModal');
    const zoomImg = document.getElementById('zoomModalImg');
    const closeZoomBtn = document.getElementById('closeZoomBtn');

    if (zoomBtn && zoomModal && zoomImg) {
        zoomBtn.addEventListener('click', () => {
            zoomImg.src = currentProduct.gallery[currentActiveImgIndex] || currentProduct.image;
            zoomModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeZoomBtn && zoomModal) {
        closeZoomBtn.addEventListener('click', () => {
            zoomModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (zoomModal) {
        zoomModal.addEventListener('click', (e) => {
            if (e.target === zoomModal) {
                zoomModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Wishlist Toggle
    const wishlistBtn = document.getElementById('pdpWishlistBtn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            isWishlisted = !isWishlisted;
            wishlistBtn.classList.toggle('active', isWishlisted);
            if (isWishlisted) {
                showToast(`"${currentProduct.name}" adicionado aos seus favoritos!`, 'success');
            } else {
                showToast(`Item removido dos favoritos.`, 'info');
            }
        });
    }
}

// Botões de Compra (Adicionar ao Carrinho & Comprar Agora)
function setupPurchaseButtons() {
    const btnAddCart = document.getElementById('btnAddCartPdp');
    const btnBuyNow = document.getElementById('btnBuyNowPdp');

    if (btnAddCart) {
        btnAddCart.addEventListener('click', () => {
            if (!currentProduct) return;

            const productData = {
                id: `${currentProduct.id}-${selectedSize}-${selectedColor}`,
                name: currentProduct.name,
                price: currentProduct.price,
                image: currentProduct.image,
                size: selectedSize,
                color: selectedColor
            };

            // Adiciona a quantidade selecionada
            for (let i = 0; i < currentQuantity; i++) {
                addToCart(productData, false);
            }

            showToast(`${currentQuantity}x "${currentProduct.name}" (${selectedSize} / ${selectedColor}) adicionado ao carrinho!`, 'success');
        });
    }

    if (btnBuyNow) {
        btnBuyNow.addEventListener('click', () => {
            if (!currentProduct) return;

            const productData = {
                id: `${currentProduct.id}-${selectedSize}-${selectedColor}`,
                name: currentProduct.name,
                price: currentProduct.price,
                image: currentProduct.image,
                size: selectedSize,
                color: selectedColor
            };

            for (let i = 0; i < currentQuantity; i++) {
                addToCart(productData, false);
            }

            // Abre o checkout direto se tiver endereço, senão abre o carrinho
            if (userAddress) {
                openCheckoutModal();
            } else {
                openCartDrawer();
            }
        });
    }
}

// Sincronizar productsDB com Painel Administrativo
function syncProductsDBWithAdmin() {
    const overrides = JSON.parse(localStorage.getItem('zsx_catalog_overrides')) || {};
    const customList = JSON.parse(localStorage.getItem('zsx_custom_products')) || [];

    customList.forEach(cp => {
        productsDB[cp.id] = {
            id: cp.id,
            name: cp.name,
            category: cp.category || 'Coleção ZSX',
            tag: cp.badge || 'NEW DROP',
            price: parseFloat(cp.price) || 99.90,
            originalPrice: parseFloat(cp.originalPrice) || 149.90,
            discount: cp.discount || '30% OFF',
            installments: cp.installments || '3x sem juros',
            rating: 5.0,
            reviewsCount: 18,
            image: cp.image || '../images/shirts3d.png',
            gallery: [cp.image || '../images/shirts3d.png', '../images/shirts.png'],
            colors: [{ name: 'Padrão ZSX', hex: '#111111' }],
            sizes: cp.sizes || ['P', 'M', 'G', 'GG'],
            description: cp.description || 'Peça exclusiva ZSX Outlet confeccionada com materiais de alta gramatura.',
            specs: [
                'Acabamento premium ZSX Outlet',
                'Tecido de alta durabilidade e conforto',
                'Costura reforçada de alto padrão'
            ],
            materialsText: 'Algodão nobre selecionado com toque macio.',
            fitText: 'Caimento autêntico streetwear.',
            shippingText: 'Envio imediato em até 24h úteis.'
        };
    });

    Object.keys(overrides).forEach(pid => {
        if (productsDB[pid]) {
            const ov = overrides[pid];
            Object.assign(productsDB[pid], ov);
            const p = parseFloat(productsDB[pid].price) || 0;
            const orig = parseFloat(productsDB[pid].originalPrice) || p;
            if (orig > p && orig > 0) {
                productsDB[pid].discount = `${Math.round(((orig - p) / orig) * 100)}% OFF`;
            }
            productsDB[pid].installments = `3x de R$ ${(p / 3).toFixed(2).replace('.', ',')} sem juros`;
            if (ov.image) {
                productsDB[pid].gallery = [ov.image, ...(productsDB[pid].gallery || []).slice(1)];
            }
        }
    });
}

// Inicialização da Página
document.addEventListener('DOMContentLoaded', () => {
    syncProductsDBWithAdmin();
    loadProductPage();
    setupQuantityControls();
    setupTabs();
    setupModals();
    setupPurchaseButtons();
});

