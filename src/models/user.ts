import Client from "../database";
const bcrypt = require("bcrypt");
export type User = {
  id: Number;
  first_name: string;
  last_name: string;
  password: Number;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get users ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      console.log("Model user", user);
      const pepper = process.env.BCRYPT_PASSWORD;
      const saltsRounds = process.env.SALT_ROUNDS;
      const connection = await Client.connect();
      const sql =
        "INSERT INTO users(first_name,last_name,password) VALUES(($1),($2),($3)) RETURNING *";
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltsRounds)
      );
      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        hash,
      ]);
      const createdUser = result.rows[0];
      connection.release();

      return createdUser;
    } catch (err) {
      throw new Error(`unable to create user (${user.id}) : ${err}`);
    }
  }
}
