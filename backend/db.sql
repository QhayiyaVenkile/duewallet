CREATE DATABASE duewallet;
USE duewallet;

CREATE TABLE users (
    "UserID" VARCHAR(36) PRIMARY KEY NOT NULL,
    "UserName" VARCHAR(64) NOT NULL,
    "Email" VARCHAR(254) NOT NULL,
    "Password" VARCHAR(255) NOT NULL,
    "CreatedAt" DATE NOT NULL
);

CREATE TABLE budgets (
    "BudgetID" VARCHAR(36) PRIMARY KEY NOT NULL,
    "BudgetName" VARCHAR(64) NOT NULL,
    "Allocated" DECIMAL(15, 2) NOT NULL,
    "CreatedAt" DATE NOT NULL
);

CREATE TABLE expenses (
    "ExpenseID" VARCHAR(36) PRIMARY KEY NOT NULL,
    "ExpenseName" VARCHAR(64) NOT NULL,
    "Amount" DECIMAL(15, 2) NOT NULL,
    "CreatedAt" DATE NOT NULL,
    "BudgetID" VARCHAR(36) NOT NULL,
    FOREIGN KEY(BudgetID) REFERENCES budgets(BudgetID)
);