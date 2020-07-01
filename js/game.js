const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let firstHitTime = 0;

function round() {
  $('.target').text("");
  $('.target').removeClass("target");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $('.target').text(hits+1);
  
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $('.target').text("");
  $('.target').removeClass("target");
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-miss").text(miss);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  } else { if (hits < maxHits && firstHitTime) {
      $(event.target).addClass("miss");
      hits = hits + 1;
      miss = miss + 1;
    }
  }
}

function init() {
  $("#button-start").click(function () {
    firstHitTime = getTimestamp();  
    round();
  });

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    $('.miss').removeClass("miss");
   
    location.reload();
  });
}

$(document).ready(init);
