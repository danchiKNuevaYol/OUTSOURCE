const image = (name) => `images/products/${name}`;

export const products = [
  {
    id: 1,
    title: 'Футболка',
    category: 'Футболки',
    price: 1999,
    description: 'Мягкая футболка свободного силуэта для повседневных образов.',
    builderType: 'top',
    audience: 'unisex',
    styles: ['minimal', 'casual'],
    compatibleStyles: ['minimal', 'casual', 'classic'],
    variants: [
      {
        id: 'pink',
        color: 'Розовый',
        tone: 'pink',
        hex: '#f38bb5',
        image: image('ChatGPT Image 25 июн. 2026 г., 03_49_43 (3).png'),
      },
      {
        id: 'yellow',
        color: 'Жёлтый',
        tone: 'yellow',
        hex: '#f4ca19',
        image: image('ChatGPT Image 25 июн. 2026 г., 03_49_43 (2).png'),
      },
      {
        id: 'green',
        color: 'Зелёный',
        tone: 'green',
        hex: '#63a866',
        image: image('ChatGPT Image 25 июн. 2026 г., 03_49_43 (1).png'),
      },
    ],
  },
  {
    id: 2,
    title: 'Вельвет рубашка',
    category: 'Рубашки',
    price: 2499,
    description: 'Рубашка из мягкого вельвета с прямой посадкой.',
    builderType: 'top',
    audience: 'unisex',
    styles: ['minimal', 'classic'],
    compatibleStyles: ['minimal', 'classic', 'casual'],
    variants: [
      {
        id: 'pink',
        color: 'Розовый',
        tone: 'pink',
        hex: '#f38bb5',
        image: image('ChatGPT Image 25 июн. 2026 г., 03_49_44 (6).png'),
      },
      {
        id: 'yellow',
        color: 'Жёлтый',
        tone: 'yellow',
        hex: '#f4ca19',
        image: image('ChatGPT Image 25 июн. 2026 г., 03_49_44 (5).png'),
      },
      {
        id: 'green',
        color: 'Зелёный',
        tone: 'green',
        hex: '#63a866',
        image: image('ChatGPT Image 25 июн. 2026 г., 03_49_44 (4).png'),
      },
    ],
  },
  {
    id: 3,
    title: 'Чёрные джинсы',
    category: 'Джинсы',
    price: 4099,
    description: 'Прямые джинсы в базовом чёрном оттенке.',
    builderType: 'bottom',
    audience: 'unisex',
    styles: ['minimal', 'casual'],
    compatibleStyles: ['minimal', 'casual', 'classic'],
    variants: [
      {
        id: 'black',
        color: 'Чёрный',
        tone: 'dark',
        hex: '#111111',
        image: image('ChatGPT Image 25 июн. 2026 г., 02_53_38.png'),
      },
    ],
  },
  {
    id: 4,
    title: 'Синие джинсы',
    category: 'Джинсы',
    price: 4099,
    description: 'Классические синие джинсы прямого кроя.',
    builderType: 'bottom',
    audience: 'unisex',
    styles: ['casual', 'minimal'],
    compatibleStyles: ['casual', 'minimal'],
    variants: [
      {
        id: 'blue',
        color: 'Синий',
        tone: 'blue',
        hex: '#4f86d9',
        image: image('ChatGPT Image 25 июн. 2026 г., 02_53_31.png'),
      },
    ],
  },
  {
    id: 5,
    title: 'Белая футболка',
    category: 'Футболки',
    price: 2199,
    description: 'Чистая база для любого образа.',
    builderType: 'top',
    audience: 'unisex',
    styles: ['minimal', 'casual', 'classic'],
    compatibleStyles: ['minimal', 'casual', 'classic'],
    variants: [
      {
        id: 'white',
        color: 'Белый',
        tone: 'neutral',
        hex: '#ffffff',
        image: image('ChatGPT Image 24 июн. 2026 г., 23_16_33 (1).png'),
      },
    ],
  },
  {
    id: 6,
    title: 'Джинсовая рубашка',
    category: 'Рубашки',
    price: 3299,
    description: 'Свободная рубашка из денима.',
    builderType: 'top',
    audience: 'unisex',
    styles: ['casual', 'minimal'],
    compatibleStyles: ['casual', 'minimal'],
    variants: [
      {
        id: 'blue',
        color: 'Голубой',
        tone: 'blue',
        hex: '#8eb8e5',
        image: image('OIP.jpeg'),
      },
    ],
  },
  {
    id: 7,
    title: 'Бежевые шорты',
    category: 'Шорты',
    price: 2800,
    description: 'Лёгкие шорты с лаконичным кроем.',
    builderType: 'bottom',
    audience: 'unisex',
    styles: ['minimal', 'casual'],
    compatibleStyles: ['minimal', 'casual', 'classic'],
    variants: [
      {
        id: 'beige',
        color: 'Бежевый',
        tone: 'neutral',
        hex: '#cdb78a',
        image: image('ChatGPT Image 24 июн. 2026 г., 23_16_34 (5).png'),
      },
    ],
  },
  {
    id: 8,
    title: 'Чёрные шорты',
    category: 'Шорты',
    price: 2800,
    description: 'Свободные шорты на каждый день.',
    builderType: 'bottom',
    audience: 'unisex',
    styles: ['casual', 'minimal'],
    compatibleStyles: ['casual', 'minimal'],
    variants: [
      {
        id: 'black',
        color: 'Чёрный',
        tone: 'dark',
        hex: '#111111',
        image: image('ChatGPT Image 24 июн. 2026 г., 23_16_35 (6).png'),
      },
    ],
  },
  {
    id: 9,
    title: 'Роза рубашка',
    category: 'Рубашки',
    price: 2299,
    description: 'Акцентная рубашка свободного силуэта.',
    builderType: 'top',
    audience: 'unisex',
    styles: ['minimal', 'classic'],
    compatibleStyles: ['minimal', 'classic', 'casual'],
    variants: [
      {
        id: 'pink',
        color: 'Розовый',
        tone: 'pink',
        hex: '#f38bb5',
        image: image('ChatGPT Image 25 июн. 2026 г., 03_49_45 (8).png'),
      },
    ],
  },
  {
    id: 10,
    title: 'Голубая рубашка',
    category: 'Рубашки',
    price: 2500,
    description: 'Лёгкая рубашка в спокойном голубом оттенке.',
    builderType: 'top',
    audience: 'unisex',
    styles: ['classic', 'minimal'],
    compatibleStyles: ['classic', 'minimal'],
    variants: [
      {
        id: 'blue',
        color: 'Голубой',
        tone: 'blue',
        hex: '#a9c9ef',
        image: image('ChatGPT Image 24 июн. 2026 г., 23_16_34 (4).png'),
      },
    ],
  },
  {
    id: 11,
    title: 'Бежевая рубашка',
    category: 'Рубашки',
    price: 2500,
    description: 'Спокойная рубашка для базовых сочетаний.',
    builderType: 'top',
    audience: 'unisex',
    styles: ['minimal', 'classic'],
    compatibleStyles: ['minimal', 'classic', 'casual'],
    variants: [
      {
        id: 'beige',
        color: 'Бежевый',
        tone: 'neutral',
        hex: '#d5c6ac',
        image: image('ChatGPT Image 24 июн. 2026 г., 23_16_33 (3).png'),
      },
    ],
  },
  {
    id: 12,
    title: 'Чёрная футболка',
    category: 'Футболки',
    price: 1999,
    description: 'Базовая чёрная футболка свободного силуэта.',
    builderType: 'top',
    audience: 'unisex',
    styles: ['minimal', 'casual'],
    compatibleStyles: ['minimal', 'casual', 'classic'],
    variants: [
      {
        id: 'black',
        color: 'Чёрный',
        tone: 'dark',
        hex: '#111111',
        image: image('ChatGPT Image 24 июн. 2026 г., 23_16_33 (2).png'),
      },
    ],
  },
  {
    id: 13,
    title: 'Синие джинсы прямого кроя',
    category: 'Джинсы',
    price: 4000,
    description: 'Прямые джинсы с насыщенным денимом.',
    builderType: 'bottom',
    audience: 'unisex',
    styles: ['casual', 'minimal'],
    compatibleStyles: ['casual', 'minimal'],
    variants: [
      {
        id: 'blue',
        color: 'Синий',
        tone: 'blue',
        hex: '#4f86d9',
        image: image('ChatGPT Image 24 июн. 2026 г., 23_16_36 (7).png'),
      },
    ],
  },
  {
    id: 21,
    title: 'Чёрное платье',
    category: 'Платья',
    price: 5500,
    description: 'Платье-футляр с тонкими бретелями.',
    builderType: 'dress',
    audience: 'women',
    styles: ['minimal', 'evening'],
    compatibleStyles: ['minimal', 'evening', 'classic'],
    variants: [
      {
        id: 'black',
        color: 'Чёрный',
        tone: 'dark',
        hex: '#111111',
        image: image('black-dress.png'),
      },
    ],
  },
  {
    id: 22,
    title: 'Чёрная сумка',
    category: 'Аксессуары',
    price: 3800,
    description: 'Компактная сумка на цепочке.',
    builderType: 'accessory',
    audience: 'women',
    styles: ['minimal', 'evening', 'classic'],
    compatibleStyles: ['minimal', 'evening', 'classic', 'casual'],
    variants: [
      {
        id: 'black',
        color: 'Чёрный',
        tone: 'dark',
        hex: '#111111',
        image: image('black-bag.png'),
      },
    ],
  },
];

export const getProductVariants = (product) => product.variants || [];

export const getProductVariant = (product, variantIndex = 0) => {
  const variants = getProductVariants(product);
  return variants[variantIndex] || variants[0];
};

export const getProductImage = (product, variantIndex = 0) =>
  getProductVariant(product, variantIndex)?.image || '';

export const getProductPrice = (product, variantIndex = 0) =>
  getProductVariant(product, variantIndex)?.price || product.price;

export const formatPrice = (price) =>
  `${Number(price).toLocaleString('ru-RU')} ₽`;

export const getBuilderItems = ({ audience, type }) =>
  products
    .filter((product) => {
      const hasRightAudience =
        product.audience === 'unisex' ||
        product.audience === audience;

      return hasRightAudience && product.builderType === type;
    })
    .flatMap((product) =>
      getProductVariants(product).map((variant, variantIndex) => ({
        key: `${product.id}-${variant.id || variantIndex}`,
        productId: product.id,
        variantIndex,
        title: product.title,
        color: variant.color,
        price: getProductPrice(product, variantIndex),
        image: variant.image,
        tone: variant.tone || 'neutral',
        builderType: product.builderType,
        audience: product.audience,
        styles: product.styles || [],
        compatibleStyles: product.compatibleStyles || product.styles || [],
      })),
    );