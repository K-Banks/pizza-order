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

function Pizza(size, meatToppings, veggieToppings, allToppings, orderNumber, price) {
  this.size = size;
  this.meatToppings = meatToppings;
  this.veggieToppings = veggieToppings;
  this.allToppings = allToppings;
  this.orderNumber = orderNumber;
  this.price = price;
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
  var deliveryToggle = 0;
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
    var price = pizza.pricing();
    pizzaArray.push(pizza);
    totalPriceArray.push(price);
    if ($("#delivery").is(":checked") && deliveryToggle === 0) {
      $(".hider-delivery").show();
      deliveryToggle = 1;
    }
    var totalPriceValue = totalPrice(totalPriceArray);
    $("span#priceOutput").text(price);
    $("p#pizzaOrderOutput").append("<div class='well' id='"+pizza.orderNumber+"'><h4>Pizza "+(pizza.orderNumber)+"</h4><ul>Price:<li>$"+price+"</li></ul><ul>Size:<li>"+pizza.size+"</li></ul><ul id='"+pizza.orderNumber+"'>Toppings:</ul><button type='button' value='Remove' class='button' button'>Remove This Pizza</button></div>")
    $(".button").last().click(function(){
      var targeter = parseInt($($(this).parent()).attr("id"))-1;
      var priceTargeter = pricing(pizzaArray[targeter]);
      totalPriceArray.splice(price,1);
      pizzaArray.splice(targeter,1);
      $($(this).parent()).remove();
      totalPriceValue = totalPrice(totalPriceArray);
      $("span#totalPriceOutput").text(totalPriceValue);
    });
    for (var i = 0; i < pizza.allToppings.length; i++) {
      $("ul#"+orderNumberTracker).append("<li>"+pizza.allToppings[i]+"</li>")
    }
    $("span#totalPriceOutput").text(totalPriceValue);
    $("div.hider").slideDown("slow");
    orderNumberTracker += 1;
  });
});
