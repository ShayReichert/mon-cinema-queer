import "./App.scss";
import Card from "./components/Card";
import { mockMoviesDiscover } from "./data/mockData";

function App() {
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

      <section className="cards-wrapper">
        {mockMoviesDiscover.map((movie, key) => {
          return <Card info={movie} key={key} />;
        })}
      </section>

      <section className="pagination-wrapper">
        <div className="pagination-mobile"></div>
        <div className="pagination-desktop"></div>
      </section>
    </div>
  );
}

export default App;
