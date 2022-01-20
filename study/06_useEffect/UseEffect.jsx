import React, {useState, useRef, useEffect, memo} from 'react';

const RSP = memo(() =>{
    const [value, setValue] = useState('');
    const [result,setResult] = useState([]);
    const inputRef = useRef(false);

    // useEffect(()=>{
    // },[]) []가 없으면 ComponentDidMount / []가 있으면 ComponentDidUpdate 가 됨.
    useEffect(()=>{
        console.log('시작');
        return( // compoenetWillUnmount 역할
            console.log('종료')
        )
    },[result])

    const onInputChange = (e) => {
        setValue(e.target.value);
    }
    const onSubmitForm = (e) =>{
        e.preventDefault();
         
        setResult((prevValue)=> [...prevValue, value]);
        setValue('');
        inputRef.current.focus();
    }
    return(
        <>  
        <form onSubmit={onSubmitForm}>
            <input ref={inputRef} type="text" value={value} onChange={onInputChange}/>
            <button>입력</button>
        </form>
        {result.map((v, i)=>{
            return(
                <div key={i}>{result[i]}</div>
            )
        })}
        </>
    );
})

export default RSP;