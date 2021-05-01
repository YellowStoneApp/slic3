import * as React from "react";

/** Components */
import AppRouter from "./Navigation/Routes";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Footer />
      <AppRouter />;
    </>
  );
};

export default App;
