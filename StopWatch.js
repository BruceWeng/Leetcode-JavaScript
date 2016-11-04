class StopWatch {
  constructor() {
    this.startAt = 0; // last time startAt
    this.lastStopTime = 0;
    this.now = () => {
      return (new Date()).getTime();
    }
  }

  start() {
    this.startAt = this.startAt ? this.startAt : this.now();
  }

  stop() {
    this.lastStopTime = (this.startAt ? this.lastStopTime + this.now() - this.startAt : this.lastStopTime);
    this.startAt = 0;
  }

  reset() {
    this.startAt = 0;
    this.lastStopTime = 0;
  }

  duration() {
    return this.lastStopTime + (this.startAt ? this.now() - this.startAt: 0);
  }
}

let test = new StopWatch();

test.start();
setInterval(function() {
  test.stop();
  console.log(test.duration());
}, 1000);
