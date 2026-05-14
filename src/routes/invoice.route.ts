import { Router } from "express";
import { defineRequest } from "../utils";
import { CartService } from "../services/cart.service";

export const InvoiceRoute = Router()

InvoiceRoute.put('/:id/pay', async (req: any, res) => {
    await defineRequest(res, async () => {
        return await CartService.payInvoice(req.params.id, req.user.id)
    })
})