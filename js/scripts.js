var totalPriceArray = [];
var pizzaArray = [];

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

function Pizza(size, meatToppings, veggieToppings, allToppings, orderNumber) {
  this.size = size;
  this.meatToppings = meatToppings;
  this.veggieToppings = veggieToppings;
  this.allToppings = allToppings;
  this.orderNumber = orderNumber;
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
  var orderNumberTracker = 1;
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
    var pizza = new Pizza(size, meatToppings, veggieToppings, allToppings, orderNumberTracker);
    pizzaArray.push(pizza);
    var price = pizza.pricing();
    totalPriceArray.push(price);
    var totalPriceValue = totalPrice(totalPriceArray);
    $("span#priceOutput").text(price);
    $("p#pizzaOrderOutput").append("<div class='"+price+" well' id='"+pizza.orderNumber+"'><h4>Pizza "+(pizza.orderNumber)+"</h4><ul>Price:<li>$"+price+"</li></ul><ul>Size:<li>"+pizza.size+"</li></ul><ul id='"+pizza.orderNumber+"'>Toppings:</ul><button type='button' value='Remove' class='"+pizza.orderNumber+" button'>Remove This Pizza</button></div>")
    $(".button").last().click(function(){
      var targeter = $(this).parent();
      var negPrice = "-" + $($(this).parent()).attr("class");
      debugger;
      totalPriceArray.push(parseInt(negPrice));
      $(targeter).remove();
      totalPriceValue = totalPrice(totalPriceArray);
      $("span#totalPriceOutput").text(totalPriceValue);
    });
    for (var i = 0; i < pizza.allToppings.length; i++) {
      $("ul#"+orderNumberTracker).append("<li>"+pizza.allToppings[i]+"</li>")
    }
    orderNumberTracker += 1;
    $("span#totalPriceOutput").text(totalPriceValue);
    $("div.hider").slideDown("slow");
  });
});
