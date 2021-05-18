import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemons, resetAll } from "../Redux/actions";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../Components/Navbar";
import Pokemons from "../Components/Pokemons";
import Loading from "../Components/Loading";
import Pagination from "../Components/Pagination/Pagination";
import Filter from "../Components/Filter/Filter";
import Footer from "../Components/Footer";

function Home() {
  const dispatch = useDispatch();
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const filterBy = useSelector((state) => state.filterBy);
  const orderBy = useSelector((state) => state.orderBy);
  const pokemons = useSelector((state) => state.pokemons);
  const loading = useSelector((state) => state.loading);
  let allPokemons;

  useEffect(() => {
    dispatch(resetAll());
    dispatch(getPokemons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  filterBy === "All" && orderBy === "Select"
    ? (allPokemons = pokemons)
    : (allPokemons = filteredPokemons);

  function paginate(e, num) {
    e.preventDefault();
    setPage(num);
  }

  const [page, setPage] = useState(1);
  const [pokemonsPerPage] = useState(8);

  let indexLastPage = page * pokemonsPerPage;
  let indexFirtsPage = indexLastPage - pokemonsPerPage;
  let currentPage = allPokemons.slice(indexFirtsPage, indexLastPage);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Filter />
          <Pokemons pokes={currentPage} />
          <Pagination
            key={uuidv4()}
            pokemonsPerPage={pokemonsPerPage}
            totalPokemons={allPokemons.length}
            paginate={paginate}
          />
        </>
      )}
      <Footer />
    </>
  );
}

export default Home;
