import './index.scss';
import BaseView from '../view-base';
import NonogramFieldView from '../nonogramField';
import NonogramHintView from '../nonogramHint';
import nonograms from '../../nonograms';

export default class NonogramSectionView extends BaseView {
  constructor(modal, timer, audio) {
    super({ tagName: 'section', className: 'section box nonogram-section' });
    this.timer = timer;
    this.audio = audio;
    this.modal = modal;
    this.nonogramField = null;
    [this.nonogram] = nonograms;
    this.setupView(this.nonogram, this.modal, this.timer, this.audio);
  }

  setupView(data, modal, timer, audio) {
    const { solution } = data;
    const nonogramTopHint = new NonogramHintView({ solution, top: true });
    nonogramTopHint.getElement().classList.add('hint-top');
    const nonogramSideHint = new NonogramHintView({
      solution,
      top: false,
    });
    nonogramSideHint.getElement().classList.add('hint-side');
    const nonogramField = new NonogramFieldView(data, modal, timer, audio);
    this.nonogramField = nonogramField;
    this.generator.appendChildren([
      nonogramTopHint.getElement(),
      nonogramField.getElement(),
      nonogramSideHint.getElement(),
    ]);
  }
}
