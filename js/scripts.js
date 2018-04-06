var orderNumberTracker = 0;

function Pizza(size, meatToppings, veggieToppings) {
  this.size = size;
  this.meatToppings = meatToppings;
  this.veggieToppings = veggieToppings;
  this.allToppings = (veggieToppings + "," + meatToppings).split(",");
}

Pizza.prototype.pricing = function() {
  var price = 0;
  if (this.size === "Small") {
    price += 5;
  } else if (this.size === "Medium") {
    price += 7;
  } else if (this.size === "Large") {
    price += 9;
  }
  price = price + (this.meatToppings.length * 0.75);
  price = price + (this.veggieToppings.length * 0.5);
  return price;
};

$(document).ready(function() {
  $("form#newPizzaForm").submit(function(event) {
    event.preventDefault();
    var size = $("input:radio[name=pizzaSize]:checked").val();
    var meatToppings = [];
    $("input:checkbox[name=pizzaMeatTopping]:checked").each(function(){
      meatToppings.push($(this).val());
    });
    var veggieToppings = [];
    $("input:checkbox[name=pizzaVeggieTopping]:checked").each(function(){
      veggieToppings.push($(this).val());
    });
    var pizza = new Pizza(size, meatToppings, veggieToppings);
    var price = pizza.pricing();
    $("span#priceOutput").text(price);
    $("p#pizzaOrderOutput").prepend("<ul>Pizza "+(orderNumberTracker+1)+" price: $"+price+"<li id="+orderNumberTracker+">Size: "+pizza.size+"</li></ul>")
    // var appendLocator = '"li#' + orderNumberTracker + '"';
    for (var i = 0; i < pizza.allToppings.length; i++) {
      $("li#"+orderNumberTracker).append("<li>"+pizza.allToppings[i]+"</li>")
    }
    orderNumberTracker += 1;
  });
});
