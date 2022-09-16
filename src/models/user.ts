import Client from "../database";
import bcrypt from "bcrypt";
export type User = {
  id: Number;
  first_name: string;
  last_name: string;
  password: Number;
};

export class UserStore {
  async create(user: User): Promise<User> {
    try {
      const pepper = process.env.BCRYPT_PASSWORD;
      const saltsRounds = process.env.SALT_ROUNDS;
      const connection = Client.connect();
      const sql =
        "INSERT INTO users(first_name,last_name,password) VALUES(($1),($2),($3))";
      const hash = bcrypt.hashSync(user.password + pepper, saltsRounds);
      const result = await (
        await connection
      ).query(sql, [user.first_name, user.last_name, hash]);

      const createdUser = result.rows[0];

      (await connection).release();

      return createdUser;
    } catch (err) {
      throw new Error(`unable to create user (${user.id}) : ${err}`);
    }
  }
}
