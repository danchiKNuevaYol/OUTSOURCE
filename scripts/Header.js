class Header {
    selectors = {
      root: '[data-js-header]',
      overlay: '[data-js-header-overlay]',
      burgerButton: '[data-js-header-burger-button]',
      menuLink: '.header__menu-link',
    }
  
    stateClasses = {
      isActive: 'is-active',
      isLock: 'is-lock',
    }
  
    constructor() {
      this.rootElement = document.querySelector(this.selectors.root)
  
      if (!this.rootElement) return
  
      this.overlayElement = this.rootElement.querySelector(this.selectors.overlay)
      this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton)
      this.menuLinkElements = this.rootElement.querySelectorAll(this.selectors.menuLink)
  
      this.bindEvents()
    }
  
    closeMenu = () => {
      this.burgerButtonElement.classList.remove(this.stateClasses.isActive)
      this.overlayElement.classList.remove(this.stateClasses.isActive)
      document.documentElement.classList.remove(this.stateClasses.isLock)
    }
  
    onBurgerButtonClick = () => {
      this.burgerButtonElement.classList.toggle(this.stateClasses.isActive)
      this.overlayElement.classList.toggle(this.stateClasses.isActive)
      document.documentElement.classList.toggle(this.stateClasses.isLock)
    }
  
    bindEvents() {
      this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick)
  
      this.menuLinkElements.forEach((link) => {
        link.addEventListener('click', this.closeMenu)
      })
    }
  }
  
  export default Header