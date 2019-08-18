import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Sidelist from "./Sidelist"


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  menuItems: {
    textTransform:"capitalize",
    paddingLeft:24,
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  return (
    <div>
      <IconButton
						onClick={toggleDrawer('left', true)}
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="Open drawer"
					>
						<MenuIcon />
					</IconButton>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)} >
      <Sidelist classes={classes} toggleDrawer={toggleDrawer} side="left"></Sidelist>
      </Drawer>
    </div>
  );
}
