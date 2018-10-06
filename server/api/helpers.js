const { Contract, User } = require('../db/models')

const getUser = async id => {
  try {
    return await User.findOne({
      where: {
        id: id,
        isActive: true
      },
      include: [{ model: Contract }]
    })
  } catch (error) {
    return error
  }
}

const createScript = bundleId => {
  return `<div>
      <h3>Paste the code below into your app:</h3>
      <pre>
        <script src="http://localhost:3000/api/scripts/${bundleId}.js" />
      </pre>
    </div>`
}

module.exports = { createScript, getUser }
