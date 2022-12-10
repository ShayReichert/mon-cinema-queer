// import { mockMoviesDiscover } from "./data/mockData";
import { useEffect, useState } from "react";
import "./App.scss";
import Card from "./components/Card";
import { getMoviesDiscover } from "./functions/api";
import ReactPaginate from "react-paginate";

function App() {
  const [moviesDiscover, setMoviesDiscover] = useState([]);
  const [totalResult, setTotalResult] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const resMoviesDiscover = await getMoviesDiscover(1);
        setMoviesDiscover(resMoviesDiscover.data.results);
        setTotalResult(resMoviesDiscover.data.total_results);
      } catch (err) {
        setError(err);
      }
    }
    getData();
  }, []);

  async function handlePageClick(e) {
    const page = e.selected + 1;
    const resMoviesDiscover = await getMoviesDiscover(page);
    setMoviesDiscover(resMoviesDiscover.data.results);
  }

  return (
    moviesDiscover && (
      <div className="main">
        <section className="title-wrapper">
          <h1>
            MON <span className="red">C</span>
            <span className="orange">I</span>
            <span className="yellow">N</span>
            <span className="green">É</span>
            <span className="blue">M</span>
            <span className="purple">A</span> QUEER
          </h1>
          <p className="baseline">Les derniers films queer sortis</p>
          <p className="second-baseline">Et c'est tout.</p>
        </section>

        <section className="cards-wrapper">
          {moviesDiscover.map((movie, key) => {
            return <Card info={movie} key={key} />;
          })}
        </section>

        <section className="pagination-wrapper">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(totalResult / 20)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(e) => handlePageClick(e)}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </section>
      </div>
    )
  );
}

export default App;
