var juegoAPP = (function(){
    var tiempo = 1500;
    var color1 = "#DCFF0E";
    var color2 = "#FFFFFF";
    var cantidad = 7;
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
        }, tiempo);
        //clearInterval(intervalo);
    }
    var generarCamarelos = function(){
        return Math.floor((Math.random() * caramelos) + 1);        
    }
    var mostrarCaramelosRandom = function(){
        var cantidadM =cantidad*2;
        for(var i=0;i<cantidadM; i++){
            for(var j=0;j<cantidadM; j++){
                var caramelo = generarCamarelos();
                $(".col-"+(i+1)).append("<div class='elemento'><img src='image/"+caramelo+".png' class='caramelo"+caramelo+" permitido'></div>")
            }
        }
    }
    var traerMasCaramelos = function(){
        setTimeout(function(){
            //$(".elemento img").draggable("disable");
            for(var i=0; i<cantidad; i++){
                var caramelos = $(".col-"+(i+1)).find("img").length;
                var diferencia = (cantidad*2)-caramelos;
                if(diferencia>0){                    
                    for(var j=0;j<diferencia; j++){
                        var caramelo = generarCamarelos();
                        $(".col-"+(i+1)).prepend("<div class='elemento'><img src='image/"+caramelo+".png' class='caramelo"+caramelo+" permitido'></div>");
                    }
                }
            }
            obtenerLineasHV();
            //$(".elemento img").draggable("enable");  
        },tiempo);
    }
    var obtenerLineasHV = function(){
        var clasesHorizontal = new Array();
        var clasesVertical = new Array();
        for(var i=0; i<cantidad; i++){
            var clasesH = new Array();
            var clasesV = new Array();
            for(var j=0; j<cantidad; j++){
                var clasesHorizontales = $(".col-"+(j+1)).find("img").eq(cantidad+i).attr("class");
                var claseHorizontal = clasesHorizontales.replace("permitido","").replace("ui-draggable","").replace("ui-draggable-handle","");
                var claseH = claseHorizontal.trim();
                clasesH.push(claseH);
                var clasesVerticales = $(".col-"+(i+1)).find("img").eq(cantidad+j).attr("class");
                var claseVertical = clasesVerticales.replace("permitido","").replace("ui-draggable","").replace("ui-draggable-handle","");                
                var claseV = claseVertical.trim();
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
        //console.log(posicionesHorizontales);
        //console.log(posicionesVerticales);
        var tiempoEfecto = 245; // 249 * 6 = 1494 [1350<tiempo]
        for(var i=0; i<cantidad; i++){
            if(posicionesHorizontales[i].length>0){
                for(var j=0; j<posicionesHorizontales[i].length; j++){
                    var posicion = posicionesHorizontales[i][j];
                    $(".col-"+(posicion+1)).find("img").eq(i+cantidad).fadeOut(tiempoEfecto).fadeIn(tiempoEfecto).fadeOut(tiempoEfecto).fadeIn(tiempoEfecto).fadeOut(tiempoEfecto, function(){
                        $(this).parent().animate(
                            { "height":"0px", "width":"0px" },
                            { easing: 'swing', duration: tiempoEfecto, complete: function(){ $(this).remove();} }
                        );
                    });
                    puntajeTotal += puntaje;  
                }             
            }
            if(posicionesVerticales[i].length>0){
                for(var j=0; j<posicionesVerticales[i].length; j++){
                    var posicion = posicionesVerticales[i][j];
                    $(".col-"+(i+1)).find("img").eq(posicion+cantidad).fadeOut(tiempoEfecto).fadeIn(tiempoEfecto).fadeOut(tiempoEfecto).fadeIn(tiempoEfecto).fadeOut(tiempoEfecto, function(){
                        $(this).parent().animate(
                            { "height":"0px", "width":"0px" },
                            { easing: 'swing', duration: tiempoEfecto, complete: function(){ $(this).remove();} }
                        );
                    });
                    puntajeTotal += puntaje;  
                }                   
            }
        }
        if(trayecto) actualizarPuntuacion();        
    }
    var actualizarPuntuacion = function(){
        $("#score-text").empty().text(puntajeTotal);
        traerMasCaramelos();
        elementosDragDrop();
    }
    var actualizarMovimiento = function(){
        movimientosTotal++;
        $("#movimientos-text").empty().text(movimientosTotal);
        //traerMasCaramelos();
        elementosDragDrop();
    }    
    var finalizarJuego = function(){
        $(".elemento").css({"height":"auto","width":"100%"});
        for(var i=0; i<cantidad; i++){
            for(var j=0; j<cantidad; j++){
                $(".col-"+i).find(".elemento").eq(j).remove();
                console.log(".col-"+i+"/.elemento:"+j);
            }
        }
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
    var elementosGrid = function(elemento,ui){
        var elementos = [];
        var destino = elemento;
        var imagenDestino = destino.find("img");
        var cloneImagenDestino = imagenDestino.clone();
        var imagenOrigen = $(ui.draggable);
        var origen = imagenOrigen.parent();
        var posicion = origen.index();
        var clase = origen.parent().attr("class");
        var columna = clase.substring(clase.length - 1, clase.length);
        var columnaAnterior = $(".col-"+(parseInt(columna)-1)).find(".elemento").eq(posicion);
        var columnaPosterior = $(".col-"+(parseInt(columna)+1)).find(".elemento").eq(posicion);
        elementos['destino'] = destino;
        elementos['imagenDestino'] = imagenDestino;
        elementos['cloneImagenDestino'] = cloneImagenDestino;
        elementos['imagenOrigen'] = imagenOrigen;
        elementos['origen'] = origen;
        elementos['posicion'] = posicion;
        elementos['clase'] = clase;
        elementos['columna'] = columna;
        elementos['columnaAnterior'] = columnaAnterior;
        elementos['columnaPosterior'] = columnaPosterior;
        return elementos;
    }
    var elementosDragDrop = function(){
        $(".elemento img").draggable({
            containment: ".panel-tablero",
            //opacity: 0.35,
            cursor: "move",
            revert: "invalid",
            drag: function(event, ui ){
                var origen = $(this).parent();
                origen.prev().addClass("elementosPermitidos");
                origen.next().addClass("elementosPermitidos");
                var posicion = origen.index(); 
                var clase = origen.parent().attr("class");
                var columna = clase.substring(clase.length - 1, clase.length);
                var columnaAnterior = $(".col-"+(parseInt(columna)-1)).find(".elemento").eq(posicion);
                var columnaPosterior = $(".col-"+(parseInt(columna)+1)).find(".elemento").eq(posicion);                
                columnaAnterior.addClass("elementosPermitidos");
                columnaPosterior.addClass("elementosPermitidos");   
            }
        });
        $(".elemento").droppable({
            accept: ".permitido",
            over: function(event, ui) {
                var element = elementosGrid($(this),ui);

                element['imagenDestino'].css({opacity:0.35});
                //element['imagenOrigen'].addClass("permitido");
                //$(".elemento").removeClass("elementosPermitidos");
                $(".elemento img").css({opacity:1});                   
            },
            out: function(event, ui) {
                var element = elementosGrid($(this),ui);
                $(".elemento").removeClass("elementosPermitidos");
                $(".elemento img").addClass("permitido");
                element['imagenDestino'].css({opacity:1});
                element['imagenOrigen'].removeClass("permitido");
                /*element['origen'].prev().addClass("elementosPermitidos");
                element['origen'].next().addClass("elementosPermitidos");
                element['columnaAnterior'].addClass("elementosPermitidos");
                element['columnaPosterior'].addClass("elementosPermitidos");*/
            }
        });  
        $(".elementosPermitidos").droppable({
            accept: ".ui-draggable-dragging",
            drop: function( event, ui ) {
                var element = elementosGrid($(this),ui);
                element['imagenDestino'].hide();
                element['destino'].append(element['imagenOrigen'].css({"left":0,"top":0,opacity:100}));
                //element['destino'].find("img:hidden").remove();
                element['origen'].append(element['imagenDestino'].animate({"left":0,"top":0,opacity:100}).fadeIn(250));         
                $(".elemento").removeClass("elementosPermitidos");
                $(".elemento img").css({opacity:1}).addClass("permitido");
                actualizarMovimiento();
            }
        });
        //elementosDragDrop();
    }
    return {
        cargarJuego: function(){
            cambiarColorTitulo();
            mostrarCaramelosRandom();            
        },
        iniciarJuego: function(){
            //iniciarTimer();
            trayecto = true;
            obtenerLineasHV();
        }
    }
})();
$(document).ready(function(){
    juegoAPP.cargarJuego();

    $(".btn-reinicio").on("click", function(){
        var boton = $(this);
        var estado = boton.attr("data-estado");
        if(estado=="inicio"){
            boton.attr("data-estado","reinicio").text("Reiniciar");
            juegoAPP.iniciarJuego();
        }else{
            window.location.reload();
        }
    });
})