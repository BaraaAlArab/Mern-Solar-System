import {createRoot} from "react-dom/client";
import {store, persistor} from "../redux/store.js";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
