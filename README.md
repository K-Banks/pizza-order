# Pizza Order

#### Practice ordering pizza online. 4/6/18

#### By **Kayl Eubanks**

## Description

This website will allow users to create a mock order for multiple pizzas.


### Specs
| Spec | Input | Output |
| :-------------     | :------------- | :------------- |
| Program will take input for size of pizza and create new pizza object | "Medium" | newPizza = {size: "Medium"} |
| Program will take input for toppings and add to pizza object and display object on DOM | ["Onion","Pepperoni","Bell Pepper"] | newPizza = {size: "Medium", toppings: ["Onion","Pepperoni","Bell Pepper"]} |
| Program will output a price based on the properties of the pizza object | newPizza = {size: "Medium", toppings: ["Onion","Pepperoni","Bell Pepper"]} | "$17.50" |
| Program will output total price for all pizzas on single order | "Pizza1 = $4.00, Pizza2 = $3.00" | "Total Price for Order: $7.00" |
| Program will remove a pizza object from order and update pricing to reflect change when prompted | "Total Price for Order: $7.00 consisting of: Pizza1 = $4.00, Pizza2 = $3.00" | "Total Price for Order: $4.00 consisting of: Pizza1 = $4.00" |
| Program will check if delivery is requested and update total price | Delivery checkbox is marked | "Total price is: $9.00 ($4.00 for order + $5.00 for delivery fee)" |
| Program will take delivery information and output information beneath total price | "3 Smokethorn" + "Irvine" + "GA" + "92753" | "Deliver to: 3 Smokethorn, Irvine, GA 92753" |


## Setup/Installation Requirements

* _Navigate to http://k-banks.github.io/pizza-order in a web browser_
* _Enter the number you wish the program to count to and press the submit button._
* _Alternatively, clone the repository from https://github.com/K-Banks/pizza-order _
* _Open the index.html file in a web browser._

## Known Bugs
* No known bugs at this time.

## Technologies Used
* jQuery
* JavaScript
* HTML
* Bootstrap

## Support and contact details

_Email the author with any questions, comments, or concerns._

### License

*{This software is licensed under the MIT license}*

Copyright (c) 2018 **_{Kayl Eubanks}_**
