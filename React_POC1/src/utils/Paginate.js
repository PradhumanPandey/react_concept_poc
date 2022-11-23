import _ from "lodash";
// import React from "react";
function Paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
  //lodash library//
  // ***  _.slice(array, startIndex, endIndex);
  //The Lodash.slice() function is used to take slice of the
  //   array from starting index to end index here end index is exclusive
  //   and start index is inclusive.
  //***The _.take() method is used to create a slice of an array
  //    with n elements from the beginning. */
}

export default Paginate;
