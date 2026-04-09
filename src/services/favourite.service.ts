import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Favourite } from "../entities/Favourite";
import { ToyService } from "./toy.service";

const repo = AppDataSource.getRepository(Favourite)

export class FavouriteService {
    static async getAll(userId: number) {
        const data = await repo.find({
            select: {
                favouriteId: true,
                toyId: true,
                createdAt: true
            },
            where: {
                userId: userId,
                deletedAt: IsNull()
            }
        })

        const toyIds = data.map(f => f.toyId)
        const toysRsp = await ToyService.getToysByIds(toyIds)

        for (let favourite of data) {
            for (let toy of toysRsp.data) {
                if (toy.toyId == favourite.toyId) {
                    (favourite as any).toy = toy
                }
            }
        }

        return data
    }

    static async getByToyId(toyId: number, userId: number) {
        return await repo.findOneOrFail({
            select: {
                favouriteId: true,
                toyId: true,
                createdAt: true
            },
            where: {
                toyId: toyId,
                userId: userId,
                deletedAt: IsNull()
            }
        })
    }

    static async createByToyId(toyId: number, userId: number) {
        const exists = await repo.existsBy({
            toyId: toyId,
            userId: userId,
            deletedAt: IsNull()
        })

        if (exists)
            throw new Error('FAVOURITE_TOY_ALREADY_EXISTS')

        await repo.save({
            toyId: toyId,
            userId: userId,
            createdAt: new Date()
        })
    }

    static async deleteById(id: number, userId: number) {
        const existing = await repo.findOneByOrFail({
            favouriteId: id,
            userId: userId,
            deletedAt: IsNull()
        })

        existing.deletedAt = new Date()
        await repo.save(existing)
    }
}