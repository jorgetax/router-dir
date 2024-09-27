import express from 'express'
import router from '../router'

const app = express()

app.use(express.json())
app.use(router)

app.listen(4000, function () {
  console.log(`✓ url:          http://localhost:${4000}`)
})


