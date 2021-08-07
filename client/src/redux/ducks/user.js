// Actions
const LOAD = 'app/user/LOAD' 

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    // do reducer stuff
    default: return state 
  }
}

// Reducer
export default reducer 

// Action Creators
export const loadUser = () => {
  return { type: LOAD } 
}

// Selectors
export const selectUser = (state) => {
  return state.user
}
