const React = require('react');
const { Component } = React;

class WordRelay extends Component {
    state = {
        word : '끝말잇기',
        value :'',
        result : '',
    };
    

    onFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.word.length - 1);
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]){
            this.setState({
                result : '정답',
                word : this.state.value,
                value : '',
            });
            this.input.focus();
        }else{
            this.setState({
                result : '땡',
                value : '',
            });
            this.input.focus();
        };
    };


    onInputChange = (e) =>{
        this.setState({ value : e.target.value })
    };

    input;

    onRefInput = (c) => {
        this.input = c;
    };


    render(){
        return (
            <React.Fragment>
                <div>{this.state.word}</div>
                <form onSubmit={this.onFormSubmit}>
                    <input ref={this.onRefInput} type="text" value={this.state.value} onChange={this.onInputChange} />
                    <button type="submit">입력</button>
                </form>
                <div>{this.state.result}</div>
            </React.Fragment>
        );
    }
};

module.exports = WordRelay;