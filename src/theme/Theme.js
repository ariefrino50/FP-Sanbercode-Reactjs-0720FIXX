import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffa64d",
      main: "#ff8c1a",
      dark: "#e67300",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f9cf5c",
      main: "#dead27",
      dark: "#a27804",
      contrastText: "#000",
    },
  },
});

export default theme;
