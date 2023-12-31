// rrd imports
import { redirect } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// helper functions
import { deleteItem, getAllMatchingItems } from "../helpers";

export function deleteBudget({params}) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id,
        });

        const associatedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id,
        })

        associatedExpenses.forEach((expense) => {
            deleteItem({
                key: "expenses",
                id: expense.id,
            })
        })

        toast.success("Budget successfully deleted.")
    } catch(e) {
        throw new Error("There was a problem deleting your budget.")
    }

    return redirect("/") // return to homepage
}