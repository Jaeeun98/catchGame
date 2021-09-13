'use strict';

export default class AudioPlay {
    constructor(){
        this.bg = new Audio('../sound/bg.mp3');
    }

    soundPlay(sound){
        const audio = new Audio(`../sound/${sound}.mp3`);

        sound === 'bg' && !this.bg.paused || this.bg.play();
        sound !== 'bg' && audio.play();
    }
}
