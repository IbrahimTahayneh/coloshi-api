import { connect } from "mongoose";

export const dbConnection = () => {
  connect(process.env.DB_URI).then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);
  });
};
