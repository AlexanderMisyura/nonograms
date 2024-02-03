import './index.scss';
import HTMLElementGenerator from '../../util/HTMLElementGenerator';
import BaseView from '../view-base';

export default class ButtonView extends BaseView {
  constructor({ textContent = '', className, iconClassNames = null }) {
    super({
      tagName: 'button',
      className,
    });
    this.iconClasses = iconClassNames;
    this.setupView({ textContent, iconClassNames });
  }

  changeIcon() {
    if (this.icon) {
      this.icon.className = this.iconClasses.inactive;
      [this.iconClasses.active, this.iconClasses.inactive] = [
        this.iconClasses.inactive,
        this.iconClasses.active,
      ];
    }
  }

  setupView({ textContent, iconClassNames }) {
    if (textContent) {
      this.getElement().textContent = textContent;
    }
    if (iconClassNames) {
      const iconGenerator = new HTMLElementGenerator({
        tagName: 'i',
        className: this.iconClasses.active,
      });
      this.icon = iconGenerator.getHTMLElement();
      this.generator.appendChildren([this.icon]);

      this.getElement().addEventListener('click', () => this.changeIcon());
      this.getElement().addEventListener('mouseenter', () => this.changeIcon());
      this.getElement().addEventListener('mouseleave', () => this.changeIcon());
    }
  }
}
