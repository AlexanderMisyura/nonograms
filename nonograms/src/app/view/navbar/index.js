import './index.scss';
import logoSrc from '../../../assets/images/logo-long.png';
import BaseView from '../view-base';
import HTMLElementGenerator from '../../util/HTMLElementGenerator';
import BurgerView from '../burger';
import ButtonsBlockView from '../buttonsBlock';
import toggleTheme from '../../helpers/toggleTheme';

const navbarCss = {
  navbar: 'navbar is-align-items-center',
  navbarBrand: 'navbar-brand is-align-items-center',
  navbarEnd: 'navbar-end',
  navbarMenu: 'navbar-menu is-shadowless',
  logo: 'image has-ratio',
};

const buttonCss = {
  plainBtn: 'button is-white is-medium pl-3 pr-3 m-0',
  iconBtn: 'button is-white is-large m-0 has-width-50',
  iconVolumeOn: 'fa-solid fa-volume-high',
  iconVolumeOff: 'fa-solid fa-volume-xmark',
  iconSun: 'fa-solid fa-sun',
  iconMoon: 'fa-solid fa-moon',
};

export default class NavbarView extends BaseView {
  constructor(main) {
    super({
      tagName: 'nav',
      className: navbarCss.navbar,
    });
    this.main = main;
    this.audio = main.audio;
    this.nonogramSection = main.nonogramSection;
    this.nonogramField = main.nonogramSection.nonogramField;
    this.setupView(this.main);
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

    const plainButtons = [
      {
        textContent: 'Reset Game',
        className: buttonCss.plainBtn,
        callback: this.nonogramField.resetField.bind(this.nonogramField),
      },
      {
        textContent: 'Save Game',
        className: buttonCss.plainBtn,
        callback: this.nonogramSection.saveNonogram.bind(this.nonogramSection),
      },
      {
        textContent: 'Continue Last Game',
        className: buttonCss.plainBtn,
        callback: this.nonogramSection.continueNonogram.bind(
          this.nonogramSection
        ),
      },
      {
        textContent: 'Change Nonogram',
        className: buttonCss.plainBtn,
        callback: this.main.showNonograms.bind(this.main),
      },
      {
        textContent: 'Results',
        className: buttonCss.plainBtn,
        callback: this.main.showResults.bind(this.main),
      },
      {
        textContent: 'Random Game',
        className: buttonCss.plainBtn,
        callback: this.nonogramSection.setupRandomNonogram.bind(
          this.nonogramSection
        ),
      },
    ];

    const iconButtons = [
      {
        className: buttonCss.iconBtn,
        iconClassNames: {
          active: buttonCss.iconVolumeOn,
          inactive: buttonCss.iconVolumeOff,
        },
        callback: this.audio.toggleMuteAudio.bind(this.audio),
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
