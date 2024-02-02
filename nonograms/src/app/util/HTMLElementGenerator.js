export default class HTMLElementGenerator {
  constructor(params) {
    this.generate(params);
  }

  generate({ tagName, className = '', attributes = {}, children = [] }) {
    this.element = document.createElement(tagName);
    this.setCssClassNames(className);
    this.setAttributes(attributes);
    this.appendChildren(children);
  }

  setCssClassNames(className) {
    this.element.className = className;
  }

  setAttributes(attributes) {
    Object.keys(attributes).forEach((attribute) =>
      this.element.setAttribute(attribute, attributes[attribute])
    );
  }

  appendChildren(children) {
    this.element.append(
      ...children.map((item) =>
        item instanceof HTMLElementGenerator ? item.getHTMLElement() : item
      )
    );
  }

  getHTMLElement() {
    return this.element;
  }
}
