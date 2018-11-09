//  React
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//  Stores
import OverviewStore from '../stores/OverviewStore';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class Overview extends Component {

  constructor(){
    super();

    //  Set the initial state:
    this.state = {
      Uptime: OverviewStore.getUptime(),
      Overview: OverviewStore.getOverview(),
    }
  }

  componentDidMount(){    
      //  Add store listeners ... and notify ME of changes
      this.overviewListener = OverviewStore.addListener(this._onChange);
  }

  componentWillUnmount() {
      //  Remove store listeners
      this.overviewListener.remove();
  }

  render() {

    const { classes } = this.props;

    //  If we don't have overview information yet, indicate we're trying to load it
    if (this.state.Overview === null) {
      return (<div>Loading...</div>);
    } 

    return (      
      <div>
          <Typography variant="h4" gutterBottom component="h2">
            Overview
          </Typography>                    
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography>
                Overview info.
              </Typography>            
            </Grid>          
            <Grid item xs={6}>
              <Typography>                
                <div>
                  <Button href="#/groups/" className={classes.button}>
                    Groups: {this.state.Overview.GroupCount}
                  </Button>
                </div>
                <div>
                  <Button href="#/users/" className={classes.button}>
                    Users: {this.state.Overview.UserCount}
                  </Button>
                </div>                
                <div>
                  <Button href="#/policies/" className={classes.button}>
                    Policies: {this.state.Overview.PolicyCount}
                  </Button>
                </div>              
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <div>
                  <Button href="#/roles/" className={classes.button}>
                    Roles: {this.state.Overview.RoleCount}
                  </Button>
                </div>
                <div>
                  <Button href="#/resources/" className={classes.button}>
                    Resources: {this.state.Overview.ResourceCount}
                  </Button>                  
                </div>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Uptime: {this.state.Uptime}
              </Typography>
            </Grid>   
          </Grid>
      </div>
    );
  }

  //  Data changed:
  _onChange = () => {
    this.setState({
      Uptime: OverviewStore.getUptime(),
      Overview: OverviewStore.getOverview(),
    });
  }

}

Overview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Overview);
