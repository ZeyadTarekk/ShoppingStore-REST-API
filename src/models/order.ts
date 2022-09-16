import Client from "../database";

export type Order = {
  id: Number;
  user_id: Number;
  current_status: string;
};

export class OrderStore {
  async allUserOrders(userId: string): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1);";
      const result = await connection.query(sql, [userId]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get orders ${err}`);
    }
  }

  async completedUserOrders(userId: string): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) and current_status='complete';";
      const result = await connection.query(sql, [userId]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get orders ${err}`);
    }
  }
}
