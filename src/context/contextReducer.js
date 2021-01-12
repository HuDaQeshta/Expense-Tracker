const contextReducer = (state, action) => {
  const { type, payload } = action;
  let transactions;
  switch (type) {
    case "DELETE_TRANSACTION":
      transactions = state.filter((t) => t.id !== payload);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      return transactions;

    case "ADD_TRANSACTION":
      transactions = [payload, ...state];
      localStorage.setItem("transactions", JSON.stringify(transactions));
      return transactions;

    default:
      return state;
  }
};

export default contextReducer;
