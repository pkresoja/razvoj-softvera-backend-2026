import { Router } from "express";
import { CartService } from "../services/cart.service";
import { defineRequest } from "../utils";

export const CartRoute = Router()

CartRoute.get('/', async (req: any, res) => {
    await defineRequest(res, async () => {
        return await CartService.getAll(req.user.id)
    })
})

CartRoute.post('/toy/:id', async (req: any, res) => {
    await defineRequest(res, async () => {
        return await CartService.createItem(req.params.id, req.user.id)
    })
})

CartRoute.get('/invoice', async (req: any, res) => {
    await defineRequest(res, async () => {
        return await CartService.getInvoices(req.user.id)
    })
})

CartRoute.post('/invoice', async (req: any, res) => {
    await defineRequest(res, async () => {
        return await CartService.createInvoice(req.user.id)
    })
})

CartRoute.put('/:id/count/:count', async (req: any, res) => {
    await defineRequest(res, async () => {
        return await CartService.updateCount(req.params.id, req.params.count, req.user.id)
    })
})

CartRoute.delete('/:id', async (req: any, res) => {
    await defineRequest(res, async () => {
        return await CartService.deleteItem(req.params.id, req.user.id)
    })
})
