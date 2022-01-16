const React = require('react');
const { useState , useRef } = React;


const WordRelay = () => {
    const [word, setWord] = useState('끝말잇기');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const onRefInput = useRef(null);

    const onFormSubmit = (e) =>{
        e.preventDefault();
        if(word[word.length - 1] === value[0]){
            setResult('정답');
            setWord(value);
            setValue('');
            onRefInput.current.focus();
        }else{
            setResult('오답');
            setValue('');
            onRefInput.current.focus();
        };
    };
    
    const onInputChange = (e) =>{
        setValue(e.target.value);
    };

    return(
        <>
            <div>{word}</div>
            <form onSubmit={onFormSubmit}>
                <label htmlFor="wordInput"></label>
                <input id="wordInput" ref={onRefInput} value={value} onChange={onInputChange}/>
                <button className="btn">입력</button>
                <div>{result}</div>
            </form>
        </>
    )
}


module.exports = WordRelay;