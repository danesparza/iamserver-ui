//  React
import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';

import FilteredTable from '../FilteredTable';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },  
});

function UserList(props){

  const { classes } = props;

  return (
    <div className={classes.root}>    
      
      <Button size="small" variant="contained" color="primary" className={classes.button}>
        Add user
      </Button>
      <Button size="small" variant="contained" color="secondary" className={classes.button}>
        Delete user
      </Button>

      <IconButton className={classes.button} aria-label="Delete">
        <Refresh />
      </IconButton>
    
      <FilteredTable />
        
    </div>
  );
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
