import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartItem } from "./CartItem";
import { Favourite } from "./Favourite";
import { Invoice } from "./Invoice";

@Index("uq_user_username", ["username"], { unique: true })
@Entity("user", { schema: "razvoj_softvera_2026" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "username", unique: true, length: 255 })
  username: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("boolean", {
    name: "is_active",
    default: () => "'true'",
  })
  isActive: boolean;

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];

  @OneToMany(() => Favourite, (favourite) => favourite.user)
  favourites: Favourite[];

  @OneToMany(() => Invoice, (invoice) => invoice.user)
  invoices: Invoice[];
}
