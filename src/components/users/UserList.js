//  React
import React, { Component } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';
import Grid from '@material-ui/core/Grid';

//  Components
import FilteredTable from '../FilteredTable';

//  Stores
import UserStore from '../../stores/UserStore';

//  Component style
const styles = theme => ({
  root: {
    flexGrow: 1,
  },  
  button: {
    margin: theme.spacing.unit,
  },
});

//  Column definitions
const cols = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'created', numeric: false, disablePadding: false, label: 'Created' },
  { id: 'created_by', numeric: false, disablePadding: false, label: 'Created by' },
  { id: 'groups', numeric: false, disablePadding: false, label: 'Groups' },
  { id: 'totpenabled', numeric: false, disablePadding: false, label: 'MFA enabled' },
];

class UserList extends Component {  

  constructor(){
    super();

    //  Set the initial state:
    this.state = {
      Users: UserStore.getAllUsers(),
    }
  }

  componentDidMount(){
    //  Add store listeners ... and notify ME of changes
    this.userlistener = UserStore.addListener(this._onChange);        
  }

  componentWillUnmount() {
    //  Remove store listeners
    this.userlistener.remove();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container className={classes.root} justify="space-between">    
          
          <Grid item>
            <Button size="small" variant="contained" color="primary" className={classes.button}>
              Add user
            </Button>
            <Button size="small" variant="contained" color="secondary" className={classNames(classes.button, classes.start )}>
              Delete user
            </Button>
          </Grid>

          <Grid item>
            <IconButton className={classes.button} aria-label="Refresh">
              <Refresh />
            </IconButton>
          </Grid>            
        </Grid>

        <FilteredTable cols={cols} data={this.state.Users} keyname={"name"} singletype="user" multitype="users" />        
      
      </div>
    );
  }

  //  Data changed:
  _onChange = () => {
    this.setState({
      Users: UserStore.getAllUsers(),
    });
  }

}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
