//  React
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

//  Simple tab content container
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class AddPermissions extends Component {  

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {

    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>  

          <AppBar position="static" color="default">
            <Tabs value={value} onChange={this.handleChange} centered>
              <Tab label="Add to group" />
              <Tab label="Copy permissions from user" />
              <Tab label="Attach policies" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer>Select group(s) to add to</TabContainer>}
          {value === 1 && <TabContainer>Pick an existing user to copy from</TabContainer>}
          {value === 2 && <TabContainer>Select policies to attach</TabContainer>}
      </div>
    );
  }
}

AddPermissions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPermissions);