import React from "react";
import styles from "../Pagination/Pagination.module.css";

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
    <div className={styles.container}>
      {/*prev*/}
      {pageNumbers && currentPage > 1 ? (
        <button
          className={styles.navigateprev}
          onClick={() => pagination(currentPage - 1)}
        ></button>
      ) : null}

      {/*intermedium*/}
      {pageNumbers &&
        pageNumbers.map((n) => {
          return (
            <button
              className={currentPage === n ? styles.pageSelected : styles.page}
              key={n}
              onClick={() => pagination(n)}
            >
              {n}
            </button>
          );
        })}
      {/*next*/}

      {pageNumbers && currentPage <= pageNumbers.length - 1 ? (
        <button
          className={styles.navigatenext}
          onClick={() => pagination(currentPage + 1)}
        ></button>
      ) : null}
    </div>
  );
};

export default Pagination;
