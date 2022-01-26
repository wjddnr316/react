import React, {Component} from 'react';
import Ball from './Ball';

function getWinNumber() {
    console.log('getWinNumber');
    const candidate = Array(45).fill().map((v,i) => i + 1);
    const shufle = [];
    while(candidate.length > 0){
        shufle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shufle[shufle.length-1];
    const winNumber = shufle.slice(0,6).sort((p,c) => p -c)
    return [...winNumber , bonusNumber];
}

class Lotto extends Component{
    state = {
        winNumber: getWinNumber(), // 당첨 숫자
        winBalls: [],
        bonus: null, // 보너스 숫자
        redo: false,
    };
    timeouts = [];

    runTimeouts = () => {
        console.log('run time outs')
        const { winNumber } = this.state; 
        for (let i = 0; i < winNumber.length - 1; i ++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return{
                        winBalls: [...prevState.winBalls, winNumber[i]],
                    }
                })
            }, (i + 1) * 1000);
        }
        this.timeouts[6] = setTimeout(()=> {
            this.setState({
                bonus: winNumber[6],
                redo: true,
            });
        }, 7000)
    }
    componentDidMount () {
        console.log('component Did Mount');
        this.runTimeouts();
    }

    componentDidUpdate (prevProps, prevState) {
        console.log('component did update');
        if (this.timeouts.length === 0){
            this.runTimeouts();
        }
    }

    componentWillUnmount() {
        console.log('component will Unmount');
        this.timeouts.forEach((v) => {
            clearTimeout(v)
        });
    }

    onclickRedo = () => {
        console.log('on click redo');
        this.setState({
            winNumber: getWinNumber(), 
            winBalls: [],
            bonus: null, 
            redo: false,
        });
        this.timeouts = [];
    };

    render(){
        const { winBalls, bonus, redo } = this.state;
        return(
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => 
                        <Ball key={v} number={v} /> 
                    )}
                </div>
                <div>보너스</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onclickRedo}> 한번 더 ! </button>}
                
            </>
        )
    }
}

export default Lotto;