import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req: any, res: any, next: any) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password)
      }
    })
  
    const token = createJWT(user)
    console.log('TOKEN', token)
    res.json({token})
  } catch (error) {
    console.log('error is', error)
    // error.type = 'input'
    next()
  }
}

export const signin = async (req: any, res: any) => {
  const {username, password} = req.body;
  const user = await prisma.user.findUnique({
    where : {
      username: username
    }
  });
  console.log('user', user)

  if(user){
    const isValid = await comparePasswords(password, user.password)
    if(!isValid){
      res.status(401);
      res.json({message: 'Username/Password is wrong'});
      return;
    }
    const token = createJWT(user)
    res.json({token})
  }
}