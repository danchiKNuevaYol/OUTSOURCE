import Header from './Header.js';
import { formatPrice, getBuilderItems } from './products.js';

new Header();

const rootElement = document.querySelector('[data-js-outfit-builder]');

if (rootElement) {
  const stageElement = rootElement.querySelector('[data-js-builder-stage]');
  const optionsElement = rootElement.querySelector('[data-js-builder-options]');
  const summaryElement = rootElement.querySelector('[data-js-builder-summary]');
  const totalElement = rootElement.querySelector('[data-js-builder-total]');
  const emptyElement = rootElement.querySelector('[data-js-builder-empty]');
  const addButton = rootElement.querySelector('[data-js-builder-add]');
  const hintElement = rootElement.querySelector('[data-js-builder-hint]');

  const layers = {
    top: rootElement.querySelector('[data-js-builder-layer="top"]'),
    bottom: rootElement.querySelector('[data-js-builder-layer="bottom"]'),
    dress: rootElement.querySelector('[data-js-builder-layer="dress"]'),
    accessory: rootElement.querySelector('[data-js-builder-layer="accessory"]'),
  };

  const compatibleTones = {
    neutral: ['neutral', 'dark', 'pink', 'yellow', 'green', 'blue'],
    dark: ['neutral', 'dark', 'pink', 'yellow', 'green', 'blue'],
    pink: ['neutral', 'dark', 'blue', 'green'],
    yellow: ['neutral', 'dark', 'blue', 'green'],
    green: ['neutral', 'dark', 'blue', 'pink', 'yellow'],
    blue: ['neutral', 'dark', 'pink', 'yellow', 'green'],
  };

  const selectedItems = {
    top: null,
    bottom: null,
    dress: null,
    accessory: null,
  };

  let activeAudience = 'women';
  let activeType = 'top';

  const getVisibleOutfit = () => {
    const outfit = [];

    if (selectedItems.dress) {
      outfit.push(selectedItems.dress);
    } else {
      if (selectedItems.top) outfit.push(selectedItems.top);
      if (selectedItems.bottom) outfit.push(selectedItems.bottom);
    }

    if (selectedItems.accessory) {
      outfit.push(selectedItems.accessory);
    }

    return outfit;
  };

  const getCompatibilityScore = (candidate) => {
    const selectedOutfit = getVisibleOutfit().filter((item) => {
      return item.builderType !== candidate.builderType;
    });

    if (!selectedOutfit.length) return 0;

    return selectedOutfit.reduce((score, selectedItem) => {
      const hasStyleMatch = candidate.styles.some((style) => {
        return selectedItem.compatibleStyles.includes(style);
      });

      const colorsWorkTogether =
        compatibleTones[selectedItem.tone]?.includes(candidate.tone) ?? true;

      if (hasStyleMatch) score += 3;
      else score -= 2;

      if (colorsWorkTogether) score += 2;
      else score -= 2;

      if (
        candidate.builderType === 'accessory' &&
        candidate.tone === 'dark'
      ) {
        score += 1;
      }

      return score;
    }, 0);
  };

  const updateLayer = (type, item) => {
    const layer = layers[type];
    const slot = layer.closest('.outfit-builder__slot');

    if (!item) {
      layer.removeAttribute('src');
      layer.alt = '';
      slot.classList.remove('is-visible');
      return;
    }

    layer.src = item.image;
    layer.alt = `${item.title}, ${item.color}`;
    slot.classList.add('is-visible');
  };

  const renderPreview = () => {
    const hasDress = Boolean(selectedItems.dress);

    stageElement.classList.toggle('is-dress', hasDress);

    updateLayer('top', hasDress ? null : selectedItems.top);
    updateLayer('bottom', hasDress ? null : selectedItems.bottom);
    updateLayer('dress', selectedItems.dress);
    updateLayer('accessory', selectedItems.accessory);

    const hasItems = getVisibleOutfit().length > 0;

    emptyElement.classList.toggle('is-hidden', hasItems);
    addButton.disabled = !hasItems;
  };

  const renderSummary = () => {
    const outfit = getVisibleOutfit();
    const total = outfit.reduce((sum, item) => sum + item.price, 0);

    if (!outfit.length) {
      summaryElement.innerHTML = `
        <li class="outfit-builder__summary-empty">
          Пока ничего не выбрано
        </li>
      `;

      totalElement.textContent = '0 ₽';
      return;
    }

    summaryElement.innerHTML = outfit
      .map((item) => {
        return `
          <li class="outfit-builder__summary-item">
            <span>${item.title} · ${item.color}</span>
            <span>${formatPrice(item.price)}</span>
          </li>
        `;
      })
      .join('');

    totalElement.textContent = formatPrice(total);
  };

  const renderOptions = () => {
    const items = getBuilderItems({
      audience: activeAudience,
      type: activeType,
    })
      .map((item) => {
        return {
          ...item,
          score: getCompatibilityScore(item),
        };
      })
      .sort((firstItem, secondItem) => {
        return secondItem.score - firstItem.score;
      });

    const hasSelectedItems = getVisibleOutfit().length > 0;

    hintElement.textContent = hasSelectedItems
      ? 'Сначала показаны вещи, которые подходят по цвету и стилю.'
      : 'Выбери вещь — конструктор поднимет подходящие сочетания выше.';

    if (!items.length) {
      optionsElement.innerHTML = `
        <p class="outfit-builder__empty-options">
          В этой категории пока нет вещей.
        </p>
      `;

      return;
    }

    optionsElement.innerHTML = items
      .map((item) => {
        const isSelected = selectedItems[activeType]?.key === item.key;
        const isRecommended = hasSelectedItems && item.score > 0;

        return `
          <button
            class="outfit-builder__option ${isSelected ? 'is-selected' : ''} ${isRecommended ? 'is-recommended' : ''}"
            type="button"
            data-js-builder-option
            data-key="${item.key}">
            <img
              class="outfit-builder__option-image"
              src="${item.image}"
              alt="${item.title}">

            <span class="outfit-builder__option-info">
              <span class="outfit-builder__option-title">${item.title}</span>

              <span class="outfit-builder__option-meta">
                ${item.color} · ${formatPrice(item.price)}
              </span>

              ${
                isRecommended
                  ? '<span class="outfit-builder__option-note">Подходит к образу</span>'
                  : ''
              }
            </span>
          </button>
        `;
      })
      .join('');
  };

  const renderBuilder = () => {
    renderPreview();
    renderSummary();
    renderOptions();
  };

  const clearOutfit = () => {
    Object.keys(selectedItems).forEach((type) => {
      selectedItems[type] = null;
    });

    renderBuilder();
  };

  const addSelectedOutfitToCart = () => {
    const outfit = getVisibleOutfit();

    if (!outfit.length) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    outfit.forEach((item) => {
      const existingItem = cart.find((cartItem) => {
        return (
          cartItem.id === item.productId &&
          Number(cartItem.variantIndex ?? 0) === item.variantIndex
        );
      });

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: item.productId,
          variantIndex: item.variantIndex,
          quantity: 1,
        });
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    addButton.textContent = 'Образ добавлен';

    window.setTimeout(() => {
      addButton.textContent = 'Добавить образ в корзину';
    }, 1400);
  };

  rootElement.addEventListener('click', (event) => {
    const audienceButton = event.target.closest(
      '[data-js-builder-audience]',
    );

    if (audienceButton) {
      activeAudience = audienceButton.dataset.jsBuilderAudience;

      rootElement
        .querySelectorAll('[data-js-builder-audience]')
        .forEach((button) => {
          button.classList.toggle(
            'is-active',
            button === audienceButton,
          );
        });

      activeType = 'top';

      rootElement
        .querySelectorAll('[data-js-builder-tab]')
        .forEach((button) => {
          button.classList.toggle(
            'is-active',
            button.dataset.jsBuilderTab === activeType,
          );
        });

      clearOutfit();
      return;
    }

    const tabButton = event.target.closest('[data-js-builder-tab]');

    if (tabButton) {
      activeType = tabButton.dataset.jsBuilderTab;

      rootElement
        .querySelectorAll('[data-js-builder-tab]')
        .forEach((button) => {
          button.classList.toggle('is-active', button === tabButton);
        });

      renderOptions();
      return;
    }

    const optionButton = event.target.closest('[data-js-builder-option]');

    if (optionButton) {
      const items = getBuilderItems({
        audience: activeAudience,
        type: activeType,
      });

      const selectedItem = items.find((item) => {
        return item.key === optionButton.dataset.key;
      });

      if (!selectedItem) return;

      const isSameItem =
        selectedItems[activeType]?.key === selectedItem.key;

      selectedItems[activeType] = isSameItem ? null : selectedItem;

      if (activeType === 'dress' && !isSameItem) {
        selectedItems.top = null;
        selectedItems.bottom = null;
      }

      if (
        (activeType === 'top' || activeType === 'bottom') &&
        !isSameItem
      ) {
        selectedItems.dress = null;
      }

      renderBuilder();
      return;
    }

    if (event.target.closest('[data-js-builder-clear]')) {
      clearOutfit();
    }
  });

  addButton.addEventListener('click', addSelectedOutfitToCart);

  renderBuilder();
}