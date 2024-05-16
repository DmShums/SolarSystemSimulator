import BurgerMenu from "../components/burgerMenu/BurgerMenu";
import SolarSystem from "../components/solarSystem/SolarSystem";
import Welcome from "../components/welcome/Welcome";

const WelcomePage = () => {
  return (
    <div>
      <Welcome />
      <SolarSystem />
      <BurgerMenu />
    </div>
  );
};

export default WelcomePage;
