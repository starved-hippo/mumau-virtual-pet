$(document).ready(function () {
  var starttime = new Date().getTime();
  var currenttime = new Date();

  var happiness = parseFloat(localStorage.getItem("happiness"));
  if (!happiness && happiness != 0) {
    happiness = 100;
  }
  var hunger = parseFloat(localStorage.getItem("hunger"));
  if (!hunger && hunger != 0) {
    hunger = 100;
  }
  var hygiene = parseFloat(localStorage.getItem("hygiene"));
  if (!hygiene && hygiene != 0) {
    hygiene = 100;
  }
  var energy = parseFloat(localStorage.getItem("energy"));
  if (!energy && energy != 0) {
    energy = 100;
  }

  var tab = "#home";
  var yawn = false;
  var speed = 0.001;

  let items = [];
  let shop = [["laser pointer",10],["feather",3],["tummy rubs"],2];
  
  $(tab + "tab").show();

  $.getJSON("messages.json", function (json) {
    $(".msg").text(
      json["cute_greeting_messages"][
        Math.floor(Math.random() * json["cute_greeting_messages"].length)
      ]
    );
  });

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

  $(".cat").click(function (e) {
    e.preventDefault();
    if (yawn == false) {
      $(".cat").attr("src", "images/cat/yawn.gif");
      yawn = true;
      setTimeout(function () {
        $(".cat").attr("src", "images/cat/kitten.png");
        yawn = false;
      }, 2040);
    }
  });

  $(".tab").click(function (e) {
    e.preventDefault();
    $(tab + "tab").hide();
    tab = "#" + $(this).attr("id");
    $("#" + $(this).attr("id") + "tab").show();
  });

  setInterval(loop, 10);
  function loop() {
    localStorage.setItem("time", currenttime.getTime());

    $(".hunger").css("background-position-y", hunger + "%");
    $(".energy").css("background-position-y", energy + "%");
    $(".hygiene").css("background-position-y", hygiene + "%");
    $(".happiness").css("background-position-y", happiness + "%");

    localStorage.setItem("happiness", happiness);
    localStorage.setItem("hunger", hunger);
    localStorage.setItem("hygiene", hygiene);
    localStorage.setItem("energy", energy);

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
});
