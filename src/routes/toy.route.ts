import { Router } from "express";
import { ToyService } from "../services/toy.service";
import { defineRequest } from "../utils";

export const ToyRoute = Router()

ToyRoute.get('/', async (req, res) => {
    await defineRequest(res, async () => {
        const rsp = await ToyService.getToys()
        return rsp.data
    })
})

ToyRoute.get('/permalink/:permalink', async (req, res) => {
    await defineRequest(res, async () => {
        const perma = req.params.permalink
        const rsp = await ToyService.getToyByPermalink(perma)
        return rsp.data
    })
})