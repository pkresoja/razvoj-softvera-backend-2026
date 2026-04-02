import { Router } from "express";
import { defineRequest } from "../utils";
import { UserService } from "../services/user.service";

export const UserRoute = Router()

UserRoute.get('/self', async (req: any, res) => {
    defineRequest(res, async () => {
        return await UserService.getSafeUserById(req.user.id)
    })
})

UserRoute.post('/login', async (req, res) => {
    defineRequest(res, async () => {
        const body = req.body
        return await UserService.login(body.username, body.password)
    })
})

UserRoute.post('/refresh', async (req, res) => {
    defineRequest(res, async () => {
        const token = req.headers.authorization?.replace('Bearer ', '') as string
        console.log(token)
        return await UserService.refreshToken(token)
    })
})