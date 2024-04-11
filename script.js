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
  var i = 0;

  var money = parseFloat(localStorage.getItem("money"));
  if (!money && money != 0) {
    money = 100;
  }
  $("#purse").text("purse $" + money);


  var items = JSON.parse(localStorage.getItem("items"))
  if (!items){
    items = [
      ["laser pointer", 0],
      ["feather", 0],
      ["tummy rubs", 0],
      ["salami", 0],
      ["sardine", 0],
      ["carrot", 0],
      ["spa day", 0],
      ["soap", 0],
      ["spray", 0],
      ["monster", 0],
      ["coffee", 0],
      ["tea", 0],
    ];
    localStorage.setItem("items", JSON.stringify(items))
  } 

  var shop = [
    ["laser pointer", 50],
    ["feather", 25],
    ["tummy rubs", 12],
    ["salami", 50],
    ["sardine", 25],
    ["carrot", 12],
    ["spa day", 50],
    ["soap", 25],
    ["spray", 12],
    ["monster", 50],
    ["coffee", 25],
    ["tea", 12],
  ];

  $.each(items, function (index, value) {
    $("#itemslist").append(
      "<button>" + value[0] + ": " + value[1] + "</button>"
    );
  });

  $.each(shop, function (index, value) {
    $("#shoplist").append(
      "<button class =\"shopitem\">" + value[0] + " $" + value[1] + "</button>"
    );
  });

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

  $(".shopitem").click(function (e) { 
    e.preventDefault(); 
    var index = shop.findIndex(arr => arr.includes(($(this).text().split(" $")[0])));
    if (money >= shop[index][1]){
      money = money - shop[index][1];
      localStorage.setItem("money", money);
    }
  });

  $(".cat").click(function (e) {
    e.preventDefault();
    money = money + 1
      localStorage.setItem("money", money);
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
    $(".purse").text("purse $" + money);

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
