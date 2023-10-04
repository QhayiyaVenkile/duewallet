// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// helper functions
import { createBudget, createExpense, deleteItem, fetchData, newUser, waait } from "../helpers"

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// library imports
import { toast } from "react-toastify";

//loader
export function dashboardLoader(){
    const users = fetchData("users");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return { users, budgets, expenses };
    
}

// action
export async function dashboardAction({ request }){
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data)

    if (_action === "newUser") {
        // new user submission
        try {
            newUser({
            userName: values.userName,
            email: values.newEmail,
            password: values.newPassword,
            });
            return toast.success(`Welcome, ${values.userName}`)
        }
        catch (e) {
            throw new Error("There was a problem creating your account.")
        }
    }

    if (_action === "createBudget") {
        try {
            // create budget
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount,

            })
            return toast.success("Budget successfully created.")
        }
        catch (e) {
            throw new Error("There was a problem creating your budget.")
        }
    }

    if (_action === "createExpense") {
        try {
            // create expense
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Expense ${values.newExpense} successfully created.`)
        }
        catch (e) {
            throw new Error("There was a problem creating your Expense.")
        }
    }

    if (_action === "deleteExpense") {
        try {
            // delete expense
            await deleteItem({
                key: "expenses",
                id: values.expenseId
            })
            return toast.success("Expense successfully deleted.")
        }
        catch (e) {
            throw new Error("There was a problem deleting your Expense.")
        }
    }
}

// main page
const Dashboard = () => {
    const { users, budgets, expenses } = useLoaderData()

  return (
    <>
        {users ? (
            <div className="dashboard">
                <h2>Welcome back, <span className="accent">
                    {users[0].userName}
                </span>
                </h2>
                <div className="grid-sm">
                    {
                        // different main page layout on condition
                        budgets && budgets.length > 0
                        ? (
                            <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetForm />
                                    <AddExpenseForm budgets={budgets} />
                                </div>
                                <h2>Existing Budgets</h2>
                                <div className="budgets">
                                    {
                                        budgets.map((budget) => (
                                            <BudgetItem key={budget.id} budget={budget}/>
                                        ))
                                    }
                                </div>
                                {
                                    // show expenses on condition
                                    expenses && expenses.length > 0 && (
                                        <div className="grid-md">
                                            <h2>Recent Expenses</h2>
                                            <Table expenses=
                                            {expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)}/>
                                            {expenses.length > 8 && (
                                                <Link
                                                to="expenses"
                                                className="btn btn--dark"
                                                >
                                                View all expenses</Link>
                                            )}
                                        </div>
                                    )
                                }
                            </div>
                        )
                        : (
                            <div className="grid-sm">
                                <p>Secure your financial future today.</p>
                                <p>Create a budget to get started!</p>
                                <AddBudgetForm />
                            </div>
                        )
                    }
                </div>
            </div>
        ) : <Intro />}
    </>
  )
}

export default Dashboard