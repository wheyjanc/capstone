'use strict'

const db = require('../server/db')
const {
  User,
  Bundle,
  Advertisement,
  Campaign,
  Category,
  Demographic
} = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      isAdvertiser: true
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      isAdvertiser: false
    })
  ])

  const bundle1 = await Bundle.create({
    projectName: 'Project1'
  })

  const bundle2 = await Bundle.create({
    projectName: 'Project2'
  })

  const bundle3 = await Bundle.create({
    projectName: 'Project3'
  })

  const category1 = await Category.create({
    name: 'Luxury'
  })

  const category2 = await Category.create({
    name: 'Fashion'
  })

  const category3 = await Category.create({
    name: 'Sports'
  })

  const demographic1 = await Demographic.create({
    name: 'Women'
  })

  const demographic2 = await Demographic.create({
    name: 'Men'
  })

  const demographic3 = await Demographic.create({
    name: 'Kids'
  })

  const campaign1 = await Campaign.create({
    blockChainKey: '',
    clicks: 8,
    name: 'Rolex',
    price: '9000.0',
    isActive: true
  })
  campaign1.addBundle(bundle1)
  campaign1.addBundle(bundle2)
  campaign1.addCategory(category2)
  campaign1.addCategory(category3)
  campaign1.addDemographic(demographic3)
  campaign1.addDemographic(demographic2)

  const campaign2 = await Campaign.create({
    blockChainKey: '',
    clicks: 3,
    name: 'Gucci',
    price: '8000.0',
    isActive: true
  })
  campaign2.addBundle(bundle3)
  campaign2.addBundle(bundle1)
  campaign2.addCategory(category1)
  campaign2.addCategory(category2)
  campaign2.addDemographic(demographic1)
  campaign2.addDemographic(demographic3)

  const campaign3 = await Campaign.create({
    blockChainKey: '',
    clicks: 6,
    name: 'Mcdonalds',
    price: '1000.0',
    isActive: true
  })
  campaign2.addBundle(bundle2)
  campaign2.addBundle(bundle1)
  campaign2.addCategory(category3)
  campaign2.addCategory(category2)
  campaign2.addDemographic(demographic1)
  campaign2.addDemographic(demographic3)

  const advertisements = await Promise.all([
    Advertisement.create({
      name: 'Rolex-Ad-1',
      image:
        'http://doghalloweencostumeshop.com/images/thumbnails/pink-wig-for-dogs.jpg',
      url: 'http://google.com',
      adSpecs: 'format1'
    }),
    Advertisement.create({
      name: 'Rolex-Ad-2',
      image:
        'http://doghalloweencostumeshop.com/images/thumbnails/pink-wig-for-dogs.jpg',
      url: 'http://google.com',
      adSpecs: 'format2'
    }),
    Advertisement.create({
      name: 'Rolex-Ad-3',
      image:
        'http://doghalloweencostumeshop.com/images/thumbnails/pink-wig-for-dogs.jpg',
      url: 'http://google.com',
      adSpecs: 'format3'
    })
  ])

  const ad1 = await Advertisement.create({
    name: 'Rolex-Ad-1',
    image:
      'http://doghalloweencostumeshop.com/images/thumbnails/pink-wig-for-dogs.jpg',
    url: 'http://google.com',
    adSpecs: 'format1'
  })
  ad1.addCampaign(campaign1)
  ad1.addCampaign(campaign2)

  const ad2 = await Advertisement.create({
    name: 'Rolex-Ad-2',
    image:
      'http://doghalloweencostumeshop.com/images/thumbnails/pink-wig-for-dogs.jpg',
    url: 'http://google.com',
    adSpecs: 'format2'
  })
  ad2.addCampaign(campaign1)
  ad2.addCampaign(campaign3)

  const ad3 = await Advertisement.create({
    name: 'Rolex-Ad-3',
    image:
      'http://doghalloweencostumeshop.com/images/thumbnails/pink-wig-for-dogs.jpg',
    url: 'http://google.com',
    adSpecs: 'format3'
  })
  ad3.addCampaign(campaign1)
  ad3.addCampaign(campaign2)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
