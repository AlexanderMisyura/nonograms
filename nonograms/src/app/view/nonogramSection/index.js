import './index.scss';
import BaseView from '../view-base';
import NonogramFieldView from '../nonogramField';
import NonogramHintView from '../nonogramHint';
import nonograms from '../../nonograms';
import random from '../../helpers/random';

export default class NonogramSectionView extends BaseView {
  constructor(modal, timer, audio) {
    super({ tagName: 'section', className: 'section box nonogram-section' });
    this.timer = timer;
    this.audio = audio;
    this.modal = modal;
    this.nonogramField = null;
    this.nonogramTopHint = null;
    this.nonogramSideHint = null;
    [this.nonogram] = nonograms;
    this.setupView(this.nonogram, this.modal, this.timer, this.audio);
  }

  getAllNonograms() {
    return nonograms;
  }

  saveNonogram() {
    if (this.nonogramField.isShown) return;
    const time = this.timer.getTime();
    const solution = this.nonogramField.userSolution;
    const { name, id } = this.nonogram;
    localStorage.setItem(
      'nonogramSave',
      JSON.stringify({
        time,
        solution,
        name,
        id,
      })
    );
  }

  continueNonogram() {
    const userNonogram = JSON.parse(localStorage.getItem('nonogramSave'));
    if (!userNonogram) return;
    const { time, solution, name, id } = userNonogram;
    const nonogram = nonograms.find((item) => item.id === id);
    this.setNonogram(nonogram);
    this.timer.resetTimer(time);
    this.removeNonogram();
    this.nonogramField.isShown = false;
    this.nonogramField.changeOwnNonogram(this.nonogram, solution);
    this.nonogramField.removeCallback();
    this.nonogramField.setupView({
      nonogram: { solution, name, id },
      load: true,
    });
    this.nonogramTopHint.setupView({
      solution: this.nonogram.solution,
      top: true,
    });
    this.nonogramSideHint.setupView({
      solution: this.nonogram.solution,
      top: false,
    });
  }

  removeNonogram() {
    const nonogramField = this.nonogramField.getElement();
    while (nonogramField.firstElementChild) {
      nonogramField.firstElementChild.remove();
    }
    const nonogramTopHint = this.nonogramTopHint.getElement();
    while (nonogramTopHint.firstElementChild) {
      nonogramTopHint.firstElementChild.remove();
    }
    const nonogramSideHint = this.nonogramSideHint.getElement();
    while (nonogramSideHint.firstElementChild) {
      nonogramSideHint.firstElementChild.remove();
    }
  }

  setupRandomNonogram() {
    const randomIndex = random(0, nonograms.length - 1);
    this.setNonogram(nonograms[randomIndex]);
    this.resetSection();
  }

  setupNonogramByIndex(index) {
    this.setNonogram(nonograms[index]);
    this.resetSection();
  }

  setNonogram(nonogram) {
    this.nonogram = nonogram;
  }

  resetSection() {
    this.timer.resetTimer();
    this.removeNonogram();
    this.nonogramField.changeOwnNonogram(this.nonogram);
    this.nonogramField.removeCallback();
    this.nonogramField.isShown = false;
    this.nonogramField.setupView({ nonogram: this.nonogram });
    this.nonogramTopHint.setupView({
      solution: this.nonogram.solution,
      top: true,
    });
    this.nonogramSideHint.setupView({
      solution: this.nonogram.solution,
      top: false,
    });
  }

  setupView(data, modal, timer, audio) {
    const { solution } = data;
    this.nonogramTopHint = new NonogramHintView({ solution, top: true });
    this.nonogramTopHint.getElement().classList.add('hint-top');
    this.nonogramSideHint = new NonogramHintView({
      solution,
      top: false,
    });
    this.nonogramSideHint.getElement().classList.add('hint-side');
    this.nonogramField = new NonogramFieldView(data, modal, timer, audio);

    this.generator.appendChildren([
      this.nonogramTopHint.getElement(),
      this.nonogramField.getElement(),
      this.nonogramSideHint.getElement(),
    ]);
  }
}
