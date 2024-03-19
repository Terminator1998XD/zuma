function GoMenu(){
  if(isMobile) ysdk.adv.showBannerAdv();
  $('#scoreblock').hide();
  $('#levelup').hide();
  AddBalance(score);

  const interval = setInterval(function(){
    camera.y += 60;
    if(camera.y >= 1600){
        camera.y = 1600;
        clearInterval(interval);
        MenuReady();
    }
  }, 1000/60);

  function MenuReady(){
    $('#deadscr').show();
    $('.overlay').show();
  }
}

function GoGame(){
  const interval = setInterval(function(){
    camera.y -= 60;
    if(camera.y < 1){
        camera.y = 0;
        clearInterval(interval);
        $('#scoreblock').show();
        $('#deadscr').hide();
    }
  }, 1000/60);
}

var money = 0;
var baloc_hendlers = [];
function InitMenu(){
  if(localStorage['money'] != null){
    money = parseInt(money);
  }
  $('#balance').text(money);

  $('#minigame').prepend(getMinigame());

  for(let i = 0; i < baloc_hendlers.length; i++){
    baloc_hendlers[i]();
  }
}

function AddBalance(add){
  money = parseInt(money + add);
  $('#balance').text(money);
  localStorage['money'] = money;

  for(let i = 0; i < baloc_hendlers.length; i++){
    baloc_hendlers[i]();
  }
}
