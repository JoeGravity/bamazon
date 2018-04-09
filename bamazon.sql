-- Drops the animals_db if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "animals_db" database --
CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect animals_db --
USE bamazon;

-- Creates the table "products" within animals_db --
CREATE TABLE products (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  dept_name VARCHAR(30),
  price DECIMAL(10,2),
  stock_qty INTEGER (6),
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (item_id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("SINGER 2277 Tradition Sewing Machine", "Arts, Crafts & Sewing", 107.10, 150);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("Moto G PLUS (5th Generation) - 64 GB - Unlocked", "Cell Phones", 259.99, 1021);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("Zevia—Ginger Beer—7.5 oz. Can (12 Count)—Zero Calories or Sugar, Naturally Sweetened with Stevia Leaf Extract", "Seltzer Water", 17.56, 670);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("Andantex R3000 Right Angle Bevel Gear Drive, Universal Mounting, Single Output Shaft, 2 Flanges, Inch, 3/8 in Shaft Diameter, 1:1 Ratio, .34Hp at 1750rpm", "Cell Phones", 147.06, 72);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("Bamboo Epoxy Stand Up Paddle Board PKG Red Rail by JK", "Stand-Up Paddleboards", 699.00, 49);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("Beyond Legacy Code: Nine Practices to Extend the Life (and Value) of Your Software", "Textbooks", 32.54, 358);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("Grokking Algorithms: An illustrated guide for programmers and other curious people", "Textbooks", 18.27, 1223);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("NASA Saturn V 1967-1973 (Apollo 4 to Apollo 17 & Skylab) (Owners' Workshop Manual)", "Textbooks", 28.54, 3100);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("Jitterbug Flip Easy-to-Use Cell Phone for Seniors - Red by GreatCall", "Cell Phones", 60.87, 983);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("TracFone LG L442BG 3G Prepaid Phone", "Cell Phones", 12.99, 0);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("Foundlings Organic Cotton Stuffed Bunny", "Stuffed Animals & Teddy Bears ", 26.50, 32);

-- Updates the row --
UPDATE products
SET dept_name = 'Power Transmission'
WHERE item_id = 4;

SELECT * FROM bamazon.products;
