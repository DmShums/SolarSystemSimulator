import BurgerMenu from "../components/burgerMenu/BurgerMenu";
import SolarSystem from "../components/solarSystem/SolarSystem";
import Welcome from "../components/welcome/Welcome";
import DeleteSystem from "../components/deleteSystem/deleteSystem";
import { useParams } from "react-router-dom";

const WelcomePage = () => {
  const index = useParams().index;

  return (
    <div>
      <Welcome />
      <SolarSystem index={{ index }} />
      {index !== undefined ? <DeleteSystem index={{ index }} /> : null}
      <BurgerMenu />
    </div>
  );
};

export default WelcomePage;
