import BurgerMenu from "../components/burgerMenu/BurgerMenu";
import SolarSystem from "../components/solarSystem/SolarSystem";
import Welcome from "../components/welcome/Welcome";
import { useParams } from "react-router-dom";

const WelcomePage = () => {
  const systemName = useParams().system;

  return (
    <div>
      <Welcome />
      <SolarSystem name={{ systemName }} />
      <BurgerMenu />
    </div>
  );
};

export default WelcomePage;
