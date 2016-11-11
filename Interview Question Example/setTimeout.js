for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 0);
}


for (var i = 0; i < 5; i++) {
  setTimeout(function(x) {
    return function() {
      console.log(x);
    };
  }(i), 0);
}
