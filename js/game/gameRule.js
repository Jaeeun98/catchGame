'use strict'

export default class GameRule {
    viewGameRule(){
        const gameRule = document.querySelector('.gameRule');
        const closeBtn = document.querySelector('.closeBtn');
        gameRule.style.zIndex = '0';

        closeBtn.addEventListener('click', () => gameRule.style.zIndex = '-1')
    }
}