//  React
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';
import Grid from '@material-ui/core/Grid';

//  Components
import FilteredTable from '../FilteredTable';

//  Stores
import RoleStore from '../../stores/RoleStore';

//  Utils
import APIUtils from '../../utils/APIUtils';

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
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'created', numeric: false, disablePadding: false, label: 'Created' },
  { id: 'created_by', numeric: false, disablePadding: false, label: 'Created by' },
  { id: 'roles', numeric: false, disablePadding: false, label: 'Roles' },
  { id: 'users', numeric: false, disablePadding: false, label: 'Users' },
];

class RoleList extends Component {  

  constructor(){
    super();

    //  Set the initial state:
    this.state = {
      Roles: RoleStore.getAllRoles(),
    }
  }

  componentDidMount(){
    //  Add store listeners ... and notify ME of changes
    this.rolelistener = RoleStore.addListener(this._onChange);        
  }

  componentWillUnmount() {
    //  Remove store listeners
    this.rolelistener.remove();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container className={classes.root} justify="space-between">    
          
          <Grid item>
            <Button href="#/role/" size="small" variant="contained" color="primary" className={classes.button}>
              Add role
            </Button>            
          </Grid>

          <Grid item>
            <IconButton className={classes.button} aria-label="Refresh" onClick={this._onRefresh}>
              <Refresh />
            </IconButton>
          </Grid>            
        </Grid>

        <FilteredTable cols={cols} data={this.state.Roles} keyname={"name"} singletype="role" multitype="roles" />        
      
      </div>
    );
  }

  //  Data changed:
  _onChange = () => {
    this.setState({
      Roles: RoleStore.getAllRoles(),
    });
  }

  //  Refresh user list:
  _onRefresh = () => {
    APIUtils.getRoles();
  }

}

RoleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoleList);
