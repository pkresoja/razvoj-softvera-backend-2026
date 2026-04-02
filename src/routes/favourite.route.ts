import { Router } from "express";
import { FavouriteService } from "../services/favourite.service";

export const FavouriteRoute = Router()

FavouriteRoute.get('/', async (req: any, res) => {
    res.json(await FavouriteService.getFavouritesByUserId(req.user.id))
})