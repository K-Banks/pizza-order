var totalPriceArray = [];

function toppingCompiler(meatToppings, veggieToppings) {
  var allToppings = [];
  for (var i = 0; i < meatToppings.length; i++) {
    if (meatToppings[i] !== "") {
      allToppings.push(meatToppings[i]);
    }
  }
  for (var i = 0; i < veggieToppings.length; i++) {
   if (veggieToppings[i] !== "") {
     allToppings.push(veggieToppings[i]);
   }
 }
 return allToppings;
}

function totalPrice(array) {
  var returnValue = 0;
  for (var i = 0; i < array.length; i++) {
    returnValue += array[i];
  }
  return returnValue
}

function Pizza(size, meatToppings, veggieToppings, allToppings) {
  this.size = size;
  this.meatToppings = meatToppings;
  this.veggieToppings = veggieToppings;
  this.allToppings = allToppings;
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
  var orderNumberTracker = 0;
  $("form#newPizzaForm").submit(function(event) {
    event.preventDefault();
    var size = $("input:radio[name=pizzaSize]:checked").val();
    var meatToppings = [];
    var veggieToppings = [];
    $("input:checkbox[name=pizzaMeatTopping]:checked").each(function(){
      meatToppings.push($(this).val());
    });
    $("input:checkbox[name=pizzaVeggieTopping]:checked").each(function(){
      veggieToppings.push($(this).val());
    });
    var allToppings = toppingCompiler(meatToppings, veggieToppings);
    if (allToppings[0] === undefined) {
      allToppings.push("none")
    }
    debugger;
    var pizza = new Pizza(size, meatToppings, veggieToppings, allToppings);
    var price = pizza.pricing();
    totalPriceArray.push(price);
    $("span#priceOutput").text(price);
    $("p#pizzaOrderOutput").append("<div class='well'><h4>Pizza "+(orderNumberTracker+1)+"</h4><ul>Price:<li>$"+price+"</li></ul><ul>Size:<li>"+pizza.size+"</li></ul><ul id='"+orderNumberTracker+"'>Toppings:</ul></div>")
    for (var i = 0; i < pizza.allToppings.length; i++) {
      $("ul#"+orderNumberTracker).append("<li>"+pizza.allToppings[i]+"</li>")
    }
    orderNumberTracker += 1;
    var totalPriceValue = totalPrice(totalPriceArray);
    $("span#totalPriceOutput").text(totalPriceValue);
    $("div.hider").slideDown("slow");
  });
});
