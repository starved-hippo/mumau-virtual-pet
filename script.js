$(document).ready(function () {
	var currenttime = new Date();

	var starttime = localStorage.getItem("time");
	if (!starttime) {
		starttime = new Date().getTime();
	}

	var tab = "#home";
	var yawn = false;
	var speed = 0.03;

	var money = parseFloat(localStorage.getItem("money"));
	if (!money && money != 0) {
		money = 100;
		localStorage.setItem("money", 100);
	}

	var items = JSON.parse(localStorage.getItem("items"));
	if (!items) {
		items = [
			["laser-pointer", 0],
			["feather", 0],
			["tummy-rubs", 0],
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
		localStorage.setItem("items", JSON.stringify(items));
	}

	var shop = [
		["laser-pointer", 50],
		["feather", 25],
		["tummy-rubs", 12],
		["salami", 50],
		["sardine", 25],
		["carrot", 12],
		["spa-day", 50],
		["soap", 25],
		["spray", 12],
		["monster", 50],
		["coffee", 25],
		["tea", 12],
	];
	var needs = JSON.parse(localStorage.getItem("needs"));
	if (!needs) {
		needs = {
			happiness: 100,
			hunger: 100,
			hygiene: 100,
			energy: 100,
		};
		localStorage.setItem("needs", JSON.stringify(needs));
	}

	$.each(items, function (index, value) {
		$("#itemslist").append('<button id = "' + value[0] + '_item">' + value[0] + ": " + value[1] + "</button>");
	});

	$.each(shop, function (index, value) {
		$("#shoplist").append('<button class ="shopitem">' + value[0] + " $" + value[1] + "</button>");
	});

	$(tab + "tab").show();

	$.getJSON("messages.json", function (json) {
		$(".msg").text(json["cute_greeting_messages"][Math.floor(Math.random() * json["cute_greeting_messages"].length)]);
	});

	$(".dropdown-item").click(function (e) {
		var button = $(this).attr("class").split(" ");
		var index = shop.findIndex((arr) => arr.includes($(this).attr("id")));
		if (items[index][1] > 0) {
			items[index][1] -= 1;
			console.log(items[index]);
			$("#" + items[index][0] + "_item").text(items[index][0] + ": " + items[index][1]);
			localStorage.setItem("items", JSON.stringify(items));
			needs[button[1]] += shop[index][1];
		}
	});

	$(".shopitem").click(function (e) {
		e.preventDefault();
		var item = $(this).text().split(" $")[0];
		var index = shop.findIndex((arr) => arr.includes(item));
		if (money >= shop[index][1]) {
			money -= shop[index][1];
			localStorage.setItem("money", money);

			items[index][1] += 1;
			$("#" + item + "_item").text(items[index][0] + ": " + items[index][1]);
			localStorage.setItem("items", JSON.stringify(items));
		}
	});

	$(".cat").click(function (e) {
		e.preventDefault();
		money += 1;
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

	setInterval(loop, 100);
	function loop() {
		currenttime = new Date();
		localStorage.setItem("time", currenttime.getTime());

		needs["happiness"] -= speed;
		if (needs["happiness"] < 0) {
			needs["happiness"] = 0;
		}
		if (needs["happiness"] > 100) {
			needs["happiness"] = 100;
		}

		needs["hunger"] -= speed;
		if (needs["hunger"] < 0) {
			needs["hunger"] = 0;
		}
		if (needs["hunger"] > 100) {
			needs["hunger"] = 100;
		}

		needs["hygiene"] -= speed;
		if (needs["hygiene"] < 0) {
			needs["hygiene"] = 0;
		}
		if (needs["hygiene"] > 100) {
			needs["hygiene"] = 100;
		}

		needs["energy"] -= speed;
		if (needs["energy"] < 0) {
			needs["energy"] = 0;
		}
		needs["energy"] -= speed;
		if (needs["energy"] > 100) {
			needs["energy"] = 100;
		}

		$(".purse").text("👛 $" + money);

		$(".happiness-ico").css("background-position-y", needs["happiness"] + "%");
		$(".hunger-ico").css("background-position-y", needs["hunger"] + "%");
		$(".energy-ico").css("background-position-y", needs["energy"] + "%");
		$(".hygiene-ico").css("background-position-y", needs["hygiene"] + "%");

		localStorage.setItem("needs", JSON.stringify(needs));
	}
});
