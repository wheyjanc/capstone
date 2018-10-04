import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { signUpUser } from '../store/user'
import { withStyles, FormLabel, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Card from '@material-ui/core/Card'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    boxShadow: 'none',
    marginBottom: 60
  },
  grow: {
    flexGrow: 1
  },
  card: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    /* bring your own prefixes */
    transform: 'translate(-50%, -50%)',
    border: '2px #000000 solid',
    borderRadius: '0px',
    padding: '30px',
    boxShadow: '0px'
  },
  formControl: {
    margin: '0px'
  },
  group: {
    margin: '0px',
    flexDirection: 'row'
  },
  title: {
    fontWeight: '600px',
    paddingBottom: '10px'
  },
  formHeader: {}
})

class SignUpForm extends Component {
  state = {
    value: 'advertiser'
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  render() {
    const { handleSubmit, error, classes } = this.props

    return (
      <Card className={classes.card} style={{ width: '40%' }}>
        <div className={classes.formHeader}>
          <Typography className={classes.title} variant="title" color="inherit">
            Hello there!
          </Typography>
          <Typography variant="subheading" color="inherit">
            Sign up with us to get access to high quality ads and advertisers
            who are relevant to your users.
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <FormGroup style={{ marginTop: '20px' }}>
            <FormControl component="fieldset" className={classes.formControl}>
              <Typography variant="subheading">I am a(n):</Typography>
              <RadioGroup
                aria-label="I am a(n):"
                name="userType"
                className={classes.group}
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="advertiser"
                  control={<Radio />}
                  label="advertiser"
                />
                <FormControlLabel
                  value="developer"
                  control={<Radio />}
                  label="developer"
                />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <InputLabel>Email</InputLabel>
              <Input name="email" type="text" />
            </FormControl>
            <FormControl>
              <InputLabel>Password</InputLabel>
              <Input name="password" type="password" />
            </FormControl>
            <br />
            <Button type="submit">SUBMIT</Button>
            <Button component="a" href="/auth/google">
              Sign up with Google
            </Button>
            {error && error.response && <div> {error.response.data} </div>}
          </FormGroup>
        </form>
      </Card>
    )
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      const email = evt.target.email.value
      const password = evt.target.password.value
      const userType = evt.target.userType.value
      dispatch(signUpUser(email, password, userType))
    }
  }
}

const SignUp = withStyles(styles)(connect(mapSignup, mapDispatch)(SignUpForm))

export default SignUp

/**
 * PROP TYPES
 */
SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
