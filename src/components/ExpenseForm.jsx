import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

// Libraries
import { PlusCircleIcon } from "@heroicons/react/24/solid";

// Helper functions
import { toTitleCase } from "../utils";

const ExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const expenseDescRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      // Clear the form and set focus on the add new expense input element after submission
      formRef.current.reset();
      expenseDescRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <section className="form-wrapper">
      <h2 className="h3">
        Record{" "}
        <span className="accent">
          {budgets.length === 1 &&
            `${budgets.map((budget) => toTitleCase(budget.name))}`}
        </span>{" "}
        Expense
      </h2>

      {/* The following form will submit to the current page (the dashboard page) by default */}
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-sm">
            <label htmlFor="expense-description">Expense Desc.</label>

            <input
              type="text"
              name="expenseDescription"
              id="expense-description"
              placeholder="e.g., coffee"
              required
              ref={expenseDescRef}
            />
          </div>

          <div className="grid-sm">
            <label htmlFor="cost">Cost</label>

            <input
              type="number"
              name="cost"
              id="cost"
              step={0.01}
              min={0}
              inputMode="decimal"
              placeholder="e.g., ₹90.50"
              required
            />
          </div>
        </div>

        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="select-budget-category">Select Budget Category</label>

          <select
            name="selectBudgetCategory"
            id="select-budget-category"
            required
          >
            {budgets
              .sort((budget1, budget2) => budget1.createdAt - budget2.createdAt)
              .map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {toTitleCase(budget.name)}
                </option>
              ))}
          </select>
        </div>

        <input type="hidden" name="_action" value="recordExpense" />

        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Add Expense</span>

              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </section>
  );
};

export default ExpenseForm;
