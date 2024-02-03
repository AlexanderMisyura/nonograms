import BaseView from '../view-base';
import NavbarView from '../navbar';

export default class HeaderView extends BaseView {
  constructor() {
    super({
      tagName: 'header',
      className: 'container box mt-1',
    });
    this.setupView();
  }

  setupView() {
    const navbarElement = new NavbarView().getElement();
    this.generator.appendChildren([navbarElement]);
  }
}
