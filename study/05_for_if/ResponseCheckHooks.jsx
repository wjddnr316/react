import React, {useState, useRef} from 'react';

const ResponseCheck = () =>{
    const [state, setState] = useState('wating');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);

    // state 는 수정될때마다 return 이 랜더링됨.  값이 바껴도 랜더링 시키고 싶지 않을땐 ref를 사용 
    // setTimeout 이나 setInterval은 ref 사용함
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () =>{
        if ( state === 'wating' ){
            // timeout/startTime/endTime  this는 useRef 로 사용 그리고 .current를 추가한다
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭하세요!');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); //2초 ~3초
            setState('ready');
            setMessage('초록색이 되면 클릭하세요!');
        } else if ( state === 'ready'){ // 성급하게 클릭
            clearTimeout(timeout.current);
            setState('wating');
            setMessage('너무 성급하군요. 초록색일때 클릭하세요');
        } else if ( state === 'now'){ // 반응속도 체크
            endTime.current = new Date();
            setState('wating');
            setMessage('클릭해서 시작하세요');
            setResult((prevResult)=>{
                return [...prevResult, endTime.current - startTime.current]
            })
        }
    };

    const renderAverage = () =>{   
        return (
            result.length === 0 ? null : 
            <>
            <div className="text"> 평균시간 : {result.reduce((a,c) => a+c) / result.length} ms</div>
            <button onClick={onReset}>초기화</button>
            </>
        )
    }
    const onReset = () =>{
        setResult([]);
    }

    return( 
        <>
            <div 
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                <span>{message}</span>
            </div>

            {renderAverage()}
        </>
    )
}


export default ResponseCheck;