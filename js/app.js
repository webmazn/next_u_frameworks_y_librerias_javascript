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
        var clasesHorizontal = new Array();
        var clasesVertical = new Array();
        for(var i=0; i<cantidad; i++){
            var clasesH = new Array();
            var clasesV = new Array();
            for(var j=0; j<cantidad; j++){
                var claseH = $(".col-"+(j+1)).find("img").eq(i).attr("class");
                clasesH.push(claseH);
                var claseV = $(".col-"+(i+1)).find("img").eq(j).attr("class");
                clasesV.push(claseV);
            }
            clasesHorizontal.push(clasesH);
            clasesVertical.push(clasesV);
        }
        console.log(clasesHorizontal);
        console.log(clasesVertical);
        var posicionesHorizontales = new Array();
        var posicionesVerticales = new Array();
        for(var i=0; i<cantidad; i++){
            var posicionHorizontal = new Array();
            var posicionVertical = new Array();
            for(var j=0; j<cantidad; j++){
                if(clasesHorizontal[i][j]==clasesHorizontal[i][j-1] && clasesHorizontal[i][j]==clasesHorizontal[i][j+1]){
                    if(!posicionHorizontal.includes(j-1))   posicionHorizontal.push(j-1);
                    if(!posicionHorizontal.includes(j))     posicionHorizontal.push(j);
                    if(!posicionHorizontal.includes(j+1))   posicionHorizontal.push(j+1);
                }
                if(clasesVertical[i][j]==clasesVertical[i][j-1] && clasesVertical[i][j]==clasesVertical[i][j+1]){
                    if(!posicionVertical.includes(j-1))   posicionVertical.push(j-1);
                    if(!posicionVertical.includes(j))     posicionVertical.push(j);
                    if(!posicionVertical.includes(j+1))   posicionVertical.push(j+1);
                }
            }
            posicionesHorizontales.push(posicionHorizontal);
            posicionesVerticales.push(posicionVertical);
        }
        console.log(posicionesHorizontales);
        console.log(posicionesVerticales);
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
            if(posicionesVerticales[i].length>0){
                for(var j=0; j<posicionesVerticales[i].length; j++){
                    var posicion = posicionesVerticales[i][j];
                    $(".col-"+(i+1)).find("img").eq(posicion).fadeOut(500, function(){
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
        console.log(estado);
        if(estado=="inicio"){
            //boton.attr("data-estado","reinicio").text("Reiniciar");
            juegoAPP.iniciarJuego();
        }else{
            window.location.reload();
        }
    })
})