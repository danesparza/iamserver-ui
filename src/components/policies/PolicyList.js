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
import PolicyStore from '../../stores/PolicyStore';

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
  { id: 'sid', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'effect', numeric: false, disablePadding: false, label: 'Effect' },
  { id: 'created', numeric: false, disablePadding: false, label: 'Created' },
  { id: 'created_by', numeric: false, disablePadding: false, label: 'Created by' },
  { id: 'roles', numeric: false, disablePadding: false, label: 'Roles' },
  { id: 'users', numeric: false, disablePadding: false, label: 'Users' },
  { id: 'groups', numeric: false, disablePadding: false, label: 'Groups' },
];

class PolicyList extends Component {  

  constructor(){
    super();

    //  Set the initial state:
    this.state = {
      Policies: PolicyStore.getAllPolicies(),
    }
  }

  componentDidMount(){
    //  Add store listeners ... and notify ME of changes
    this.policylistener = PolicyStore.addListener(this._onChange);        
  }

  componentWillUnmount() {
    //  Remove store listeners
    this.policylistener.remove();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container className={classes.root} justify="space-between">    
          
          <Grid item>
            <Button href="#/policy/" size="small" variant="contained" color="primary" className={classes.button}>
              Add policy
            </Button>            
          </Grid>

          <Grid item>
            <IconButton className={classes.button} aria-label="Refresh" onClick={this._onRefresh}>
              <Refresh />
            </IconButton>
          </Grid>            
        </Grid>

        <FilteredTable cols={cols} data={this.state.Policies} keyname={"sid"} singletype="policy" multitype="policies" />        
      
      </div>
    );
  }

  //  Data changed:
  _onChange = () => {
    this.setState({
      Policies: PolicyStore.getAllPolicies(),
    });
  }

  //  Refresh policy list:
  _onRefresh = () => {
    APIUtils.getPolicies();
  }

}

PolicyList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PolicyList);
