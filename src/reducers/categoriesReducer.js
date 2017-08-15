export default function categoriesReducer(state=[], action) {
  switch (action.type) {
    case "LOAD_CATEGORIES":
      return [...action.payload]
    default:
      return state
  }
}
