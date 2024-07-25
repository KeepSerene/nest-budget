import { Form, Link } from "react-router-dom";

// Helper functions
import {
  calcTotalSpent,
  formatCurrency,
  formatPercentage,
  toTitleCase,
} from "../utils";

// Libraries
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

const BudgetItem = ({ budget, shouldShowDeleteBtn = false }) => {
  const { id, name, amount, color } = budget;

  const totalSpent = calcTotalSpent(id);

  return (
    <section
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{toTitleCase(name)}</h3>

        <p>{formatCurrency(amount)} Budgeted</p>
      </div>

      <progress max={amount} value={totalSpent}>
        {formatPercentage(totalSpent / amount)}
      </progress>

      <div className="progress-text">
        <small>{formatCurrency(totalSpent)} spent</small>
        <small>{formatCurrency(amount - totalSpent)} remaining</small>
      </div>

      {shouldShowDeleteBtn ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Are you sure you want to permanently delete this budget?"
                )
              )
                event.preventDefault();
            }}
          >
            <button type="submit" className="btn">
              <span>Delete Budget</span>

              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>

            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </section>
  );
};

export default BudgetItem;
