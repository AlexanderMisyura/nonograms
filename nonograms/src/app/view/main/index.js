import BaseView from '../view-base';
import TimerView from '../timer';
import AudioPlayer from '../../util/AudioPlayer';
import NonogramSectionView from '../nonogramSection';
import ModalView from '../modal';
import ButtonView from '../button';
import HTMLElementGenerator from '../../util/HTMLElementGenerator';

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
    this.audio = new AudioPlayer();
    this.timer = new TimerView();
    this.modal = new ModalView();
    this.nonogramSection = new NonogramSectionView(
      this.modal,
      this.timer,
      this.audio
    );

    const container = new HTMLElementGenerator({
      tagName: 'section',
      className: 'section is-flex is-align-items-center',
    });

    const { nonogramField } = this.nonogramSection;

    const showSolutionButton = new ButtonView({
      textContent: 'Show solution',
      className: 'button is-white is-large m-0',
      callback: nonogramField.revealSolution.bind(nonogramField),
    });

    container.appendChildren([
      this.timer.getElement(),
      showSolutionButton.getElement(),
    ]);

    this.generator.appendChildren([
      container,
      this.nonogramSection.getElement(),
      this.modal.getElement(),
    ]);
  }
}
