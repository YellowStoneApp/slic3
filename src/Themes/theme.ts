import { createMuiTheme } from "@material-ui/core/styles";
import secondary from "@material-ui/core/colors/deepOrange";
import primary from "@material-ui/core/colors/indigo";

//const theme = createMuiTheme();
export default createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1120, //changed 960 to 1120
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    //useNextVariants: true,
    fontSize: 14,
    button: {
      textTransform: "none",
    },
    fontFamily: ["Noto Sans JP", "sans-serif"].join(","),
  },
  palette: {
    //primary: {main: primary["800"]},
    primary: primary,
    secondary: secondary,
    //secondary: {main: secondary["500"]},
  },
  props: {
    MuiTextField: {
      variant: "outlined",
    },
    MuiCheckbox: {
      color: "primary",
    },
    MuiRadio: {
      color: "primary",
    },
    MuiSwitch: {
      color: "primary",
    },
  },
});
