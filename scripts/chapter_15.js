$(document).ready(function (){
    $.getScript("scripts/order_block.js")

    function loadTemplate(data) {
        let tmplElems = $("#flowerTmpl").template({flowers: data}).filter("*");
        tmplElems.slice(0,3).appendTo("#row1");
        tmplElems.slice(3,6).appendTo("#row2");
        tmplElems.slice(6).appendTo("#row3");
    }

    $("<button>Load Data</button>").appendTo("#buttonDiv").click(function (e){
        let jqxhr = $.ajax({
            url: "data.json", // задание URL
            success: loadTemplate
        })

        let timerID = setInterval(function (){
            console.log('Status: ' + jqxhr.status + ' ' + jqxhr.statusText + ' State ' + jqxhr.readyState);
            if (jqxhr.readyState === 4) {
                console.log('Request completed')
                clearInterval(timerID);
            }
        }, 100)
        e.preventDefault();
    })
    // Создание POST запроса
    $("button[type=submit]").click(function (e) {
        let form = $("form")
        $.ajax({
            url: form.attr('action'), // URL для отправки данных
            data: form.serialize(), // данные формы
            type: form.attr('method'), // метод POST
            success: processServerResponse, // обработчик возврата
            // beforeSend: (jqXHR, settings)=>{ // настройка параметров перед отправкой
            //   settings.url = "http://localhost:3000/order"
            // },
            error: errorHandler, // обработка ошибок
            complete: (jqXHR, status)=>{
                // возможные значения status -> abort, error, notmodified, parsererror, success, timeout
                console.log("Completed: " + status)} // выполняется всегда
        })
    })

    function errorHandler(jqxhr, status, errorMsg) {
        // возможные значение status -> abort, error, parsererror, timeout
        console.log(jqxhr, status, errorMsg)
        $("<div>").addClass("error").text("Status: " + status + " Reason: " + errorMsg).insertAfter("h1");
    }

    function processServerResponse(data) {
        let inputItems = $("div.dcell").hide();
        for (let prop in data) {
            let filtered = inputItems.has("input[name=" + prop + "]").appendTo("#row1").show();
        }
        $("buttonDiv").remove();
        $("totalTmpl").template(data).appendTo("body");
    }

    function responseStatus(data, status, jqXHR) {
        console.log("Status: " + status + " Result code: " + jqXHR.status);
    }

//    Задание нескольких обработчиков событий
    $.ajax({
        url: "data.json",
        success: [processServerResponse, responseStatus]
    })

//    Настройка контекста событий
    $.ajax({
        url: "data.json",
        context: $("h1"),
        success: loadTemplate,
        complete: (jqXHR, status)=>{
            let color = status === "success" ? "lightgreen" : "red";
            this.css("border", "thick solid " + color) // устанавливает стиль для h1
        }
    })

//    Использование глобальных событий Ajax
    $(document)
        .ajaxStart(function () {}) // регистрирует функцию при заверщении запроса
        .ajaxSend(function (event, jxXHR, settings) {}) // регистрирует событие перед выполением запроса
        .ajaxSuccess(function (event, jxXHR, settings) {}) // регистрирует функцию при успешном выполнении
        .ajaxError(function (event, jxXHR, settings, errorMsg) {}) // регистрирует при при ошибке
        .ajaxComplete(function (event, jxXHR, settings) {}) // регистрирует функцию при заверщении запроса
        .ajaxStop(function () {}) // регистрация события по завершению всех запросов


// управление глобальными событиями
    $.ajax({
        url: "data.json",
        global: $("#globalevents:checked").length > 0 // активация глобальных событий
    })
// настройка базовых параметров Ajax-запроса
    $.ajax({
        accepts: 'dataType', // устанавливает заголовок для запроса Accept который указывает MIME типы
        cache: true, // кешировать запросы на сервере
        contentType: '', // устанвливает значение заголовка Content-Type
        dataType: 'application/json', // указывает какие типы данных ожидаются от сервера
        data: JSON.stringify($("form").serializeArray()), // передаёт данные на сервер
        type: "PUT", // указывает метод запроса
        headers: {"X-HTTP-Method-Override": "PUT"}, // задаёт дополнительные заголовки и значения которые должны включатся в заголовок
        jsonp: '', // задаёи строку которую следует использовать вместо функции обратного вызова
        jsonpCallback: '', // задаёт имя функции обратного вызова
        password: 'password', // задаёт паролдь который должен испрользоватся в запросе при прохождении процедуры аутентификации
        scriptCharset: '', // указывает какой набор символов использовать при кодировании запрашиваемого содержимого
        timeout: 500, // задаёт длительность таймаута в мс
        username: 'username' // задаёт имя пользователдя при аутентификации
    })

// создание синхронных запросов
    $.ajax("data.json", {
        async: false, // устанавливает синхроноость запроса
        success: loadTemplate
    })

//        Игнорирование данных, оставшихся неизменными
    $.ajax("data.json", {
        ifModified: true,
        success: (data, status)=>{
            if (status === 'success') {
                'pass'
            } else if (status === 'notmodified') { // если данные не изменились
                'pass'
            }
        }
    })
// обработка кода ответа
    $.ajax({
        url: "data.json",
        statusCode: {
            200: handleSuccessfulRequest, // задаёт метод для успешного запроса
            404: handleFailedRequest, // когда данные не найдены
            302: handleRedirect, // метод для редиректа
            304: handleNotModifiedRequest // если данные не изменились
        }
    })

// ПРедварительная очистка ответных данных
    $.ajax("data.json", {
        success: loadTemplate,
        dataType: "json",
        dataFilter: (data, dataType) =>{
            if (dataType === 'json') {
                let filteredData = $.parseJSON(data);
                filteredData.shift();
                return JSON.stringify(filteredData.reverse());
            } else return data
        }
    })
//    Управление преобразованием данных
    $.ajax({
        url: "data.json",
        success: loadTemplate,
        converters: {
            "text html": function (data) { // указывается тип данных и функция обработки
                return $(data);
            }
        }
    })
//    настройка и фильтрация AJAX-запросов
    $.ajaxSetup({ // определяет базовые значения конфигураций
        timeout: 15000,
        global: false,
        error: errorHandler,
        converters: {
            "text html": function (data) {
                return $(data);
            }
        }
    })
//    Фильтрация запросов
    $.ajaxPrefilter("json html", function (settings, originalSettings, jqXHR) {
        if (originalSettings.dataType === 'html') {
            settings.timeout = 2000;
        } else {
            jqXHR.abort();
        }
    })




})
