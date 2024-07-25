import { useFetcher } from "react-router-dom";
import { useEffect, useRef } from "react";

// Libraries
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";

const BudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const budgetCategoryNameRef = useRef();

  // Reset the form and focus the budget name input element after submission
  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      budgetCategoryNameRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <section className="form-wrapper">
      <h2 className="h3">Add New Budget</h2>

      {/* The following form will submit to the current page (the dashboard page) by default */}
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-sm">
          <label htmlFor="budget-category-name">Budget Category Name</label>

          <input
            type="text"
            name="budgetCategoryName"
            id="budget-category-name"
            placeholder="e.g., groceries"
            required
            ref={budgetCategoryNameRef}
          />
        </div>

        <div className="grid-xs">
          <label htmlFor="total-budget-amount">Total Budget Amount</label>

          <input
            type="number"
            name="totalBudgetAmount"
            id="total-budget-amount"
            placeholder="e.g., ₹1000"
            step={0.01}
            min={0}
            inputMode="decimal"
            required
          />
        </div>

        <input type="hidden" name="_action" value="budgetCategory" />

        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Add Budget</span>

              <CurrencyRupeeIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </section>
  );
};

export default BudgetForm;
