import HTMLElementGenerator from '../util/HTMLElementGenerator';

export default class BaseView {
  constructor(params) {
    this.generator = this.generateView(params);
  }

  generateView(params) {
    return new HTMLElementGenerator(params);
  }

  getElement() {
    return this.generator.getHTMLElement();
  }
}
