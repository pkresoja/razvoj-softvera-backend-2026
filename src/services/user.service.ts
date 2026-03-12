import type { Request, Response } from "express";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const repo = AppDataSource.getRepository(User)
const JWT_KEY = 'f5328103-2a95-4069-9c0c-641109aa3aee'

export class UserService {
    static async getUserByUsername(username: string) {
        return await repo.findOneOrFail({
            where: {
                username: username,
                isActive: true
            }
        })
    }

    static async login(username: string, password: string) {
        const user = await this.getUserByUsername(username)
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                id: user.userId,
                name: user.username
            }

            return {
                access: jwt.sign(payload, JWT_KEY, { expiresIn: '30m' }),
                refresh: jwt.sign(payload, JWT_KEY, { expiresIn: '8d' })
            }
        }

        throw new Error('INCORECT_USERNAME_OR_PASSWORD')
    }

    static async refreshToken(refresh: string) {
        try {
            const decoded: any = jwt.verify(refresh, JWT_KEY)
            console.log(decoded)
            const payload = {
                id: decoded.id,
                name: decoded.name
            }

            return {
                access: jwt.sign(payload, JWT_KEY, { expiresIn: '30m' }),
                refresh: refresh
            }
        } catch (e) {
            throw new Error('REFRESH_FAILED')
        }
    }

    static async authenticateToken(req: Request, res: Response, next: Function) {
        const publicPaths = [
            '/api/user/login',
            '/api/user/refresh',
            '/api/toy'
        ]

        if (publicPaths.includes(req.path)) {
            next()
            return
        }

        const auth = req.headers.authorization
        const token = auth && auth.split(' ')[1]
        if (token == null) {
            return res.status(401).json({
                message: 'NO_TOKEN_FOUND'
            })
        }

        try {
            //@ts-ignore
            req.user = jwt.verify(token, JWT_KEY)
            next()
        } catch (e) {
            return res.status(403).json({
                message: 'INVALID_TOKEN'
            })
        }
    }
}