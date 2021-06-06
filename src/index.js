import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { composeWithDevTools } from "remote-redux-devtools";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { reducer } from "./redux";
import { watcherSaga } from "./sagas";

//create saga Middleware
const sagaMiddleware = createSagaMiddleware();

//dev tools middleware
const composeEnhancer = composeWithDevTools({ realtime: true, port: 3000 });

// create a redux store with our reducer above and middleware
let store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

//run the saga
sagaMiddleware.run(watcherSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
