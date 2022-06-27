$(document).ready(function () {
    $("<form>" +
        "<div class='ui-widget'>" +
        "<label for='acInput'>Flower names: </label>" +
        "<input  id='acInput'>" +
        "</div>" +
        "</form>").appendTo("body")

//    Autocomplete using
    let data = ['Asters', 'Narcis', 'Rose', 'Pione', 'Primul'];

    let objectData = [
        {label: 'Астры (бордовые)', value: 'Астры'},
        {label: 'Нарцисы (белые)', value: 'Нарцисы'},
        {label: 'Розы (розовые)', value: 'Розы'},
        {label: 'Пионы (розовые)', value: 'Пионы'}]

    $("#acInput").autocomplete({
        // source: data
        autoFocus: true,
        disabled: false,
        delay: 600,
        minLength: 3,
        position: [-60, -50],
        source: objectData
    })
})
