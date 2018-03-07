class UserInfo {
  constructor() {
    var event = 1, value = 2;
    this.handleAgeChange = () => {
      console.log(event, value);
    }
  }
}

let userInfo = new UserInfo();
userInfo.handleAgeChange();
