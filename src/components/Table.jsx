// Components
import ExpenseItem from "./ExpenseItem";

const Table = ({ expenses, shouldShowBudgetCol = true }) => {
  return (
    <section className="table">
      <table>
        <thead>
          <tr>
            {[
              "Description",
              "Cost",
              "Date",
              shouldShowBudgetCol ? "Budget" : "Remove",
              shouldShowBudgetCol ? "Remove" : "",
            ].map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem
                expense={expense}
                shouldShowBudgetCol={shouldShowBudgetCol}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
