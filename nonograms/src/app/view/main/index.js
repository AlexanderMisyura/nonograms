import BaseView from '../view-base';

export default class MainView extends BaseView {
  constructor() {
    super({
      tagName: 'main',
      className:
        'container is-flex is-justify-content-center is-align-items-center is-flex-direction-column',
    });
    this.setupView();
  }

  setupView() {
    this.generator.appendChildren([]);
  }
}
