'use strict'

const db = require('../server/db')
const {
  User,
  Bundle,
  Category,
  Demographic,
  Campaign,
  Advertisement,
  Contract
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

  const user1 = await User.create({
    email: 'user1@email.com',
    password: '1234',
    isAdvertiser: false,
    salt: 'salt'
  })

  const user2 = await User.create({
    email: 'user2@email.com',
    password: '1234',
    isAdvertiser: false,
    salt: 'salt'
  })

  const user3 = await User.create({
    email: 'user3@email.com',
    password: '1234',
    isAdvertiser: true,
    salt: 'salt'
  })

  const contract1 = await Contract.create({
    contractHash: '0x94d52535fe072e44c0745c114d816ff066fcee9e',
    balance: 15.0,
    status: false,
    clickCount: 500
  })
  await contract1.addUser(user1)

  const contract2 = await Contract.create({
    contractHash: '0x94d52535fe072e44c0745c114d816ff066fcee9e',
    balance: 10.0,
    status: false,
    clickCount: 500
  })
  await contract2.addUser(user1)

  const contract3 = await Contract.create({
    contractHash: '0x94d52535fe072e44c0745c114d816ff066fcee9e',
    balance: 18.0,
    status: false,
    clickCount: 500
  })
  await contract3.addUser(user2)

  const contract4 = await Contract.create({
    contractHash: '0x94d52535fe072e44c0745c114d816ff066fcee9e',
    balance: 20.0,
    status: false,
    clickCount: 500
  })
  await contract4.addUser(user3)

  const bundle1 = await Bundle.create({
    projectName: 'Project1A',
    userId: 1
  })

  const bundle2 = await Bundle.create({
    projectName: 'Project2A',
    userId: 2
  })

  const bundle3 = await Bundle.create({
    projectName: 'Project3A',
    userId: 3
  })

  const bundles = await Promise.all([
    Bundle.create({
      projectName: 'Project1B',
      userId: 1
    }),
    Bundle.create({
      projectName: 'Project2B',
      userId: 2
    }),
    Bundle.create({
      projectName: 'Project3B',
      userId: 3
    }),
    Bundle.create({
      projectName: 'Project3C',
      userId: 3
    }),
    Bundle.create({
      projectName: 'Project2C',
      userId: 2
    }),
    Bundle.create({
      projectName: 'Project1C',
      userId: 1
    }),
    Bundle.create({
      projectName: 'Project2D',
      userId: 2
    })
  ])

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
    blockChainKey: 'abc',
    clicks: 8,
    name: 'Rolex',
    price: '9000.0',
    isActive: true
  })
  await campaign1.addBundle(bundle1)
  await campaign1.addBundle(bundle2)
  await campaign1.addCategory(category2)
  await campaign1.addCategory(category3)
  await campaign1.addDemographic(demographic3)
  await campaign1.addDemographic(demographic2)
  await campaign1.addContract(contract1)

  const campaign2 = await Campaign.create({
    blockChainKey: '',
    clicks: 3,
    name: 'Gucci',
    price: '8000.0',
    isActive: true
  })
  await campaign2.addBundle(bundle3)
  await campaign2.addBundle(bundle1)
  await campaign2.addCategory(category1)
  await campaign2.addCategory(category2)
  await campaign2.addDemographic(demographic1)
  await campaign2.addDemographic(demographic3)
  await campaign2.addContract(contract1)

  const campaign3 = await Campaign.create({
    blockChainKey: '',
    clicks: 6,
    name: 'Mcdonalds',
    price: '1000.0',
    isActive: true
  })
  await campaign3.addBundle(bundle2)
  await campaign3.addBundle(bundle1)
  await campaign3.addCategory(category3)
  await campaign3.addCategory(category2)
  await campaign3.addDemographic(demographic1)
  await campaign3.addDemographic(demographic3)
  await campaign3.addContract(contract2)

  const ad1 = await Advertisement.create({
    name: 'Rolex-Ad-1',
    image:
      'http://doghalloweencostumeshop.com/images/thumbnails/pink-wig-for-dogs.jpg',
    url: 'http://google.com',
    adSpecs: 'format1'
  })
  await ad1.addCampaign(campaign1)

  const ad2 = await Advertisement.create({
    name: 'Rolex-Ad-2',
    image:
      'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12235843/Borzoi-On-White-02.jpg',
    url: 'http://google.com',
    adSpecs: 'format2'
  })
  await ad2.addCampaign(campaign1)

  const ad3 = await Advertisement.create({
    name: 'Rolex-Ad-3',
    image:
      'http://befreshcorp.net/wp-content/uploads/2017/06/product-packshot-Carrot-558x600.jpg',
    url: 'http://google.com',
    adSpecs: 'format3'
  })
  await ad3.addCampaign(campaign1)

  const ad4 = await Advertisement.create({
    name: 'Gucci-Ad-1',
    image:
      'http://befreshcorp.net/wp-content/uploads/2017/06/product-packshot-Carrot-558x600.jpg',
    url: 'http://google.com',
    adSpecs: 'format3'
  })
  await ad4.addCampaign(campaign2)

  const ad5 = await Advertisement.create({
    name: 'Gucci-Ad-2',
    image:
      'http://befreshcorp.net/wp-content/uploads/2017/06/product-packshot-Carrot-558x600.jpg',
    url: 'http://google.com',
    adSpecs: 'format3'
  })
  await ad5.addCampaign(campaign2)

  const ad6 = await Advertisement.create({
    name: 'Mcdonalds-Ad-1',
    image:
      'http://befreshcorp.net/wp-content/uploads/2017/06/product-packshot-Carrot-558x600.jpg',
    url: 'http://google.com',
    adSpecs: 'format3'
  })
  await ad6.addCampaign(campaign3)

  const ad7 = await Advertisement.create({
    name: 'Mcdonalds-Ad-2',
    image:
      'http://befreshcorp.net/wp-content/uploads/2017/06/product-packshot-Carrot-558x600.jpg',
    url: 'http://google.com',
    adSpecs: 'format3'
  })
  await ad7.addCampaign(campaign3)

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
