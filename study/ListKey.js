import React from 'react'
// key를 사용하는 이유 : url https://ko.reactjs.org/docs/reconciliation.html#recursing-on-children

const ListKey = () =>{
    let numbers = [1,2,3,4,5];
    const listItem = numbers.map((number)=>
        <li className="item" style={{textAlign : 'center'}}>{number}</li>
    ) 
    return(
        <div clssName="list_key">
            <ul className="list">
                { listItem }
            </ul>
        </div>
    )
}
ListKey.defaultProps = {
    numbers : [1,2,3,4,5],
}
export default ListKey