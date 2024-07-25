// Custom wait function
export const wait = () =>
  new Promise((resolve, reject) => setTimeout(resolve, Math.random() * 800));

// FORMATTING

// Format percentages
export const formatPercentage = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// Format currency
export const formatCurrency = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};

// Title casing
export const toTitleCase = (str) => {
  let newStr = "";
  let isUpper = true;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      isUpper = true;
      newStr += str[i];
      continue;
    }

    newStr += isUpper ? str[i].toUpperCase() : str[i].toLowerCase();
    isUpper = false;
  }

  return newStr;
};

// Format dates
export const formatDate = (timestamp) =>
  new Date(timestamp).toLocaleDateString();

// LOCAL STORAGE RELATED HELPER FUNCTIONS

// Get an item
export const fetchData = (key) => JSON.parse(localStorage.getItem(key));

// Get a hsl color value based on current budget-count
const getRandomColor = () => {
  const existingBudgetCount = fetchData("budgets")?.length ?? 0;

  return `${existingBudgetCount * 34} 65% 50%`;
};

// Get all matching items
export const findItemsByMatchingId = ({ dataKey, id, value }) => {
  const items = fetchData(dataKey) ?? [];

  return items.filter((item) => item[id] === value);
};

// Create a new budget
export const createBudget = ({ name, amount }) => {
  const newBudget = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    name,
    amount: Number(amount),
    color: getRandomColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];

  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newBudget])
  );
};

// Create a new expense
export const createExpense = ({ desc, cost, budgetId }) => {
  const newExpense = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    desc,
    cost: Number(cost),
    budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];

  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newExpense])
  );
};

// Delete an item
export const deleteItem = ({ dataKey, id }) => {
  const existingData = fetchData(dataKey);

  if (id) {
    const newData = existingData.filter((item) => item.id !== id);

    return localStorage.setItem(dataKey, JSON.stringify(newData));
  }

  return localStorage.removeItem(dataKey);
};

// Calculate the total amount spent in a specific budget category
export const calcTotalSpent = (budgetId) => {
  const allExpenses = fetchData("expenses") ?? [];

  // Calculate the total amount spent for the given budgetId
  const totalSpent = allExpenses.reduce((accumulator, expense) => {
    if (expense.budgetId !== budgetId) return accumulator;

    return (accumulator += expense.cost);
  }, 0);

  return totalSpent;
};
