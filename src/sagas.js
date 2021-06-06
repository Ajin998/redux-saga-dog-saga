import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";

//watcher saga: when action dispatched to the store, starts with worker saga

export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

//function that makes the api request and returns the promise
function fetchDog() {
  return axios({
    method: "get",
    url: "https://dog.ceo/api/breeds/image/random",
  });
}

//worker saga: makes api call when watcher saga see the action
function* workerSaga() {
  try {
    const response = yield call(fetchDog);
    const dog = response.data.message;

    //dispatch a success action to the store with the new dog
    yield put({ type: "API_CALL_SUCCESS", dog });
  } catch (err) {
    //dispatch a failure action to the store with error
    yield put({ type: "API_CALL_FAILURE", err });
  }
}
