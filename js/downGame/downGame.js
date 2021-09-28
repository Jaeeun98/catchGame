'use strict';

import Game from "../game.js";
import Down from "./down.js";
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resultBtn = document.querySelector('.resultplay');
const gameRuleBtn = document.querySelector('.gameRuleBtn');


const game = new Game();
const down = new Down();

function gameStart(){
    down.reset();
    down.setPositionX();
    down.foodMove();
    game.soundPlay('bg');
}

function replay(e){
    down.popup();

    if(e.target.innerText === 'NEXT'){
        down.foodMove();
    } else gameStart();

}


stopBtn.addEventListener('click', down.end)
startBtn.addEventListener('click', gameStart);
resultBtn.addEventListener('click', e => replay(e));
gameRuleBtn.addEventListener('click', () => {
    game.viewGameRule();
    game.soundPlay('gameRule');
})