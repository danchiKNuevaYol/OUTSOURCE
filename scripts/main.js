import Header from './Header.js';
import {
  formatPrice,
  getProductImage,
  getProductPrice,
  getProductVariant,
  getProductVariants,
  products,
} from './products.js';

new Header();

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

const icons = {
  heart: `
    <svg
      class="product-card__icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true">
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round">
      </path>
    </svg>
  `,
  cart: `
    <svg
      class="product-card__icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true">
      <path
        d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round">
      </path>
      <circle
        cx="10"
        cy="20"
        r="1"
        fill="currentColor">
      </circle>
      <circle
        cx="18"
        cy="20"
        r="1"
        fill="currentColor">
      </circle>
    </svg>
  `,
};

const getCartItem = (id, variantIndex = 0) => {
  return cart.find((item) => {
    return (
      item.id === id &&
      Number(item.variantIndex ?? 0) === Number(variantIndex)
    );
  });
};

const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const saveWishlist = () => {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

const addToCart = (id, variantIndex = 0) => {
  const currentItem = getCartItem(id, variantIndex);

  if (currentItem) {
    currentItem.quantity += 1;
  } else {
    cart.push({
      id,
      variantIndex,
      quantity: 1,
    });
  }

  saveCart();
};

const renderProducts = (items) => {
  const productGrid = document.querySelector('.product-grid');

  if (!productGrid) return;

  if (!items.length) {
    productGrid.innerHTML = `
      <p class="catalog__empty">
        По выбранным фильтрам ничего не найдено.
      </p>
    `;

    return;
  }

  productGrid.innerHTML = items
    .map((product) => {
      const variants = getProductVariants(product);
      const isFavorite = wishlist.includes(product.id);

      return `
        <article
          class="product-card"
          data-id="${product.id}"
          data-variant-index="0">

          <a
            class="product-card__link"
            href="./product.html?id=${product.id}">
            <img
              class="product-card__image"
              src="${getProductImage(product)}"
              alt="${product.title}">
          </a>

          <div class="product-card__body">
            <a
                class="product-card__details-link"
                href="./product.html?id=${product.id}">
                <h3 class="product-card__title">
                    ${product.title}
                </h3>

                <p class="product-card__price">
                    ${formatPrice(product.price)}
                </p>
            </a>

            <button
              class="product-card__favorite ${isFavorite ? 'is-active' : ''}"
              type="button"
              aria-label="Добавить в понравившиеся"
              aria-pressed="${isFavorite}">
              ${icons.heart}
            </button>
          </div>

          <div class="product-card__footer">
            <div class="product-card__colors">
              ${variants
                .map((variant, index) => {
                  return `
                    <button
                      class="product-card__color ${index === 0 ? 'is-active' : ''}"
                      type="button"
                      data-js-card-color
                      data-variant-index="${index}"
                      data-image="${variant.image}"
                      style="--color:${variant.hex}"
                      aria-label="${variant.color}"
                      title="${variant.color}">
                    </button>
                  `;
                })
                .join('')}
            </div>

            <button
              class="product-card__cart"
              type="button"
              aria-label="Добавить в корзину">
              ${icons.cart}
            </button>
          </div>
        </article>
      `;
    })
    .join('');
};

const getCollectionProductCard = (product) => {
  const variant = getProductVariant(product);

  return `
    <article class="collection-product-card">
      <a
        class="collection-product-card__link"
        href="./product.html?id=${product.id}">
        <img
          class="collection-product-card__image"
          src="${variant.image}"
          alt="${product.title}">

        <div class="collection-product-card__body">
          <p class="collection-product-card__category">
            ${product.category}
          </p>

          <h3 class="collection-product-card__title">
            ${product.title}
          </h3>

          <p class="collection-product-card__price">
            ${formatPrice(product.price)}
          </p>
        </div>
      </a>

      <button
        class="collection-product-card__button"
        type="button"
        data-js-collection-add
        data-id="${product.id}"
        data-variant-index="0">
        В корзину
      </button>
    </article>
  `;
};

const enableSliderWheelScroll = (sliderElement) => {
  if (!sliderElement || sliderElement.dataset.wheelScroll === 'true') return;

  sliderElement.dataset.wheelScroll = 'true';

  sliderElement.addEventListener(
    'wheel',
    (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      event.preventDefault();
      sliderElement.scrollLeft += event.deltaY;
    },
    { passive: false },
  );
};

const renderCollectionSliders = () => {
  const sliderElements = document.querySelectorAll(
    '[data-js-collection-slider]',
  );

  sliderElements.forEach((sliderElement) => {
    const audience = sliderElement.dataset.audience;

    const sliderProducts = products
      .filter((product) => {
        if (audience === 'women') {
          return product.audience !== 'men';
        }

        return product.audience !== 'women';
      })
      .slice(0, 8);

    sliderElement.innerHTML = sliderProducts
      .map(getCollectionProductCard)
      .join('');

    enableSliderWheelScroll(sliderElement);
  });
};

const renderRelatedProductSlider = () => {
  const sliderElement = document.querySelector('[data-js-related-slider]');

  if (!sliderElement) return;

  const productId = Number(
    new URLSearchParams(window.location.search).get('id'),
  );

  const currentProduct = products.find((product) => {
    return product.id === productId;
  });

  const relatedProducts = products
    .filter((product) => product.id !== productId)
    .sort((firstProduct, secondProduct) => {
      if (!currentProduct) return 0;

      return (
        Number(secondProduct.category === currentProduct.category) -
        Number(firstProduct.category === currentProduct.category)
      );
    })
    .slice(0, 8);

  sliderElement.innerHTML = relatedProducts
    .map(getCollectionProductCard)
    .join('');

  enableSliderWheelScroll(sliderElement);
};

const renderCartProductSlider = () => {
  const sliderElement = document.querySelector('[data-js-cart-slider]');

  if (!sliderElement) return;

  const cartProductIds = cart.map((item) => item.id);

  const recommendedProducts = products
    .filter((product) => !cartProductIds.includes(product.id))
    .slice(0, 8);

  const productsToRender = recommendedProducts.length
    ? recommendedProducts
    : products.slice(0, 8);

  sliderElement.innerHTML = productsToRender
    .map(getCollectionProductCard)
    .join('');

  enableSliderWheelScroll(sliderElement);
};

const renderWishlist = () => {
  const wishlistList = document.querySelector('.catalog__wishlist-list');

  if (!wishlistList) return;

  wishlistList.innerHTML = wishlist
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean)
    .map((product) => {
      return `
        <li class="catalog__wishlist-item">
          ${product.title}
        </li>
      `;
    })
    .join('');
};

const initProductPage = () => {
  const productId = Number(
    new URLSearchParams(window.location.search).get('id'),
  );

  const product = products.find((item) => item.id === productId);

  if (!product) return;

  const title = document.querySelector('.product__title');
  const category = document.querySelector('.product__category');
  const price = document.querySelector('.product__price');
  const description = document.querySelector('.product__description');
  const image = document.querySelector('.product__image');
  const colors = document.querySelector('.product__colors');
  const addButton = document.querySelector('.product__add-to-cart');

  let activeVariantIndex = 0;

  if (title) title.textContent = product.title;
  if (category) category.textContent = product.category;
  if (price) price.textContent = formatPrice(product.price);

  if (description) {
    description.textContent =
      product.description || 'Описание товара скоро появится.';
  }

  if (image) {
    image.src = getProductImage(product);
    image.alt = product.title;
  }

  if (colors) {
    colors.innerHTML = getProductVariants(product)
      .map((variant, index) => {
        return `
          <button
            class="product__color ${index === 0 ? 'is-active' : ''}"
            type="button"
            data-js-product-color
            data-variant-index="${index}"
            style="--color:${variant.hex}"
            aria-label="${variant.color}"
            title="${variant.color}">
          </button>
        `;
      })
      .join('');

    colors.addEventListener('click', (event) => {
      const colorButton = event.target.closest('[data-js-product-color]');

      if (!colorButton) return;

      activeVariantIndex = Number(colorButton.dataset.variantIndex);

      const variant = getProductVariant(product, activeVariantIndex);

      if (image) {
        image.src = variant.image;
      }

      if (price) {
        price.textContent = formatPrice(
          getProductPrice(product, activeVariantIndex),
        );
      }

      colors.querySelectorAll('[data-js-product-color]').forEach((button) => {
        button.classList.toggle('is-active', button === colorButton);
      });
    });
  }

  addButton?.addEventListener('click', () => {
    addToCart(product.id, activeVariantIndex);
  });
};

const initCartPage = () => {
  const cartContainer = document.querySelector('.cart__products');

  if (!cartContainer) return;

  const cartCount = document.querySelector('.cart__count');
  const subtotal = document.querySelector('.cart__subtotal');

  cart = cart.filter((item) => {
    return products.some((product) => product.id === item.id);
  });

  saveCart();

  if (!cart.length) {
    cartContainer.innerHTML = `
      <p class="cart__empty">
        В корзине ничего нет
      </p>
    `;

    if (cartCount) {
      cartCount.textContent = 'Количество товаров: 0';
    }

    if (subtotal) {
      subtotal.textContent = '0 ₽';
    }

    return;
  }

  let totalItems = 0;
  let totalPrice = 0;

  cartContainer.innerHTML = cart
    .map((item) => {
      const product = products.find((currentProduct) => {
        return currentProduct.id === item.id;
      });

      const variantIndex = Number(item.variantIndex ?? 0);
      const variant = getProductVariant(product, variantIndex);
      const itemPrice = getProductPrice(product, variantIndex);

      totalItems += item.quantity;
      totalPrice += itemPrice * item.quantity;

      return `
        <article class="cart-item">
          <img
            class="cart-item__image"
            src="${variant.image}"
            alt="${product.title}">

          <div class="cart-item__body">
            <h2 class="cart-item__title">
              ${product.title}
            </h2>

            <p class="cart-item__category">
              ${product.category} · ${variant.color}
            </p>

            <p class="cart-item__price">
              ${formatPrice(itemPrice)}
            </p>
          </div>

          <div class="cart-item__actions">
            <div class="cart-item__quantity">
              <button
                class="cart-item__button"
                type="button"
                data-action="minus"
                data-id="${item.id}"
                data-variant-index="${variantIndex}">
                −
              </button>

              <span class="cart-item__count">
                ${item.quantity}
              </span>

              <button
                class="cart-item__button"
                type="button"
                data-action="plus"
                data-id="${item.id}"
                data-variant-index="${variantIndex}">
                +
              </button>
            </div>

            <button
              class="cart-item__remove"
              type="button"
              data-action="remove"
              data-id="${item.id}"
              data-variant-index="${variantIndex}">
              Удалить
            </button>
          </div>
        </article>
      `;
    })
    .join('');

  if (cartCount) {
    cartCount.textContent = `Количество товаров: ${totalItems}`;
  }

  if (subtotal) {
    subtotal.textContent = formatPrice(totalPrice);
  }
};

document.addEventListener('click', (event) => {
  const colorButton = event.target.closest('[data-js-card-color]');

  if (colorButton) {
    const card = colorButton.closest('.product-card');
    const image = card.querySelector('.product-card__image');

    card.dataset.variantIndex = colorButton.dataset.variantIndex;
    image.src = colorButton.dataset.image;

    card.querySelectorAll('[data-js-card-color]').forEach((button) => {
      button.classList.toggle('is-active', button === colorButton);
    });

    return;
  }

  const favoriteButton = event.target.closest('.product-card__favorite');

  if (favoriteButton) {
    const card = favoriteButton.closest('.product-card');
    const productId = Number(card.dataset.id);
    const isFavorite = wishlist.includes(productId);

    wishlist = isFavorite
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];

    favoriteButton.classList.toggle('is-active', !isFavorite);
    favoriteButton.setAttribute('aria-pressed', String(!isFavorite));

    saveWishlist();
    renderWishlist();

    return;
  }

  const productCartButton = event.target.closest('.product-card__cart');

  if (productCartButton) {
    const card = productCartButton.closest('.product-card');

    addToCart(
      Number(card.dataset.id),
      Number(card.dataset.variantIndex),
    );

    return;
  }

  const collectionCartButton = event.target.closest('[data-js-collection-add]');

  if (collectionCartButton) {
    addToCart(
      Number(collectionCartButton.dataset.id),
      Number(collectionCartButton.dataset.variantIndex),
    );

    collectionCartButton.textContent = 'Добавлено';

    window.setTimeout(() => {
      collectionCartButton.textContent = 'В корзину';
    }, 1000);

    return;
  }

  const cartActionButton = event.target.closest('[data-action]');

  if (!cartActionButton) return;

  const id = Number(cartActionButton.dataset.id);
  const variantIndex = Number(cartActionButton.dataset.variantIndex ?? 0);
  const item = getCartItem(id, variantIndex);

  if (!item) return;

  if (cartActionButton.dataset.action === 'plus') {
    item.quantity += 1;
  }

  if (cartActionButton.dataset.action === 'minus') {
    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart = cart.filter((cartItem) => {
        return !(
          cartItem.id === id &&
          Number(cartItem.variantIndex ?? 0) === variantIndex
        );
      });
    }
  }

  if (cartActionButton.dataset.action === 'remove') {
    cart = cart.filter((cartItem) => {
      return !(
        cartItem.id === id &&
        Number(cartItem.variantIndex ?? 0) === variantIndex
      );
    });
  }

  saveCart();
  initCartPage();
  renderCartProductSlider();
});

const catalogFilters = {
  category: 'all',
  color: 'all',
  search: '',
  minPrice: 0,
  maxPrice: Infinity,
};

const productMatchesColor = (product, color) => {
  return getProductVariants(product).some((variant) => {
    return variant.color.toLowerCase() === color.toLowerCase();
  });
};

const renderCatalogProducts = () => {
  const searchValue = catalogFilters.search.toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      catalogFilters.category === 'all' ||
      product.category === catalogFilters.category;

    const matchesColor =
      catalogFilters.color === 'all' ||
      productMatchesColor(product, catalogFilters.color);

    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchValue);

    const matchesPrice =
      product.price >= catalogFilters.minPrice &&
      product.price <= catalogFilters.maxPrice;

    return (
      matchesCategory &&
      matchesColor &&
      matchesSearch &&
      matchesPrice
    );
  });

  renderProducts(filteredProducts);
};

document.querySelectorAll('.filter__link').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    catalogFilters.category = link.dataset.category;

    document
      .querySelector('.filter__link--active')
      ?.classList.remove('filter__link--active');

    link.classList.add('filter__link--active');

    renderCatalogProducts();
  });
});

document.querySelectorAll('.filter__color').forEach((button) => {
  button.addEventListener('click', () => {
    const isActive = button.classList.contains('is-active');

    document.querySelectorAll('.filter__color').forEach((colorButton) => {
      colorButton.classList.remove('is-active');
    });

    catalogFilters.color = isActive ? 'all' : button.dataset.color;

    if (!isActive) {
      button.classList.add('is-active');
    }

    renderCatalogProducts();
  });
});

const searchInput = document.querySelector('.catalog__search');

searchInput?.addEventListener('input', () => {
  catalogFilters.search = searchInput.value.trim();
  renderCatalogProducts();
});

const priceInputs = document.querySelectorAll('.filter__input');

priceInputs.forEach((input) => {
  input.addEventListener('input', () => {
    catalogFilters.minPrice = Number(priceInputs[0].value) || 0;
    catalogFilters.maxPrice = Number(priceInputs[1].value) || Infinity;

    renderCatalogProducts();
  });
});

if (document.querySelector('.product-grid')) {
  renderCatalogProducts();
}

renderCollectionSliders();
renderRelatedProductSlider();

renderWishlist();

initProductPage();

initCartPage();

renderCartProductSlider();