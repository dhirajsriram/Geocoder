import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

const sideList = props => (
    <div
      className={props.classes.list}
      role="presentation"
      onClick={props.toggleDrawer(props.side, false)}
      onKeyDown={props.toggleDrawer(props.side, false)}
    >
      <List>
          <ListItem button>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
      </List>
      <Divider />
      <Divider />  
      <List>
           <a className="default-text" href={"https://github.com/dhirajsriram/Geocoder"}>
          <ListItem button>
            <ListItemIcon><InfoIcon/></ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>
          </a>
      </List>
    </div>
  );

export default sideList;