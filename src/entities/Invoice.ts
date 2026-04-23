import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { CartItem } from "./CartItem";
import { User } from "./User";

@Index("fk_invoice_user_idx", ["userId"], {})
@Index("uq_invoice_purs_id", ["pursId"], { unique: true })
@Index("uq_invoice_transaction_id", ["transactionId"], { unique: true })
@Entity("invoice", { schema: "razvoj_softvera_2026" })
export class Invoice {
  @PrimaryGeneratedColumn({ type: "int", name: "invoice_id", unsigned: true })
  invoiceId: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", {
    name: "transaction_id",
    nullable: true,
    unique: true,
    length: 255,
  })
  transactionId: string | null;

  @Column("varchar", {
    name: "purs_id",
    nullable: true,
    unique: true,
    length: 255,
  })
  pursId: string | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "paid_at", nullable: true })
  paidAt: Date | null;

  @OneToMany(() => CartItem, (cartItem) => cartItem.invoice)
  cartItems: CartItem[];

  @ManyToOne(() => User, (user) => user.invoices, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Relation<User>;
}
