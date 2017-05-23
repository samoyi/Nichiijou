"use strict";

self.onconnect = function(ev) {
  var port = ev.ports[0];

  port.start();

	port.addEventListener("message", function(ev) {
    self.importScripts("Fibonacci.js");

    var nResult = Fibonacci(ev.data);
    port.postMessage(nResult);

    self.close();
  });

};
