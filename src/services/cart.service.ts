import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { CartItem } from "../entities/CartItem";
import { ToyService } from "./toy.service";

const repo = AppDataSource.getRepository(CartItem)

export class CartService {
    static async getAll(userId: number) {
        const data = await repo.find({
            select: {
                cartItemId: true,
                toyId: true,
                count: true,
                price: true,
                createdAt: true
            },
            where: {
                userId: userId,
                invoiceId: IsNull(),
                deletedAt: IsNull()
            }
        })

        const toyIds = data.map(f => f.toyId)
        const toysRsp = await ToyService.getToysByIds(toyIds)

        for (let cartItem of data) {
            for (let toy of toysRsp.data) {
                if (toy.toyId == cartItem.toyId) {
                    (cartItem as any).toy = toy
                }
            }
        }

        return data
    }
}