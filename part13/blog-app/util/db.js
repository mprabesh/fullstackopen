const { DB_URL } = require("../util/config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to DB....");
  } catch (error) {
    console.log("DB conection failed");
    return process.exit(1);
  }
};

module.exports = { sequelize, connectToDatabase };
