import "./App.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import countrySetReducer from "./data/countrySet";
import gameControllerReducer from "./data/gameController";
import Header from "./components/Bars/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Bars/Footer";

const store = configureStore({
  reducer: {
    countrySet: countrySetReducer,
    gameController: gameControllerReducer,
  },
});

function App() {
  return (
    <div className="page">
      <Provider store={store}>
        <Header />
        <Body />
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
