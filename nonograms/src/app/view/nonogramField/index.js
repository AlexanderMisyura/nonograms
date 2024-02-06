import './index.scss';
import HTMLElementGenerator from '../../util/HTMLElementGenerator';
import BaseView from '../view-base';
import { copyMatrix } from '../../helpers/traverseMatrix';

export default class NonogramFieldView extends BaseView {
  constructor(data, modal, timer, audio) {
    super({ tagName: 'div', className: 'nonogram' });
    this.nonogram = data;
    this.setupView({ nonogram: this.nonogram });
    this.audio = audio;
    this.modal = modal;
    this.timer = timer;
    this.isShown = false;
    this.userSolution = copyMatrix(data.solution);
  }

  changeOwnNonogram(data, userSolution) {
    this.nonogram = data;
    this.userSolution = userSolution || copyMatrix(data.solution);
  }

  setupView({ nonogram, load = false }) {
    const { solution } = nonogram;
    solution.forEach((row, rowIndex) => {
      const rowGenerator = new HTMLElementGenerator({
        tagName: 'div',
        className: 'nonogram__row',
      });

      row.forEach((cell, cellIndex) => {
        const cellGenerator = new HTMLElementGenerator({
          tagName: 'div',
          className: 'nonogram__cell',
          attributes: { id: `cell-${rowIndex}-${cellIndex}` },
        });
        if (load) {
          const cellClasses = { 1: 'check-filled', 2: 'check-empty' };
          cellGenerator.getHTMLElement().classList.add(cellClasses[cell]);
        }
        const valueGenerator = new HTMLElementGenerator({
          tagName: 'span',
          className: 'nonogram__value',
        });
        cellGenerator.appendChildren([valueGenerator]);
        rowGenerator.appendChildren([cellGenerator]);
      });

      this.generator.appendChildren([rowGenerator]);
    });
    this.setCallback();
  }

  resetField() {
    this.isShown = false;
    const { solution } = this.nonogram;
    const nonogramField = this.getElement();
    for (let i = 0; i < solution.length; i++) {
      for (let j = 0; j < solution[i].length; j++) {
        const cell = nonogramField.querySelector(`#cell-${i}-${j}`);
        cell.classList.remove('check-filled');
        cell.classList.remove('check-empty');
      }
    }
    this.timer.resetTimer();
    this.removeCallback();
    this.userSolution = copyMatrix(this.nonogram.solution);
    this.setCallback();
  }

  revealSolution() {
    this.isShown = true;
    this.timer.resetTimer();

    const { solution } = this.nonogram;
    const nonogramField = this.getElement();
    for (let i = 0; i < solution.length; i++) {
      for (let j = 0; j < solution[i].length; j++) {
        const cell = nonogramField.querySelector(`#cell-${i}-${j}`);
        if (
          (solution[i][j] === 1 && !cell.classList.contains('check-filled')) ||
          (solution[i][j] !== 1 && cell.classList.contains('check-filled'))
        ) {
          this.paintCell(cell);
        }
      }
    }

    this.removeCallback();
  }

  paintCell(cell) {
    cell.classList.remove('check-empty');
    cell.classList.toggle('check-filled');
  }

  markCell(cell) {
    cell.classList.remove('check-filled');
    cell.classList.toggle('check-empty');
  }

  checkWin() {
    for (let i = 0; i < this.nonogram.solution.length; i++) {
      for (let j = 0; j < this.nonogram.solution[i].length; j++) {
        const userCell = this.userSolution[i][j];
        const solutionCell = this.nonogram.solution[i][j];
        if ((userCell === 1 || solutionCell === 1) && userCell !== solutionCell)
          return;
      }
    }
    this.isShown = true;
    this.timer.pauseTimer();
    this.openModal();
    this.writeStorage();
    this.audio.win();
    this.removeCallback();
    this.userSolution = copyMatrix(this.userSolution);
  }

  writeStorage() {
    const currentWin = {
      name: this.nonogram.name,
      difficulty: this.nonogram.difficulty,
      time: this.timer.getTime(),
      formattedTime: this.timer.getTimeFormatted(),
    };

    let latestWins = JSON.parse(localStorage.getItem('wins'));

    if (!latestWins) {
      latestWins = [currentWin];
    } else {
      latestWins.unshift(currentWin);
    }
    latestWins = latestWins.slice(0, 5).toSorted((a, b) => a.time - b.time);
    localStorage.setItem('wins', JSON.stringify(latestWins));
  }

  fillUserSolution({ cell, value }) {
    const { clickRow, clickCell } = cell;
    this.userSolution[clickRow][clickCell] = value;
  }

  getCellValue(cell) {
    if (cell.classList.contains('check-filled')) return 1;
    if (cell.classList.contains('check-empty')) return 2;
    return 0;
  }

  openModal() {
    const modalContentGenerator = new HTMLElementGenerator({
      tagName: 'div',
      className: 'box is-size-1 has-text-centered is-family-monospace',
    });
    modalContentGenerator.getHTMLElement().textContent = `Great! You have solved the nonogram in ${this.timer.getTime()} seconds!`;
    this.modal.setContent(modalContentGenerator);
    this.modal.open();
  }

  closeModal() {
    this.modal.close();
  }

  clickHandler(e) {
    const cell = e.target.closest('.nonogram__cell');
    if (!cell) return;
    this.timer.startTimer();
    this.paintCell(cell);

    const [, clickRow, clickCell] = cell.id.split('-');
    const userValue = this.getCellValue(cell);

    this.fillUserSolution({
      cell: { clickRow, clickCell },
      value: userValue,
    });

    this.audio.click();

    this.checkWin();
  }

  contextMenuHandler(e) {
    e.preventDefault();
    const cell = e.target.closest('.nonogram__cell');
    if (!cell) return;
    this.timer.startTimer();
    this.markCell(cell);

    const [, clickRow, clickCell] = cell.id.split('-');
    const userValue = this.getCellValue(cell);

    this.fillUserSolution({
      cell: { clickRow, clickCell },
      value: userValue,
    });

    this.audio.contextMenu();

    this.checkWin();
  }

  setCallback() {
    this.clickHandler = this.clickHandler.bind(this);
    this.contextMenuHandler = this.contextMenuHandler.bind(this);
    this.getElement().addEventListener('click', this.clickHandler);
    this.getElement().addEventListener('contextmenu', this.contextMenuHandler);
  }

  removeCallback() {
    this.getElement().removeEventListener('click', this.clickHandler);
    this.getElement().removeEventListener(
      'contextmenu',
      this.contextMenuHandler
    );
  }
}
