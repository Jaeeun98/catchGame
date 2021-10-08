'use strict';

import Game from "../game.js";
import { GameSetting } from "./moleMain.js";

const playBtn = document.querySelector('.playBtn');
const stopBtn = document.querySelector('.stopBtn');
const gameRuleBtn = document.querySelector('.gameRuleBtn');

const game = new Game();
const moleGame = new GameSetting()
    .gameTimer(20)
    .moleNum(20)
    .bugNum(5)
    .setting()


playBtn.addEventListener('click', () => moleGame.start());
stopBtn.addEventListener('click', () => moleGame.end('loser'));
gameRuleBtn.addEventListener('click', () => game.gameRule())