import BaseView from '../view-base';

export default class TimerView extends BaseView {
  constructor(startTimeStamp = 0) {
    super({
      tagName: 'div',
      className: 'box is-size-2 is-family-monospace mb-0 mr-6',
    });
    this.time = startTimeStamp;
    this.timerId = null;
    this.setupView();
  }

  startTimer() {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        this.time++;
        this.updateDisplay();
      }, 1000);
    }
  }

  pauseTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  resetTimer() {
    this.pauseTimer();
    this.time = 0;
    this.updateDisplay();
  }

  getTime() {
    return this.time;
  }

  getTimeFormatted() {
    const min = Math.floor(this.time / 60);
    const sec = this.time % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

  updateDisplay() {
    this.getElement().textContent = this.getTimeFormatted();
  }

  setupView() {
    this.getElement().textContent = '0:00';
  }
}
