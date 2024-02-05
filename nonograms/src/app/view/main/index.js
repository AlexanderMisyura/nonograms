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

  showResults() {
    const results = JSON.parse(localStorage.getItem('wins'));
    if (!results) return;
    const box = new HTMLElementGenerator({
      tagName: 'div',
      className: 'box is-flex is-justify-content-center',
    });
    const resultTable = new HTMLElementGenerator({
      tagName: 'table',
      className: 'table is-striped',
    });
    box.appendChildren([resultTable]);

    const tHead = new HTMLElementGenerator({ tagName: 'thead' });
    const trTop = new HTMLElementGenerator({ tagName: 'tr' });
    tHead.appendChildren([trTop]);

    const thTopRow = ['Pos', 'Name', 'Difficulty', 'Time'].map((item) => {
      const th = new HTMLElementGenerator({
        tagName: 'th',
        className: 'is-size-3 is-family-monospace has-text-weight-semibold',
      });
      th.getHTMLElement().textContent = item;
      return th;
    });
    trTop.appendChildren(thTopRow);

    const tBody = new HTMLElementGenerator({ tagName: 'tbody' });
    results.forEach((result, index) => {
      const tr = new HTMLElementGenerator({ tagName: 'tr' });
      const { name, difficulty, formattedTime } = result;
      const thNumber = new HTMLElementGenerator({
        tagName: 'th',
        className: 'is-size-3 is-family-monospace',
      });
      thNumber.getHTMLElement().textContent = index + 1;
      const thName = new HTMLElementGenerator({
        tagName: 'th',
        className: 'is-size-3 is-family-monospace',
      });
      thName.getHTMLElement().textContent = name;
      const thDifficulty = new HTMLElementGenerator({
        tagName: 'th',
        className: 'is-size-3 is-family-monospace',
      });
      thDifficulty.getHTMLElement().textContent = difficulty;
      const thTime = new HTMLElementGenerator({
        tagName: 'th',
        className: 'is-size-3 is-family-monospace',
      });
      thTime.getHTMLElement().textContent = formattedTime;
      tr.appendChildren([thNumber, thName, thDifficulty, thTime]);
      tBody.appendChildren([tr]);
    });

    resultTable.appendChildren([tHead, tBody]);

    this.modal.setContent(box);
    this.modal.open();
  }
}
