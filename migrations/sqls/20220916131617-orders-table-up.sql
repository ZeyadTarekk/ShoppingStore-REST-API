-- CREATE TYPE order_status AS ENUM('employed','self-employed','unemployed');

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  current_status order_status,
  user_id bigint REFERENCES users(id)
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);