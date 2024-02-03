import '../main.scss';
import HeaderView from './view/header';
import MainView from './view/main';

export default class App {
  constructor() {
    this.renderPage();
  }

  renderPage() {
    const header = new HeaderView();
    const main = new MainView();
    document.body.append(header.getElement(), main.getElement());
  }
}
