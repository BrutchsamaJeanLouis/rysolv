import React, { Fragment, useEffect, useState } from 'react';
import T from 'prop-types';

import { getPage } from './helpers';
import { Results, StyledPagination } from './styledComponents';

const Pagination = ({ Component, propsToPassDown }) => {
  const {
    data,
    data: { length },
    handleNav,
    path,
    perPage,
    result,
    ...restProps
  } = propsToPassDown;

  const count = Math.ceil(length / perPage);
  const page = getPage({ count });

  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const newPage = page > 0 ? page - 1 : 0;
    setCurrentPage(newPage);
  }, [length, page]);

  const slice = data.slice(
    currentPage * perPage,
    currentPage * perPage + perPage,
  );

  const handleChangePage = (e, value) => {
    const newPage = value > 0 ? value - 1 : 0;
    handleNav(`${path}?page=${value}`);
    setCurrentPage(newPage);
  };
  return (
    <Fragment>
      <Results>{result}</Results>
      <Component data={slice} handleNav={handleNav} {...restProps} />
      <StyledPagination
        count={count}
        onChange={(e, value) => handleChangePage(e, value)}
        page={currentPage + 1}
        shape="rounded"
      />
    </Fragment>
  );
};

Pagination.propTypes = {
  Component: T.func.isRequired,
  propsToPassDown: T.object.isRequired,
};

export default Pagination;
