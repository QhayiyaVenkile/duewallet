// react imports
import { useEffect, useRef, useState } from "react"

// rrd imports
import { useFetcher } from "react-router-dom"

// library imports
import { PlusCircleIcon } from "@heroicons/react/24/outline"

const AddExpenseForm = ({budgets}) => {
    // write to table expenses
    // function handleSubmit(event) {
    //     event.preventDefault();
    //     axios.post("http://localhost:8081/expenses", {name, amount, budgetId})
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));
    // }

    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef()
    const focusRef = useRef()

    useEffect(() => {
        if(!isSubmitting) {
            // clear form
            formRef.current.reset()
            // reset focus to first field
            focusRef.current.focus()
        }
    }, [isSubmitting])

    const [selectedOption, setSelectedOption] = useState('');

// create expense
  return (
    <div className="form-wrapper">
        <h2 className="h3">Add New{" "}<span className="accent">
                {budgets.length === 1 && `${budgets.map ((budg) => budg.name)}`}
            </span>{" "}
                Expense
            </h2>
        <fetcher.Form
            method="post"
            className="grid-sm"
            ref={formRef}>
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input
                        type="text"
                        name="newExpense"
                        id="newExpense"
                        placeholder="e.g. Vegetables"
                        ref={focusRef}
                        required
                        onChange={e => setExpenseName(e.target.value)}
                        />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input
                        type="number"
                        step="0.01"
                        inputMode="decimal"
                        name="newExpenseAmount"
                        id="newExpenseAmount"
                        placeholder="e.g. R 23.99"
                        required
                        onChange={e => setExpenseAmount(e.target.value)}
                        />
                    </div>
                </div>
                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">Budget Category</label>
                    <select
                    name="newExpenseBudget"
                    id="newExpenseBudget"
                    // keeps selected budget option
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    required
                    >
                    {
                        budgets.sort((a, b) => a.createdAt - b.createdAt)
                        .map((budget) => {
                            return (
                                <option key={budget.id} value={budget.id}>{budget.name}</option>
                            )
                        })
                    }
                    </select>
                </div>
            <input type="hidden" name="_action" value="createExpense"/>
            <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                {
                    // disable form submission
                    isSubmitting ? <span>Submitting...</span> : (
                        <>
                            <span>Add Expense</span>
                            <PlusCircleIcon width={20} />
                        </>
                    )
                }
            </button>
        </fetcher.Form>
    </div>
  )
}

export default AddExpenseForm