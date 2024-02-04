import './index.scss';
import HTMLElementGenerator from '../../util/HTMLElementGenerator';
import BaseView from '../view-base';
import {
  traverseFromTop,
  traverseFromSide,
} from '../../helpers/traverseMatrix';

export default class NonogramHintView extends BaseView {
  constructor({ solution, top = true }) {
    super({
      tagName: 'div',
      className: `hint hint-${top ? 'top' : 'side'} is-family-monospace is-size-4`,
    });
    this.setupView({ solution, top });
  }

  setupView({ solution, top }) {
    let hintMatrix;
    if (top) hintMatrix = traverseFromTop(solution);
    else hintMatrix = traverseFromSide(solution);

    hintMatrix.forEach((row) => {
      const rowGenerator = new HTMLElementGenerator({
        tagName: 'div',
        className: 'hint__row',
      });
      row.forEach((cell) => {
        const cellGenerator = new HTMLElementGenerator({
          tagName: 'div',
          className: 'hint__cell',
        });
        if (cell !== 0) {
          const valueGenerator = new HTMLElementGenerator({
            tagName: 'span',
            className: 'hint__value',
          });
          valueGenerator.getHTMLElement().textContent = cell;
          cellGenerator.appendChildren([valueGenerator]);
        }
        rowGenerator.appendChildren([cellGenerator]);
      });
      this.generator.appendChildren([rowGenerator]);
    });
  }
}
