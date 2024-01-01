import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuIcon from "@mui/icons-material/Menu";
import { WithStyles, createStyles, withStyles } from "@mui/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import React from "react";
const styles = () => {
  return createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      height: "fit-content",
      alignItems: "center",
      padding: "0.5rem",
    },
    navButton: {
      paddingLeft: "4px",
    },
    search: {
      width: "70%",
    },
    searchbar: {
      width: "100%",
    },
  });
};

interface HeaderProp extends WithStyles<typeof styles> {
  toggleNav: () => void;
  toggleTrend: () => void;
  onSearch: (search: string) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

function Header({ classes, toggleNav, toggleTrend, onSearch, theme, setTheme }: HeaderProp) {
  const [search, setSearch] = React.useState("");
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.navButton}>
          <Button onClick={(e) => toggleNav()} variant="text">
            <MenuIcon />
          </Button>
        </div>
        <div className={classes.search}>
          <TextField
            className={classes.searchbar}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={e => {
                if (e.key === "Enter"){
                    onSearch(search);
                }
            }}
            placeholder="Search"
          />
        </div>
        <div>
          <Tooltip title="Login to Berea">
            <Button>
              <LoginIcon />
            </Button>
          </Tooltip>
        </div>
        {/* <div>
          <Button onClick={(e) => toggleTrend()}>
            <TrendingUpIcon />
          </Button>
        </div> */}
        <div>
          <Button onClick={(e) => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <DarkModeIcon />
          </Button>
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default withStyles(styles)(Header);
