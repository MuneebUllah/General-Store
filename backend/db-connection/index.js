const mongoose = require('mongoose')

const dbConnection = (URL) => {
   return mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
}

module.exports = dbConnection