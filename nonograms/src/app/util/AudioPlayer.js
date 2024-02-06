import clickSound from '../../assets/sounds/click.wav';
import contextMenuSound from '../../assets/sounds/context_menu.wav';
import winAudio from '../../assets/sounds/win.wav';
import clackAudio from '../../assets/sounds/clack.wav';

export default class AudioPlayer {
  constructor() {
    this.clickAudio = new Audio(clickSound);
    this.contextMenuAudio = new Audio(contextMenuSound);
    this.winAudio = new Audio(winAudio);
    this.clackAudio = new Audio(clackAudio);
  }

  async click() {
    await this.stopAudio();
    this.clickAudio.play();
  }

  async contextMenu() {
    await this.stopAudio();
    this.contextMenuAudio.play();
  }

  async clack() {
    await this.stopAudio();
    this.clackAudio.play();
  }

  async win() {
    await this.stopAudio();
    this.winAudio.play();
  }

  async stopAudio() {
    const audioList = Object.getOwnPropertyNames(this);
    audioList.forEach((audio) => {
      if (this[audio].readyState === 4) {
        this[audio].pause();
        this[audio].currentTime = 0;
      }
    });
  }

  async toggleMuteAudio() {
    const audioList = Object.getOwnPropertyNames(this);
    audioList.forEach((audio) => {
      this[audio].muted = !this[audio].muted;
    });
  }
}
