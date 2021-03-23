/// <reference path="jquery/index.d.ts"/>

$(document).ready(function () {

    /* Variables */

    var telon = $("#taparPantalla");
    var juego = $("#juego");
    var circulos = $(".circulosX, .circulosO");
    var titulo = $("#titulo");
    var comenzar = $("#comenzar");
    var comenzarBool;
    // var tema = $("#tema");
    var partida = $("#partida");
    var contador = 0;
    var signoXO = "X";
    var botones = $(".claseBotones");
    var botonesPulsados;
    var idBoton = "#btn";
    var idSpan = "#span-btn";
    var flash = $("#flash-izquierdo, #flash-derecho");
    var rightFlash = $("#flash-derecho");
    var leftFlash = $("#flash-izquierdo");
    var fin = $("#fin");
    var final;
    var finalPartida = $("#finalPartida");
    var winFlash;
    var resultados = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];
    var partidaXO;

    /* Efecto comienzo */

    function comienzo() {
        comenzar.hide();
        // tema.hide();
        circulos.hide();
        titulo.hide().delay(1000).fadeIn(100, function () {
            circulos.show();
            flash.animate({ width: '10%' }, 10);
            leftFlash.animate({ right: '100%' }, 250);
            rightFlash.animate({ left: '100%' }, 250, function(){
                telon.hide();
            });
            comenzar.fadeIn(500);
            // tema.fadeIn(500);
            comenzarBool = true;

            /* Pulsar Enter para empezar */

            $(document).delay(260).keypress(function (event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == '13' && comenzarBool) {
                    comenzar.fadeOut(250, function () {
                        partida.fadeIn(500);
                        botones.fadeIn(500);
                    });
                    // tema.fadeOut(250);
                    comenzarBool = false;
                    partidaXO = [
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9],
                        [1, 4, 7],
                        [2, 5, 8],
                        [3, 6, 9],
                        [1, 5, 9],
                        [3, 5, 7]
                    ];
                }
            });
        });
    }

    comienzo();

    /* Efecto antes de pulsar */

    botones.mouseenter(function () {
        if (contador % 2 == 0) {
            signoXO = "X";
        } else {
            signoXO = "O";
        }

        $(idSpan + numeroBoton).html(signoXO);
    });

    /* Funcionamiento */

    botones.click(function () {
    
        if ($(this).html().length > 1) {
            $(this).html(signoXO);
            $(this).removeClass("claseBotones");
            $(this).addClass("botonesPulsados");
            contador++;
        }

        for (var resultado in partidaXO) {
            final = true;

            for (var numeroResultado in partidaXO[resultado]) {
                if (partidaXO[resultado][numeroResultado] == numeroBoton) {
                    partidaXO[resultado][numeroResultado] = signoXO;
                }

                if (partidaXO[resultado][numeroResultado] != signoXO) {
                    final = false;
                }
            }

            /* Ganar partida */

            if (final) {
                telon.show();
                finalPartida.html("Fin de la partida - Gana " + signoXO);

                for (var numeroResultado in resultados[resultado]) {
                    $(idBoton + resultados[resultado][numeroResultado]).addClass("winFlash");
                    winFlash = $(".winFlash");
                }

                botones.css('transition', 'none');

                topEnd();

                var i = 0;

                while (i < 10) {
                    ganarFlash(i);
                    i++;
                }

                function ganarFlash(i) {
                    setTimeout(() => {
                        if (i % 2 == 0) {
                            winFlash.css({
                                'box-shadow': '0px 0px 10px #f00, 0px 0px 10px #f00 inset',
                                'color': '#f00',
                                'text-shadow': '0px 0px 20px #f00'
                            });
                        } else {
                            winFlash.css({
                                'box-shadow': '0px 0px 10px #0ff, 0px 0px 10px #0ff inset',
                                'color': '#0ff',
                                'text-shadow': '0px 0px 20px #0ff'
                            });
                        }
                    }, 100 * i);
                }

                setTimeout(borrarNumeros, 1250);

                botones.delay(2500).animate({
                    width: '0px',
                    height: '0px'
                }, 2000);

                break;
            }
        }

        /* Empatar */

        if (!final && contador == 9) {
            telon.show();
            finalPartida.html("Fin de la partida - Empate");

            topEnd();

            botones.css({
                'box-shadow': '0px 0px 10px #0f0, 0px 0px 10px #0f0 inset',
                'color': '#0f0',
                'text-shadow': '0px 0px 20px #0f0'
            });
            
            setTimeout(() => {
                botones.css({
                    'box-shadow': '0px 0px 10px #00f, 0px 0px 10px #00f inset',
                    'color': '#0ff',
                    'text-shadow': '0px 0px 20px #0ff'
                });
            }, 1000);

            setTimeout(() => {
                botones.delay(1000).css('transition', 'none');
            }, 1300);

            setTimeout(borrarNumeros, 1250);

            botones.delay(2500).animate({
                width: '0px',
                height: '0px'
            }, 2000);
        }

        /* Animacion superior */

        function topEnd() {
            fin.animate({top: '0px'}, 1000, function(){
                finalPartida.animate({left: '100%'}, 4000, 'linear', function(){
                    $(this).css('left', '-100%');
                    $(this).delay(500).animate({left: '100%'}, 4000, 'linear', function(){
                        $(this).css('left', '-100%');
                        fin.animate({top: '-10%'}, 1000);
                    });
                });
            });
        }

        /* Borrar numeros */

        function borrarNumeros() {
            for (let i = 1; i < 10; i++) {
                setTimeout(() => {
                    $(idBoton + i).html("");
                    $(idBoton + i).css({
                        'box-shadow': '0px 0px 10px #f00, 0px 0px 10px #f00 inset',
                        'color': '#f00',
                        'text-shadow': '0px 0px 20px #f00'
                    });
                }, 100 * i);
                setTimeout(() => {
                    $(idBoton + i).css({
                        'box-shadow': '0px 0px 10px #00f, 0px 0px 10px #00f inset',
                        'color': '#0ff',
                        'text-shadow': '0px 0px 20px #0ff'
                    });
                }, 100 * i + 100);
            }

            setTimeout(nuevaPartida, 5000);
        }
    });

    /* Nueva partida */

    function nuevaPartida() {
        telon.hide();
        comenzar.fadeIn(500);
        // tema.fadeIn(500);
        comenzarBool = true;
        contador = 0;
        
        for (let i = 1; i < 10; i++) {
            $(idBoton + i).html("<span id='span-btn" + i + "'></span>");
        }

        botones.css({
            'width': '40px',
            'height': '40px'
        });
        botones.hide();
        botones.addClass("claseBotones");
        botones.removeClass("botonesPulsados");
        botones.removeClass("winFlash");
        botones.attr('style', '');
    }
});

var numeroBoton;

function getId(id) {
    numeroBoton = id;
}