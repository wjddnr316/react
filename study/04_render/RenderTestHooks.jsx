import React, { Component, useState, memo } from 'react';
// import React, { PureComponent } from 'react';
// class RenderTest extends PureComponent {
    
const RenderTest = () =>{
    const [counter, setCounter] = useState(0);
    const [string, setString] = useState('hello');
    const [number, setNumber] = useState(1);
    const [boolean, setBollean] = useState(true);
    const [object, setObject] = useState({a:'b', c:'d'});
    const [array, setArray] = useState([1,2,3,4,5]);
    
    console.log('랜더링')
    
    const onClick = () =>{
        const array = array;
        setArray(array =>[...array, 1]);
    };

    return(
        <div>
            <button onClick={onClick}>클릭</button>
            <p>setState가 정의되어 있어 값이 바뀌든 안바뀌든 랜더링이 된다.</p>
            <p>shouldComponentUpdate를사용해서 안바뀔 경우는 랜더링이 안되도록 설정한다</p>
            <p>아니면 Component를 PureComponent로 적용한다</p>
        </div>
    )
}

export default RenderTest;