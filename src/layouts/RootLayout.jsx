import { Outlet, useLoaderData } from "react-router-dom";

// Components
import Nav from "../components/Nav";

// Assets
import waveSVG from "../assets/wave.svg";

// Helper functions
import { fetchData } from "../utils";

// Loader function
export const rootLayoutLoader = () => {
  const username = fetchData("username");

  return { username };
};

const RootLayout = () => {
  const data = useLoaderData();

  return (
    <div className="root-layout">
      <header>
        <Nav username={data.username} />
      </header>

      <main>
        <Outlet />
      </main>

      <img src={waveSVG} alt="" />
    </div>
  );
};

export default RootLayout;
