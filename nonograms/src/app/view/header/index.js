import BaseView from '../view-base';
import NavbarView from '../navbar';

export default class HeaderView extends BaseView {
  constructor(main) {
    super({
      tagName: 'header',
      className: 'container box mt-1',
    });
    this.setupView(main);
  }

  setupView(main) {
    const navbarElement = new NavbarView(main).getElement();
    this.generator.appendChildren([navbarElement]);
  }
}
