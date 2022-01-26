import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './components/Table';

const initialState = {
    winner:'',
    turn: 'O',
    tableData: [
        ['', '', ''], 
        ['', '', ''], 
        ['', '', ''],
    ],
    recentCell:[-1,-1],
}

//action의 이름은 대문자로 작성하는게 커뮤니티의 규칙
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER :{
            return{
                ...state, //스프레드 문법, 복사
                winner: action.winner, //바뀌는 부분만 바꿔주는 역할
            };
        }

        case CLICK_CELL :{
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.col] = state.turn;
            return{
                ...state,
                tableData,
                recentCell: [action.row, action.col],
            };
        }

        case CHANGE_TURN :{
            return{
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        }

        case RESET_GAME :{
            return{
                ...state,
                turn: 'O',
                tableData: [
                    ['', '', ''], 
                    ['', '', ''], 
                    ['', '', ''],
                ],
                recentCell:[-1,-1],
            }
        }

        default :
        return state;
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, turn, winner, recentCell} = state;

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['','',''], ['', '', ''], ['', '', '']])

    const onClicktable = useCallback(()=>{
        // dispatch 안에 들어가는건 action 이라고 부름.( 리덕스에서 따온 개념 )
        // action 객체 안에 type 을 설정 
        dispatch({ 
            type: SET_WINNER, 
            winner: '' 
        })
    }, []); 

    useEffect(()=>{
        const [row, col] = recentCell;
        if(row < 0){
            return;
        }

        let win = false;

        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
            win = true;
        }

        if(tableData[0][col] === turn && tableData[1][col] === turn && tableData[2][col] === turn){
            win = true;
        }

        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            win = true;
        }

        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
            win = true;
        }

        if(win){
            dispatch({
                type: SET_WINNER,
                winner: turn,
            });
            
            dispatch({
                type: RESET_GAME,
            });
        }else{
            let all = true; // all 이 true 면 무승부

            tableData.forEach((row) => { // 무승부 검사
                row.forEach((col) => {
                    if(!col){
                        all = false;
                    }
                });
            });
            if (all){
                dispatch({
                    type: RESET_GAME,
                });
            }else {
                dispatch({
                    type: CHANGE_TURN,
                });
            }
        }
    }, [recentCell]);

    return(
        <>
            <Table onClick={onClicktable} dispatch={dispatch} tableData={state.tableData}/>
            {winner && <div>{winner}님의 승리</div>}
        </>
    );
}

export default TicTacToe;