import React from "react";
var smos_api = require("smos_api");

const Prueba = () => {
    var api = new smos_api.API("Alebagattin@gmail.com", "Olivos1983!!!");
    api.getListRigs().then(function (rigs) {
        console.log(rigs);
    });
  return <div>Prueba</div>;
};

export default Prueba;
