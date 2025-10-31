import { Router } from "express";
import { orderControllers } from "../controllers/order.controllers";

export const orderRoutes = Router();

orderRoutes.get("/", orderControllers.getOrders);  
orderRoutes.post("/", orderControllers.createOrder);  
orderRoutes.put("/:orderID", orderControllers.updateOrder);  
orderRoutes.delete("/:orderID", orderControllers.deleteOrder);