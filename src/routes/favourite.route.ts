import { Router } from "express";
import { FavouriteService } from "../services/favourite.service";
import { defineRequest } from "../utils";

export const FavouriteRoute = Router()

FavouriteRoute.get('/', async (req: any, res) => {
    await defineRequest(res, async () => {
        return await FavouriteService.getAll(req.user.id)
    })
})

FavouriteRoute.get('/toy/:id', async (req: any, res) => {
    await defineRequest(res, async () => {
        return await FavouriteService.getByToyId(req.params.id, req.user.id)
    })
})

FavouriteRoute.post('/toy/:id', async (req: any, res) => {
    await defineRequest(res, async () => {
        await FavouriteService.createByToyId(req.params.id, req.user.id)
    })
})

FavouriteRoute.delete('/:id', async (req: any, res) => {
    await defineRequest(res, async () => {
        await FavouriteService.deleteById(req.params.id, req.user.id)
    })
})