import React from 'react';
import { Pagination } from 'react-bootstrap';


export function PaginationComponent(props){
  const {currentPage,setCurrentPage, pageCount}=props;
  
  const pages=[]
  if (pageCount<10) {
    for (let num=1;num<=pageCount;num++){
      pages.push(<Pagination.Item active={currentPage===num?true:false} onClick={()=>(setCurrentPage(num))}>{num}</Pagination.Item>)
    }
  } else {
    let startPage;
    let finishPage;

if (currentPage<=pageCount-3){
  startPage=currentPage>=3?currentPage-1:1;
  finishPage=startPage+2;
} else {
  startPage=pageCount-3;
  finishPage=pageCount;
}
    
    pages.push(<Pagination.First onClick={()=>(setCurrentPage(1))} />);
    pages.push(<Pagination.Prev onClick={()=>(setCurrentPage(currentPage-1))}/>);
    if (currentPage>=3) {
      pages.push(<Pagination.Item active={currentPage===1?true:false} onClick={()=>(setCurrentPage(1))}>{1}</Pagination.Item>);
      pages.push(<Pagination.Ellipsis disabled />);
    };
    for (let num=startPage;num<=finishPage;num++){
      pages.push(<Pagination.Item active={currentPage===num?true:false} onClick={()=>(setCurrentPage(num))}>{num}</Pagination.Item>);
    };
    if (currentPage<=pageCount-3) {
      pages.push(<Pagination.Ellipsis disabled />);
      pages.push(<Pagination.Item active={currentPage===pageCount?true:false} onClick={()=>(setCurrentPage(pageCount))}>{pageCount}</Pagination.Item>);      
    };
    pages.push(<Pagination.Next onClick={()=>(setCurrentPage(currentPage+1))}/>);
    pages.push(<Pagination.Last onClick={()=>(setCurrentPage(pageCount))}/>);
  }

  return(
    <Pagination>
{pages}
    </Pagination>
  )
  
}