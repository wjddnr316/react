// const React = require('react');
import React, { Component } from 'react';


// map 이란 [1,2,3] 을 [4,5,6,]으로 짝을 지어서 변환을 하고 싶을때 
// [1,2,3].map((v)=> v * 2) 사용하는 것
class NumberBaseball extends Component {
    getNumbers = () =>{
        
    }
    state = {
        result : '',
        value : '',
        answers : this.getNumbers(),
        tries : [],
    };

    onFormSubmit = (e) =>{
        e.preventDefault();
    };

    onInputChange = (e) =>{

    };
    
    input;
    onInputRef = (c) =>{
        this.input = c;
    };

    item = [
        {name : 'ㄱ', info : 'ㅏ'},
        {name : 'ㄴ', info : 'ㅑ'},
        {name : 'ㄷ', info : 'ㅓ'},
        {name : 'ㄹ', info : 'ㅕ'},
        {name : 'ㅁ', info : 'ㅗ'},
    ];

    render(){
        return(
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onFormSubmit}>
                    <input maxLength={4} ref={this.onInputRef} value={this.state.value} onChange={this.onInputChange} />
                    <button>입력</button>
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.item.map((v,i)=>{
                        return (
                            // 반복문 사용 시 key 를 꼭 넣어줘야함. index / i 를 key 에다가 넣는 경우가 있는데 그럼 성능최적화가 안됨
                            <li key={v.name + v.info}>
                                <b>{v.name}</b> - {i}
                                <div>컨텐츠</div>
                                <div>컨텐츠1</div>
                                <div>컨텐츠2</div>
                                <div>컨텐츠3</div>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }
}

// export const hello = 'hello';  // 가져올때 impoprt { hello }; 
// export const bye = 'bye';  // 가져올때 import { bye };
// // const로 사용 시 변수명만 안겹치면 여러번 사용 가능

export default NumberBaseball;  // 가져올때 import NumberBaseball; default 사용시 한번만 사용 가능
// module.exports = NumberBaseball; //export default 와 module.exports 가 호환은 되지만 깊게 들어가면 살짝 다른것 염두해두자. 