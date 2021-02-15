import React from 'react';
import { Pagination } from 'react-bootstrap';

//выбор текущей страницы перечня
export function PaginationComponent(props){
  const {currentPage,setCurrentPage, pageCount}=props;
  
  const pages=[]
  if (pageCount<10) { //для коротких списков без доп. кнопок управления
    for (let num=1;num<=pageCount;num++){
      pages.push(<Pagination.Item key={num} active={currentPage===num?true:false} onClick={()=>(setCurrentPage(num))}>{num}</Pagination.Item>)
    }
  } else {
    //странцы в центре компонента
    let startPage; 
    let finishPage;

if (currentPage<=pageCount-3){ //если не в конце списка
  startPage=currentPage>=3?currentPage-1:1; //если не в начале списка
  finishPage=startPage+2;
} else {
  startPage=pageCount-3; //если в конце списка
  finishPage=pageCount;
}
    
    pages.push(<Pagination.First onClick={()=>(setCurrentPage(1))} />);
    pages.push(<Pagination.Prev onClick={()=>(setCurrentPage(currentPage-1))}/>);
    if (currentPage>=3) { //если не в начале списка
      pages.push(<Pagination.Item active={currentPage===1?true:false} onClick={()=>(setCurrentPage(1))}>{1}</Pagination.Item>);
      pages.push(<Pagination.Ellipsis disabled />);
    };
    for (let num=startPage;num<=finishPage;num++){ //3 старицы по центру компонента
      pages.push(<Pagination.Item key={num} active={currentPage===num?true:false} onClick={()=>(setCurrentPage(num))}>{num}</Pagination.Item>);
    };
    if (currentPage<=pageCount-3) { //если не в конце списка
      pages.push(<Pagination.Ellipsis disabled />);
      pages.push(<Pagination.Item active={currentPage===pageCount?true:false} onClick={()=>(setCurrentPage(pageCount))}>{pageCount}</Pagination.Item>);      
    };
    pages.push(<Pagination.Next onClick={()=>(setCurrentPage(currentPage+1))}/>);
    pages.push(<Pagination.Last onClick={()=>(setCurrentPage(pageCount))}/>);
  }

  return(
    <Pagination style={{justifyContent:'center'}}>
{pages}
    </Pagination>
  )
  
}