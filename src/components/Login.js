
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

//  Stores
import AuthStore from '../stores/AuthStore';

//  Actions
import APIUtils from '../utils/APIUtils';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class Login extends Component {

  constructor(){
    super();

    //  Set the initial username/password:
    this.state = {
      Email: '',
      Password: '',
      signingIn: false,
      pageError: '' /* Eventually, this needs to come from LoginPageStore.getError() */
    }
  }

  componentDidMount(){    
      //  Add store listeners ... and notify ME of changes
      this.authListener = AuthStore.addListener(this._onChange);
  }

  componentWillUnmount() {
      //  Remove store listeners
      this.authListener.remove();
  }

  render() {
    
    const { classes } = this.props;

    return (
      <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus onChange={this._onEmailChange} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this._onPasswordChange} 
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this._onLogin}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
    );
  }

  _onEmailChange = (e) => {
    this.setState({
      Email: e.target.value
    });
  }

  _onPasswordChange = (e) => {
    this.setState({
      Password: e.target.value
    });
  }

  _onLogin = (e) => {
    e.preventDefault();
    
    //  Lock the form from further modification:
    this.setState({
      signingIn: true
    });
    
    //  Attempt Login:
    APIUtils.login(this.state.Email, this.state.Password);
  }

  //  Data changed:
  _onChange = () => {
    console.log("Onchange called");
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
