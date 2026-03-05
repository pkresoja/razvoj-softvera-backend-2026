import { Router } from "express";
import { ToyService } from "../services/toy.service";

export const ToyRoute = Router()

ToyRoute.get('/', async (req, res) => {
    try {
        const rsp = await ToyService.getToys()
        res.json(rsp.data)
    } catch (e: any) {
        res.status(500).json({
            message: e
        })
    }
})

ToyRoute.get('/permalink/:permalink', async (req, res) => {
    try {
        const perma = req.params.permalink
        const rsp = await ToyService.getToyByPermalink(perma)
        if (rsp.status == 404) {
            throw new Error('NOT_FOUND')
        }
        res.json(rsp.data)
    } catch (e: any) {
        res.status(500).json({
            message: e
        })
    }
})