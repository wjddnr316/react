import React, { Component, memo, useState } from 'react';

const Try = memo(({tryInfo}) =>{
    // props를 state로 만드는 과정
    const [result, setResult] = useState(tryInfo.result);
    const onClick = ()=>{
        setResult('1');
    }
    return(
        <li>
            <div>{tryInfo.try}</div>
            <div onClick={onClick}>{tryInfo.result}</div>
        </li>
    )
});

export default Try;