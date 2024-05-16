import BurgerMenu from "../components/burgerMenu/BurgerMenu";
import SolarSystem from "../components/solarSystem/SolarSystem";
import Welcome from "../components/welcome/Welcome";
import { useParams } from "react-router-dom";

const WelcomePage = () => {
  const index = useParams().index;

  return (
    <div>
      <Welcome />
      <SolarSystem index={{ index }} />
      <BurgerMenu />
    </div>
  );
};

export default WelcomePage;
