import React from 'react';

const Props = (props) => {
    return(
        <div className="use_props">
            <ul className="list">
                {props.array.map((array, index)=>
                <li className="item" style={{textAlign : 'center'}}key={index}>
                    <h3 className="list_title">
                        { props.array[index] } {props.text}
                    </h3>
                </li>
                )}
            </ul>
        </div>
    )
}
Props.defaultProps = {
    text : '요일',
    array : ['월','화','수','목','금','토','일']
}
export default Props;