import React,{ PureComponent, createRef } from 'react';
// ref 사용법이 class 랑 hooks 랑 다르다보니 통일성이 부족함.
// createRef 를 사용하면 hooks 랑 사용법이 거의 비슷해져서 관리하기 쉬움

class CreateRef extends PureComponent{
    
    state = {
        value: '',
        result:'',
    }

    // creaRef() 함수 호출 후
    inputRef = createRef();
    onFormSubmit= (e) =>{
        e.preventDefault();
        this.setState({
            result:this.state.value,
            value:'',
        });
        // 사용법이 hooks 랑 비슷해짐 호출.current.focus()
        this.inputRef.current.focus();
        // this.input.focus();
    };
    onInputChange = (e) =>{
        console.log(e.target);
        this.setState({
            value:  e.target.value 
        })
    }

    // // 기존방식은 함수이기 때문에 ref 설정에 있어 좀더 자유로움.
    // input; 
    // inpuRef = (c) =>{
    //     this.input = c ;
    // }
    
    render(){
        return(
            <>
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <input ref={this.inputRef} onChange={this.onInputChange} vaule={this.state.value} type="text"/>
                </form>
            </div>
            <div>{this.state.result}</div>
            </>
        )
    }
}

export default CreateRef ;