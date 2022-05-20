// Работа с событиями

// создаём функцию при наведении мышки
function handleMouseEnter(e) {
    $(this).css({
        "border": "thick solid red", "opacity": 0.5
    })
}
// создаём функцию при потери фокуса
function handleMouseOut(e) {
    $(this).css({
        "border": "", "opacity": ""
    })
}
// регистрируем обработчики событий
let img_query = $("img")
// img_query.bind("mouseenter", handleMouseEnter).bind("mouseout", handleMouseOut)


// регистрация функции для обработки нескольких типов событий
function handleMouse(event) {
    let cssData ={
        "border": "thick solid green",
        "opacity": 0.5
    }
    if (event.type === "mouseout") {
        cssData.border = "";
        cssData.opacity = "";
    }
    $(this).css(cssData);
}


// img_query.bind("mouseenter mouseout", handleMouse)

// Использование обьекта отображение для регистрации обработчиков событий
// img_query.bind({
//     mouseenter: function (){ $(this).css("border", "thick solid blue")},
//     mouseout: function () {$(this).css("border", "")},
// })

// Передача данных обработчику событий
// function handleMouse(event) {
//     let cssData ={
//         "border": "thick solid " + event.data,
//     }
//     if (event.type === "mouseout") {
//         cssData.border = "";
//     }
//     $(this).css(cssData);
// }
// img_query.
//         filter(':odd').
//         bind("mouseenter mouseout", "red", handleMouse).
//         end().
//         filter(":even").
//         bind("mouseenter mouseout", "blue", handleMouse)

// Отмена поведения браузера по умолчанию
// $("button:submit").bind("click", function (e){e.preventDefault()});
// $("button:submit").bind("click", false); // аналогично

// удаление всех обработчиков событий
// img_query.bind("mouseenter mouseout", handleMouse)
// $("img[src*=rose]").unbind();

// Открепление обработчика
let handleCount = 0
function handleMouseExit(e) {
    handleCount ++
    if (handleCount === 2) {
        $(this).unbind(e);
    }
}
// img_query.bind("mouseenter", handleMouseEnter).bind("mouseout", handleMouseExit);

// Установка разового обработчика событий
// img_query.one("mouseenter", handleMouseEnter).one("mouseout", handleMouseOut)

// Привязка живых событий
// img_query.bind({ // регистрирует только текущие элементы DOM
//     mouseenter: function (){
//         $(this).css("border", "thick solid red");
//     }
// })

// $(document).on({ // регистрирует динамические обьекты
//     mouseenter: handleMouseEnter,
//     onmouseout: handleMouseOut
// }, "img")

// $("#row1").on("mouseenter mouseout", "img", handleMouse) // ограничение выбора для регистраций событий
// $("#row1").off("onmouseout", "img") // удалить все события

// ограничение распространения живых событий по дереву узлов DOM
// $("#row1").delegate("img", { // ограничиваем область прослушивания
//     mouseenter: function (){
//         $(this).css("border", "thick solid red");
//     }, mouseout: function () {
//         $(this).css("border", "");
//     }
// })

// $("#row1").
//     append($("<div class='dcell' />")).
//     append($("<img src='../images/carnation.png' alt='carnation'/>")).
//     append("<label for='carnation'>Гвоздики:</label>").
//     append("<input name='carnation' value='0' type='number' required/>")

// вызов обработчиков вручную
// img_query.bind({mouseenter: function (){
//         $(this).css("border", "thick solid red");
//     }, mouseout: function () {
//         $(this).css("border", "")
//     }
// });
//
// $("<button>Запустить</button>").
//     appendTo("#buttonDiv").
//     bind("click", function (e) {
//         $("#row1 img").trigger("mouseenter");
//         e.preventDefault();
// })

// Использование обьекта event
// $("#row1 img").bind("mouseenter", function () {
//     $(this).css("border", "thick solid red")
// })
//
// $("#row2 img").bind("mouseenter", function (e) {
//     $(this).css("border", "thick solid blue");
//     $("#row1 img").trigger(e);
// })

// Использование метода triggerHandler
// $("#row1 img").bind("mouseenter", function () {
//     $(this).css("border", "thick solid red")
// })
//
// $("#row2 img").bind("mouseenter", function (e) {
//     $(this).css("border", "thick solid blue");
//     $("#row1 img").triggerHandler("mouseenter");
// })

// Использование прямых методов для работы с событиями
// img_query.mouseenter(function () {
//     $(this).css("border", "thick solid green")
// })

// Прямые методы для работы с событиями документа ready, load, unload
// $("#row1").load("example.html", {}, function () { // load external url, data, and success function
//     console.log('loading')
// })
// $(document).ready(function () { // launch function when document is ready
//     console.log('ready')
// }) // дождатся полной загрузки документа

// $(window).on("unload", function(e) { // method unload in 3.x version
//     e.preventDefault();
//     alert("call");
//     console.log("this will be triggered");
// });


// $(window).unload(function () { //  method is deprecated
//     console.log('unloaded')
// })

// $(document).error(function () { // deprecated in 3.x
//     console.log('error in page')
// })

$(document).on("error", function () {
    console.log('document has error!')
})

// использование прямых методов для работы с событиями формы
let input_query = $("input[type=number]")
// input_query.blur()
input_query.change(function (){
    console.log('changed')

})
