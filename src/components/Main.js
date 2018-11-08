import React, { Component } from 'react';
import Navigation from '../components/Navigation';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

//  Stores
import AuthStore from '../stores/AuthStore';
import OverviewStore from '../stores/OverviewStore';

//  Utils
import AuthUtils from '../utils/AuthUtils';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
});

class Main extends Component {

  constructor(){
    super();

    //  Set the initial username/password:
    this.state = {
      Token: AuthUtils.getAuthToken(),
      Uptime: OverviewStore.getUptime(),
    }
  }

  componentDidMount(){    
      //  Add store listeners ... and notify ME of changes
      this.authListener = AuthStore.addListener(this._onChange);
      this.overviewListener = OverviewStore.addListener(this._onChange);
  }

  componentWillUnmount() {
      //  Remove store listeners
      this.authListener.remove();
      this.overviewListener.remove();
  }

  render() {
    
    const { classes } = this.props;
    const { children } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}> 
          <Navigation />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {/** Start content here */}

              {children}

            {/** End content here */}
          </main>
        </div>
      </React.Fragment>
    );
  }

  //  Data changed:
  _onChange = () => {
    this.setState({
      Token: AuthUtils.getAuthToken(),
      Uptime: OverviewStore.getUptime(),
    });
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);;
