import HTMLElementGenerator from '../../util/HTMLElementGenerator';
import BaseView from '../view-base';

export default class ModalView extends BaseView {
  constructor(contentGenerator) {
    super({ tagName: 'div', className: 'modal' });
    this.contentGenerator = contentGenerator;
    this.containerGenerator = null;
    this.background = null;
    this.closeButton = null;
    this.setupView(this.content);
  }

  open() {
    this.generator.getHTMLElement().classList.add('is-active');
  }

  close() {
    this.generator.getHTMLElement().classList.remove('is-active');
  }

  clickHandler() {
    this.close();
  }

  setCallback() {
    this.clickHandler = this.clickHandler.bind(this);
    this.background
      .getHTMLElement()
      .addEventListener('click', this.clickHandler);
    this.closeButton
      .getHTMLElement()
      .addEventListener('click', this.clickHandler);
  }

  setupView(contentGenerator) {
    const modalBackground = new HTMLElementGenerator({
      tagName: 'div',
      className: 'modal-background',
    });
    this.background = modalBackground;
    const modalContainer = new HTMLElementGenerator({
      tagName: 'div',
      className: 'modal-content',
    });
    this.containerGenerator = modalContainer;
    if (contentGenerator) {
      modalContainer.appendChildren([contentGenerator]);
    }
    const modalButton = new HTMLElementGenerator({
      tagName: 'button',
      className: 'modal-close is-large',
    });
    this.closeButton = modalButton;

    this.generator.appendChildren([
      modalBackground,
      modalContainer,
      modalButton,
    ]);
    this.setCallback();
  }

  setContent(contentGenerator) {
    this.contentGenerator = contentGenerator;
    const modalContainer = this.containerGenerator.getHTMLElement();
    while (modalContainer.firstElementChild) {
      modalContainer.firstElementChild.remove();
    }
    this.containerGenerator.appendChildren([this.contentGenerator]);
  }
}
