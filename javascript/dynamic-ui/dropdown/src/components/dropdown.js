export class Dropdown {
  constructor(element, options = {}) {
    this.dropdown = element;
    this.toggle = element.querySelector('.dropdown-toggle');
    this.menu = element.querySelector('.dropdown-menu');
    this.trigger = element.dataset.trigger || 'click';
    this.isOpen = false;

    this.options = {
      closeOnClickOutside: true,
      ...options,
    };

    this.init()
  }

  init() {
    if (this.trigger === 'click') {
      this.toggle.addEventListener('click', this.toggleMenu.bind(this));
    } else if (this.trigger === 'hover') {
      this.dropdown.addEventListener('mouseenter', this.show.bind(this));
      this.dropdown.addEventListener('mouseleave', this.hide.bind(this));
    }
    
    if (this.options.closeOnClickOutside) {
      document.addEventListener('click', this.handleClickOutside.bind(this));
    }
  }

  toggleMenu(event) {
    event.stopPropagation();
    this.isOpen ? this.hide() : this.show();
  }

  show() {
    this.menu.classList.add('visible');
    this.isOpen = true;
  }
  
  hide() {
    this.menu.classList.remove('visible');
    this.isOpen = false;
  }

  handleClickOutside(event) {
    if (this.isOpen && !this.dropdown.contains(event.target)) {
      this.hide();
    }
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Dropdown;
}