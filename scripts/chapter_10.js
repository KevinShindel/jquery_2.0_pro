// Использование эффектов jQuery

// методы show/hide
// $("<button type='button'>Hide</button><button type='button'>Show</button>").
// appendTo("#buttonDiv").
//     click(function (e) {
//     if ($(e.target).text() === 'Hide') {
//         $("#row1 div.dcell").hide();
//     } else {
//         $("#row1 div.dcell").show();
//     }
//     // e.preventDefault();
// })

// переключение видимости элементов
// $("<button>Switch visability</button>").
//     appendTo("#buttonDiv").click(function (e) {
//     $("div.dcell:first-child").toggle();
//     e.preventDefault();
// })

// односторонее переключение видимости элементов
// $("<button>Switch visability once</button>").
// appendTo("#buttonDiv").click(function (e) {
//     $("div.dcell:first-child").toggle(false);
//     e.preventDefault();
// })

// анимация видимости элементов ( fast ~ 200ms, normal ~ 400ms, slow ~ 600ms )
// linear - linear speed, swing - slow/fast/slow
// $("<button type='button'>Fast switch</button>").
// appendTo("#buttonDiv").click(function (e) {
//     $("img").toggle("fast", "linear"); // time, animation
//     e.preventDefault();
// })

// ипользование функций обратного вызова в эффектах
let hiddenRow = "#row2";
let visibleRow = "#row1";

$(hiddenRow).hide();
//
// function switchRowVariables() {
//     let temp = hiddenRow;
//     hiddenRow = visibleRow;
//     visibleRow = temp;
// }
//
// function hideVisibleElement() {
//     $(visibleRow).hide("slow", showHiddenElement);
// }
//
// function showHiddenElement() {
//     $(hiddenRow).show("fast", switchRowVariables);
// }
//
// $("<button>Switch</button>").
//     insertAfter("#buttonDiv button").
//     click(function (e) {
//         hideVisibleElement();
//         e.preventDefault();
// })

// использование встроеных функций обратного вызова
// $("<button type='button'>Switch</button>").
//     insertAfter("#buttonDiv button").click(function () {
//     $(visibleRow).hide("fast", function () {
//         $(hiddenRow).show("fast", function () {
//             let temp = hiddenRow;
//             hiddenRow = visibleRow;
//             visibleRow = temp;
//         })
//     })
// })

// Создание циклических эффектов

// использование функций обратного вызова для создание циклического эффекта
// function performEffect() { // run in cycle
//     $("h1").toggle("slow", performEffect)
// }
//
// $("<button type='button'>Switch</button>").
//     insertAfter("#buttonDiv button").
//     click(function (e) {
//         e.preventDefault();
//         performEffect();
// })

// эффекты плавного изменения высоты элементов

// использование эфектов скольжения
// $("<button type='button'>Launch</button>").
//     insertAfter("#buttonDiv button").
//     click(function (e) {
//     $("h1").slideToggle("fast"); // switchUp + switchDown
//     // $("h1").slideToggle("fast/normal/slow", function (e) {})
// })

// эфекты плавного изменения прозрачности эллементов
// $("<button type='button'>Fade run</button>").
//     insertAfter("#buttonDiv button").
//     click(function (e) {
//         $("h1").fadeToggle("slow", "swing"); // fadeIn + fadeOut
// })

// Анимация прозрачности до определенного значения
// $("<input type='number' id='fade' step='0.1' max='1' min='0' style='width: 50px'/>").
//     insertAfter("#buttonDiv button").
//     click(function () {
//         $("h1").fadeTo("fast", $("#fade").val());
// })

// создание пользовательских эффектов
// $("form").css({"position": "fixed", "top": "70px", "z-index": 2});
// $("h1").css({"position": "fixed", "z-index": 1, "min-width": 0,
// "border-collapse": "collapse", "top": 100});


let timespan = "slow";

// $("<button type='button'>Animation</button>").
//     insertAfter("#buttonDiv button").
//     click(function (e) {
//     $("h1").animate({
//         height: $("h1").height() + $("form").height() + 10,
//         width: ($("form").width())
//     });
//     e.preventDefault();
// })

// создание очереди эфектов и управление
cycleEffects();
function cycleEffects(){
    $("h1")
        .animate({left: "=+100"}, timespan)
        .animate({left: "-=100"}, timespan)
        .animate({height: 223, width: 700}, timespan)
        .animate({height: 30, width: 500}, timespan)
        .slideUp(timespan)
        .slideDown(timespan, cycleEffects)
}

// отображение информации об эффектах находящихся в очереди
// $("form").remove();
// $("h1").css({"position": "fixed", "z-index": 1, "min-width": 0});
// $("<table border='1'></table>").appendTo("body").css({
//     "position": "fixed", "z-index": 2,
//     "border-collapse": "collapse", "top": 100
// })

printQueue()
function printQueue() {
    let q = $("h1").queue();
    let qtable = $("table");
    qtable.html(`<tr><th>Длина очереди</th><td>${q.length}</td></tr>`)
    for (let i = 0; i<q.length; i++) {
        let baseString = `<tr><th>${i}</th><td>`
        if (q[i] === "inprogress") {
            $("table").append(`${baseString} Выполняется</td></tr>`)
        } else if (q[i].name === '') {
            $("table").append(baseString + q[i].name + "</td></tr>")
        } else {
            $("table").append(baseString + q[i].name + "</td></tr>")
        }
    }
    setTimeout(printQueue, 500);
}

// остановка эффектов и очистка очереди
// $("h1").css({"position": "fixed", "z-index": 1, "min-width": 0});
// $("form").remove();
// $("<table border='1'></table>").appendTo("body").css({
//     "position": "fixed", "z-index": 2,
//     "border-collapse": "collapse", "top": 100
// })
// $("<button type='button'>Stop</button><button type='button'>Start</button>")
//     .appendTo($(<div/>))
//     .appendTo("body")
//     .css({position: "fixed", "z-index": 2, "border-collapse": "collapse",
//     top: 98, left: 220})
//     .click(function (e) {
//         $(this).text() === "Stop" ? $("h1").stop(true, true) : cycleEffects();
//     })

// вставка задержки в очередь эффектов

// использование метода delay
// function cycleEffects(){
//     $("h1")
//         .animate({left: "=+100"}, timespan)
//         .animate({left: "-=100"}, timespan)
//         .delay(1000)
//         .animate({height: 223, width: 700}, timespan)
//         .animate({height: 30, width: 500}, timespan)
//         .delay(1000)
//         .slideUp(timespan)
//         .slideDown(timespan, cycleEffects)
// }

// вставка функций в очередь
function cycleEffects(){
    $("h1")
        .animate({left: "=+100"}, timespan)
        .animate({left: "-=100"}, timespan)
        .queue(function () {
            $("body").fadeTo(timespan, 0)
                .fadeTo(timespan, 1)
            $(this).dequeue();
        })
        .animate({height: 223, width: 700}, timespan)
        .animate({height: 30, width: 500}, timespan)
        .delay(1000)
        .slideUp(timespan)
        .slideDown(timespan, cycleEffects)
}

// включение/отключение анимационных эффектов
$.fx.off = true
