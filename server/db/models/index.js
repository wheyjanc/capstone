const User = require('./user')
const Advertisement = require('./advertisements')
const Campaign = require('./campaigns')
const Demographic = require('./demographics')
const Bundle = require('./bundles')
const Categories = require('./categories')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Advertisement.belongsTo(User)
User.hasMany(Advertisement)

Advertisement.belongsTo(Campaign, {through: 'adsInCampaign'})
Campaign.belongsTo(Advertisement, {through: 'adsInCampaign'})
Campaign.belongsTo(Bundle, {through: 'campaignsInBundle'})
Bundle.belongsTo(Campaign, {through: 'campaignsInBundle'})
Bundle.belongsTo(User)
User.hasMany(Bundle)
Campaign.belongsToMany(Demographic, {through: 'campaignDemographic'})
Demographic.belongsToMany(Campaign, {through: 'campaignDemographic'})
Campaign.belongsToMany(Categories, {through: 'campaignCategories'})
Categories.belongsToMany(Campaign, {through: 'campaignCategories'})

module.exports = {
  User,
  Advertisement,
  Campaign,
  Bundle,
  Demographic,
  Categories
}
