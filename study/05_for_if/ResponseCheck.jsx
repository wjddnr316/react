import React, {PureComponent} from 'react';

class ResponseCheck extends PureComponent { 
    state = {
        state : 'wating',
        message : '클릭해서 시작하세요.',
        result : [],
    };

    timeout;
    startTime;
    endTime;
    onClickScreen = () =>{
        const { state, message, result } = this.state;
        if ( state === 'wating' ){
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요!',
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭하세요!',
                });
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); //2초 ~3초
        } else if ( state === 'ready'){ // 성급하게 클릭
            clearTimeout(this.timeout);
            this.setState({
                state: 'wating',
                message: '너무 성급하군요. 초록색일때 클릭하세요!',
            });
        } else if ( state === 'now'){ // 반응속도 체크
            this.endTime = new Date();
            this.setState((prevState)=>{
                return{
                    state: 'wating',
                    message: '클릭해서 시작하세요!',
                    result: [...prevState.result, this.endTime - this.startTime ],
                }
            });
        }
    };

    onReset = () =>{
        this.setState({
            result:[],
        })
    }

    // // 3항 연산자 = 조건부 연산자 함수형
    // renderAverage = () =>{
    //     const {result} = this.state;
    //     return (
    //         result.length === 0 
    //         // false, undefined, null 은 jsx 에서 태그없음을 의미한다
    //         ? null 
    //         : <>
    //         <div className="text"> 평균시간 : {result.reduce((a,c) => a+c) / result.length} ms</div>
    //         <button onClick={this.onReset}>초기화</button>
    //         </>
    //     )
    // };

    render(){
        const {message, state , result} = this.state;
        return(
            <>
                <div 
                    id="screen"
                    className={state}
                    onClick={this.onClickScreen}
                >
                    <span>{message}</span>
                </div>

                {/* 3항 연산자 = 조건부 연산자 함수형 */}
                {/* {this.renderAverage()} */}

                {/* 3항 연산자 = 조건부 연산자  */}
                {result.length === 0 ? null : 
                    <>
                    <div className="text"> 평균시간 : {result.reduce((a,c) => a+c) / result.length} ms</div>
                    <button onClick={this.onReset}>초기화</button>
                    </>
                }
                {/* 보호연산자 */}
                {/* {
                    result.length !== 0 && 
                    <div>평균시간 : {this.state.result.reduce((a,c) => a+c) / this.state.result.length} ms</div>
                } */}
                {/* reduce((acc,cur) => acc + cur) 배열 요소들 합계 구하기  / 배열 개수 = 평균 */}
                
            </>
        )
    };
}

export default ResponseCheck;