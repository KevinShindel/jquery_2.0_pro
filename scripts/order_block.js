$(document).ready(function () {
    let totalOrder = $("#buttonDiv")
        .prepend("<div> Общий объём заказа: <span id='total'>0</span></div>")
        .css({padding: "5px"});
    $("<div id='bbox'></div>")
        .appendTo("body").append(totalOrder)

    // Определение общего объема заказа
    $("input").change(function (e) {
        let total = 0;
        $("input").each((index, element) => {
            total += Number($(element).val());
        })
        $("#total").text(total);
    })
})
