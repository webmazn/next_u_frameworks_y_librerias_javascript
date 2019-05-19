var juegoAPP = (function(){
    var tiempo = 1500;
    var color1 = "#DCFF0E";
    var color2 = "#FFFFFF";
    var cantidad = 7;//7
    var caramelos = 4;
    var puntaje = 10;
    var puntajeTotal = 0;
    var movimientosTotal = 0;
    var trayecto = false;

    var cambiarColorTitulo = function(){
        var titulo = $(".main-titulo");
        var contador = 0;
        setInterval(function(){//var intervalo = 
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
        var cantidadM =cantidad*2;
        for(var i=0;i<cantidadM; i++){
            for(var j=0;j<cantidadM; j++){
                var caramelo = generarCamarelos();
                $(".col-"+(i+1)).append("<div class='elemento'><img src='image/"+caramelo+".png' class='caramelo"+caramelo+"'></div>")
            }
        }
    }
    var traerMasCaramelos = function(){
        setTimeout(function(){
            for(var i=0; i<cantidad; i++){
                var caramelos = $(".col-"+(i+1)).find("img").length;
                var diferencia = (cantidad*2)-caramelos;
                if(diferencia>0){
                    for(var j=0;j<diferencia; j++){
                        var caramelo = generarCamarelos();
                        $(".col-"+(i+1)).prepend("<div class='elemento'><img src='image/"+caramelo+".png' class='caramelo"+caramelo+"'></div>");
                    }
                }
            }
            obtenerLineasHV();       
        },tiempo);        
    }
    var obtenerLineasHV = function(){        
        var clasesHorizontal = new Array();
        var clasesVertical = new Array();
        for(var i=0; i<cantidad; i++){
            var clasesH = new Array();
            var clasesV = new Array();
            for(var j=0; j<cantidad; j++){
            //for(var j=(cantidad-1); j>0; j--){
                //var claseH = $(".col-"+(j+1)).find("img").eq(i).attr("class");
                var claseH = $(".col-"+(j+1)).find("img").eq(cantidad+i).attr("class");
                clasesH.push(claseH);
                var claseV = $(".col-"+(i+1)).find("img").eq(cantidad+j).attr("class");
                clasesV.push(claseV);
            }
            clasesHorizontal.push(clasesH);
            clasesVertical.push(clasesV);
        }
        //console.log(clasesHorizontal);
        //console.log(clasesVertical);
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
        //console.log(posicionesHorizontales);
        //console.log(posicionesVerticales);
        var tiempoEfecto = 270; // 270 * 5 = 1350 [1350<tiempo=1500]
        for(var i=0; i<cantidad; i++){
            if(posicionesHorizontales[i].length>0){
                for(var j=0; j<posicionesHorizontales[i].length; j++){
                    var posicion = posicionesHorizontales[i][j];
                    $(".col-"+(posicion+1)).find("img").eq(i+cantidad).fadeOut(tiempoEfecto).fadeIn(tiempoEfecto).fadeOut(tiempoEfecto).fadeIn(tiempoEfecto).fadeOut(tiempoEfecto, function(){
                        $(this).parent().remove();
                    });
                    puntajeTotal += puntaje;  
                }             
            }
            if(posicionesVerticales[i].length>0){
                for(var j=0; j<posicionesVerticales[i].length; j++){
                    var posicion = posicionesVerticales[i][j];
                    $(".col-"+(i+1)).find("img").eq(posicion+cantidad).fadeOut(tiempoEfecto).fadeIn(tiempoEfecto).fadeOut(tiempoEfecto).fadeIn(tiempoEfecto).fadeOut(tiempoEfecto, function(){
                        $(this).parent().remove();
                    });
                    puntajeTotal += puntaje;  
                }                   
            }
        }
        //$("#score-text").empty().text(puntajeTotal);
        if(trayecto) actualizarPuntuacion();        
    }
    var actualizarPuntuacion = function(){
        $("#score-text").empty().text(puntajeTotal);
        traerMasCaramelos();
        elementosDragDrop();
    }
    var finalizarJuego = function(){
        $(".elemento").css({"height":"auto","width":"100%"});
        $(".panel-tablero").animate(
            { "border":"0", "height":"0%", "width":"0%" },
            { easing: 'swing', duration: tiempo, complete: function(){ $(this).remove();} }
        );
        $(".panel-score").animate({"width":"100%"},tiempo);
        $(".time").animate(
            {"border":"0","height":"0%","width":"0%"},
            { easing: 'swing', duration: tiempo, complete: function(){ $(this).remove();} }
        );
        $(".time").find("[class^='data']").animate(
            {"font-size":"0"},
            { easing: 'swing', duration: tiempo, complete: function(){ $(".final").fadeIn();} }
        );
    }
    var iniciarTimer = function(){ //https://jquerytimer.com/
        trayecto = true;
        $('#timer').timer({
            duration: '120s',
            format: '%M:%S',
            countdown: true,
            callback: function() {
                trayecto = false;
                finalizarJuego(); //alert('Tiempo cumplido');
            }
        });        
    }
    var elementosDragDrop = function(){
        $(".elemento img").draggable({
            containment: ".panel-tablero",
            opacity: 0.35
        });
        $(".elemento").droppable({
            accept: ".elemento img",
            drop: function( event, ui ) {
                var destino = $(this);
                var imagenDestino = destino.find("img");
                var cloneImagenDestino = imagenDestino.clone();
                imagenDestino.hide();       
                var imagenOrigen = $(ui.draggable);
                var origen = imagenOrigen.parent();
                destino.append(imagenOrigen.css({"left":0,"top":0,opacity:100}));
                destino.find("img:hidden").remove();
                origen.append(cloneImagenDestino.css({"left":0,"top":0,opacity:100}));
                movimientosTotal++;
                $("#movimientos-text").empty().text(movimientosTotal);
                //origen.css({"border":"5px solid #ff0"});
                //destino.css({"border":"5px solid #f00"});
            },
            over: function(event, ui) {
                var destino = $(this);
                var imagenDestino = destino.find("img");
                imagenDestino.css({opacity:0.35});
            },
            out: function(event, ui) {
                var destino = $(this);
                var imagenDestino = destino.find("img");
                imagenDestino.css({opacity:1});
            }
        });      
    }
    return {
        cargarJuego: function(){
            cambiarColorTitulo();
            mostrarCaramelosRandom();            
        },
        iniciarJuego: function(){
            iniciarTimer();
            obtenerLineasHV();
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
            boton.attr("data-estado","reinicio").text("Reiniciar");
            juegoAPP.iniciarJuego();
        }else{
            window.location.reload();
        }
    });
})