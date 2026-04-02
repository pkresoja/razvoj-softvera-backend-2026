import { AppDataSource } from "../db";
import { Favourite } from "../entities/Favourite";
import { ToyService } from "./toy.service";

const repo = AppDataSource.getRepository(Favourite)

export class FavouriteService {
    static async getFavouritesByUserId(id: number) {
        const data = await repo.find({
            select: {
                favouriteId: true,
                toyId: true,
                createdAt: true
            },
            where: {
                userId: id
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
}