import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Invoice } from "./Invoice";
import { User } from "./User";

@Index("fk_cart_item_invoice_idx", ["invoiceId"], {})
@Index("fk_cart_item_user_idx", ["userId"], {})
@Entity("cart_item", { schema: "razvoj_softvera_2026" })
export class CartItem {
  @PrimaryGeneratedColumn({ type: "int", name: "cart_item_id", unsigned: true })
  cartItemId: number;

  @Column("int", { name: "toy_id", unsigned: true })
  toyId: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("int", { name: "count", unsigned: true, default: () => "'1'" })
  count: number;

  @Column("int", { name: "price", unsigned: true })
  price: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("int", { name: "invoice_id", nullable: true, unsigned: true })
  invoiceId: number | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Invoice, (invoice) => invoice.cartItems, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "invoice_id", referencedColumnName: "invoiceId" }])
  invoice: Invoice;

  @ManyToOne(() => User, (user) => user.cartItems, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Relation<User>;
}
