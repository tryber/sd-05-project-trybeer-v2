import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;
const num = [0,1,2,3];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(num[2]),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: num[0],
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(num[0], num[1]),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: num[1],
    padding: theme.spacing(num[3]),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  grow: {
    flexGrow: 1,
  },
  icons: {
    fontSize: 40,
    marginRight: 10,
  },
  logo: {
    width: 65,
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={ classes.root }>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={ clsx(classes.appBar, {
          [classes.appBarShift]: open,
        }) }
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ handleDrawerOpen }
            edge="start"
            className={ clsx(classes.menuButton, open && classes.hide) }
          >
            <MenuIcon />
          </IconButton>
          { props.icon === 'inbox' ? (
            <InboxIcon className={ classes.icons } />
          ) : (
            <FaceIcon className={ classes.icons } />
          ) }
          <Typography variant="h4" noWrap>
            { props.title }
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={ classes.drawerHeader }>
          <img className={ classes.logo } src="../uai2.png" alt="logo" />
          <div className={ classes.grow }></div>
          <IconButton onClick={ handleDrawerClose }>
            { theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button data-testid="side-menu-item-orders" component={ Link } to="/admin/orders">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Pedidos" />
          </ListItem>
          <ListItem
            button
            data-testid="side-menu-item-profile"
            component={ Link }
            to="/admin/profile"
          >
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Mensagens" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            data-testid="side-menu-item-logout"
            onClick={ () => localStorage.removeItem('token') }
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
