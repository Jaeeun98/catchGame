
export default class Game {
    constructor(){
        this.bg = new Audio('../sound/bg.mp3');
    }

    soundPlay(sound){
        if(sound === 'bg'){
            !this.bg.paused || this.bg.play();
        } else {
            const audio = new Audio(`../sound/${sound}.mp3`);
            audio.play();
        }
    }

    viewGameRule(){
        const gameRule = document.querySelector('.gameRule');
        const closeBtn = document.querySelector('.closeBtn');
        gameRule.style.zIndex = '0';

        closeBtn.addEventListener('click', () => gameRule.style.zIndex = '-1')
    }

}