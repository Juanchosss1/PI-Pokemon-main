import React from "react";

const Pagination = ({
  pokemonsPerPage,
  allPokemons,
  pagination,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <div>
      Pagination
      {/*prev*/}
      {pageNumbers && currentPage > 1 ? (
        <button onClick={() => pagination(currentPage - 1)}>Prev</button>
      ) : null}
      {/*intermedium*/}
      {pageNumbers &&
        pageNumbers.map((n) => {
          return (
            <button key={n} onClick={() => pagination(n)}>
              {n}
            </button>
          );
        })}
      {/*next*/}
      {console.log(currentPage)}
      {pageNumbers && currentPage <= pageNumbers.length - 1 ? (
        <button onClick={() => pagination(currentPage + 1)}>Next</button>
      ) : null}
    </div>
  );
};

export default Pagination;
