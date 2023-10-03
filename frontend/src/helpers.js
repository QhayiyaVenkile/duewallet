// slowing submitting function (local storage)
export const waait = () => new Promise(res => setTimeout (res, Math.random() * 2000))


// generate random color
const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.
    length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

// local storage functions
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// delete item from local storge
export const deleteItem = ({key, id}) => {
    const existingData = fetchData(key);
    if (id){
        const newData = existingData.filter((item) => item.id !== id)
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}

// get all items from local storage
export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value)
}

// create user
export const newUser = ({ userName, email, password }) => {
    const newItem = {
        id: crypto.randomUUID(),
        userName: userName,
        email: email,
        password: password,
        createdAt: Date.now(),
    }
    const existingUsers = fetchData("users") ?? [];
    return localStorage.setItem("users", JSON.stringify([...existingUsers, newItem]))
}

// create budget
export const createBudget = ({
    name, amount
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount, //+ to convert to number
        color: generateRandomColor()
    }
    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

// create expense
export const createExpense = ({
    name, amount, budgetId
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount, //+ to convert to number
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        // expense id === budget id check
        if (expense.budgetId !== budgetId) return acc

        // add current amount to total
        return acc += expense.amount
    }, 0)
    return budgetSpent;
}


// FORMATTING

// format date
export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

// format percentages
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}

// format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString("en-ZA", {
        style: "currency",
        currency: "ZAR"
    }) //undefined uses locale of whoever visiting the site
}