import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/point-light">
        <button >
          方块与光
        </button>
      </Link>
      <Link to="/box-and-sphere">
        <button >
          方块与球
        </button>
      </Link>
      <Link to="/rotation-heart">
        <button >
          旋转的心
        </button>
      </Link>
    </div>
  );
};

export default Home;
