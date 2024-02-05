import clickSound from '../../assets/sounds/click.wav';
import contextMenuSound from '../../assets/sounds/context_menu.wav';
import winAudio from '../../assets/sounds/win.wav';

export default class AudioPlayer {
  constructor() {
    this.clickAudio = new Audio(clickSound);
    this.contextMenuAudio = new Audio(contextMenuSound);
    this.winAudio = new Audio(winAudio);
  }

  async click() {
    await this.stopAudio();
    this.clickAudio.play();
  }

  async contextMenu() {
    await this.stopAudio();
    this.contextMenuAudio.play();
  }

  async win() {
    await this.stopAudio();
    this.winAudio.play();
  }

  async stopAudio() {
    const audioList = Object.getOwnPropertyNames(this);
    audioList.forEach((audio) => {
      this[audio].pause();
      this[audio].currentTime = 0;
    });
  }
}
