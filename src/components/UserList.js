//  React
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  table: {
    minWidth: 500,
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

        <MaterialTable className={classes.table}
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Description', field: 'description' },            
          ]}
          data={[
            { name: 'testing', description: 'Testing user'},
            { name: 'testing2', description: 'Another test user'}
          ]}
          title=""
          options={{
            columnsButton: true,
            exportButton: true,
            selection: true,
          }}
        />
    </div>
  );
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
