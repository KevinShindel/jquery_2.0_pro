$(document).ready(function () {
    let fNames = ['carnation', 'lily', 'orchid'];
    let frNames = ['Гвоздики', 'Лилии', 'Орхидея'];
    let fRow = $("<div id='row3' class='drow'></div>").appendTo("div.dtable");
    let fTemplate = $("<div class='dcell'><img/><label></label><input/></div>");
    for (let i = 0; i < fNames.length; i++) {
        fTemplate.clone()
            .appendTo(fRow)
            .children()
            .filter("img")
            .attr("src", "images/" + fNames[i] + ".png")
            .end()
            .filter("label").attr("for", fNames[i])
            .text(frNames[i]).end()
            .filter("input").attr({name: fNames[i], value: 0, required: "required", type: "number", min: 0})
    }
    $("<a id='left' /><a id='right'/>").prependTo("form").addClass("arrowButton").click(handleArrowPress).hover(handleArrowMouse);
    $("#right").appendTo("form");

    $("#row2, #row3").hide();

    let total = $("#buttonDiv").prepend("<div>Всего заказано: <span id='total'>0</span></div>").css('padding', '5px');
    $("<div id='bbox'/>").appendTo("body").append(total);

    $("input").change(function (e) {
        let total = 0;
        $("input").each(function (index, element) {
            total += Number($(element).val());
        });
        $("#total").text(total);
    });

    function handleArrowMouse(e){
        let propValue = e.type === "mouseenter" ? "-50px 0px" : "0px 0px" // on mouseenter change backg. pos
        $(this).css("background-position", propValue);
    }

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





})
