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
import ResourceStore from '../../stores/ResourceStore';

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
  { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
];

class ResourceList extends Component {  

  constructor(){
    super();

    //  Set the initial state:
    this.state = {
      Resources: ResourceStore.getAllResources(),
    }
  }

  componentDidMount(){
    //  Add store listeners ... and notify ME of changes
    this.resourcelistener = ResourceStore.addListener(this._onChange);        
  }

  componentWillUnmount() {
    //  Remove store listeners
    this.resourcelistener.remove();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container className={classes.root} justify="space-between">    
          
          <Grid item>
            <Button href="#/resource/" size="small" variant="contained" color="primary" className={classes.button}>
              Add resource
            </Button>            
          </Grid>

          <Grid item>
            <IconButton className={classes.button} aria-label="Refresh" onClick={this._onRefresh}>
              <Refresh />
            </IconButton>
          </Grid>            
        </Grid>

        <FilteredTable cols={cols} data={this.state.Resources} keyname={"name"} singletype="resource" multitype="resources" />        
      
      </div>
    );
  }

  //  Data changed:
  _onChange = () => {
    this.setState({
      Resources: ResourceStore.getAllResources(),
    });
  }

  //  Refresh resource list:
  _onRefresh = () => {
    APIUtils.getResources();
  }

}

ResourceList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResourceList);
