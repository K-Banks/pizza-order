function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
}

Pizza.prototype.pricing = function () {
  var price = 0;
  if (this.size === "Small") {
    price += 5;
  } else if (this.size === "Medium") {
    price += 7;
  } else if (this.size === "Large") {
    price += 9;
  }
  price = price + (this.toppings.length * 0.5);
  return price;
};

$(document).ready(function() {
  $("form#newPizzaForm").submit(fucntion(event) {
    event.preventDefault();
    var size = $("input:radio[name=pizzaSize]:checked").val();
    var toppings = $("input:checkbox[name=pizzaTopping]:checked").each(function(temporary){

    });
  });
});
