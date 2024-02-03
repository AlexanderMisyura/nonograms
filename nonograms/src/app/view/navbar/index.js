import './index.scss';
import logoSrc from '../../../assets/images/logo-long.png';
import BaseView from '../view-base';
import HTMLElementGenerator from '../../util/HTMLElementGenerator';
import BurgerView from '../burger';
import ButtonsBlockView from '../buttonsBlock';
import toggleTheme from '../../helpers/toggleTheme';

const navbarCss = {
  navbar: 'navbar is-flex is-align-items-center',
  navbarBrand: 'navbar-brand is-flex is-align-items-center',
  navbarEnd: 'navbar-end',
  navbarMenu: 'navbar-menu is-shadowless',
  logo: 'image has-ratio',
};

const buttonCss = {
  plainBtn: 'button is-white is-medium m-0',
  iconBtn: 'button is-white is-large m-0 has-width-50',
  iconVolumeOn: 'fa-solid fa-volume-high',
  iconVolumeOff: 'fa-solid fa-volume-xmark',
  iconSun: 'fa-solid fa-sun',
  iconMoon: 'fa-solid fa-moon',
};

const plainButtons = [
  { textContent: 'Restart', className: buttonCss.plainBtn },
  { textContent: 'Save Game', className: buttonCss.plainBtn },
  { textContent: 'Change Nonogram', className: buttonCss.plainBtn },
  { textContent: 'Results', className: buttonCss.plainBtn },
  { textContent: 'Random Game', className: buttonCss.plainBtn },
  { textContent: 'Show Solution', className: buttonCss.plainBtn },
];

const iconButtons = [
  {
    className: buttonCss.iconBtn,
    iconClassNames: {
      active: buttonCss.iconVolumeOn,
      inactive: buttonCss.iconVolumeOff,
    },
  },
  {
    className: buttonCss.iconBtn,
    iconClassNames: {
      active: buttonCss.iconSun,
      inactive: buttonCss.iconMoon,
    },
    callback: toggleTheme,
  },
];

export default class NavbarView extends BaseView {
  constructor() {
    super({
      tagName: 'nav',
      className: navbarCss.navbar,
    });
    this.setupView();
  }

  setupView() {
    const navbarEndGenerator = new HTMLElementGenerator({
      tagName: 'div',
      className: navbarCss.navbarEnd,
    });

    const navbarMenuGenerator = new HTMLElementGenerator({
      tagName: 'div',
      className: navbarCss.navbarMenu,
    });
    navbarMenuGenerator.appendChildren([navbarEndGenerator]);

    const buttonsBlockPlain = new ButtonsBlockView(plainButtons);
    const buttonsBlockIcon = new ButtonsBlockView(iconButtons);
    navbarEndGenerator.appendChildren([
      buttonsBlockPlain.getElement(),
      buttonsBlockIcon.getElement(),
    ]);

    const navbarBrandGenerator = new HTMLElementGenerator({
      tagName: 'div',
      className: navbarCss.navbarBrand,
    });
    const logo = new HTMLElementGenerator({
      tagName: 'img',
      className: navbarCss.logo,
      attributes: { src: logoSrc, alt: 'logo', height: '32' },
    });
    const burger = new BurgerView(navbarMenuGenerator.getHTMLElement());
    navbarBrandGenerator.appendChildren([logo, burger.getElement()]);

    this.generator.appendChildren([navbarBrandGenerator, navbarMenuGenerator]);
  }
}
