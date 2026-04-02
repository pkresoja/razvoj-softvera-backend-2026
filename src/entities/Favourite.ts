import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import type { Relation } from "typeorm";

@Index("fk_favourite_user_idx", ["userId"], {})
@Entity("favourite", { schema: "razvoj_softvera_2026" })
export class Favourite {
  @PrimaryGeneratedColumn({ type: "int", name: "favourite_id", unsigned: true })
  favouriteId: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("int", { name: "toy_id", unsigned: true })
  toyId: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => User, (user) => user.favourites, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Relation<User>;
}
