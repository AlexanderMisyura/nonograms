import './index.scss';
import HTMLElementGenerator from '../../util/HTMLElementGenerator';
import BaseView from '../view-base';

export default class NonogramFieldView extends BaseView {
  constructor(data) {
    super({ tagName: 'div', className: 'nonogram' });
    this.nonogram = data;
    this.setupView(this.nonogram);
  }

  setupView(nonogram) {
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
          attributes: { id: `${rowIndex}-${cellIndex}` },
        });
        const valueGenerator = new HTMLElementGenerator({
          tagName: 'span',
          className: 'nonogram__value',
        });
        cellGenerator.appendChildren([valueGenerator]);
        rowGenerator.appendChildren([cellGenerator]);
      });

      this.generator.appendChildren([rowGenerator]);
    });
  }
}
