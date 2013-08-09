/**************************
 * Location
 *
 *
/**************************/

function showMap(){
  document.getElementById("mapCover").className = "hide";
  document.getElementById("deliverHere").className = "";
};



/**************************
 * The Wait
 *
 *
/**************************/

function waitKickoff(){
  //countdown
  var minutes = 23,
      seconds = 0,
      value = 1380,
      music;

  var song = new Howl({
      urls: ['marvin.mp3']
    });

  var ctx = document.getElementById("myChart").getContext("2d");

  countdown('time-left');
  play();
  chart();
  // echonest();

  function play() {
      song.play();
  }

  function stop() {
      song.stop();
  }

  $('#waiting').height($(window).height());

  function countdown(element) {
    interval = setInterval(function() {
      var el = document.getElementById(element);
      if(seconds == 0) {
        if(minutes == 0) {
          el.innerHTML = "your rubber will be here momentarily";
          music.stop();                   
          clearInterval(interval);
          return;
        } else {
          minutes--;
          seconds = 60;
        }
      }
      // if(minutes > 0) {
      //   var minute_text = minutes + (minutes > 1 ? ' minutes' : ' minute');
      // } else {
      //   var minute_text = '';
      // }
      el.innerHTML = minutes + ':' + seconds;
      seconds--;
      value -= 1;
      console.log(value);
      ctx.clearRect(0,0,400,400);
      chart();
    }, 1000);
  } 

  function chart() {

    
    
    var data = [
      {
        value: value,
        color: '#0091d1'
      },

      {
        value: 1380-value,
        color: 'black'
      }
    ];

    var options = {
      percentageInnerCutout : 75,
      animation : false,
      segmentShowStroke : false
    }

    var myNewChart = new Chart(ctx).Doughnut(data, options);

  }

  // function echonest() {
  //   var call = "http://developer.echonest.com/api/v4/playlist/basic?api_key=NCZVJBPPSYEF0XPKZ&genre=sexy&format=json&results=20&bucket=id:rdio-US&bucket=tracks&type=genre-radio";

  //   $.get(call, function(data){
  //     console.log(data);
  //   });
  // }
}    
