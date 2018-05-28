import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE
} from './constants'
import getPeople from './api'

export function getData() {
  return {
    type: FETCHING_DATA
  }
}

export function getDataSuccess(data) {
  console.log("getDataSuccess : ")
  return {
    type: FETCHING_DATA_SUCCESS,
    data,
  }
}

export function getDataFailure() {
  return {
    type: FETCHING_DATA_FAILURE
  }
}


export function fetchData(string) {
  console.log("string : ", string)

  return (dispatch) => {
    dispatch(getData())
    getPeople().then((response) => response.json())
      .then((data) => {
        console.log("data : ", data)
        dispatch(getDataSuccess(data));
      })
      .catch((err) => console.log('err:', err))
  }
}