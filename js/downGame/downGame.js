'use strict';

import Game from "../game.js";
import { GameSetting } from "./downMain.js";
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const gameRuleBtn = document.querySelector('.gameRuleBtn');

const game = new Game();
const downGame = new GameSetting()
    .fallTime(3000)  //과일 내려가는 속도
    .levelUpFallTime(500)  //다음 레벨 속도
    .setting();

startBtn.addEventListener('click', () => downGame.start());
stopBtn.addEventListener('click', () => downGame.end())
gameRuleBtn.addEventListener('click', () => game.gameRule())