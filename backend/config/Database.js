import { Sequelize } from "sequelize";

const db = new Sequelize("code", "root", "Enoch@1345", {
    host:"localhost",
    dialect:"mysql"
})

export default db;