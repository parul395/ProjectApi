const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()
var cors = require('cors')
// CORS : security berrier : we can send request from anywhere now
const app = express()
app.use(express.json())
app.use(cors())

const getData = async (ele) => {
  try {
    const { data } = await axios.get(
      `https://terriblytinytales.com/testapi?rollnumber=${ele}`,
    )
    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

app.post('/fetchResult', async (req, res) => {
  let results = []
  const rollNumbers = req.body.rollNumbers
  let len = rollNumbers.length
  for (let i = 0; i < len; i++) {
    let result = await getData(rollNumbers[i])
    results.push({
      rollNumber: rollNumbers[i],
      result: result,
    })
  }
  res.send(results)
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('Server has started again :' + port)
})
