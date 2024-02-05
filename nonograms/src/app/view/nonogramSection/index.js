import './index.scss';
import BaseView from '../view-base';
import NonogramFieldView from '../nonogramField';
import NonogramHintView from '../nonogramHint';
import nonograms from '../../nonograms';

export default class NonogramSectionView extends BaseView {
  constructor(modal, timer) {
    super({ tagName: 'section', className: 'section box nonogram-section' });
    this.nonogramField = null;
    this.setupView(nonograms[0], modal, timer);
  }

  setupView(data, modal, timer) {
    const { solution } = data;
    const nonogramTopHint = new NonogramHintView({ solution, top: true });
    nonogramTopHint.getElement().classList.add('hint-top');
    const nonogramSideHint = new NonogramHintView({
      solution,
      top: false,
    });
    nonogramSideHint.getElement().classList.add('hint-side');
    const nonogramField = new NonogramFieldView(data, modal, timer);
    this.nonogramField = nonogramField;
    this.generator.appendChildren([
      nonogramTopHint.getElement(),
      nonogramField.getElement(),
      nonogramSideHint.getElement(),
    ]);
  }
}
