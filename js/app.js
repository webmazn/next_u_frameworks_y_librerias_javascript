var juegoAPP = (function(){
    var tiempo = 1500;
    var color1 = "#DCFF0E";
    var color2 = "#FFFFFF";
    var cantidad = 7;
    var caramelos = 4;

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
            //console.log(contador);
            //clearInterval(intervalo);
        }, tiempo);
    }
    var generarCamarelos = function(){
        return Math.floor((Math.random() * caramelos) + 1);        
    }
    var mostrarCaramelosRandom = function(){
        
        for(var i=0;i<cantidad; i++){
            for(var j=0;j<cantidad; j++){
                $(".col-"+(i+1)).append("<img src='image/"+(generarCamarelos())+".png'>")
            }
        }
    }
    return {
        iniciarJuego: function () {
            cambiarColorTitulo();
            mostrarCaramelosRandom();
        }
      }
})();
$(document).ready(function(){
    juegoAPP.iniciarJuego();
})