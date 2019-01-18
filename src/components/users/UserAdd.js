//  React
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//  Step components
import BasicInfo from './BasicInfo';
import AddPermissions from './AddPermissions';
import AddReview from './AddReview';

//  Utils:
import NavUtils from '../../utils/NavUtils';

const styles = theme => ({
  root: {
    flexgrow: 1,
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Basic information', 'Permissions', 'Review'];
}

function getStepContent(step, ...props) {
  switch (step) {
    case 0:
      return <BasicInfo {...props} />;
    case 1:
      return <AddPermissions />;
    case 2:
      return <AddReview />;
    default:
      return 'Unknown step';
  }
}

class UserAdd extends Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
    name: "Some name",
    password: "defaultpassword",
  };

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleCancel = () => {
    NavUtils.gotoUserList();
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>

                <Grid container className={classes.root} justify="space-between">
                  <Grid item>
                    <Button className={classes.button} onClick={this.handleCancel}>
                      Cancel
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                      Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.handleNext} className={classes.button}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>                    
                  </Grid>
                </Grid>
                
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

UserAdd.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(UserAdd);