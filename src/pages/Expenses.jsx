import { useLoaderData } from "react-router-dom";

// Helper functions
import { deleteItem, fetchData, toTitleCase } from "../utils";

// Components
import Table from "../components/Table";

// Libraries
import { toast } from "react-toastify";

// Loader function
export const expensesLoader = async () => {
  const expenses = fetchData("expenses");

  return { expenses };
};

// Action function
export const expensesAction = async ({ request }) => {
  // Get the array of input data from forms
  const formData = await request.formData();

  // Convert the input data array to an object
  const { _action, ...values } = Object.fromEntries(formData);
  // The "_action" property is set by a hidden "input" element in each form

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

const Expenses = () => {
  const { expenses } = useLoaderData();

  return (
    <article className="grid-lg">
      <h1>All Expenses</h1>

      {expenses && expenses.length > 0 ? (
        <section className="grid-md">
          <h2>
            {expenses.length > 1
              ? `${expenses.length} Expenses Tracked`
              : "1 Expense Recorded"}
          </h2>

          <Table expenses={expenses} />
        </section>
      ) : (
        <p>No expenses to show.</p>
      )}
    </article>
  );
};

export default Expenses;
