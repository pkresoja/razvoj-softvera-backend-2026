import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { CartItem } from "../entities/CartItem";
import { ToyService } from "./toy.service";
import { Invoice } from "../entities/Invoice";

const cartRepo = AppDataSource.getRepository(CartItem)
const invoiceRepo = AppDataSource.getRepository(Invoice)

export class CartService {
    static async getAll(userId: number) {
        const data = await cartRepo.find({
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

    private static async getItemById(itemId: number, userId: number) {
        return await cartRepo.findOneByOrFail({
            cartItemId: itemId,
            userId: userId,
            invoiceId: IsNull(),
            deletedAt: IsNull()
        })
    }

    static async createItem(toyId: number, userId: number) {
        const existing = await cartRepo.findOneByOrFail({
            toyId: toyId,
            userId: userId,
            invoiceId: IsNull(),
            deletedAt: IsNull()
        })

        if (existing != null) {
            existing.count = existing.count + 1
            await cartRepo.save(existing)
            return
        }

        const toy = await ToyService.getToyById(toyId)
        await cartRepo.save({
            toyId: toy.data.toyId,
            userId,
            count: 1,
            price: toy.data.price,
            createdAt: new Date(),
        })
    }

    static async updateCount(itemId: number, count: number, userId: number) {
        if (count < 1)
            throw new Error('COUNT_MUST_BE_POSITIVE')

        const data = await this.getItemById(itemId, userId)
        data.count = count
        await cartRepo.save(data)
    }

    static async deleteItem(itemId: number, userId: number) {
        const data = await this.getItemById(itemId, userId)
        data.deletedAt = new Date()
        await cartRepo.save(data)
    }

    static async createInvoice(userId: number) {
        const invoice = await invoiceRepo.save({
            userId,
            createdAt: new Date()
        })

        const unpaidCartItems = await cartRepo.findBy({
            userId: userId,
            invoiceId: IsNull(),
            deletedAt: IsNull()
        })

        for (let cartItem of unpaidCartItems) {
            cartItem.invoiceId = invoice.invoiceId
            await cartRepo.save(cartItem)
        }
    }

    static async getInvoices(userId: number) {
        return await invoiceRepo.find({
            select: {
                invoiceId: true,
                createdAt: true,
                paidAt: true
            },
            where: {
                userId
            }
        })
    } 
}