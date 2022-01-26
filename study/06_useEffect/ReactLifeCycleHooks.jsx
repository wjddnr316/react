import React, {useState, useRef, useEffect} from 'react';

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

const RSP = () =>{
    const [result,setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    // hooks 에서는 life cycle 대신 useEffect 를 사용함
    useEffect(() => { 
        console.log('다시실행');
        interval.current = setInterval(changeHand,100);
        return() => { 
            console.log('종료');
            clearInterval(interval.current);
        }   
    }, [imgCoord])

    // componenetDidupdate 에서만 실행하고 싶을경우 꼼수
    const mounted = useRef(false);
    useEffect(()=>{
        if(!mounted.current){
            mounted.current = true;
        }else{
            // 원하는 거 작성
        }
    },[바뀔 경우 실행]); 

    const changeHand = () => {
        if(imgCoord === rspCoords.바위){
            setImgCoord(rspCoords.가위);
        }else if (imgCoord === rspCoords.가위){
            setImgCoord(rspCoords.보);
        }else if (imgCoord === rspCoords.보){
            setImgCoord(rspCoords.바위);
        }
    };
    
    const onClickBtn = (choice) => (e) =>{
        e.preventDefault();
        clearInterval(interval.current);
        const myScore = score[choice];
        const cpuScore = score[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;

        if(diff === 0){
            setResult('비겼습니다');
        }else if([-1,2].includes(diff)){
            setResult('이겼습니다');
            setScore((prevScore)=> prevScore +   1);
        }else{
            setResult('졌습니다');
            setScore((prevScore) => prevScore - 1);
        }
        setTimeout(()=>{
            interval.current = setInterval(changeHand, 200);
        },2000)
        
    }

    return(
        <>
            <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
            <div>
                <button id="roc" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}

export default RSP;