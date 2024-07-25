import { useLoaderData } from "react-router-dom";

// Helper functions
import {
  createExpense,
  deleteItem,
  findItemsByMatchingId,
  toTitleCase,
} from "../utils";

// Components
import BudgetItem from "../components/BudgetItem";
import ExpenseForm from "../components/ExpenseForm";
import Table from "../components/Table";

// Libraries
import { toast } from "react-toastify";

// Loader function
export const budgetLoader = async ({ params }) => {
  const parentBudget = findItemsByMatchingId({
    dataKey: "budgets",
    id: "id",
    value: params.budgetId,
  })[0];

  const childExpenses = findItemsByMatchingId({
    dataKey: "expenses",
    id: "budgetId",
    value: params.budgetId,
  });

  if (!parentBudget)
    throw new Error("The budget you're trying to find doesn't exist!");

  return { parentBudget, childExpenses };
};

// Action function
export const budgetAction = async ({ request }) => {
  // Get the array of input data from forms
  const formData = await request.formData();

  // Convert the input data array to an object
  const { _action, ...values } = Object.fromEntries(formData);
  // The "_action" property is set by a hidden "input" element in each form

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

const Budget = () => {
  const { parentBudget, childExpenses } = useLoaderData();

  return (
    <article className="grid-lg" style={{ "--accent": parentBudget.color }}>
      <h1 className="h2">
        <span className="accent">{toTitleCase(parentBudget.name)}</span>{" "}
        Overview
      </h1>

      <section className="flex-lg">
        <BudgetItem budget={parentBudget} shouldShowDeleteBtn={true} />

        <ExpenseForm budgets={[parentBudget]} />
      </section>

      {childExpenses && childExpenses.length > 0 && (
        <section className="grid-md">
          <h2>
            <span className="accent">{toTitleCase(parentBudget.name)}</span>{" "}
            Expenses
          </h2>

          <Table expenses={childExpenses} shouldShowBudgetCol={false} />
        </section>
      )}
    </article>
  );
};

export default Budget;
