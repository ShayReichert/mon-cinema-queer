// import { mockMoviesDiscover } from "./data/mockData";
import { useEffect, useState } from "react";
import "./App.scss";
import Card from "./components/Card/Card";
import { getMoviesDiscoverWithCategories } from "./functions/api";
import ReactPaginate from "react-paginate";
import Loader from "./components/Loader/Loader";

function App() {
  const [moviesDiscover, setMoviesDiscover] = useState([]);
  const [totalResult, setTotalResult] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState(["250606", "158718", "264384", "264386", "290527", "3183"]);

  useEffect(() => {
    async function getData(categories) {
      setIsLoading(true);
      try {
        const resMoviesDiscover = await getMoviesDiscoverWithCategories(1, categories);
        setMoviesDiscover(resMoviesDiscover.data.results);
        setTotalResult(resMoviesDiscover.data.total_results);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }
    getData(categories);
  }, []);

  async function fetchData(updatedCategories) {
    setIsLoading(true);
    try {
      const resMoviesDiscover = await getMoviesDiscoverWithCategories(1, updatedCategories);
      setMoviesDiscover(resMoviesDiscover.data.results);
      setTotalResult(resMoviesDiscover.data.total_results);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }

  function handleCategoryChange(e) {
    const categoryValue = e.target.value;
    const isChecked = e.target.checked;
    const categoryList = e.target.dataset.categories ? e.target.dataset.categories.split(",") : [categoryValue];

    let updatedCategories;
    if (isChecked) {
      updatedCategories = [...categories, ...categoryList];
    } else {
      updatedCategories = categories.filter((c) => !categoryList.includes(c));
    }

    // Supprimez les doublons éventuels.
    updatedCategories = [...new Set(updatedCategories)];

    setCategories(updatedCategories);
    fetchData(updatedCategories);
  }

  async function handlePageClick(e) {
    const page = e.selected + 1;
    const resMoviesDiscover = await getMoviesDiscoverWithCategories(page, categories);
    setMoviesDiscover(resMoviesDiscover.data.results);
    window.scrollTo({ top: 0 });
  }

  if (error) {
    console.error(error);
  }

  return (
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

      <section className="category-filters">
        <label>
          <input
            type="checkbox"
            value="lgbt_and_queer"
            data-categories="250606,158718"
            checked={categories.includes("250606") && categories.includes("158718")}
            onChange={handleCategoryChange}
          />
          Queer
        </label>
        <label>
          <input type="checkbox" value="264386" checked={categories.includes("264386")} onChange={handleCategoryChange} />
          Lesbien
        </label>
        <label>
          <input type="checkbox" value="264384" checked={categories.includes("264384")} onChange={handleCategoryChange} />
          Gay
        </label>
        <label>
          <input type="checkbox" value="3183" checked={categories.includes("3183")} onChange={handleCategoryChange} />
          Bi
        </label>
        <label>
          <input type="checkbox" value="290527" checked={categories.includes("290527")} onChange={handleCategoryChange} />
          Trans
        </label>
      </section>

      {isLoading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
      <section className="footer">
        <div className="made-by">
          Fait par{" "}
          <a href="https://www.youtube.com/channel/UCg_9adZCdtkq7Fxrg8xwL6g" target="_blank" rel="noreferrer">
            {" { Shay } "}
          </a>{" "}
          avec ❤️
        </div>
      </section>
    </div>
  );
}

export default App;
