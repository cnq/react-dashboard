import React, { Component, PropTypes } from 'react'


class App extends Component {

  render () {
          return (<div>App</div>)
  }

    
}

App.propTypes = {
    app: PropTypes.instanceOf(Map)
}

export default App
