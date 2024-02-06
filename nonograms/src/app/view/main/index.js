import './index.scss';
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
      textContent: 'Solution',
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
    let results = JSON.parse(localStorage.getItem('wins'));
    if (!results) return;
    const box = new HTMLElementGenerator({
      tagName: 'div',
      className: 'box is-flex is-justify-content-center',
    });
    const resultTable = new HTMLElementGenerator({
      tagName: 'table',
      className: 'table is-striped is-family-monospace',
    });
    box.appendChildren([resultTable]);

    const tHead = new HTMLElementGenerator({ tagName: 'thead' });
    const trTop = new HTMLElementGenerator({ tagName: 'tr' });
    tHead.appendChildren([trTop]);

    const thTopRow = ['Pos', 'Name', 'Difficulty', 'Time'].map((item) => {
      const th = new HTMLElementGenerator({
        tagName: 'th',
        className: 'is-size-3 has-text-weight-semibold',
      });
      th.getHTMLElement().textContent = item;
      return th;
    });
    trTop.appendChildren(thTopRow);

    const tBody = new HTMLElementGenerator({ tagName: 'tbody' });

    results = results.toSorted((a, b) => a.time - b.time);
    results.forEach((result, index) => {
      const tr = new HTMLElementGenerator({ tagName: 'tr' });
      const { name, difficulty, formattedTime } = result;
      const tdNumber = new HTMLElementGenerator({
        tagName: 'td',
        className: 'is-size-3',
      });
      tdNumber.getHTMLElement().textContent = index + 1;
      const tdName = new HTMLElementGenerator({
        tagName: 'td',
        className: 'is-size-3',
      });
      tdName.getHTMLElement().textContent = name;
      const tdDifficulty = new HTMLElementGenerator({
        tagName: 'td',
        className: 'is-size-3',
      });
      tdDifficulty.getHTMLElement().textContent = difficulty;
      const tdTime = new HTMLElementGenerator({
        tagName: 'td',
        className: 'is-size-3',
      });
      tdTime.getHTMLElement().textContent = formattedTime;
      tr.appendChildren([tdNumber, tdName, tdDifficulty, tdTime]);
      tBody.appendChildren([tr]);
    });

    resultTable.appendChildren([tHead, tBody]);

    this.modal.setContent(box);
    this.modal.open();
  }

  showNonograms() {
    const box = new HTMLElementGenerator({
      tagName: 'div',
      className: 'box is-flex is-justify-content-center',
    });

    const nonograms = this.nonogramSection.getAllNonograms();
    const distributedNonogams = [
      nonograms.filter((item) => item.difficulty === 'easy'),
      nonograms.filter((item) => item.difficulty === 'medium'),
      nonograms.filter((item) => item.difficulty === 'hard'),
    ];

    distributedNonogams.forEach((difficultyArray, index) => {
      const table = new HTMLElementGenerator({
        tagName: 'table',
        className:
          'table is-size-3 is-striped is-hoverable is-family-monospace',
      });
      box.appendChildren([table]);
      const tHead = new HTMLElementGenerator({ tagName: 'thead' });
      const trTop = new HTMLElementGenerator({ tagName: 'tr' });
      tHead.appendChildren([trTop]);
      const th = new HTMLElementGenerator({ tagName: 'th' });
      trTop.appendChildren([th]);
      th.getHTMLElement().textContent = difficultyArray[0].difficulty;
      const tBody = new HTMLElementGenerator({ tagName: 'tbody' });
      table.appendChildren([tHead, tBody]);
      if (index === distributedNonogams.length - 1) {
        table.getHTMLElement().classList.add('mb-5');
      }

      difficultyArray.forEach((item) => {
        const tr = new HTMLElementGenerator({ tagName: 'tr' });
        const td = new HTMLElementGenerator({
          tagName: 'td',
          className: 'is-clickable',
          attributes: { 'data-id': item.id },
        });
        td.getHTMLElement().textContent = item.name;
        tr.appendChildren([td]);
        tBody.appendChildren([tr]);

        tBody
          .getHTMLElement()
          .addEventListener('click', this.changeNonogramHandler.bind(this));

        this.modal.setContent(box);
        this.modal.open();
      });
    });
  }

  changeNonogramHandler(e) {
    const td = e.target.closest('td');
    const { id } = td.dataset;
    this.nonogramSection.setupNonogramByIndex(id);
    this.modal.close();
  }
}
