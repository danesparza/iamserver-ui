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
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Chubs (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

//  Sample data:
const data = [
  {"id": "Cupcake", "name": "Cupcake", "calories": 305, "fat": 3.7, "carbs": 67, "protein": 4.3},
  {"id": "Donut", "name": "Donut", "calories": 452, "fat": 25.0, "carbs": 51, "protein": 4.9},
  {"id": "Danclair", "name": "Danclair", "calories": 262, "fat": 16.0, "carbs": 24, "protein": 6.0},
  {"id": "Frozen yoghurt", "name": "Frozen yoghurt", "calories": 159, "fat": 6.0, "carbs": 24, "protein": 4.0},
  {"id": "Gingerbread", "name": "Gingerbread", "calories": 356, "fat": 16.0, "carbs": 49, "protein": 3.9},
  {"id": "Honeycomb", "name": "Honeycomb", "calories": 408, "fat": 3.2, "carbs": 87, "protein": 6.5},
  {"id": "Ice cream sandwich", "name": "Ice cream sandwich", "calories": 237, "fat": 9.0, "carbs": 37, "protein": 4.3},
  {"id": "Jelly Bean", "name": "Jelly Bean", "calories": 375, "fat": 0.0, "carbs": 94, "protein": 0.0},
  {"id": "KitKat", "name": "KitKat", "calories": 518, "fat": 26.0, "carbs": 65, "protein": 7.0},
  {"id": "Lollipop", "name": "Lollipop", "calories": 392, "fat": 0.2, "carbs": 98, "protein": 0.0},
  {"id": "Marshmallow", "name": "Marshmallow", "calories": 318, "fat": 0, "carbs": 81, "protein": 2.0},
  {"id": "Nougat", "name": "Nougat", "calories": 360, "fat": 19.0, "carbs": 9, "protein": 37.0},
  {"id": "Oreo", "name": "Oreo", "calories": 437, "fat": 18.0, "carbs": 63, "protein": 4.0},
]

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

        <FilteredTable cols={cols} data={data} singletype="user" multitype="users" />        
      
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
