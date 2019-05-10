var juegoAPP = (function(){
    var tiempo = 1500;
    var color1 = "#DCFF0E";
    var color2 = "#FFFFFF";

    var cambiarColorTitulo = function(){
        var titulo = $(".main-titulo");
        var contador = 0;
        var intervalo = setInterval(function(){
            if(contador%2==0){
                titulo.animate({"color":color2});
            }else{
                titulo.animate({"color":color1});
            }
            contador++;
            console.log(contador);
            //clearInterval(intervalo);
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