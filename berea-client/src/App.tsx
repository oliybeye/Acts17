import { createStyles, withStyles, WithStyles } from "@mui/styles";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Home from "./components/Home";
import createTheme from "@mui/material/styles/createTheme";
import {
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { getUserPreference, setUserPreference } from "./localStorage";

const styles = () => {
  return createStyles({
    root: {
      position: "absolute",
      width: "100vw",
      height: "100vh",
      display: "inline-block",
      overflow: "hidden",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  });
};

interface HomeProps extends WithStyles<typeof styles> {}

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_ENDPOINT ?? "http://localhost:4000",
  cache: new InMemoryCache(),
});

function App({ classes }: HomeProps) {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const getMode = getUserPreference("theme");
  const modePreference = getMode ? getMode : "dark";
  const [mode, setMode] = React.useState(modePreference);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode === "dark" ? "dark" : "light",
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <div className={classes.root}>
          <Home
            theme={mode === "light" ? "light" : "dark"}
            setTheme={(mode) => {
              setUserPreference("theme", mode);
              setMode(mode);
            }}
          />
        </div>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default withStyles(styles)(App);
