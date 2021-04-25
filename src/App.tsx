import * as React from "react";
import { MuiThemeProvider } from "material-ui/styles";

/** Components */
import AppRouter from "./Navigation/Routes";

const App: React.FC = () => {
  return (
    <MuiThemeProvider>
      <AppRouter />
    </MuiThemeProvider>
  );
};

export default App;
