//  React
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class BasicInfo extends Component {  

    state = {
      value: 0,
    };

    handleChange = (event, value) => {
      this.setState({ value });
    };

    render() {

      return (
        <React.Fragment>
          
          <Typography variant="h6" gutterBottom>
            Set user details
          </Typography>

          <div style={{paddingLeft: 100, paddingTop: 40, paddingBottom: 60}}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Login name"                
                  autoComplete="loginname"
                  helperText="The login name for the user / application"
                  value={this.props.loginname}                
                />
              </Grid>            

            </Grid>
          </div>                                      

      </React.Fragment>
      );
    }
}

BasicInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicInfo);
