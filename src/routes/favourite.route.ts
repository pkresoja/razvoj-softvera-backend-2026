import { Router } from "express";
import { AppDataSource } from "../db";
import { Favourite } from "../entities/Favourite";

export const FavouriteRoute = Router()

FavouriteRoute.get('/', async (req, res) => {
    res.json(await AppDataSource.getRepository(Favourite).find({
        relations: {
            user: true
        }
    }))
})