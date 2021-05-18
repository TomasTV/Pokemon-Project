import React from "react";
// import { v4 as uuidv4 } from "uuid";

const Pagination = ({ pokemonsPerPage, totalPokemons, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <main className="section-title">
      <section className="pokemons">
        <ul className="container">
          {pageNumbers.map((num) => (
            <div className="btn-container">
              <li key={num} className="page-btn">
                <button
                  className="active - btn"
                  onClick={(e) => paginate(e, num)}
                >
                  {num}
                </button>
              </li>
            </div>
          ))}
        </ul>
      </section>
      <div className="underline"></div>
    </main>
  );
};
export default Pagination;

// const [page, setPage] = useState(0);
// const nextPage = () => {
//   setPage((oldPage) => {
//     let nextPage = oldPage + 1;
//     if (nextPage > data.length - 1) {
//       nextPage = 0;
//     }
//     return nextPage;
//   });
// };
// const prevPage = () => {
//   setPage((oldPage) => {
//     let prevPage = oldPage - 1;
//     if (prevPage < 0) {
//       prevPage = data.length - 1;
//     }
//     return prevPage;
//   });
// };

// const handlePage = (index) => {
//   setPage(index);
// };
// return (
//     <main>
//       <div>
//         <h1>{loading ? 'loading...' : 'pagination'}</h1>
//         <div className='underline'></div>
//       </div>
//       <section>
//         <div>
//           {pokemons.map((pokemon) => {
//             return <Pokemon key={pokemon.id} {...pokemon} />
//           })}
//         </div>
//         {!loading && (
//           <div className='btn-container'>
//             <button className='prev-btn' onClick={prevPage}>
//               prev
//             </button>
//             {data.map((item, index) => {
//               return (
//                 <button
//                   key={index}
//                   className={`page-btn ${index === page ? 'active-btn' : null}`}
//                   onClick={() => handlePage(index)}
//                 >
//                   {index + 1}
//                 </button>
//               )
//             })}
//             <button className='next-btn' onClick={nextPage}>
//               next
//             </button>
//           </div>
//         )}
//       </section>
//     </main>
//   )
