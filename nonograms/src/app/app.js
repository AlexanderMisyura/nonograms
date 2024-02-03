import '../main.scss';
import HeaderView from './view/header';

export default class App {
  constructor() {
    this.renderPage();
  }

  renderPage() {
    const header = new HeaderView();
    document.body.append(header.getElement());
  }
}
