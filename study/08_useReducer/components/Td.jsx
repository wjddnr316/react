import React, { useCallback,memo } from 'react';
import { CLICK_CELL } from '../TicTacToe';

const Td = memo(({rowIndex, colIndex, dispatch, colData}) => {
    const onClickTd = useCallback(() => {

        if(colData){
            return;
        }
        dispatch({
            type: CLICK_CELL,
            row: rowIndex,
            col: colIndex,
        });

    },[colData]);

    return(
        <td onClick={onClickTd}>{colData}</td>
    )
})

export default Td;