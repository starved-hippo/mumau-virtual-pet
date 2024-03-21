$(document).ready(function () {
  var starttime = new Date().getTime();

  var happiness = 100;
  var hunger = 100;
  var hygiene = 100;
  var energy = 100;
  var speed = 0.01;

  setInterval(gettime, 10);
  function gettime() {
    var currenttime = new Date().getTime();
    $(".demo").text((currenttime - starttime) / 1000);

    $(".hunger").css("background-position-y", hunger + "%");
    $(".energy").css("background-position-y", energy + "%");
    $(".hygiene").css("background-position-y", hygiene + "%");
    $(".happiness").css("background-position-y", happiness + "%");

    happiness = happiness - speed;
    if (happiness < 0) {
      happiness = 0;
    }

    hunger = hunger - speed;
    if (hunger < 0) {
      hunger = 0;
    }

    hygiene = hygiene - speed;
    if (hygiene < 0) {
      hygiene = 0;
    }

    energy = energy - speed;
    if (energy < 0) {
      energy = 0;
    }
  }

  $(".happiness").click(function (e) {
    e.preventDefault();
    happiness = 100;
  });
  $(".hunger").click(function (e) {
    e.preventDefault();
    hunger = 100;
  });
  $(".hygiene").click(function (e) {
    e.preventDefault();
    hygiene = 100;
  });
  $(".energy").click(function (e) {
    e.preventDefault();
    energy = 100;
  });
});
