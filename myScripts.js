
var playerone,playertwo;
var player1color = 'rgb(244, 65, 65)';
var player2color = 'rgb(66, 134, 244)';
var player1name, player2name

const startBtn= document.getElementById("start");
const nameInput= document.getElementById('nameInput')
async function inputs(){
  startBtn.style.display="none";
  nameInput.style.display="block";
  player1name=await document.getElementById("player1name")
  player2name= await document.getElementById("player2name")
}
function Close(){
  nameInput.style.display="none";
  startBtn.style.display="block";
}
async function namesInput(){
  const nameInput=await document.getElementById('nameInput')
  nameInput.style.display="none";
  const footer=await document.querySelectorAll('.footer')[0];
  footer.style.position="unset";
  const container= await document.getElementById("gamepage");
  container.style.display="block";
  const plr1= await document.getElementById("player1")
  playerone=plr1.value;
  const plr2= await document.getElementById("player2")
  playertwo=plr2.value;
  if(playerone=="" || playerone==null)
    playerone="player 1"
  if(playertwo==="" || playertwo==null)
    playertwo="player 2"
  player1name.innerText=playerone
  player2name.innerText=playertwo
  // Start with Player 1

var currentPlayer=1;
var currentName=playerone;
var currentColor=player1color;

//$('h3').text(playerone + " it is your turn, pick a column to drop in!");


$('.board button').on('click', function(){

	var col = $(this).closest('td').index();

	var bottomAvail = checkBottom(col);

	changeColor(bottomAvail, col, currentColor);

	if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
		$('h1').text(currentName + " You have won!");
		$('h3').fadeOut('fast');
		$('h2').fadeOut('fast');
	}

	currentPlayer = currentPlayer * -1;

	if (currentPlayer === 1){
		currentName = playerone;
		player1name.style.backgroundColor="chartreuse"
    player2name.style.backgroundColor="gray"
		currentColor = player1color;
	}else {
		currentName = playertwo;
    player2name.style.backgroundColor="chartreuse"
    player1name.style.backgroundColor="gray"
		currentColor = player2color;
	}

});
}
//grab elements on table
var game_on = true;
var table = $('table tr');



function reportWin(rowNum, colNum) {
	console.log("You won starting at this row, col");
	console.log(rowNum);
	console.log(colNum);
}

//toggle color for element
function changeColor(row,col,color){
  return table.eq(row).find('td').eq(col).find('button').css('background-color',color);

}


function returnColor(row,col){
  return table.eq(row).find('td').eq(col).find('button').css('background-color');
}


function checkBottom(col){
  var colorReport=returnColor(5,col);
  for (var row = 5; row > -1; row--) {
    colorReport=returnColor(row,col);
    if (colorReport ==='rgb(128, 128, 128)'){
      return row
    }
  }
}


function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}


// Check for Horizontal Wins
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        console.log('horiz');
        return true;
      }else {
        continue;
      }
    }
  }
}


// Check for vertical wins
function verticalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical');
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for diagonal wins
function diagonalWinCheck(){
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}


