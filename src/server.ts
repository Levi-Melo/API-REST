import { app } from "./app";
import { dbConnection } from "./data/dbConnection";

const dbSync = async () => {
  try {
    const result = await dbConnection.sync();
  } catch (error) {
    console.log(error);
  }
};

dbSync();

app.listen(3000);
