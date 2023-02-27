import React, { useState, useEffect } from "react";
import AppProvider from "./providers/AppProvider";
import AppRoutes from "./routes/AppRoutes";
import { onlyFullHD } from "./utils/onlyFullHD";

import { Provider } from 'react-redux'
import store from "./store/store";

import "./lib/fontawesome";
import "./lib/notiflix-init";
import "./lib/bootstrap.scss";
import Notiflix from "notiflix";


function App() {
  Notiflix.Notify.init({
    position: "right-bottom",
  });
  if (window.screen.width > 600) {
    useEffect(() => onlyFullHD(), []);
  }
  // useEffect(() => onlyFullHD(), []);
  return (
    <Provider store={store}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Provider>
  );
}

export default App;
