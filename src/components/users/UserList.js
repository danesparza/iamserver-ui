//  React
import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import FilteredTable from '../FilteredTable';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }, 
});

function UserList(props){

  const { classes } = props;

  return (
    <div>
        <Button size="small" variant="contained" color="primary" className={classes.button}>
          Add user
        </Button>
        <Button size="small" variant="contained" color="secondary" className={classes.button}>
          Delete user
        </Button>

        <FilteredTable />
    </div>
  );
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
