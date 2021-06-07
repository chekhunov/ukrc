let getData = document.querySelector('.js-clock').getAttribute('data-time');
var countDownDate = new Date(getData).getTime();
// console.log(getData, countDownDate);

let clocks = document.querySelectorAll('.js-clock');

var now = new Date().getTime();
var distance = countDownDate - now;
console.log(distance);
var clearTimer = setInterval(function () {
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days < 10) {
    days = days;
  }
  if (hours < 10) {
    hours = hours;
  }
  console.log(clocks);
  for (let i = 0; i < clocks.length; i++) {
    let setDays = clocks[i].querySelector('.js-days');
    let setHours = clocks[i].querySelector('.js-hours');
    setDays.innerHTML = days;
    setHours.innerHTML = hours;
    console.log(distance);
  }

  if (distance < 0) {
    clearInterval(clearTimer);
    document.getElementById('demo').innerHTML = 'EXPIRED';
  }
}, 1000);
