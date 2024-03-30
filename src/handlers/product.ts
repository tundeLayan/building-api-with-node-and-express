import prisma from "../db"

/**
 * @description Get all Products for a user
 * @param req 
 * @param res 
 */
export const getAllProducts = async (req: any, res: any)=>{
  // this
  // const user = await prisma.user.findUnique({
  //   where:{
  //     id: req.user.id
  //   },
  //   include:{
  //     products: true
  //   }
  // })
  // or this
  const products = await prisma.product.findMany({
    where:{
      belongsToId: req.user.id
    }
  })

  res.json({data: products})
}

/**
 * 
 */

export const getOneProduct = async (req: any, res: any) => {
  const product = prisma.product.findFirst({
    where: {
      id: req.params.id,
      belongsToId: req.user.id
    }
  })

  res.json({data: product})
}

export const createProduct = async (req: any, res: any) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id
    }  
  })

  res.json({data: product})
}

export const updateProduct = async (req: any, res: any) => {
  const updatedProduct = await prisma.product.update({
    where:{
      id: req.params.id,
      belongsToId: req.user.id
    },
    data:{
      name: req.body.name
    }
  })
  res.json({data: updatedProduct})
}

export const deleteProduct = async (req: any, res: any) => {
  const deletedProduct = await prisma.product.delete({
    where:{
      // TODO: Check what this does
      id_belongsToId:{
        id: req.params.id,
        belongsToId: req.user.id
      },
    } 
  })

  res.json({data: deletedProduct})
}