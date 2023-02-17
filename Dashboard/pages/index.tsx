import { Rancho } from "@next/font/google";

import Home from "../views/home";

const rancho = Rancho({ weight: "400", style: "normal", subsets: ["latin"] });

const HomePage = () => {
  return <Home />;
};

export default HomePage;
