import React from 'react'

const ScriptTag = props => {
  return (
    <div>
      <h3>Paste the code below into your app:</h3>

      <pre>
        &lt;script&gt; src="http://localhost:3000/api/scripts/1.js"
        &lt;/script&gt;
      </pre>
    </div>
  )
}
export default ScriptTag
