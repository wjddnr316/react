import React, { Component } from 'react';
// import React, { PureComponent } from 'react';
// class RenderTest extends PureComponent {
    
class RenderTest extends Component {
    //state 안에는 너무 복잡한 [{[]}]이런구조는 피하도록 할것. 간단한 구조로만 사용해여 PureComponent 가 잘 이해함
    state = {
        counter: 0,
        string:'hello',
        number:1,
        boolean:true,
        object:{ a: 'b', c: 'd' },
        array:[ 1, 2, 3, 4, 5],
    };
    onClick = () =>{
        const array = this.state.array;
        array.push(1);

        this.setState({
            array:[...this.state.array, 1],
        })
    };

    // 그래서 shouldComponentUpdate 를 설정해서 안바뀔경우는 랜더링을 하지 말라고 정의를 해줘야 한다.
    shouldComponentUpdate(nextProps, nextState, nextContext){
        if(this.state.counter !== nextState.counter){
            return true;
        }else{
            return false;
        }
    }

    render(){
        console.log('랜더링',this.state)
        return(
            <div>
                <button onClick={this.onClick}>클릭</button>
                <p>setState가 정의되어 있어 값이 바뀌든 안바뀌든 랜더링이 된다.</p>
                <p>shouldComponentUpdate를사용해서 안바뀔 경우는 랜더링이 안되도록 설정한다</p>
                <p>아니면 Component를 PureComponent로 적용한다</p>
            </div>
        )
    }
} 

export default RenderTest;