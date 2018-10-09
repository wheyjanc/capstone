import React, { Component } from 'react'

class ScriptTag extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let bundleId = this.props.location.bundleId
    console.log('bundleId', bundleId)
    return (
      <div>
        <h3>Paste the code below into your app:</h3>
        &lt;pre&gt; &lt;script&gt; src="http://localhost:8080/api/scripts/{
          bundleId
        }.js" &lt;/script&gt; &lt;/pre&gt;
      </div>
    )
  }
}

export default ScriptTag

// return (
//   <div>
//     <h3>Paste the code below into your app:</h3>

//     <pre>
//       &lt;script&gt; src="http://localhost:3000/api/scripts/1.js"
//       &lt;/script&gt;
//     </pre>
//   </div>
