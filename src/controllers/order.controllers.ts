import type { Request, Response } from "express"
import { prisma } from "../lib/prisma";

export const orderControllers = {
    getOrders: async(req: Request,res:Response) => {
        try{
            const orders = await prisma.order.findMany({}); 
                return res
                    .status(200)
                    .json({success:true, orders});
        }
        catch(error:any){
            console.error("Internal server error while fetching orders");
            res
            .status(500)
            .json({message: "Internal server error while fetching orders"});
        }
    },
    createOrder: async(req: Request,res:Response) => {
        try{
            const {name,description,category} = req.body;
            if(!name || !description || !category) return res.status(400).json({mesage:"Name & Body is required!"})
            const order = await prisma.order.create({data:{
                name,description,category
            }})
            res.status(201).json({success:true,message:"Order is created succesfully.",order});
        }
        catch(error:any){
            console.error("Internal server error while creating orders");
            return res
            .status(500)
            .json({message: "Internal server error while creating orders"});
            // console.error(error);
            // res.status(500).json({message:error.message})
        }
    },
    updateOrder: async(req: Request,res:Response) => {
        try{
            const { OrderID, name, description, category } = req.body;

            if (!OrderID) {
                return res.status(400).json({ message: "OrderID is required!" });
            }
            const existingOrder = await prisma.order.findUnique({
                where: { id: OrderID },
            });

            if (!existingOrder) {
                return res.status(404).json({ message: "Order not found!" });
            }

            const updatedOrder = await prisma.order.update({
                where: { id: OrderID },
                data: {
                    name: name,
                    description: description,
                    category: category,
                },
            });

            return res
            .status(200)
            .json({ success: true, message: "Order updated successfully.", updatedOrder });
        }
        catch(error:any){
            console.error("Internal server error while updating orders");
            res
            .status(500)
            .json({message: "Internal server error while updating orders"});
        }
    },
    deleteOrder: async(req: Request,res:Response) => {
        try{
            const {OrderID} = req.body;

            const existingOrder = await prisma.order.findUnique({
                where: { id: OrderID },
            });

            if (!existingOrder) {
                return res.status(404).json({ message: "Order not found!" });
            }

            const deletedOrder = await prisma.order.delete({
                where: { id: OrderID },
            });

            return res
            .status(200)
            .json({ success: true, message: "Order deleted successfully.", deletedOrder });
        }
        catch(error){
            console.error("Internal server error while deleting orders");
            res
            .status(500)
            .json({message: "Internal server error while deleting orders"});
        }
    }
}