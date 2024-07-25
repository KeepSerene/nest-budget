import { Link, useFetcher } from "react-router-dom";

// Libraries
import { TrashIcon } from "@heroicons/react/24/solid";

// Helper functions
import {
  findItemsByMatchingId,
  formatCurrency,
  formatDate,
  toTitleCase,
} from "../utils";

const ExpenseItem = ({ expense, shouldShowBudgetCol }) => {
  // "filterItemsByMatchingId" returns an array, so indexing is necessary to get the required element
  const parentBudget = findItemsByMatchingId({
    dataKey: "budgets",
    id: "id",
    value: expense.budgetId,
  })[0];

  const fetcher = useFetcher();

  return (
    <>
      <td>{toTitleCase(expense.desc)}</td>

      <td>{formatCurrency(expense.cost)}</td>

      <td>{formatDate(expense.createdAt)}</td>

      {shouldShowBudgetCol && (
        <td>
          <Link
            to={`/budget/${parentBudget.id}`}
            style={{ "--accent": parentBudget.color }}
          >
            {parentBudget.name.length > 10
              ? `${toTitleCase(parentBudget.name).slice(0, 7)}...`
              : toTitleCase(parentBudget.name)}
          </Link>
        </td>
      )}

      <td>
        {/* The following form will submit to the current page (the dashboard page, the all expenses page, or the budget page) by default */}
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />

          <input type="hidden" name="expenseDesc" value={expense.desc} />

          <input type="hidden" name="expenseId" value={expense.id} />

          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.desc.toLowerCase()}'s expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
