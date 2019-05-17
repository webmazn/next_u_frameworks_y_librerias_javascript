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
    var caramelosLineaHorizontal = function(){        
        //var posicion = 0;
        var clasesTotales = new Array();
        for(var i=0; i<cantidad; i++){
            var clases = new Array();
            //var nuevaPosicion = 0;
            for(var j=0; j<cantidad; j++){
                //var horizontal = '';
                //$(".col-1").find("img").eq(0).css({"border":"1px solid #000"});
                var clase = $(".col-"+(j+1)).find("img").eq(i).attr("class");
                //console.log(".col-"+(j+1)+" / img "+i+" / clase "+clase)
                /*if(j==0){
                    console.log("posicion "+posicion+" / j "+j+" / clase "+clase);
                    clases[posicion] = clase;
                }else{*/
                    //console.log(posicion);
                    clases.push(clase);                  
                    /*if(clases[posicion]==clase){
                        nuevaPosicion = ++posicion;
                        console.log("nuevaPosicion "+nuevaPosicion+" / j "+j+" / clase "+clase);
                        clases[nuevaPosicion] = clase;
                        posicion = nuevaPosicion;
                        //clases.push(clase);
                    }else{
                        if(clases.length<=3){
                            clases[posicion] = clase;
                        }else{

                        }
                    }*/
                //}
            }
            /*if(clases.length<3){
                clases = [];
            }else{
                for(var i=0; i<clases.length; i++){

                }
            }*/
            //console.log("===============================================================");
            //posicion = 0;
            clasesTotales.push(clases);
        }
        console.log(clasesTotales);
        var clasesPermitidas = new Array();
        for(var i=0; i<cantidad; i++){
            var clasePermitida = new Array();
            for(var j=0; j<cantidad; j++){
                if(clasesTotales[i][j]==clasesTotales[i][j-1] && clasesTotales[i][j]==clasesTotales[i][j+1]){
                    //if(!clasePermitida.includes(clasesTotales[i][j])){
                        clasePermitida.push(j-1);
                        clasePermitida.push(j);
                        clasePermitida.push(j+1);
                    //}
                }
            }
            clasesPermitidas.push(clasePermitida);
        }
        console.log(clasesPermitidas);
    }
    return {
        iniciarJuego: function () {
            cambiarColorTitulo();
            mostrarCaramelosRandom();
            caramelosLineaHorizontal();
        }
      }
})();
$(document).ready(function(){
    juegoAPP.iniciarJuego();
})