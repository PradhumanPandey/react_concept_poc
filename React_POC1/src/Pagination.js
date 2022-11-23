import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  console.log(currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Pagination;

//----------TypeChecking--------------------------//
// here if I
// change = {this.state.movie.length} to 'abc' string
//-----------------------------------------------------//
// output:-- it shows all the movie items in a single page
//---------------------------------------------------------//
//----------------------------------------------------------//

// so for that it comes the picture called:-->
// TypeChecking
// 1. import library propTypes from prop-types
// 2.Pagination.propTypes ={
//a. itemsCount:PropTypes.number.isRequired,
// here i am checking that itemcount should be
// number and is must required ti write during the application

//similarly for the others type
//  itemsCount:propTypes.number.isRequired,
//  pageSize:propTypes.number.isRequired,
//  currentPage:propTypes.number.isRequired,
//  onPageChange:PropTypes.func.isRequired,

// }
