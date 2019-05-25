var juegoAPP = (function () {
  var tiempo = 1500;
  var tiempoEfecto = (tiempo / 6) - 5;//245;
  var tiempoOut = tiempo + tiempoEfecto;
  var tiempoEnd = tiempo / 3;
  var color1 = "#DCFF0E";
  var color2 = "#FFFFFF";
  var cantidad = 7;
  var caramelos = 4;
  var puntaje = 10;
  var puntajeTotal = 0;
  var movimientosTotal = 0;
  var trayecto = false;

  var cambiarColorTitulo = function () {
    var titulo = $(".main-titulo");
    var contador = 0;
    setInterval(function () { //var intervalo = 
      titulo.animate({
        "color": (contador % 2 == 0 ? color2 : color1)
      });
      contador++;
    }, tiempo); //clearInterval(intervalo);
  }
  var generarCamarelos = function () {
    return Math.floor((Math.random() * caramelos) + 1);
  }
  var mostrarCaramelosRandom = function () {
    var cantidadCaramelos = cantidad * 2;
    for (var i = 0; i < cantidadCaramelos; i++) {
      for (var j = 0; j < cantidadCaramelos; j++) {
        var caramelo = generarCamarelos();
        var ver = (j>=cantidad) ? 'ver' : '';
        $(".col-" + (i + 1)).append("<div class='elemento "+ver+"'><img src='image/" + caramelo + ".png' class='caramelo" + caramelo + " permitido'></div>")
      }
    }
  }
  var traerMasCaramelos = function () {    
    elementosDragDrop(1);
    if (trayecto) {
      var agregados = 0;
      setTimeout(function () {
        for (var i = 0; i < cantidad; i++) {
          var caramelos = $(".col-" + (i + 1)).find("img").length;
          var diferencia = (cantidad * 2) - caramelos;
          if (diferencia > 0) {
            agregados += diferencia
            for (var j = 0; j < diferencia; j++) {              
              var caramelo = generarCamarelos();
              $(".col-" + (i + 1)).prepend("<div class='elemento'><img src='image/" + caramelo + ".png' class='caramelo" + caramelo + " permitido'></div>");
            }
          }
        }
        if(agregados>0){      
          obtenerLineasHV();
          //elementosDragDrop(0);
          mostrarIndicador(2);
          limpiarElementosGrid(1); 
        }else{
          elementosDragDrop(1);
          mostrarIndicador(3);
        }
      }, tiempoOut);// clearTimeout(tiempoEspera);
    }
  }
  var obtenerLineasHV = function () { // Obtener Lineas Horizontales y Verticales
    if ($(".panel-tablero").length > 0) {      
      var clasesHorizontal = new Array();
      var clasesVertical = new Array();
      for (var i = 0; i < cantidad; i++) {
        var clasesH = new Array();
        var clasesV = new Array();
        for (var j = 0; j < cantidad; j++) {
          var clasesHorizontales = $(".col-" + (j + 1)).find("img").eq(cantidad + i).attr("class");
          var claseHorizontal = clasesHorizontales.replace("permitido", "").replace("ui-draggable", "").replace("ui-draggable-handle", "");
          var claseH = claseHorizontal.trim();
          clasesH.push(claseH);
          var clasesVerticales = $(".col-" + (i + 1)).find("img").eq(cantidad + j).attr("class");
          var claseVertical = clasesVerticales.replace("permitido", "").replace("ui-draggable", "").replace("ui-draggable-handle", "");
          var claseV = claseVertical.trim();
          clasesV.push(claseV);
        }
        clasesHorizontal.push(clasesH);
        clasesVertical.push(clasesV);
      }
      //console.log(clasesHorizontal);
      //console.log(clasesVertical);
      var posicionesHorizontales = new Array();
      var posicionesVerticales = new Array();
      for (var i = 0; i < cantidad; i++) {
        var posicionHorizontal = new Array();
        var posicionVertical = new Array();
        for (var j = 0; j < cantidad; j++) {
          if (clasesHorizontal[i][j] == clasesHorizontal[i][j - 1] && clasesHorizontal[i][j] == clasesHorizontal[i][j + 1]) {
            if (!posicionHorizontal.includes(j - 1)) posicionHorizontal.push(j - 1);
            if (!posicionHorizontal.includes(j)) posicionHorizontal.push(j);
            if (!posicionHorizontal.includes(j + 1)) posicionHorizontal.push(j + 1);
          }
          if (clasesVertical[i][j] == clasesVertical[i][j - 1] && clasesVertical[i][j] == clasesVertical[i][j + 1]) {
            if (!posicionVertical.includes(j - 1)) posicionVertical.push(j - 1);
            if (!posicionVertical.includes(j)) posicionVertical.push(j);
            if (!posicionVertical.includes(j + 1)) posicionVertical.push(j + 1);
          }
        }
        posicionesHorizontales.push(posicionHorizontal);
        posicionesVerticales.push(posicionVertical);
      }
      //console.log(posicionesHorizontales);
      //console.log(posicionesVerticales);
      // 249 * 6 = 1494 [1350<tiempo]
      for (var i = 0; i < cantidad; i++) {
        if (posicionesHorizontales[i].length > 0) {
          for (var j = 0; j < posicionesHorizontales[i].length; j++) {
            var posicion = posicionesHorizontales[i][j];
            $(".col-" + (posicion + 1)).find("img").eq(i + cantidad).fadeOut(tiempoEfecto).fadeIn(tiempoEfecto).fadeOut(tiempoEfecto).fadeIn(tiempoEfecto).fadeOut(tiempoEfecto, function () {
              $(this).parent().animate({
                "height": "0px",
                "width": "0px"
              }, {
                easing: 'swing',
                duration: tiempoEfecto,
                complete: function () {
                  $(this).remove();
                }
              });
            });
            puntajeTotal += puntaje;
          }
        }
        if (posicionesVerticales[i].length > 0) {
          for (var j = 0; j < posicionesVerticales[i].length; j++) {
            var posicion = posicionesVerticales[i][j];
            $(".col-" + (i + 1)).find("img").eq(posicion + cantidad).fadeOut(tiempoEfecto).fadeIn(tiempoEfecto).fadeOut(tiempoEfecto).fadeIn(tiempoEfecto).fadeOut(tiempoEfecto, function () {
              $(this).parent().animate({
                "height": "0px",
                "width": "0px"
              }, {
                easing: 'swing',
                duration: tiempoEfecto,
                complete: function () {
                  $(this).remove();
                }
              });
            });
            puntajeTotal += puntaje;
          }
        }
      }
      actualizarPuntuacion();
    }
  }
  var identificarCampoDeJuego = function(){
    var cantidadCaramelos = cantidad * 2;
    for (var i = 0; i < cantidadCaramelos; i++) {
      for (var j = 0; j < cantidadCaramelos; j++) {
        if(j>=cantidad) $(".col-" + (i + 1)).find(".elemento ").eq(j).addClass("ver");
      }
    }
    //console.log("En juego: "+$(".ver").length);
  }
  var actualizarPuntuacion = function () {
    if (parseInt($("#score-text").text()) < puntajeTotal){
      mostrarIndicador(1);
      $("#score-text").empty().text(puntajeTotal);
    }
    traerMasCaramelos();  
  }
  var actualizarMovimiento = function () {
    movimientosTotal++;
    $("#movimientos-text").empty().text(movimientosTotal);
  }
  var pararJuego = function () {
    $(".elemento").css({
      "height": "auto",
      "width": "100%"
    });
    for (var i = 0; i < cantidad; i++) {
      for (var j = 0; j < cantidad; j++) {
        $(".col-" + (i + 1)).find(".elemento").eq(j).remove();
      }
    }
    var estilo = {"border": "0","height": "0%","width": "0%"};
    $(".panel-tablero").animate(estilo, {
      easing: 'swing',
      duration: (tiempoEnd),
      complete: function () {
        $(this).remove();
      }
    });
    $(".panel-score").animate({
      "width": "100%"
    }, tiempo);
    $(".time").animate(estilo, {
      easing: 'swing',
      duration: (tiempoEnd),
      complete: function () {
        $(this).remove();
      }
    });
    $(".time").find("[class^='data']").animate({
      "font-size": "0"
    }, {
      easing: 'swing',
      duration: (tiempoEnd),
      complete: function () {
        $(".final").fadeIn();
      }
    });
  }
  var iniciarTimer = function () { //https://jquerytimer.com/
    trayecto = true;
    $('#timer').timer({
      duration: '120s',
      format: '%M:%S',
      countdown: true,
      callback: function () {
        trayecto = false;
        pararJuego();
      }
    });
  }
  var limpiarElementosGrid = function (accion) {
    $(".panel-tablero").find("[class^='col-']").find("div")
      .removeClass("ui-droppable")
      .removeClass("ui-droppable-active")
      .removeClass("ui-droppable-hover")
      .removeClass("elementosPermitidos");
    if (accion == 0) {
      $(".elemento img").addClass("permitido");
    } else if (accion == 1) {
      $(".elemento img").removeClass("permitido");
    }
  }
  var elementosDragDrop = function (activar) {
    if(activar==1){
      $(".elemento img").draggable({
        stack: ".elemento img",
        containment: ".panel-tablero",
        cursor: "move",
        revert: "invalid",
        start: function (event, ui) { limpiarElementosGrid(1); },
        drag: function (event, ui) {
          $(".elemento").droppable("disable");
          $(this).addClass('permitido');
          var origen = $(this).parent();
          var optionDrop = {
            accept: ".permitido",
            tolerance: "pointer",
            greedy: true,
            drop: elementoDroppeable
          }
          origen.prev().addClass("elementosPermitidos").droppable(optionDrop);
          origen.next().addClass("elementosPermitidos").droppable(optionDrop);
          var posicion = origen.index();
          var clase = origen.parent().attr("class");
          var columna = clase.substring(clase.length - 1, clase.length);
          var columnaAnterior = $(".col-" + (parseInt(columna) - 1)).find("div").eq(posicion);
          var columnaPosterior = $(".col-" + (parseInt(columna) + 1)).find("div").eq(posicion);
          columnaAnterior.addClass("elementosPermitidos").droppable(optionDrop);
          columnaPosterior.addClass("elementosPermitidos").droppable(optionDrop);
          $(".elementosPermitidos").droppable("enable");
        }
      });
      $(".elemento").droppable();
    }else{
      $(".elemento img").draggable("destroy");
    }
  }
  var elementoDroppeable = function (event, ui) {
    var element = [];
    element['destino'] = $(this);
    element['imagenDestino'] = element['destino'].find("img");
    element['imagenOrigen'] = $(ui.draggable);
    element['origen'] = element['imagenOrigen'].parent();
    element['destino'].append(element['imagenOrigen'].css({
      "left": 0,
      "top": 0,
      opacity: 100
    }));
    var nt = element['destino'].offset().top - element['origen'].offset().top;
    var nl = element['destino'].offset().left - element['origen'].offset().left;
    element['origen'].append(
      element['imagenDestino']
      .css({
        "left": nl,
        "top": nt
      })
      .delay(245)
      .animate({
        "left": 0,
        "top": 0
      }, {
        easing: 'swing',
        duration: tiempoEfecto,
        complete: function () {
          actualizarMovimiento();
          limpiarElementosGrid(1);
          obtenerLineasHV();
          $(".elemento").droppable("enable");
        }
      })
    );
  }
  var mostrarIndicador = function(opcion){
    switch(opcion){
      case 0: $(".panel-tablero").append("<div id='indicador' class='colorDefecto'>Inicio...</div>"); break;
      case 1: $("#indicador").removeClass().addClass("colorAcumular").empty().text("››› Acumulando puntaje ‹‹‹").fadeIn(tiempoEfecto); break;      
      case 2: $("#indicador").removeClass().addClass("colorCaramelo").empty().text("››› Trayendo caramelos ‹‹‹").fadeIn(tiempoEfecto); break;
      case 3: $("#indicador").removeClass().addClass("colorContinua").empty().text("››› Continuar el juego ‹‹‹").delay(tiempoEfecto).fadeOut(tiempo); break;      
    }
  }
  return {
    cargarJuego: function () {
      cambiarColorTitulo();
      mostrarCaramelosRandom();
    },
    iniciarJuego: function () {
      iniciarTimer();
      mostrarIndicador(0);
      obtenerLineasHV();
    },
    finalizarJuego: function () {
      pararJuego();
    }
  }
})();
$(document).ready(function () {
  juegoAPP.cargarJuego();
  $(".btn-reinicio").on("click", function () {
    var boton = $(this);
    var estado = boton.attr("data-estado");
    if (estado == "inicio") {
      boton.attr("data-estado", "reinicio").text("Reiniciar");
      juegoAPP.iniciarJuego();
    } else {
      window.location.reload(); // juegoAPP.finalizarJuego();
    }
  });
});