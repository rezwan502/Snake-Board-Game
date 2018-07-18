///// Snake Board Game


var score, redScore = 0,
    blueScore = 0;
var name1, name2;
var namecheck = true;
var firstPlayer = 1,
    secondPlayer = 2;
var redStart = false,
    blueStart = false;
var activeroll, doublepress;
var redScorePrev = 0,
    blueScorePrev = 0;
var okgo,endcheck;

okgo=true;
activeroll = true;
doublepress = true;
endcheck = true;

preloadImages();

document.querySelector('.btn-new').addEventListener('click', function () {

    document.location.reload();

});


document.querySelector('.btn-roll').addEventListener('click', function () {

    if (activeroll && doublepress) {
        doublepress = false;
        
        score = Math.floor((Math.random() * 6) + 1);
        
        document.querySelector('.dice').src = 'dice/dice-' + score + '.png';
        
        // 0. ScoreAdding to player 
        if (firstPlayer === 1) {
            if (score === 1) {
                redStart = true;
            }
            if (redStart) {
                redScore += score;
                if (redScore > 1 && redScore <= 100) {
                    redScorePrev = redScore - score;
                    
                }
                if(redScore > 0){
                    okgo=true;
                }
                if (redScore > 100) {
                    redScore -= score;
                    okgo=false;
                }
            }
        } else {
            if (score === 1) {
                blueStart = true;
            }
            if (blueStart) {
                blueScore += score;
                if (blueScore > 1 && blueScore <= 100) {
                    blueScorePrev = blueScore - score;
                }
                if(blueScore>0){
                    okgo=true;
                }
                if (blueScore > 100) {
                    blueScore -= score;
                    okgo=false;
                }
            }
        }


        // 2. snake
        // 25,34,47,65,87,91,99
        // 5,1,19,52,57,61,69

        // Red
        if (redScore === 25) {
            redScore = 5;
        } else if (redScore === 34) {
            redScore = 1;
        } else if (redScore === 47) {
            redScore = 19;
        } else if (redScore === 65) {
            redScore = 52;
        } else if (redScore === 87) {
            redScore = 57;
        } else if (redScore === 91) {
            redScore = 61;
        } else if (redScore === 99) {
            redScore = 69;
        }

        //Blue
        if (blueScore === 25) {
            blueScore = 5;
        } else if (blueScore === 34) {
            blueScore = 1;
        } else if (blueScore === 47) {
            blueScore = 19;
        } else if (blueScore === 65) {
            blueScore = 52;
        } else if (blueScore === 87) {
            blueScore = 57;
        } else if (blueScore === 91) {
            blueScore = 61;
        } else if (blueScore === 99) {
            blueScore = 69;
        }


        // 3. ladder
        // 3,6,20,36,63,68
        // 51,27,70,55,95,98

        //Red
        if (redScore === 3) {
            redScore = 51;
        } else if (redScore === 6) {
            redScore = 27;
        } else if (redScore === 20) {
            redScore = 70;
        } else if (redScore === 36) {
            redScore = 55;
        } else if (redScore === 63) {
            redScore = 95;
        } else if (redScore === 68) {
            redScore = 98;
        }

        //Blue
        if (blueScore === 3) {
            blueScore = 51;
        } else if (blueScore === 6) {
            blueScore = 27;
        } else if (blueScore === 20) {
            blueScore = 70;
        } else if (blueScore === 36) {
            blueScore = 55;
        } else if (blueScore === 63) {
            blueScore = 95;
        } else if (blueScore === 68) {
            blueScore = 98;
        }

        // 1. if players name = null dafault player-1-2

        if (namecheck) {
            name1 = document.getElementById('player-1').value;
            name2 = document.getElementById('player-2').value;
            namecheck = false;
            if (!name1 && !name2) {
                name1 = 'player-1';
                name2 = 'player-2';
            }
        }
        
        diceanimZoom();
        diceanimFade();
    }
});



// Board Making

function preloadImages() {
    var j;

    for (j = 1; j <= 10; j++) {

        var hiddenDiv, i, img, temp_j;

        hiddenDiv = document.getElementById('hiddenImages_' + j);
        temp_j = 9;

        for (i = 1; i <= 10; i++) {
            img = document.createElement('img');
            img.src = 'dice-' + (temp_j * 10 + j) + '.jpg';
            img.id = 'dice-' + (temp_j * 10 + j);
            img.style.width = '100%';
            hiddenDiv.appendChild(img);
            temp_j--;
        }
    }
    
    document.querySelector('.message').innerHTML = '<p style="color:red; font-weight:bold; font:20px; text-transform: capitalize;position:relative;">' + 'Player-1' + ' : ' + 'Type Your Name ' + '</p>' + 'Player-2' + ' : ' + ' Type Your Name';
    
    document.querySelector('.play-rules').innerHTML = '<p>' + ' 1. One dice roll at a time.' + '</p>' +
        '<p>'+' 2. Player-1 starts the game'+'</p>' +' 3. 1 on dice is mandatory to start the game.' +'<p>'+' 4. Who scores 100 first will be the winner.' + '</p>' + ' 5. Be aware of snakes and have fun with ladders';
}


function diceanimZoom() {
    document.querySelector('.dice-still').style.transform = 'scale(0)';
    setTimeout(function () {
        document.querySelector('.dice').style.transform = 'scale(1)';
    }, 1000);
}

function diceanimFade() {
    setTimeout(function () {
        document.querySelector('.dice').style.transform = 'scale(0)';
    }, 3000);

    setTimeout(function () {
        document.querySelector('.dice-still').style.transform = 'scale(1)';

        // Decide the Winner
        if (redScore === 100) {
            activeroll = false;
            doublepress = false;
            endcheck = false;
            document.querySelector('.crown-1').style.display = 'inline';
            document.querySelector('.winningmessage').innerHTML = '<p style="color:red;">' + 'Congratulations! '+name1 +' Won. ' +'</p>';
        } else if (blueScore === 100) {
            activeroll = false;
            doublepress = false;
            endcheck = false;
            document.querySelector('.crown-2').style.display = 'inline';
            document.querySelector('.winningmessage').innerHTML = '<p style="color:blue;">' + 'Congratulations! '+ name2 +' Won.' +'</p>';
        }

        // 2. decide who will roll the dice
        if (firstPlayer === 1) {
            document.querySelector('.message').innerHTML = '<p style="color:red; font-weight:bold; font:20px; text-transform: capitalize;position:relative;">' + name1 + ' : ' + ' Rolled ' + score + '</p>' + name2 + ' : ' + ' Roll The Dice';
            document.querySelector('#blueactive').style.display = 'inline'; 
            document.querySelector('#redactive').style.display = 'none';
        } else if (firstPlayer === 2) {
            document.querySelector('.message').innerHTML = '<p style="color:red; font-weight:bold; font:20px; text-transform: capitalize;position:relative;">' + name1 + ' : ' + ' Roll The Dice ' + '</p>' + name2 + ' : ' + ' Rolled ' + score;
            document.querySelector('#redactive').style.display = 'inline'; 
            document.querySelector('#blueactive').style.display= 'none'; 
        }

        // replace image with red/blue/redblue
        if (redScore === blueScore && redStart && blueStart) {
             if (redScore === 1) {
            document.getElementById('dice-' + redScore).src = 'redblue.png';
        }
            if (firstPlayer === 1 && redScorePrev > 0) {
                snakeRunning(redScorePrev,'red',redScore);
               // document.getElementById('dice-' + redScorePrev).classList.remove('dotred');
            } else if (firstPlayer === 2 && blueScorePrev > 0) {
                 snakeRunning(blueScorePrev,'blue',blueScore);
               // document.getElementById('dice-' + blueScorePrev).classList.remove('doblue');
            }
        } else if (firstPlayer === 1 && redScore !== blueScore && redStart) {
          
            /// snake running
            if(redScorePrev === 0)
                {
                    document.getElementById('dice-' + redScore).classList.add('dotred');
                }
            if (redScorePrev > 0) {
                snakeRunning(redScorePrev, 'red',redScore);
            }
             
                if (redScorePrev === blueScore && blueScore > 0) {
                    document.getElementById('dice-' + blueScore).src = 'dice-'+blueScore+'.jpg';
                    document.getElementById('dice-' + blueScore).classList.add('dotblue');
                }
            
        /*        if (redScorePrev > 0 && redScorePrev !== blueScore) {
                    document.getElementById('dice-' + redScorePrev).classList.remove('dotred');
                }*/
            
            
        } else if (firstPlayer === 2 && redScore !== blueScore && blueStart) {
            
            if(blueScorePrev === 0){
                 document.getElementById('dice-' + blueScore).classList.add('dotblue');
            }
                if (blueScorePrev > 0) {
                    snakeRunning(blueScorePrev, 'blue',blueScore);
                }
               
                if (blueScorePrev === redScore && redScore > 0) {
                    document.getElementById('dice-' + redScore).src = 'dice-'+redScore+'.jpg';
                    document.getElementById('dice-' + redScore).classList.add('dotred');
                }
              /*  if (blueScorePrev > 0 && blueScorePrev !== redScore) {
                    document.getElementById('dice-' + blueScorePrev).classList.remove('dotblue');
                }*/
        }

        firstPlayer === 1 ? firstPlayer = 2 : firstPlayer = 1;
        secondPlayer === 1 ? secondPlayer = 2 : secondPlayer = 1;
        
        if(endcheck){
        doublepress = true;
        }

    }, 4000);
}

function snakeRunning(start,color,nextposition) {
    if(okgo){
    var i = start;
    var cnt=0;
    activeroll = false;
    var myVar = setInterval(function () {
        document.getElementById('dice-' + i).classList.add('dot'+color);
        i++;
        if (cnt === score) {
            clearInterval(myVar);
        }
        cnt++;
    }, 1000);
  
     var l = start;
    var lcnt=0;
   
     var lVar = setInterval(function () {
        document.getElementById('dice-' + l).classList.remove('dot'+color);
        l++;
        if (lcnt === score) {
            
            clearInterval(lVar);
        }
         lcnt++;
    }, 1250);
    
    setTimeout(function () {
        if (redScore === blueScore) {
            document.getElementById('dice-' + redScore).src = 'redblue.png';
        } else {
            document.getElementById('dice-' + nextposition).classList.add('dot' + color);
        }
        // if redscore == bluescore
         activeroll = true;
    }, (1250*score+1500));
    }
 
}