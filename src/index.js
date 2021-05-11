import refs from './js/refs';
import './css/styles.css';

class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
    this.onTick = onTick;
  }

  getCurrentDate() {
    const expectedDate = this.targetDate.getTime();

    this.intervalId = setInterval(() => {
      const currentDate = Date.now();
      let deltaDate = expectedDate - currentDate;
      if (deltaDate < 0) {
        deltaDate = 0;
        clearInterval(this.intervalId);
      }
      const time = this.getTimeComponents(deltaDate);

      this.onTick(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
      return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jun 01, 2021'),
  onTick: updateTimeComponents,
});

timer.getCurrentDate();

function updateTimeComponents({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}