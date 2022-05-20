// Рефакторинг примера часть 1

// добавление на страницу новых элементов дя отображения дополнительных видов
$(document).ready(function (){

    // let fNames = ["carnation", "lily", "orchid"]
    // let frNames = ["Гвоздики", "Лилии", "Орхидеи"]
    // let fRow = $("<div class='drow' id='row3' ></div>")
    //     .appendTo("div.dtable")
    // let fTemplate = $("<div class='dcell'><img/><label></label><input/></div>")
    // for (let i =0; i<fNames.length; i++) {
    //     fTemplate.clone()
    //         .appendTo(fRow)
    //         .children()
    //         .filter("img").attr("src", "images/" + fNames[i] + ".png")
    //         .end()
    //         .filter("label")
    //         .attr("for", fNames[i])
    //         .text(frNames[i])
    //         .end()
    //         .filter("input")
    //         .attr({name: fNames[i], value: 0, required: "required", min: 0, type: "number"})
    // }


// добавление кнопок для прокрутки изображений
    $("<a id='left'></a><a id='right'></a>")
        .prependTo("form")
        .css({
            cursor: "pointer",
            "background-image": "url(images/leftarrows.png)",
            "margin-top": "15px",
            display: "block", width: 50, height: 50
        })
        .click(handleArrowPress).hover(handleArrowMouse)

    $("#right")
        .css("background-image", "url(images/rightarrows.png)")
        .appendTo("form");

    // Добавление кода для кнопки отправки формы
    $("h1").css({"min-width": 0, width: "95%"})

    $("#row2, #row3").hide();

    $("#oblock").css({display: "inline", border: "thin black solid"});
    $("form").css({"margin-left": "auto", "margin-right": "auto", width: 885, display: "flex"});

    // Обработка событий мыши, связаных с кнопками прокрутки изображений
    function handleArrowPress(e){
        let elemSequence = ["row1", "row2", "row3"]; // all rows
        let visibleRow = $("div.drow:visible"); // get visible row
        let visibleRowIndex = $.inArray(visibleRow.attr("id"), elemSequence) // index of visible row
        let targetRowIndex;

        if (e.target.id === 'left') { // on click left arrow
            targetRowIndex = visibleRowIndex + 1; // get visible row index
            if (targetRowIndex < 0) {
                (targetRowIndex = elemSequence.length - 1)
            }
        } else { // on click right arrow
            targetRowIndex = (visibleRowIndex + 1) % elemSequence.length;
        }
        visibleRow.fadeOut("fast", function () { // fadeOut current row
            $("#"+ elemSequence[targetRowIndex]).fadeIn("slow"); // fadeOut next row
        })
    }

    function handleArrowMouse(e){
        let propValue = e.type === "mouseenter" ? "-50px 0px" : "0px 0px" // on mouseenter change backg. pos
        $(this).css("background-position", propValue);
    }

    let total = $("#buttonDiv")
        .prepend("<div> Общий объём заказа: <span id='total'>0</span></div>")
        .css({padding: "5px"});
    $("<div id='bbox'></div>")
        .appendTo("body").append(total)

    // Определение общего объема заказа
    $("input").change(function (e) {
        let total = 0;
        $("input").each((index, element) => {
            total += Number($(element).val());
        })
        $("#total").text(total);
    })

})
