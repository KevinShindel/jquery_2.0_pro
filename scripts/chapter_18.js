$(document).ready(function (){
    let parent = $("#oblock").parent();
    $("<a href=\"https://www.appress.com\" target=\"_blank\">Посетите Apress</a>").insertAfter(parent);


    // Инициализация кнопки
    $("a").button();
    // настройка
    $("button").button({
        label: "Заказать",
        disabled: false,
        icons: {
            secondary: "ui-icon-circle-arrow-e" // TODO: find solution
        }
    });
    // Произвольная картинка в кнопке и сброс настроек
    $("<button id='button'></button>").text('').append("<img src='images/rightarrows.png' alt='arrows' width='100' height='30'/>").button().appendTo("body").click(function (e) {
        $(this).button("destroy")
    })
    // обновление состояния кнопки
    $("<span>On</span><input type='checkbox' checked>").prependTo("#buttonDiv");
    $(":checkbox").change(function (e) {
        let btns = $("button");
        if ($(":checked").length === 1) {
            btns.removeAttr("disabled")
        } else {
            btns.attr("disabled", "disabled");
        }
        btns.button("refresh");
    })
    //    использование событий виджета Button
    $("<button type='button'>Created</button>").button({
        // событие создания кнопки
        create: function (e) {
            $(e.target).click(function (ev) {
                alert("Button was clicked!")
                ev.preventDefault();
            })
        }
    }).appendTo("#buttonDiv")
    // Создание различных типов кнопок
    $("<input class='jqButton' id='inputSubmit' type='submit' value='Submit'/>").appendTo("#buttonDiv")
    $("<input class='jqButton' id='inputReset' type='reset' value='Submit'/>").appendTo("#buttonDiv")
    $("<input class='jqButton' id='inputButton' type='button' value='Button'/>").appendTo("#buttonDiv")
    $("<button class='jqButton'>Button</button>").appendTo("#buttonDiv")
    $("<a class='jqButton' href='www.apress.com'>Link A</a>")

    $(".jqButton").click(function (e) {
        e.preventDefault();
        $(this).button();
    })
    //    Создание кнопки-переключателя
    $("<input type='checkbox' id='toggle'/><label for='toggle'>Click me</label>").appendTo("#buttonDiv")
    $("#toggle").button();
    //    создание группы переключателей
    $("#radioDiv").buttonset();

//    использование виджета Progress Bar
    $("<div id='progressDiv' data-before='0'></div>").appendTo("body");
    $("<div id='slider'></div>").appendTo("body");
    // инициализация
    // $("#progressDiv").progressbar({value: false});

    // setTimeout(function (){
    //     let value = 0
    //     let progress = setInterval(function () {
    //         if (value >= 100) {
    //             clearInterval(progress);
    //             // отключение
    //             $("#progressDiv").progressbar("disable");
    //         }
    //         value += 1
    //         // установка значения
    //         $("#progressDiv").progressbar("option","value",value)
    //     }, 50)
    // }, 1500)

    $("<button id='decr'>Decrease</button>" +
        "<button id='incr'>Increase</button>" +
        "<button id='mode'>Mode</button>" +
        "<span id='progWrapper'>Current progress: <span id='progVal'></span>%</span> ")
        .click(progressHandler)
    .appendTo("body")
    $("#incr, #decr, #mode").wrapAll("<div id='buttonGroup'></div>")
    $("#buttonGroup").buttonset();

    function progressHandler() {
        let div_elem = $("#progressDiv");
        if (this.id === 'mode') {
            div_elem.progressbar("value", false);
        } else {
            let currentProgress = div_elem.progressbar("value");
            if(!currentProgress) {
                div_elem.progressbar("value", 1)
            } else {
                div_elem.progressbar("value",
                    this.id === "decr" ? currentProgress - 10 : currentProgress + 10)
            }
        }
    }

   // использование событий виджета Progress Bar (create, change, complete)
    $("#progressDiv").progressbar({
        create: (e) => $("#progVal").text($("#progressDiv").progressbar("value")),
        complete: (e) => $("#incr").button("disable"),
        change: (e) => {
            let currentValue = $("#progressDiv").progressbar("value");
            if (!currentValue) $("#progressWrapper").hide();
            else {
                if ($("#progressDiv").progressbar("value") < 100) $("#incr").button("enable");
                $("#progressDiv:before").attr('data-before', currentValue);
                $("#progVal").text(currentValue);
                $("#progWrapper").show();
            }
        }
    })

// использование виджета слайдер
    $("#slider").css("margin", "10px").slider({
        animate: true, // создаёт анимацию при изменении позиции
        values: [10,50],
        range: true,
        create: ()=>console.log('slider created'), // евент на создание
        change: ()=>console.log($("#slider").slider('values')) // евент на изменение
    });


})
