import { Router } from "express";
import { CartService } from "../services/cart.service";
import { defineRequest } from "../utils";

export const CartRoute = Router()

CartRoute.get('/', async (req: any, res) => {
    await defineRequest(res, async () => {
        return await CartService.getAll(req.user.id)
    })
})
