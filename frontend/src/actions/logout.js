// rrd imports
import { redirect } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "../helpers";

export async function logoutAction(){
    // delete the user
    deleteItem({
        key: "users"
    })
    deleteItem({
        key: "budgets"
    })
    deleteItem({
        key: "expenses"
    })
    toast.success("Account has been successfully deleted.")
    // return redirect
    return redirect("/")
}