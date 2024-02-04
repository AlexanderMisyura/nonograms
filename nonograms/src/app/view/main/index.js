import BaseView from '../view-base';
import TimerView from '../timer';
import NonogramSectionView from '../nonogramSection';

export default class MainView extends BaseView {
  constructor() {
    super({
      tagName: 'main',
      className:
        'container is-flex is-justify-content-center is-align-items-center is-flex-direction-column',
    });
    this.timer = null;
    this.nonogramSection = null;
    this.setupView();
  }

  setupView() {
    this.timer = new TimerView();
    this.nonogramSection = new NonogramSectionView();
    this.generator.appendChildren([
      this.timer.getElement(),
      this.nonogramSection.getElement(),
    ]);
  }
}
