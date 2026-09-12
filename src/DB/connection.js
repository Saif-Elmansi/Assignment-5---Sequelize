import chalk from "chalk";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("assignment5_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  
});

export const checkDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log(chalk.green("Database connected & models synchronized successfully."));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};