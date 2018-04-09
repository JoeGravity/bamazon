var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "joe",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    showAll();
});

// first display all of the items available for sale. Include the ids, names, and prices of products for sale.

function showAll() {
    connection.query("SELECT * FROM products;", function (err, res) {
        if (err) console.log(err);
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].dept_name + " | $" + res[i].price);
        }
        console.log("-----------------------------------");
        orderSelect();
    });
};

//   The app should then prompt users with two messages.
//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

function orderSelect() {
    var questions = [
        {
            type: 'input',
            name: 'chosenNum',
            message: 'Which item would you like? Please enter its number:',
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number
        },
        {
            type: 'input',
            name: 'amount',
            message: 'How many do you need?',
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number
        },
    ]

    inquirer.prompt(questions).then(function (answer) {
        connection.query("SELECT * FROM products;", function (err, results) {
            if (err) console.log(err);
            // get the information of the chosen item
            // console.log(results);
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id === answer.chosenNum) {
                    chosenItem = results[i];
                }
            }    if (chosenItem.stock_qty >= parseInt(answer.amount)) {
                //    8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
                //    * This means updating the SQL database to reflect the remaining quantity.
                //    * Once the update goes through, show the customer the total cost of their purchase.
                // bid was high enough, so update db, let the user know, and start over
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_qty: chosenItem.stock_qty - 1
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log("Bid placed successfully!");
                        connection.end();
                    }
                )
            }
            else {
                //    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
                // bid wasn't high enough, so apologize and start over
                console.log("Insufficient stock available. Please try again...");
                showAll();
            }
        })

    });
    // inquirer.prompt(questions).then(answers => {
    //     console.log('\nOrder receipt:');
    //     console.log(JSON.stringify(answers, null, '  '));
    // })

    // 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
};
