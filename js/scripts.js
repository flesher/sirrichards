/**************************
 * Location
 *
 *
/**************************/

function showMap(){
  document.getElementById("mapCover").className = "hide";
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
      music;

  var song = new Howl({
      urls: ['marvin.mp3']
    });

  countdown('time-left');
  play();
  // echonest();

  function play() {
      song.play();
  }

  function stop() {
      song.stop();
  }

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
      if(minutes > 0) {
        var minute_text = minutes + (minutes > 1 ? ' minutes' : ' minute');
      } else {
        var minute_text = '';
      }
      var second_text = seconds > 1 ? 'seconds' : 'second';
      el.innerHTML = minute_text + ' ' + seconds + ' ' + second_text + ' remaining';
      seconds--;
    }, 1000);
  } 

  function echonest() {
    var call = "http://developer.echonest.com/api/v4/playlist/basic?api_key=NCZVJBPPSYEF0XPKZ&genre=sexy&format=json&results=20&bucket=id:rdio-US&bucket=tracks&type=genre-radio";

    $.get(call, function(data){
      console.log(data);
    });
  }
}    
