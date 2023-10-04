// react imports
import { useEffect, useRef } from "react";

// rrd imports
import { Form, useFetcher } from "react-router-dom"

// library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/outline"

const AddBudgetForm = () => {
    // write to table budgets
    // function handleSubmit(event) {
    //     event.preventDefault();
    //     axios.post("http://localhost:8081/budgets", {name, amount})
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));
    // }

    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting"

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if(!isSubmitting){
            // clear form
            formRef.current.reset()
            // reset focus to first field
            focusRef.current.focus()
        }
    }, [isSubmitting])

// create budget
  return (
    <div className="form-wrapper">
        <h2 className="h3">
            Create budget
        </h2>
        <fetcher.Form
            method="post"
            className="grid-sm"
            ref={formRef}
            // onSubmit={handleSubmit}
        >
            <div className="grid-xs">
                <label htmlFor="newBudget">Budget Name</label>
                <input
                type="text"
                name="newBudget"
                id="newBudget"
                placeholder="e.g. Housing"
                required
                ref={focusRef}
                onChange={e => setBudgetName(e.target.value)}
                />
            </div>
            <div className="grid-xs">
                <label htmlFor="newBudgetAmount">Amount</label>
                <input
                type="number"
                step="0.01"
                name="newBudgetAmount"
                placeholder="e.g. R 720"
                required
                inputMode="decimal"
                onChange={e => setBudgetAmount(e.target.value)}
                />
            </div>
            <input type="hidden" name="_action" value="createBudget"/>
            <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                {
                    // disable form submission
                    isSubmitting ? <span>Creating budget...</span> : (
                        <>
                            <span>Create Budget</span>
                            <CurrencyDollarIcon width={20} />
                        </>
                    )
                }
            </button>
        </fetcher.Form>
    </div>
  )
}

export default AddBudgetForm