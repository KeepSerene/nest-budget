import { Form, NavLink } from "react-router-dom";

// Libraries
import { TrashIcon } from "@heroicons/react/24/solid";

// Assets
import logoSVG from "../assets/logomark.svg";

const Nav = ({ username }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to homepage">
        <img src={logoSVG} alt="logo" height={30} />

        <span>NestBudget</span>
      </NavLink>

      {username && (
        <Form
          method="post"
          action="logout"
          onSubmit={(event) => {
            if (
              !confirm(
                "Are you sure you want to delete your account and all data?"
              )
            )
              event.preventDefault();
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>Logout</span>

            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
