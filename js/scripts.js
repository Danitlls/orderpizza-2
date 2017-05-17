//BUSINESS LOGIC:

function PizzaOrder() {
  this.order = []
}

PizzaOrder.prototype.addPizza = function(pizza) {
  this.order.push(pizza)
}

PizzaOrder.prototype.getPizzas = function() {
  return this.order
}

PizzaOrder.prototype.getTotal = function() {
  var price = 0
  this.order.forEach(function(pizza) {
    price += pizza.makePizza()
  })
  return price
}

PizzaOrder.prototype.completeOrder = function() {
  this.order = []
}

function Pizza(toppings, toppingsPrice, size, sizelabel){
  this.toppings = toppings;
  this.toppingsPrice = toppingsPrice
  this.size= size;
  this.sizelabel = sizelabel
  this.price = 0;
  this.priceBase = 8;
}
//Function to get the total cost of the pizza:
Pizza.prototype.makePizza = function () {
  var internalPrice = this.priceBase
  this.toppingsPrice.forEach(function(price) {
    internalPrice += price;
  })
   this.price = this.size + internalPrice;
   return this.price;
};

function Client(name, address){
  this.name =name;
  this.address = address;
}

Client.prototype.fullAddress = function() {
  return  this.name + ". Address: " + this.address ;
}

//USER INTERFACE LOGIC:
$(function() {
  var order = new PizzaOrder()
  // function buildOrderDetails(order) {
  //
  // }
  $("#chooseForm").submit(function(event){
    event.preventDefault();
    var toppingsPrice = []
    var toppings=[]
    var toppingElements = $("input:checkbox[name=toppins]:checked")

// https://api.jquery.com/jquery.each/
    $.each(toppingElements, function(index, val){
      toppingsPrice.push(index)
      toppings.push(val.value)
    })

    console.log('Toppings:', toppings)
    console.log('Topping Prices:', toppingsPrice)

    var size = parseInt($("input:radio[name=size]:checked").val());
    var sizelabel = ""
    if (size === 1) {
      sizelabel = "Small"
    } else if (size === 3) {
      sizelabel = "Medium"
    } else {
      sizelabel = "Large"
    }
    var pizzaA = new Pizza(toppings, toppingsPrice, size, sizelabel);
    order.addPizza(pizzaA)

    var pizzas = order.getPizzas()
    var count = 1
    $(".pizzaDetails").empty()
    pizzas.forEach(function(pizza) {
      $(".pizzaDetails").append('<li><strong>Pizza ' + count + ' (' + pizza.sizelabel + ')</strong></li>' )
      pizza.toppings.forEach(function(topping){
        $(".pizzaDetails").append('<li>' + topping + '</li>' )
      })
      count++
    })

    $("#result").text("Your pizza will cost: $" + order.getTotal());
    $("#makeNew").show();
    $("#checkOut").show();
    $("#chooseForm").slideUp(550);
    $("#result").show();
  });

  $("#makeNew").click(function(){
    $('#chooseForm').trigger("reset");
    $("#chooseForm").show();
  })

  $("#checkOut").click(function(){
    order.completeOrder()
    $("#chooseForm").hide();
    $("#makeNew").hide();
    $("#checkOut").slideUp(200);
    $("#pickUp").fadeIn(800);
    $("#delivery").fadeIn();
  })

  $("#pickUp").click(function(){
    $("#pickUp").hide();
    $("#delivery").hide();
    $("#showPickUp").fadeIn(500);
    $(".details").text("Great choice!");
    $("#showDelivery").hide();
  })

  $("#delivery").click(function(){
    $("#delivery").hide();
    $("#pickUp").hide();
    $("#showDelivery").show();
    $("#showPickUp").hide();

  })

  $("#new-address").submit(function(event){
    event.preventDefault();
    var address = $("input#new-street").val();
    var name = $("input#name").val();
    var clientA = new Client(name, address);

    $("#pickUp").hide();
    $("#delivery").hide();
    $("#showDelivery").hide();
    $("#new-address").hide();
    $("#deliver").fadeIn(500);
    $("#pickUp").hide();
    $(".details1").text(clientA.fullAddress());
    $(".move").show(1000);
  })



});
