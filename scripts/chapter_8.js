// // Манипуляции с элементами
// let imgQuery = $("img")
// // Чтение значения атрибута
// let srcValue = imgQuery.attr("src");
// console.log('Значение атрибута SRC: ', srcValue)
//
//
// // установка значения атрибута
// imgQuery.attr("src", "../images/lily.png")
//
// // утсановка нескольких атрибутов
// imgQuery.attr({"src": "../images/flowericon.png",
//                 "style": "thick solid black",
//                 "width": "32px",
//                 "height": "32px"})
//
// // Динамическая установка значений атрибутов
// imgQuery.attr("src", function (idx, oldVal) {
//     if(oldVal.indexOf("rose") > -1) {
//         return '../images/lily.png'
//     } else if ($(this).closest("#row2").length > 0) { // заменить все src во втором ряду
//         return "../images/carnation.png"
//     }
// })
//
// // удаление атрибутов
// imgQuery.attr("style", "border: thick solid black")
// $("img:odd").removeAttr("style")
// let imgQuery = $("img")

// $("*[class]").each(function (idx, elem)  {
//     // метод prop для получения значения свойства
//     console.log("Element: " + elem.tagName + " " + $(elem).prop("className"))
// })
//
//
// // Работа с классами
// imgQuery.addClass("redBorder");
// $("img:even").removeClass("redBorder").addClass("blueBorder")
//
// imgQuery.each(function (ix, elem) {
//     console.log("element: " + $(elem).hasClass("redBorder") + " " + elem.src)
// })

// добавление / удаление классов с помощью функции
// imgQuery.addClass(function (idx, currClasses) {
//     if (idx % 2 === 0) {
//         return 'blueBorder'
//     } else {
//         return "redBorder"
//     }
// })

// imgQuery.
//         filter(":odd"). // filter only odd elements
//         addClass("redBorder"). // add redBorder class to them
//         end(). // возвращает imgQuery
//         filter(":even"). // select even elements
//         addClass("blueBorder") // add blueBorder class to them
//
// // переключение отдельного класса
// // $("#buttonDiv").append("<button type='button' onclick='doToggle(event)'>Toggle</button>")
//
// function doToggle(e) {
//     imgQuery.toggleClass("redBorder")
//     e.preventDefault();
// }
//
// function doToggleOn(e) {
//     $("img, label").toggleClass("yellowBorder", true);
//     e.preventDefault();
//
// }
//
// function doToggleOff(e) {
//     $("img, label").toggleClass("yellowBorder", false);
//     e.preventDefault();
//
// }
//
// // Согласование порядка объявления стилей с переключением классов
// $("<button>Переключить</button>").appendTo("#buttonDiv").click(doToggle)
//
// $("<button>Переключить</button>").appendTo("#buttonDiv").click(doToggleOn);
// $("<button>Вернуть</button>").appendTo("#buttonDiv").click(doToggleOff);
//
// // Переключение классов с помощью функций
//
// function doToggleFn(e) {
//     imgQuery.toggleClass(function (index, currentClass) {
//         if (index % 2 === 0) {
//             return "yellowBorder"
//         } else {
//             return ""
//         }
//         e.preventDefault();
//     })
// }
//
// // Работа с CSS
// let labelQuery= $("label")
// // использования метода css для получения и установки значений
// let sizeVal = labelQuery.css("font-size") // get value from css attr
// console.log(sizeVal)
// labelQuery.css("font-size", "1.5em")
//
// // получения значений одновременно нескольких свойств CSS
// let propNames = ["font-size", "color", "border"]
// let cssValues = labelQuery.css(propNames)
// for (let i=0; i< propNames.length; i++) {
//     console.log("Property: " + propNames[i] + " value -> " + cssValues[propNames[i]]);
// }
//
// // установка значений одновременно нескольких свойств CSS
// labelQuery.css("font-size", "1.5em").css("color", "blue");
// // тоже самое с помощью обьекта
// labelQuery.css({"font-size": "1.5em", "color": "blue"});
//
// // установка относительных значений
// labelQuery.filter(":odd").css("font-size", "+=5")
// labelQuery.filter(":even").css("font-size", "-=5")
//
// // использование специализированых методов для работы со свойствами CSS
// let position = imgQuery.position();
// console.log("top: " + position.top + " left: " + position.left);
//
// // установка ширины и высоты с помощью функций
// $("#row img").
//             css("border", "thick solid red").
//             height(function (index, currentValue) {
//                 return (index + 1) * 25
// });
//
// // работа с содержимым элементов
// let html = $("div.dcell").html();
// console.log(html);
//
// // замена содержимого
// $("#row2 div.dcell").html($("div.dcell").html());
//
// // использование метода val() для получения значений элементов input
// $("input").each(function (idx, el) {
//     console.log("Name: " + el.name + " value: " + $(el).val());
// })

// измения значений методом val()
$("input").css("width", "3em");
$("<button>Установить значение</button>").appendTo("#buttonDiv").click(function (e){
    $("input").filter(":odd").val(100).end().filter(":even").val(50);
    e.preventDefault();
})

// связывание данных с элементами
$("img").each(function () {
    $(this).data("product", $(this).siblings("input[name]").attr("name"))
})

// найти элементы с данными и получить знчения
$("img").filter(function (){
    return $(this).data("product") !== null;
}).each(function () {
    console.log("Element: " + this.tagName + " " + $(this).data("product"))
})

// удалить значения
$("img").removeData();
