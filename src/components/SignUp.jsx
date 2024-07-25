import { Form } from "react-router-dom";

// Libraries
import { UserPlusIcon } from "@heroicons/react/24/solid";

// Assets
import illustrationImg from "../assets/illustration.jpg";

const SignUp = () => {
  return (
    <section className="sign-up">
      <div>
        <h1>
          Master Your Finances with <span className="accent">NestBudget!</span>
        </h1>

        <p>
          NestBudget: The ultimate tool for personal budgeting and financial
          freedom. Begin your journey today and build your financial nest!
        </p>

        {/* The following form will submit to the current page (the dashboard page) by default */}
        <Form method="post">
          <input
            type="text"
            name="username"
            autoComplete="given-name"
            placeholder="Enter your username"
            aria-label="Set a username"
            required
          />

          <input type="hidden" name="_action" value="newUser" />

          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>

            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>

      <img
        src={illustrationImg}
        alt="An illustration image of a person standing beside a bar graph with money in their hands"
      />
    </section>
  );
};

export default SignUp;
