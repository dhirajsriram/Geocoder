import React  from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "./Drawer";

const Menubar = (props => {
  const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    typeTheme: {
      color: "white"
    }
  }));
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Drawer />
          <Typography className={classes.title}>
              <img
                src={require("../../assets/Geocoder.png")}
                alt="logo"
                className="geocoder-logo"
                width="100"
              />
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
});

export default Menubar;
