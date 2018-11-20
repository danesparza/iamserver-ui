//  React
import React, { Component } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';
import Grid from '@material-ui/core/Grid';

import FilteredTable from '../FilteredTable';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },  
  button: {
    margin: theme.spacing.unit,
  },
});

class UserList extends Component {  

  componentDidMount(){    
    console.log("Fetching users ... ");
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

        <FilteredTable />        
      
      </div>
    );
  }

}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
