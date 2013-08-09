/***********************************
 * Router
 *
 * routes for project details
************************************
/                                  */

(function () {

  var AppRouter = Backbone.Router.extend({
    routes: {
      "wait": "waitingMusic", 
      "time": "deliveryTime", 
      "*actions": "defaultRoute"
      }
  });

  var app_router = new AppRouter;

  app_router.on('route:waitingMusic', function() {
    $.get("partials/waiting-music.html", function(data){
      $('#the-view').html(data);  
      waitKickoff();    
    });
  });

  app_router.on('route:deliveryTime', function() {
    $.get("partials/delivery-time.html", function(data){
      $('#the-view').html(data);     
    });
  });

  app_router.on('route:defaultRoute', function() {
    $.get("partials/location.html", function(data){
      $('#the-view').html(data);       
    });
  });

  Backbone.history.start();

})();