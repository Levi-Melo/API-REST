import { app } from "./app";
import { dbConnection } from "./data/dbConnection";

const dbSync = async () => {
  try {
    await dbConnection.sync();
  } catch (error) {
    console.log(error);
  }
};

dbSync();

app.listen(3000);
