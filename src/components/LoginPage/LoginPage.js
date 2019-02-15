import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// styles
import Styles from '../Styles/Styles';

// component
class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };
  login = (event) => {
    event.preventDefault();
    console.log('got here');

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div>
            <Typography variant="h4" align="center">Login</Typography>
          </div>
          <form onSubmit={this.login}>
            <div>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="username">
                  Username
              </InputLabel>
                <Input
                  id="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </FormControl>
            </div>
            <div>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password">
                  Password
              </InputLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  autoFocus
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </FormControl>
            </div>
            <br />
            {/* 
            // Will have to implement/change duration of session for this checkbox
            <div>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </div> 
            */}
            <div>
              <Button
                fullWidth
                type="submit"
                name="submit"
                value="Log In"
                color="primary"
                variant="outlined"
              >
                Log In
            </Button>
            </div>
          </form>
          <div className={classes.loginMessageBox}>
            <Typography variant='caption' align='center' className={classes.textMessageColor}>
              {this.props.errors.loginMessage && this.props.errors.loginMessage}
            </Typography>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(Styles)(LoginPage));
