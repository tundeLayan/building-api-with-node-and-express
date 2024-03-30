import { body } from "express-validator";
import prisma from "../db";

// TODO: get all update for a particular product
/**
 * @description - get all updates for a user
 * @param req 
 * @param res 
 */
export const getAllUpdates = async (req: any, res: any) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include:{
      Update: true
    }
  })
  
  const updates = products.reduce((acculmulator, current):any => [...acculmulator, ...current.Update], [])

  res.json({data: updates})
}

export const getOneUpdate = async (req: any, res: any) => {
  const update = await prisma.update.findUnique({
    where:{
      id: req.params.id
    }
  })

  res.json({data: update})
}

// update an update for a product
export const updateUpdate = async (req: any, res: any) => {
  // get the particular product we want to update an update for
  const product = await prisma.product.findUnique({
    where:{
      id: req.body.productId,
      belongsToId: req.user.id,
    }
  })

  // get the update we want to update
  const updatedUpdate = await prisma.update.update({
    where:{
      id: req.params.id,
      productId: product?.id
    },
    data: req.body
  })
  res.json({data: updatedUpdate})
}

// create update for a product
export const createUpdate = async (req: any, res: any) => {
  // check that the product id belongs to user trying to create update
  const product = await prisma.product.findUnique({
    where:{
      id: req.body.productId,
      belongsToId: req.body.user
    }
  })
  if(!product){
    return res.json({message: 'nope'})
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      productId: req.body.productId,
      updatedAt: new Date()
    }
  })

  res.json({data: update})
  
}

export const deleteUpdate = async (req: any, res: any) => {
  
}