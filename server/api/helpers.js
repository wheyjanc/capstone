const { Contract, User } = require('../db/models')

const getUser = async id => {
  try {
    return await User.findOne({
      where: {
        userId: id,
        isActive: true
      },
      include: [{ model: Contract }]
    })
  } catch (error) {
    return error
  }
}
