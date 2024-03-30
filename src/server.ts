import express, {Express} from 'express';
import morgan from 'morgan';

import router from './router';
import authRouter from './authRouter'
import { protect } from "./modules/auth";

const app: Express = express();

// app.use(cors())
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.use((req, res, next)=>{
//   // res.status(401)
//   // res.send({message: 'Unauthorized'})
//   next()
// })

app.get('/', (req, res) => {
  res.status(200)
  res.json({message: 'hello'})
})

app.use('/api', protect , router);
app.use('/auth', authRouter);

// app.use((err, req, res, next) => {
//   if(err.type === 'auth'){
//     res.status(401).json({message: 'unauthorized'})
//   }else if(err.type === 'input'){
//     res.status(400).json({message: 'invalid input'})
//   }else{
//     res.status(500).json({message: "oops, that's on us"})
//   }
// })

module.exports = app;