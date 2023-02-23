import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistore } from "./store";
import { IoProvider } from "./store/Io";

import App from "./App";
import "./styles/global.scss";
import "./styles/swiper.scss";
import "./styles/draft.scss";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/linkify/lib/plugin.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistore}>
      <IoProvider>
        <App />
      </IoProvider>
    </PersistGate>
  </Provider>
);
