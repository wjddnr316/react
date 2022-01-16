import React, { Component } from 'react';
import Try from './Try';


class NumberBaseball extends Component {
    // 함수를 안에다가 위치 시키면 this.getNumbers 로 불러와야함 외부로 빼면 this 생략
    getNumbers = () => {
        const candidate = [1,2,3,4,5,6,7,8,9];
        const array = [];
        for (let i = 0 ; i < 4; i += 1) {
            // splice(0 , 1) = 배열 0 번째 요소부터 1개 삭제한다  즉 [0,1,2,3] 일경우 [1,2,3] 으로 보임
            const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[i];
            array.push(chosen);
        };
        return array;
    }

    state = {
        result : '',
        value : '',
        answer : this.getNumbers(), // ex : [1, 3, 5, 7]
        tries : [],
    };

    onFormSubmit = (e) =>{ 
        // const {} = this.state; 사용하면 this.state 생략 가능 : 비구조화 할당
        const { value, tries, answer } = this.state;
        e.preventDefault();
        if(value === answer.join('')){
            this.setState((prevState)=>{
                return{
                    result : '홈런',
                    // [... 를 사용해서 기존 배열에 있는 값을 가져오고 , 추가할 배열인자 ]
                    tries : [...prevState.tries,{ try : value, result : '홈런!'}],
                }
            })
            alert('게임을 다시 시작합니다.');
            this.setState({
                value : '',
                answer: this.getNumbers(),
                tries: [],
            });
            this.onInputRef.focus();
        }else{ // 답 틀렸으면
            const answerArray = value.split('').map((v)=>parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9){ // 10번 이상 틀렸을 때
                this.setState({
                    result: `10번 넘게 틀렸으니 실패! 답은 ${answer.join(",")} 였습니다`,
                });
                alert('게임을 다시 시작합니다');
                this.setState({
                    value:'',
                    answer:this.getNumbers(),
                    tries:[],
                });
                this.onInputRef.focus();
            }else{
                for(let i = 0; i < 4; i += 1){
                    if(answerArray[i] === answer[i]){
                        strike += 1;
                    }else if (answer.includes(answerArray[i])){  // includes() 메서드는 배열이 특정 요소를 포함하고 있는지 판별합니다.
                        ball += 1;
                    }
                };
                this.setState((prevState)=>{
                    return{
                        tries : [...prevState.tries, {try : value, result : `${strike} 스트라이크 , ${ball} 볼입니다`}],
                        value : '',
                    };
                });
                this.onInputRef.focus();
            }
        }
    };

    onInputChange = (e) =>{
        this.setState({
            value: e.target.value,
        });
    };
    
    input;
    onInputRef = (c) =>{
        this.input = c;
    };
    
    render(){
        const { result , tries, value} = this.state;
        return(
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onFormSubmit}>
                    <input maxLength={4} ref={this.onInputRef} value={value} onChange={this.onInputChange} />
                    <button>입력</button>
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {tries.map((v,i)=>{
                        return (
                            // 태그안에 들어가는 속성을 HTML 에선 ATTR / REACT에선 PROPS라고 함
                            <Try key={`${i+1}차 시도`} tryInfo={v} />
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseball;  
 