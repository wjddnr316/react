import React, {Component} from 'react';

// class 의 경우 
// constructor -> render -> ref -> componentDidMount -> 
// setState/props변경시 -> shouldComponenetUpdate(true) -> render -> componentDIdUpdate -> 
// 부모가 컴포넌트를 없앨때 -> componentWillUnmount -> 소멸

const rspCoords = {
    바위 : '0',
    가위 : '-142px',
    보 : '-284px',
}

const score = {
    바위 : 0,
    가위 : 1,
    보 : -1,
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v){
        return v[1] === imgCoord;
    })[0];
};


class RSP extends Component{
    state ={
        result: '',
        score:0,
        imgCoord:rspCoords.바위,
    };

    interval;
    
    changeHand = () => {
        const {imgCoord} = this.state;
        if(imgCoord === rspCoords.바위){
            this.setState({
                imgCoord: rspCoords.가위,
            })
        }else if (imgCoord === rspCoords.가위){
            this.setState({
                imgCoord: rspCoords.보,
            })
        }else if (imgCoord === rspCoords.보){
            this.setState({
                imgCoord: rspCoords.바위,
            });
        }
    }

    // setState 로 리랜더링 되더라도 Mount 는 실행되지 않음. 
    componentDidMount() { // 컴포넌트가 첫 랜더링 된 후
        this.interval = setInterval(this.changeHand, 200);
    }

    // shouldComponentUpdate( nextProps, nextState, nextContext) {
    //     return true;
    // }

    componentDidUpdate() { // 리랜더링 후
        
    }

    componentWillUnmount() { // 컴포넌트가 제거되기 직전 ( 부모 컴포넌트에서 자식 컴포넌트를 없앨 떄), 비동기 요청 정리를 많이 함.
        clearInterval(this.interval);
    }

    onClickBtn = (choice) => {
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        const myScore = score[choice];
        const cpuScore = score[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;

        if(diff === 0){
            this.setState({
                result : '비겼습니다',

            });
        }else if([-1,2].includes(diff)){
            this.setState((prevState)=>{
                return{
                    result: '이겼습니다',
                    score: prevState.score + 1,
                };
            })
        }else{
            this.setState((prevState) => {
                return{
                    result: '졌습니다',
                    score: prevState.score - 1,
                };
            });
        }
        setTimeout(()=>{
            this.interval = setInterval(this.changeHand, 200);
        },2000)
        
    };

    render(){
        const {result,score,imgCoord} = this.state;
        return(
            <>
                <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
                <div>
                    <button id="roc" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;