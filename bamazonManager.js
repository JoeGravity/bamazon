var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // showAll();
});

// first display all of the items available for sale. Include the ids, names, and prices of products for sale.
function showAll() {
    connection.query("SELECT * FROM products;", function (err, res) {
        if (err) console.log(err);
        // print list headers
        console.log("| No.| Price | Department | Product Description |");
        // print info from each row
        for (var i = 0; i < res.length; i++) {
            console.log("| " + res[i].item_id + " | $" + res[i].price.toFixed(2) + " | " + res[i].dept_name + " | " + res[i].product_name + " | " + res[i].stock_qty + " |");
        }
        console.log("-----------------------------------");
    });
};
// List a set of menu options:
//     * View Products for Sale
//     * View Low Inventory   
//     * Add to Inventory   
//     * Add New Product

//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
// showAll();

// * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

// function orderSelect() {
//     var questions = [
//         {
//             type: 'input',
//             name: 'chosenNum',
//             message: 'Which item would you like? Please enter its number:',
//             validate: function (value) {
//                 var valid = !isNaN(parseFloat(value));
//                 return valid || 'Please enter a number';
//             },
//             filter: Number
//         },
//         {
//             type: 'input',
//             name: 'amount',
//             message: 'How many do you need?',
//             validate: function (value) {
//                 var valid = !isNaN(parseFloat(value));
//                 return valid || 'Please enter a number';
//             },
//             filter: Number
//         },
//     ]
// }

inquirer
    .prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What do you need to do?',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
            filter: function (val) {
                return val.toLowerCase();
            }
        }
    ])
    .then(answers => {
        console.log(JSON.stringify(answers, null, '  '));

        switch (answers) {
            case "view low inventory":
                // lowQty(answers);
                console.log("ITEMS LOW ON STOCK")
                // inquirer.prompt(questions).then(function (answer) {
                    connection.query("SELECT * FROM products;", function (err, res) {
                        if (err) console.log(err);
                        for (var i = 0; i < res.length; i++) {
                            if (res[i].stock_qty < 6) {
                                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].dept_name + " | " + res[i].stock_qty);
                            }
                            // else {
                            //     // if no stock is low
                            //     console.log("Sufficient stock available for all products");
                            // }
                        }
                    });
                break;
            case "Add to Inventory":
                showAll();
                break;
            case "Add New Product":
                showAll();
                break;
            default: "View Products for Sale";
            showAll();
        };

    });


function lowQty(answers) {
    console.log("ITEMS LOW ON STOCK")
    // inquirer.prompt(questions).then(function (answer) {
        connection.query("SELECT * FROM products;", function (err, res) {
            if (err) console.log(err);
            for (var i = 0; i < res.length; i++) {
                if (res[i].stock_qty < 6) {
                    console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].dept_name + " | " + res[i].stock_qty);
                }
                // else {
                //     // if no stock is low
                //     console.log("Sufficient stock available for all products");
                // }
            }
        });
};




//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.