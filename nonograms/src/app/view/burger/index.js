import HTMLElementGenerator from '../../util/HTMLElementGenerator';
import BaseView from '../view-base';

export default class BurgerView extends BaseView {
  constructor(target) {
    super({
      tagName: 'a',
      className: 'navbar-burger',
    });
    this.setupView(target);
  }

  toggleMenu(target) {
    this.getElement().classList.toggle('is-active');
    target.classList.toggle('is-active');
  }

  setupView(targetElement) {
    this.generator.appendChildren(
      Array.from(
        { length: 3 },
        () => new HTMLElementGenerator({ tagName: 'span' })
      )
    );

    this.getElement().addEventListener('click', () =>
      this.toggleMenu(targetElement)
    );
  }
}
