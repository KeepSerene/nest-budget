import { Link, useNavigate, useRouteError } from "react-router-dom";

// Libraries
import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";

const Error = () => {
  const errorObj = useRouteError();
  const navigate = useNavigate();

  return (
    <section className="error">
      <h1>Uh oh! We've got a problem.</h1>

      <p>{errorObj.message || errorObj.statusText}</p>

      <div className="flex-md">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn--dark"
        >
          <span>Go Back</span>

          <ArrowUturnLeftIcon width={20} />
        </button>

        <Link to="/" className="btn btn--dark">
          <span>Go Home</span>

          <HomeIcon width={20} />
        </Link>
      </div>
    </section>
  );
};

export default Error;
