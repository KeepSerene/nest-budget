import { Link, useLoaderData } from "react-router-dom";

// Helper functions
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  toTitleCase,
  wait,
} from "../utils";

// Components
import SignUp from "../components/SignUp";
import BudgetForm from "../components/BudgetForm";
import ExpenseForm from "../components/ExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// Libraries
import { toast } from "react-toastify";

// Loader function
export const dashboardLoader = () => {
  const username = fetchData("username");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");

  return { username, budgets, expenses };
};

// Action function
export const dashboardAction = async ({ request }) => {
  // Delay the function's execution by any number between 0 and 800 ms
  await wait();

  // Get the array of input data from forms
  const formData = await request.formData();

  // Convert the input data array to an object
  const { _action, ...values } = Object.fromEntries(formData);
  // The "_action" property is set by a hidden "input" element in each form

  // Handle new user submission
  if (_action === "newUser") {
    try {
      // Check to see if the "text input" field only contains whitespaces
      const username = values.username.trim();

      if (!username) {
        return toast.error(
          "Invalid input: Fields cannot be empty or contain only spaces."
        );
      } else {
        // Store the input data object in the local storage
        localStorage.setItem("username", JSON.stringify(username));

        // Finally, return a toast notification
        return toast.success(`Welcome, ${username}`);
      }
    } catch (err) {
      throw new Error("There was a problem creating your account!");
    }
  }

  // Handle new budget submission
  if (_action === "budgetCategory") {
    try {
      // Check to see if the "text input" field only contains whitespaces
      const budgetCategoryName = values.budgetCategoryName.trim();

      if (!budgetCategoryName) {
        return toast.error(
          "Invalid input: Fields cannot be empty or contain only spaces."
        );
      } else {
        // Create a new budget
        createBudget({
          name: budgetCategoryName,
          amount: values.totalBudgetAmount,
        });

        // Finally, return a toast notification
        return toast.success("A new budget category was created!");
      }
    } catch (err) {
      throw new Error("There was a problem creating your budget!");
    }
  }

  // Handle new expense submission
  if (_action === "recordExpense") {
    try {
      // Check to see if the "text input" field only contains whitespaces
      const expenseDescription = values.expenseDescription.trim();

      if (!expenseDescription) {
        return toast.error(
          "Invalid input: Fields cannot be empty or contain only spaces."
        );
      } else {
        // Create a new expense
        createExpense({
          desc: expenseDescription,
          cost: values.cost,
          budgetId: values.selectBudgetCategory,
        });

        // Finally, return a toast notification
        return toast.success(
          `Cost for ${expenseDescription.toLowerCase()} was recorded!`
        );
      }
    } catch (err) {
      throw new Error("There was a problem recording your expense!");
    }
  }

  // Handle deletion of an expense
  if (_action === "deleteExpense") {
    try {
      // Delete the expense based on the given id
      deleteItem({
        dataKey: "expenses",
        id: values.expenseId,
      });

      // Finally, return a toast notification
      return toast.success(
        `${toTitleCase(values.expenseDesc)}'s expense was deleted!`
      );
    } catch (err) {
      throw new Error("There was a problem deleting your expense!");
    }
  }
};

const Dashboard = () => {
  const data = useLoaderData();

  return (
    <>
      {data.username ? (
        <article className="dashboard">
          <h1>
            Ahoy, <span className="accent">{data.username}</span>
          </h1>

          <div className="grid-sm">
            {data.budgets && data.budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <BudgetForm />

                  <ExpenseForm budgets={data.budgets} />
                </div>

                <h2>Existing Budgets</h2>

                <div className="budgets">
                  {data.budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>

                {data.expenses && data.expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>

                    <Table
                      expenses={data.expenses
                        .sort(
                          (expense1, expense2) =>
                            expense2.createdAt - expense1.createdAt
                        )
                        .slice(0, 8)}
                    />

                    {data.expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        View All Expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Unlock financial freedom with smart budgeting.</p>

                <p>Get started by creating your first budget!</p>

                <BudgetForm />
              </div>
            )}
          </div>
        </article>
      ) : (
        <SignUp />
      )}
    </>
  );
};

export default Dashboard;
