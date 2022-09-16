import Client from "../database";

export type Product = {
  id: Number;
  name: string;
  price: Number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM products";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get products ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql =
        "INSERT INTO products(name,price) VALUES(($1),($2)) RETURNING *";

      const result = await connection.query(sql, [product.name, product.price]);
      const createdUser = result.rows[0];
      connection.release();

      return createdUser;
    } catch (err) {
      throw new Error(`unable to create product (${product.name}) : ${err}`);
    }
  }
}
