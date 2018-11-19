//  React
import React from 'react';

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

function UserList(props){

  const { classes } = props;

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

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
