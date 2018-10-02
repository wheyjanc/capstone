// var nodemailer = require('nodemailer')

// export default function emailCreator(
//   advertiserEmail,
//   contractAddress,
//   amountDue
// ) {
//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'jstadplacement@gmail.com',
//       pass: 'Hopperjst12345'
//     }
//   })
//   var mailOptions = {
//     from: 'jstadplacement@gmail.com',
//     //this is a variable
//     to: `${advertiserEmail}`,
//     subject: 'Payment required to place your campaign',
//     text: `Please send ${amountDue} to ${contractAddress}`
//   }
//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       console.log(error)
//     } else {
//       console.log('Email sent: ' + info.response)
//     }
//   })
// }
