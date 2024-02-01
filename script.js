$(document).ready(function(){
    var starttime = new Date().getTime();
    
    var happiness = 100
    var food  = 100
    var hygiene = 100
    var energy = 100

    setInterval(gettime, 10)
    function gettime(){
        var currenttime = new Date().getTime();
        $(".demo").text((currenttime - starttime)/1000);
    
        $(".food").css("background-position-y", food+"%")
        $(".energy").css("background-position-y", energy+"%")
        $(".hygiene").css("background-position-y", hygiene+"%")
        $(".happiness").css("background-position-y", happiness+"%")

        happiness = happiness - .01
        if (happiness < 0){happiness = 0}

        food = food - .1
        if (food < 0){food = 0}

        hygiene = hygiene - .01
        if (hygiene < 0){hygiene = 0}

        energy = energy - .01
        if (energy < 0){energy = 0}
    }

    $(".happiness").click(function (e) { 
        e.preventDefault();
        happiness = 100
    });
    $(".food").click(function (e) { 
        e.preventDefault();
        food = 100
    });
    $(".hygiene").click(function (e) { 
        e.preventDefault();
        hygiene = 100
    });
    $(".energy").click(function (e) { 
        e.preventDefault();
        energy = 100
    });
        
    
  
  }); 