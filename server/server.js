import express from 'express'
import mongoose from 'mongoose'
import path from 'path'

const app = express();

//Middleware
app.use(express.json());

//Router imports
import {course as course} from './routes/api/course'
import {modules as modules} from './routes/api/modules'
import {users as users} from './routes/api/users'

//Database configuration
import { MongoURI as url } from './config/keys.js'
const options = {
  'useUnifiedTopology': true,
  'useNewUrlParser': true,
  'useCreateIndex': true
}
mongoose.connect(url, options)
  .then(() => {
    console.log('Connected to db... ');
    
  })
  .catch((err) => {
    console.error(err);
  })

//Routes
app.use('/api/modules', modules);
app.use('/api/course', course);
app.use('/api/users', users);

//Serve static assets if in prod
if (process.env.NODE_ENV === 'production'){
  //set static dir
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

export default app