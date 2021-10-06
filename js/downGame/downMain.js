import Game from "../game.js";

export class GameSetting {
    fallTime(time){  
        this.fallTime = time;
        return this;
    }

    levelUpFallTime(time){
        this.levelUpFallTime = time;
        return this;
    }

    setting(){
        return new DownMain(this.fallTime, this.levelUpFallTime)
    }
}

export class DownMain {
    constructor(fallTime, levelUpFallTime){
        this.item = document.querySelector('.item');
        this.li = document.querySelectorAll('.item')[0].children;
        this.scoreNum = document.querySelector('.score');
        this.modal = document.querySelector('.modal');
        this.resultBtn = document.querySelector('.resultplay');
        this.resultBtn.addEventListener('click', e => this.replay(e))
        this.item.addEventListener('click', e => e.target.tagName == 'IMG' && this.catchFood(e))
        this.fallTime = fallTime;  //초기화
        this.duration = fallTime;
        this.levelUpFallTime = levelUpFallTime;
        this.score;
        this.startEnd;

        this.game = new Game();
    }

    start(){
        this.reset();
        this.setPositionX();
        this.foodMove();
        this.game.soundPlay('bg');
    }

    end(result){
        this.startEnd = 'stop';
        //남은 animation 삭제
        for(let i=0; i < this.li.length; i++){
            this.li[i].style.zIndex = -1;
            this.li[i].getAnimations()[0] && this.li[i].getAnimations()[0].cancel();
        }
        
        if(result === 'win'){
            this.popup('🥇', 'WIN', 'NEXT');
            this.game.soundPlay('gameClear');
        } else {
            this.popup('🏅', 'LOSER', 'REPLAY');
            this.game.soundPlay('gameOver');
        }
    }

    replay(e){
        this.popup();
        e.target.innerText === 'NEXT' ? this.foodMove('levelUp') : this.start();
    }

    reset(){
        this.score = 0;
        this.scoreNum.innerText = 0;
        this.startEnd = '';
        this.duration = this.fallTime;
    }

    setPositionX(){
        for(let i=0; i<this.li.length; i++){
            const random = Math.floor(Math.random() * 950);
            this.li[i].style.transform = `translateX(${random}px)`;
        }
    }

    foodMove(level){
        if(level) this.startEnd = 'start';

        let i = 0;
        const moveAnimate = setInterval(() => {
            const sectionX = document.querySelector('section').getBoundingClientRect().left;
            const listX = this.li[i].getBoundingClientRect().left;
            const x = listX - sectionX;

            const ani = this.li[i].animate([
                { transform: `translate(${x}px, 400px)` }
            ], {
                duration: this.duration,
            })

            if (this.startEnd === 'stop') {
                this.li[i].getAnimations()[0].cancel();
                i = this.li.length;

                this.startEnd = 'start';
            } else {
                this.li[i].style.zIndex = 0;
                i++;
            }

            ani.addEventListener('finish', e => {
                const target = e.target.effect.target;
                target.className != 'meat' && target.className != 'noMeat' ? this.end() : target.style.zIndex = -1
            })
            i == this.li.length && clearInterval(moveAnimate);
        }, 500)

        this.duration -= this.levelUpFallTime;
    }

    catchFood(e){
        const list = e.target.parentElement;
    
        list.style.zIndex = -1;
        list.getAnimations()[0].cancel();
        list.className === 'meat' ? this.end() : this.scoring(e);
    }

    scoring(e){
        e.target.alt === 'noMeat' ? this.score += 5 : this.score++
        this.scoreNum.innerText = this.score;
    
        (e.target.alt ==='tomato' && this.score%5 == 0) && this.end('win');
        this.game.soundPlay('catch');
    }

    popup(icon, text, btn){
        if(!icon){
            this.modal.style.display = 'none';
        } else {
            const resultIcon = document.querySelector('.resultIcon');
            const resultText = document.querySelector('.resultWin');
            const resultScore = document.querySelector('.resultScore');
        
            this.modal.style.display = 'block';
            resultIcon.innerText = icon
            resultText.innerText = `YOU ${text}`;
            resultScore.innerText = this.score;
            this.resultBtn.innerText = btn; 
        }
    }
}