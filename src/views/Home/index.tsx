import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/point-light">
        <button >
          方块与光
        </button>
      </Link>
    </div>
  );
};

export default Home;
