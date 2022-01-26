import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import Ball from './Ball';

function getWinNumber() {
    // 콘솔을 확인해보면 Hooks 에서는 이 수행문이 계속 실행되는걸 알수 있음.
    // 반복되는 랜더링을 막기위해 useMemo를 사용
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

const Lotto = () =>{
    // useMemo 는 return 값을 기억한다. 즉 결과 값. 사용법은 const 변수명 = useMemo(()=> 함수(), [])
    const lottoNumbers = useMemo(() => getWinNumber(),[])
    const [winBalls, setWinBalls] = useState([]);
    const [winNumber, setWinNumber] = useState(lottoNumbers);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]) ;

    useEffect(()=>{
        console.log('useEffect');
        for (let i = 0; i < winNumber.length - 1; i ++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevWinBalls) => [...prevWinBalls, winNumber[i]])
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(()=> {
            setBonus(winNumber[6]);
            setRedo(true);
        }, 7000)

        return()=>{
            console.log('component will Unmount');
            timeouts.current.forEach((v) => {
                clearTimeout(v)
            });
        };
    }, [timeouts.current])

    // useCallback 은 자식 컴포넌트에 함수를 전달할 경우 쓰자. useMemo는 return 값만 기억하지만 callback 은 함수 자체를 기억한다. 사용법은 const 변수명 = useCallback(()=> {}, [])
    const onclickRedo = useCallback(() => {
        console.log('on click redo');
        console.log(winNumber);
        
        setWinNumber(getWinNumber());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumber]);

    return(
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => 
                    <Ball key={v} number={v} /> 
                )}
            </div>
            <div>보너스</div>
            {/* 자식 컴포넌트에다가 함수를 state로 넘길때는 useCallback 을 필수로 해야함 */}
            {bonus && <Ball number={bonus} onClick={onclickRedo}/>}
            {redo && <button onClick={onclickRedo}> 한번 더 ! </button>}
            
        </>
    )
}

export default Lotto;