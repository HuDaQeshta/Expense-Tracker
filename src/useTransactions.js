//This is a custome Hook to get The specific transactions and make some calculations, then prepare the data to be used to show the charts of expense and income.
//The name starts with use because all React hooks start with the use Keyword.

import { useContext } from "react";
import { ExpenseTrackerContext } from "./context/context";
import {
  incomeCategories,
  expenseCategories,
  resetCategories,
} from "./constants/categories";

const useTransactions = (title) => {
  //First step is to set the amount of each specific category to 0
  resetCategories();
  const { transactions } = useContext(ExpenseTrackerContext);
  //Now filter out the transactions of the specified type, whether it's income or expense, based on the based title.
  const transactionsPerType = transactions.filter((t) => t.type === title);
  //Sum the amount of each transaction of the transactionsPerType.
  const total = transactionsPerType.reduce(
    (acc, currVal) => (acc += currVal.amount),
    0
  );
  const categories = title === "Income" ? incomeCategories : expenseCategories;

  transactionsPerType.forEach((t) => {
    //find the category of each transaction and increase the amount of transaction's category with the transaction's amount.
    const category = categories.find((c) => c.type === t.category);
    if (category) {
      category.amount += t.amount;
    }
  });
  //Filter out the categories with 0 or less amount; since charts only need the categories with amount greater than 0.
  const filteredCategories = categories.filter((c) => c.amount > 0);

  //Create the chart data
  const chartData = {
    datasets: [
      {
        data: filteredCategories.map((c) => c.amount),
        backgroundColor: filteredCategories.map((c) => c.color),
      },
    ],
    labels: filteredCategories.map((c) => c.type),
  };
  return { total, chartData };
};

export default useTransactions;
