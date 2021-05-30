import { app } from "./app";
import { dbConnection } from "./data/dbConnection";

const dbSync = async () => {
  try {
    const result = await dbConnection.sync();
    console.log("Sync" + result);
  } catch (error) {
    console.log(error);
  }
};

dbSync();

app.listen(3000);
