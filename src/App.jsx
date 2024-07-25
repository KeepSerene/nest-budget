import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Libraries
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import RootLayout, { rootLayoutLoader } from "./layouts/RootLayout";

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Budget, { budgetAction, budgetLoader } from "./pages/Budget";
import Expenses, { expensesAction, expensesLoader } from "./pages/Expenses";
import Error from "./pages/Error";

// Actions
import { logoutAction } from "./actions/logout";
import { deleteBudgetAction } from "./actions/deleteBudget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: rootLayoutLoader,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },

      {
        path: "budget/:budgetId",
        element: <Budget />,
        loader: budgetLoader,
        action: budgetAction,

        children: [
          {
            path: "delete",
            action: deleteBudgetAction,
          },
        ],

        errorElement: <Error />,
      },

      {
        path: "expenses",
        element: <Expenses />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },

      {
        path: "logout",
        action: logoutAction,
      },
    ],
    errorElement: <Error />,
  },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />

      <ToastContainer />
    </div>
  );
};

export default App;
