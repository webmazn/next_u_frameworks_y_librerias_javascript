var juegoAPP = (function(){
    var tiempo = 1000;
    var color1 = "FF00FF";
    var color2 = "#FFFFFF";

    var cambiarColorTitulo = function(){
        var titulo = $(".main-titulo");
        var intervalo = setInterval(function(){
            titulo.animate({"color":color2});
            clearInterval(intervalo);
        }, tiempo);
    }
    return {
        iniciarJuego: function () {
            cambiarColorTitulo();
        }
      }
})();
$(document).ready(function(){
    juegoAPP.iniciarJuego();
})