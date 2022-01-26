import React, { useEffect, useRef, memo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
    console.log('tr랜더링')

    const ref = useRef([]);
    useEffect(()=>{
        console.log(ref.current[0] === rowData, ref.current[1] === rowIndex, ref.current[2] === dispatch);
        ref.current = [rowData, rowIndex, dispatch]
    },[rowData, rowIndex, dispatch])
    return(
        <tr>
            {Array(rowData.length).fill().map((td, i) => (
                <Td
                    key={i}
                    dispatch={dispatch} 
                    rowIndex={rowIndex} 
                    colIndex={i}
                    colData={rowData[i]}
                />
            ))}
        </tr>
    )
})

export default Tr;