import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Approute from "./routes";
// Supports weights 300-900
import "@fontsource-variable/rubik";
import { useEffect } from "react";
import useHttp from "./hooks/http";


function App() {
  const { configureHeaders, configureInterceptors } = useHttp();

  useEffect(() => {
    configureHeaders();
    configureInterceptors();
  }, []);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Approute />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
