import BaseView from '../view-base';
import TimerView from '../timer';

export default class MainView extends BaseView {
  constructor() {
    super({
      tagName: 'main',
      className:
        'container is-flex is-justify-content-center is-align-items-center is-flex-direction-column',
    });
    this.timer = null;
    this.setupView();
  }

  setupView() {
    this.timer = new TimerView();
    this.generator.appendChildren([this.timer.getElement()]);
  }
}
