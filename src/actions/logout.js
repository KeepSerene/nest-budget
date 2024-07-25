import { deleteItem } from "../utils";
import { redirect } from "react-router-dom";

// Libraries
import { toast } from "react-toastify";

export const logoutAction = async () => {
  // Delete the username
  deleteItem({
    dataKey: "username",
  });

  // Delete the budgets
  deleteItem({
    dataKey: "budgets",
  });

  // Delete the expenses
  deleteItem({
    dataKey: "expenses",
  });

  // Initiate a toast notification
  toast.success("You've successfully deleted your account!");

  // Redirect the user
  return redirect("/");
};
