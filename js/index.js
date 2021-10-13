'use strict';

import Game from "./game.js";

const dollar = document.querySelectorAll('.dollar');

const game = new Game();


dollar.forEach(item => {
    item.addEventListener('click', () => game.soundPlay('coin'))
});



/*
Mountain Trials by Joshua McLean | http://mrjoshuamclean.com
Music promoted by https://www.mewpot.com
CC BY-SA 4.0 | https://creativecommons.org/licenses/by-sa/4.0/
*/