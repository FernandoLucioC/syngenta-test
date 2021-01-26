const { hotels } = require('./db.js');
const Hotel = require('./db.js')
module.exports = {
  handleClient: function (val) {
    var res = val.split(" ")
    var client_type = res[0].slice(0, -1);
    return client_type;
  },
  handleDayOfTheWeek: function (val) {
    var week_day = val.split("(");
    week_day = week_day.toString();
    week_day = week_day.split(",");
    var day = new Array;
    var aux = 0;
    for (var i = 1; i <= 5; i = i + 2) {
      day[aux] = week_day[i].slice(0, -1);
      aux++;
    }
    return day
  },
  WeekendCheck: function (val) {
    return ((val == 'sat' || val == 'sun') ? true : false);
  },
  BestRegularDeal: function (dayofweek, j) {
    var aux,name,rating;
    if (this.WeekendCheck(dayofweek[j])) {
      aux = hotels[0].wknd_regular_price;
      name = hotels[0].name;
      rating = hotels[0].rating;
      for (var i = 1; i < hotels.length; i++) {
        if (aux > hotels[i].wknd_regular_price) {
          aux = hotels[i].wknd_regular_price;
          name = hotels[i].name;
          rating = hotels[0].rating;
        }
      }
    }
    else {
      aux = hotels[0].week_day_regular_price;
      name = hotels[0].name
      rating = hotels[0].rating;

      for (var i = 1; i < hotels.length; i++) {
        if (aux > hotels[i].week_day_regular_price) {
          aux = hotels[i].week_day_regular_price
          name = hotels[i].name
          rating = hotels[i].rating;
        }
      }
    }
    let priceObj = {
      "name": name,
      "price": aux,
      "rating": rating
    }
    return priceObj;
  },
  BestRewardDeal: function (dayofweek, j) {
    var aux,name,rating;
    if (this.WeekendCheck(dayofweek[j])) {
      aux = hotels[0].wknd_reward_price;
      name = hotels[0].name;
      rating = hotels[0].rating;
      for (var i = 1; i < hotels.length; i++) {
        if (aux > hotels[i].wknd_reward_price) {
          aux = hotels[i].wknd_reward_price;
          name = hotels[i].name;
          rating = hotels[i].rating;
        }
      }
    }
    else {
      aux = hotels[0].week_day_reward_price;
      name = hotels[0].name
      rating = hotels[0].rating;
      for (var i = 1; i < hotels.length; i++) {
        if (aux > hotels[i].week_day_reward_price) {
          aux = hotels[i].week_day_reward_price
          name = hotels[i].name
          rating = hotels[i].rating;
        }
      }
    }
    let priceObj = {
      "name": name,
      "price": aux,
      "rating": rating
    }
    return priceObj;
  },
  CompareDeals: function(hotelDeals){
    var compare = hotelDeals[0].price;
    var final_result = hotelDeals[0].name;
    var rating = hotelDeals[0].rating;
    for (var i = 0; i < 3; i++) {
      if (hotelDeals[i].price < compare) {
        final_result = hotelDeals[i].name;
        compare = hotelDeals[i].price
        rating = hotelDeals[i].rating;
      }
      if (hotelDeals[i].price == compare) {
        if (hotelDeals[i].rating > rating) {
          final_result = hotelDeals[i].name;
          compare = hotelDeals[i].price
          rating = hotelDeals[i].rating;
        }
      }
    }
    return final_result;
  },
  main: function (val) {
    var client_type = this.handleClient(val);
    var dayofweek = this.handleDayOfTheWeek(val)
    var hotelDeals = new Object;
    for (var j = 0; j < dayofweek.length; j++) {
      if (client_type == 'Regular') {
        hotelDeals[j] = this.BestRegularDeal(dayofweek, j)
      }
      else {
        hotelDeals[j] = this.BestRewardDeal(dayofweek, j)
      }
    }
    return this.CompareDeals(hotelDeals);
  }
}