
// useState 를 사용하려면 import React 뒤에 ,{ useState } 를 추가해야함
import React, { useState } from 'react';

function State() {
  // useState 에는 기본적으로 [a,b] 두개의 값이 존재. a = 지정된 변수 , b = 지정된 변수를 변경 가능한 공간
  let [title,titleChange] = useState(['메뉴1','메뉴2','메뉴3']);
  let [goodCount,goodCountChange] = useState(0);
  let [badCount,badCountChange] = useState(0);
  function changeTitle() {
    // [...변수] = deep copy (ES6 문법)
    let newTitle = [...title];
    newTitle = ['메뉴3','메뉴2','메뉴1']
    titleChange(newTitle)
  }
  function plus(){
    goodCountChange(goodCount + 1)
  }
  return (
    <div className="use_state">
      <ul className="list">
        <li className="item">
          <h3 className="list_title">
            { title }
            <button type="button" className="list_title_btn" onClick = { changeTitle }>
              순서변경
            </button>
          </h3>
          <div className="count_area">
            <button type="button" className="button_add" onClick = {plus}> 
              <span class="text">좋아요</span>
              <span className="num">{ goodCount }</span>
            </button>
            <button type="button" className="button_minus" onClick={ ()=>{badCountChange(badCount + 1)}}> 
              <span class="text">싫어요</span>
              <span className="num">{ badCount }</span>
            </button>
          </div>
        </li>
      </ul>
      <ListContent />
    </div>
  );
}

function ListContent(){
  return(
    // return 밑에는 무조건 1개의 tag 로 묶여 있어야 함. 만약 2개가 필요할 경우 <> </>를 사용
    <>
    <div className="list_content">
      <div className="inner">
        <h4 className="list_content_title">대제목</h4>
        <dl className="list_content_desc">
          <dt calssName="list_content_desc_title">소제목</dt>
          <dt calssName="list_content_desc_info">내용</dt>
        </dl>
      </div>
    </div>
    <div></div>
    </>
  )
}

export default State; 
