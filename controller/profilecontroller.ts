import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// export const createProfile = async(req: Request, res: Response)=>{
//     try {
//       const {fullName,userName} = req.body
      
//       const profile = await 
//     } catch (error) {
//         return res.status(400).json({
//             message:"Error"
//         })
//     }
// }