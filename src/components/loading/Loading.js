import loadingGif from "../../imgs/loading.gif";
import "./styles.css";

const Loading = (props) => {
  return (
    <div className="loading-container">
      <img alt="loading" src={loadingGif}></img>
      <h3>Loading data...</h3>
    </div>
  );
};

export default Loading;
