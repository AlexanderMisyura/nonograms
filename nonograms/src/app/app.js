import '../main.scss';
import HeaderView from './view/header';
import MainView from './view/main';

export default class App {
  constructor() {
    this.renderPage();
  }

  renderPage() {
    const main = new MainView();
    const header = new HeaderView(main);
    document.body.append(header.getElement(), main.getElement());
  }
}
