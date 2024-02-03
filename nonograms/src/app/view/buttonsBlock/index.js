import ButtonView from '../button';
import BaseView from '../view-base';

export default class ButtonsBlockView extends BaseView {
  constructor(buttons) {
    super({
      tagName: 'div',
      className: 'buttons is-flex is-justify-content-center',
    });
    this.setupView(buttons);
  }

  setupView(buttons) {
    this.generator.appendChildren(
      buttons.map((btn) => new ButtonView(btn).getElement())
    );
  }
}
