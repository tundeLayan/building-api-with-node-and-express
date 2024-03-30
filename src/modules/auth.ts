import { NextFunction } from "express";
import jwt, {Secret} from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePasswords = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
}

export const createJWT = (user: {id: string, username: string}) => {
  const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET as Secret)
  return token;
}

export const protect = (req: any, res: any, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if(!bearer){
    res.status(401)
    res.json({message: 'Not Authorized'})
    return;
  }

  const [bearerString, token] = bearer.split(' ')
  if(bearerString !== 'Bearer'){
    res.status(401)
    res.json({message: 'Not Valid token'})
    return;
  }
  if(!token){
    res.status(401)
    res.json({message: 'Not Valid token'})
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as Secret);
    req.user = user;
    next();
  } catch (error) {
    console.error(error)
    res.status(401)
    res.json({message: 'Not Valid token'})
    return;
  }

}