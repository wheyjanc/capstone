import React, { Component } from 'react'

class ScriptTag extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let bundleId = this.props.location.bundleId
    // let contractsArray = this.props.location.state.contractsArray
    // console.log('contr', contractsArray)
    // const script = contractsArray.map(contract => {
    return `<div>
        <h3>Paste the code below into your app:</h3>

        <pre>
          &lt;script&gt; src="http://localhost:8080/api/scripts/${bundleId}.js"
          &lt;/script&gt;
        </pre>
        `
    // })
    // return script
  }
  // return (
  //   <div>
  //     <h3>Paste the code below into your app:</h3>

  //     <pre>
  //       &lt;script&gt; src="http://localhost:3000/api/scripts/1.js"
  //       &lt;/script&gt;
  //     </pre>
  //   </div>
  // )
}

export default ScriptTag
