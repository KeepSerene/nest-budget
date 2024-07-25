import { redirect } from "react-router-dom";

// Helper functions
import { deleteItem, findItemsByMatchingId } from "../utils";

// Libraries
import { toast } from "react-toastify";

export const deleteBudgetAction = async ({ params }) => {
  try {
    // Delete the budget based on the given budget route
    deleteItem({
      dataKey: "budgets",
      id: params.budgetId,
    });

    // Delete the associated expenses
    const associatedExpenses = findItemsByMatchingId({
      dataKey: "expenses",
      id: "budgetId",
      value: params.budgetId,
    });

    associatedExpenses.forEach((childExpense) =>
      deleteItem({
        dataKey: "expenses",
        id: childExpense.id,
      })
    );

    // Initiate a toast notification
    toast.success("The budget was successfully deleted!");
  } catch (err) {
    throw new Error("There was a problem deleting your budget!");
  }

  // Finally, return a "response"
  return redirect("/");
};
