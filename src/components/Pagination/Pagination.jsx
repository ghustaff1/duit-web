import React from 'react';
import './Pagination.scss';

const Pagination = ({ pagesAmount, setPage, currentPage }) => {


  return (
    <ul className="pages">
      {
        Array.from({ length: pagesAmount }, (_, i) =>
        (
          <li className={currentPage === i ? 'active' : null} key={'page' + i} onClick={() => setPage(i)}>
            {i + 1}
          </li>
        ))}
    </ul>
  )
}

export default Pagination;