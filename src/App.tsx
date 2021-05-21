import * as React from "react";

/** Components */
import AppRouter from "./Navigation/Routes";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ErrorPopup from "./Components/ErrorPopup";

const App: React.FC = () => {
  return (
    <>
      <Header />
      {/* <Footer /> */}
      {/* <!-- Error Menu --> */}
      <ErrorPopup />
      <AppRouter />
    </>
  );
};

export default App;
