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
                {/* return 안에서 조건문/반복문을 작성해야 하는경우 {(()=>{})()} 로 실행해야함. */}
                {(()=>{
                    if(result.length === 0){
                        return null;
                    }else{
                        return (
                            <>
                            <div className="text"> 평균시간 : {result.reduce((a,c) => a+c) / result.length} ms</div>
                            <button onClick={this.onReset}>초기화</button>
                            </>
                        )
                    };
                })()}
            </>
        )
    };
}

export default ResponseCheck;