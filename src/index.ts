import cors = require("cors")
import express = require("express")
import { AppDataSource } from "./db"

const app = express()

app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 4004

// routes
// app.use('/user', routerUsers)

app.get("/health", (req, res)=> {
    return res.send("healthy")
})

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    
    app.listen(PORT, () => {
      console.log(`Server running ${PORT}`);
    })
  })
  .catch(error => {
    console.log(error)
  })