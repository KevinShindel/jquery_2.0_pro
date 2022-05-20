// Первый сценарий jQuery
$(document).ready(function () { // скрипт выполнится как только документ будет загружен
    $('img:odd').mouseenter(function (e) {
        $(this).css('opacity', 0.5);
    }).mouseout(function (e) {
        $(this).css('opacity', 1.0);
    })
    console.log('Сценарий выполнен');
});

//  задержка срабатывания события ready
$.holdReady(true); // установить задержку загрузки скриптов
setTimeout(function () { // убрать задержку загрузки
    console.log('Отмена задержки')
    $.holdReady(false);
}, 500)

// Выбор элементов DOM
let elem = document.getElementById('oblock');
let query =  $('img:odd', elem)

$.each(query, (index, element) => {
    element.style.border = 'green 2px solid';
    element.style.boxShadow = '5px 5px 12px 2px black'
});

let elements = $('body *');
let index = elements.index($('#oblock'));
console.log(index);

let elem2 = $("img:odd").get(1);
console.log(elem2);

let label_query = $('label')
label_query.css('color', 'blue').css('font-size', '0.75em'); // css chains
label_query.css('color', 'blue'). // method chains
            add("input[name!='rose']"). // add new query
            filter("[for!='snowdrop']"). // filter query
            css("font-size", "0.75em") // add css styles

