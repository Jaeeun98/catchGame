'use strict';

import Game from "../game.js";
import { GameSetting } from "./carrotMain.js";

const playBtn = document.querySelector('.playBtn');
const stopBtn = document.querySelector('.stopBtn');
const gameRuleBtn = document.querySelector('.gameRuleBtn');

const game = new Game();
const carrotGame = new GameSetting()
    .gameTimer(20)
    .carrotNum(20)
    .bugNum(5)
    .setting()

function gameStart(){
    carrotGame.start();
    game.soundPlay('bg');
}

function gameEnd(){
    playBtn.removeEventListener('click', gameStart);
    carrotGame.end('loser');
}

playBtn.addEventListener('click', gameStart);
stopBtn.addEventListener('click', gameEnd);
gameRuleBtn.addEventListener('click', () => {
    game.viewGameRule();
    game.soundPlay('gameRule');
})