import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar } from './components'
import Routes from './routes'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { fetchAllAds } from './store/ads'

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  palette: {
    primary: {
      main: '#eb8666'
    },
    secondary: {
      main: '#000'
    }
  },
  shadows: Array(25).fill('none')
})

class App extends Component {
  componentDidMount() {
    this.props.loadAllAds()
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Navbar />
          <Routes />
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    loadAllAds: () => dispatch(fetchAllAds())
  }
}

export default connect(null, mapDispatch)(App)
