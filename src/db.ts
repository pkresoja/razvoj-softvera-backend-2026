import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Favourite } from "./entities/Favourite";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'razvoj_softvera_2026',
    entities: [
        User, Favourite
    ]
})