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
    returnValue += parseFloat(array[i]);
  }
  return returnValue
}

function Pizza(size, meatToppings, veggieToppings, allToppings, orderNumber) {
  this.size = size;
  this.meatToppings = meatToppings;
  this.veggieToppings = veggieToppings;
  this.allToppings = allToppings;
  this.orderNumber = orderNumber;
  this.price = 0;
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
  price = price.toFixed(2);
  this.price = price;
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
    console.log(pizza.price);
    pizzaArray.push(pizza);
    totalPriceArray.push(price);
    if ($("#delivery").is(":checked") && deliveryToggle === 0) {
      $(".hider-delivery").show();
      deliveryToggle = 5;
    } else if (deliveryToggle === 5 && $("#delivery").is(":checked") === false) {
      deliveryToggle = 0;
      $(".hider-delivery").hide();
    }
    var totalPriceValue = totalPrice(totalPriceArray);
    $("span#priceOutput").text(price);
    $("p#pizzaOrderOutput").append("<div class='well' id='"+pizza.orderNumber+"'><h4>Pizza "+(pizza.orderNumber)+"</h4><ul>Price:<li>$"+price+"</li></ul><ul>Size:<li>"+pizza.size+"</li></ul><ul class="+orderNumberTracker+">Toppings:</ul><button type='button' value='Remove' class='button' button'>Remove This Pizza</button></div>")
    $(".button").last().click(function(){
      var targeter = parseFloat($($(this).parent()).attr("id"))-1;
      var priceTargeter = (pizzaArray[targeter].price);
      debugger
      totalPriceArray[targeter] = totalPriceArray[targeter].replace(priceTargeter,"0");
      pizzaArray.splice(targeter,1);
      $($(this).parent()).remove();
      totalPriceValue = totalPrice(totalPriceArray);
      $("span#totalPriceOutput").text(totalPriceValue.toFixed(2));
    });
    var toppingTracker = pizza.allToppings.length
    for (var i = 0; i < toppingTracker; i++) {
      var appender = pizza.allToppings[i];
      $("ul."+orderNumberTracker).append("<li>"+appender+"</li>")
    }
    $("span#totalPriceOutput").text((totalPriceValue + deliveryToggle).toFixed(2));
    $("div.hider").slideDown("slow");
    orderNumberTracker += 1;
  });

  $("form#deliveryAddress").submit(function(event) {
    event.preventDefault();
    var name = $("input#deliveryName").val();
    var address = $("input#deliveryStreet").val() + ", " + $("input#deliveryCity").val() + ", " + $("input#deliveryState").val() + " " + $("input#deliveryZip").val();
    $("li#name").text(name);
    $("li#address").text(address);
    $("div.hider-address-review").show();
  });
});
