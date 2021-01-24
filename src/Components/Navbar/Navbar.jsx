import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { setFileListFilter, enterToPreviousDirectoryByIndex } from '../../Actions/Actions.js';
import BreadcrumbText from '../Breadcrumb/BreadcrumbText.jsx';
import { enterToPreviousDirectory } from '../../Actions/Actions.js';

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: '8.3em'
  },
  logo: {
    maxWidth: 160,
    height: 64,
  },
  container: {
    display: 'flex',
    marginBottom: 10,
  },
  logoDiv: {
    width: '100%',
    height: 64
  },
  toolbar: {
    backgroundColor: '#592852',
    display: 'block',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'block', // was none
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },

   float:'left',
   clear: 'left',
   color: '#ffbe59',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
      display: 'block'
    },
    color: '#ffbe59',
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 100,
      '&:focus': {
        width: 200,
      },
    },
  },
});

function SearchAppBar(props) {
  const { classes, path, handleClickPath, handleGoBack, canGoBack } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className= { classes.toolbar}>
          <div className={classes.logoDiv}>
            <img src="https://lizardfs.com/wp-content/themes/understrap-master/img/logo-white.svg" alt="logo"  className={classes.logo} />
          </div>
          <div className = { classes.container}>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              <BreadcrumbText 
                  path={path} 
                  handleClickPath={handleClickPath} 
                  handleGoBack={handleGoBack}
                  canGoBack={canGoBack}
                  rootTitle="LizardFS manager"
              />
            </Typography>
            <div className={classes.grow} />

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                value={props.value}
                onChange={props.handleChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </div>
         
        </Toolbar>
      </AppBar>
    </div>
  );
}

SearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        value: state.fileListFilter || '',
        path: state.path,
        canGoBack: state.path.length
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (event) => {
            dispatch(setFileListFilter(event.currentTarget.value));
        },
        handleGoBack: (event) => {
            dispatch(enterToPreviousDirectory());
        },
        /**
         * @param {Object} event
         * @param {Number} index
         * @param {Array} path
         * @returns {undefined}
         */        
        handleClickPath: (event, index) => {
            dispatch(enterToPreviousDirectoryByIndex(index));
            event.preventDefault();
        }
    };
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchAppBar));
