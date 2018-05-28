import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
  CHANGE_SEARCH_STRING
} from '../constants'
const initialState = {
  searchText: "",
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function dataReducer(state = initialState, action) {
  console.log("action : ", action)
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      }
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case CHANGE_SEARCH_STRING:
      return {
        ...state,
        searchText: action.text
      }

    default:
      return state
  }
}
