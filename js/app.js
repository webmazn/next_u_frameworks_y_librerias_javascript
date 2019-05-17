var juegoAPP = (function(){
    var tiempo = 1500;
    var color1 = "#DCFF0E";
    var color2 = "#FFFFFF";
    var cantidad = 7;
    var caramelos = 4;
    var puntaje = 10;
    var puntajeTotal = 0;

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
                var caramelo = generarCamarelos();
                $(".col-"+(i+1)).append("<img src='image/"+caramelo+".png' class='caramelo"+caramelo+"'>")
            }
        }
    }
    var traerMasCaramelos = function(){
        setTimeout(function(){
            for(var i=0; i<cantidad; i++){
                var caramelos = $(".col-"+(i+1)).find("img").length;
                var diferencia = cantidad-caramelos;
                if(diferencia>0){
                    for(var j=0;j<diferencia; j++){
                        var caramelo = generarCamarelos();
                        $(".col-"+(i+1)).prepend("<img src='image/"+caramelo+".png' class='caramelo"+caramelo+"' style='display:none;'>");
                        $(".col-"+(i+1)).find("img:hidden").fadeIn(500);
                    }
                }
            }                    
        },tiempo);
    }
    var actualizarPuntuacion = function(puntajeTotal,callback){
        $("#score-text").empty().text(puntajeTotal);
        callback();
    }
    var caramelosLineaHorizontal = function(){        
        var clasesTotales = new Array();
        for(var i=0; i<cantidad; i++){
            var clases = new Array();
            for(var j=0; j<cantidad; j++){
                var clase = $(".col-"+(j+1)).find("img").eq(i).attr("class");
                clases.push(clase);                  
            }
            clasesTotales.push(clases);
        }
        console.log(clasesTotales);
        var posicionesHorizontales = new Array();
        for(var i=0; i<cantidad; i++){
            var posicionHorizontal = new Array();
            for(var j=0; j<cantidad; j++){
                if(clasesTotales[i][j]==clasesTotales[i][j-1] && clasesTotales[i][j]==clasesTotales[i][j+1]){
                    if(!posicionHorizontal.includes(j-1))   posicionHorizontal.push(j-1);
                    if(!posicionHorizontal.includes(j))     posicionHorizontal.push(j);
                    if(!posicionHorizontal.includes(j+1))   posicionHorizontal.push(j+1);
                }
            }
            posicionesHorizontales.push(posicionHorizontal);
        }
        console.log(posicionesHorizontales);
        for(var i=0; i<cantidad; i++){
            if(posicionesHorizontales[i].length>0){
                for(var j=0; j<posicionesHorizontales[i].length; j++){
                    var posicion = posicionesHorizontales[i][j];
                    $(".col-"+(posicion+1)).find("img").eq(i).fadeOut(500, function(){
                        $(this).remove();
                    });
                    puntajeTotal += puntaje;  
                }
            }
        }        
        console.log(puntajeTotal);
        actualizarPuntuacion(puntajeTotal,traerMasCaramelos);
    }
    return {
        cargarJuego: function(){
            cambiarColorTitulo();
            mostrarCaramelosRandom();            
        },
        iniciarJuego: function(){
            caramelosLineaHorizontal();
        }
    }
})();
$(document).ready(function(){
    juegoAPP.cargarJuego();

    $(".btn-reinicio").on("click", function(){
        var boton = $(this);
        var estado = boton.attr("data-estado");
        if(estado=="inicio"){
            boton.attr("data","reinicio").text("Reiniciar");
            juegoAPP.iniciarJuego();
        }else{
            window.location.reload();
        }
    })
})