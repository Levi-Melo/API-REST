import { app } from "./app";
import { dbConnection } from "./data/dbConnection";

const sincronizar = async () => {
  try {
    const result = await dbConnection.sync();
    console.log("Sync" + result);
  } catch (error) {
    console.log(error);
  }
};

sincronizar();

app.listen(3000);
