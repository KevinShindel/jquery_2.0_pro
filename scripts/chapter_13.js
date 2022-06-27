// Работа с формали
$(document).ready(function () {
    let data = {
        flowers: [
            {name: "Астры", product: "aster", stock: 10, price: 2.99},
            {name: "Нарцисы", product: "daffodil", stock: 12, price: 1.99},
            {name: "Розы", product: "rose", stock: 2, price: 4.99},

            {name: "Пионы", product: "peony", stock: 0, price: 1.5},
            {name: "Примулы", product: "primula", stock: 1, price: 3.12},
            {name: "Подснежники", product: "snowdrop", stock: 15, price: 0.99},

            {name: "Гвоздика", product: "carnation", stock: 15, price: 1.99},
            {name: "Лилии", product: "lily", stock: 15, price: 3.99},
            {name: "Орхидеи", product: "orchid", stock: 15, price: 2.99},
        ]
    };
    let messages = {}

    // for (let i=0; i<data.flowers.length; i++) {
    //     messages[data.flowers[i].product] = {
    //         max: "In stock only " + data.flowers[i].stock + ' pcs'
    //     }
    // }

    $("#flowerTmpl").template(data)
        .filter('*') // Фикс для handlebars
        .slice(0, 3).appendTo('#row1').end().end()
        .slice(3,6).appendTo('#row2').end().end()
        .slice(6).appendTo('#row3');


    function handleFormFocus(e) {
        let borderVal = e.type === 'focus' ? 'medium solid green' : '';
        $(this).css("border", borderVal);
    }

    // $("input").focus(handleFormFocus)
    //           .blur(handleFormFocus)
    //           .addClass("flowerValidation").change(function (e) {
    //             $("form").validate().element($(e.target));
    //         })

    // $("form").validate({
    //     highlight: function (element, errorClass) {
    //         $(element).add($(element).parent())
    //             .addClass("invalidElem");
    //     },
    //     unhighlight: function (element, errorClass) {
    //         $(element).add($(element).parent())
    //             .removeClass("invalidElem");
    //     },
    //     errorElement: "div",
    //     errorClass: "errorMsg",
    //     messages: messages
    // });

    // $.validator.addClassRules({
    //     flowerValidation: {
    //         min: 0,
    //         max: 100,
    //         required: true,
    //         digits: true,
    //     }
    // })

    // $("#row1 input").each(function (index, element) { // добавление правил
    //     let minQty = data.flowers[index].stock / 3;
    //     let rules = {
    //         required: true,
    //         // min: minQty,
    //         // max: data.flowers[index].stock,
    //         digits: true,
    //         stock: data.flowers[index].stock,
    //         messages: {
    //             min: 'Minimum quantity for order ' + minQty + ' pcs',
    //             max: 'Maximum quantity ' + data.flowers[index].stock + ' pcs.'
    //         }
    //     }
    //
    //     if (Number(data.flowers[index].price) > 3.00) rules.max--
    //     $(element).rules('add', rules);

    //     // $(element).rules("add", { // add rules
    //     //     min: 10,
    //     // })
    //     // $(element).rules("delete", { // remove rules
    //     //     max: 20
    //     // })
    // })

    // // Пользвательские методы валидации
    // $.validator.addMethod("stock", function (value, element, args) {
    //     return Number(value) < Number(args);
    // }, function (args) {
    //         return "В наличии только " + args + ' штук.'
    //     }
    //     // "У нас нет такого количества'
    // )
    //
    // $("input").each(function (index, element) {
    //     $(element).rules("add", {stock: data.flowers[index].stock})
    // })
    //
    // // задание классов для некорректных элементов
    // $('<style>' +
    //     '.errorMsg{color:red} ' +
    //     '.invalidElem{border: medium solid red}' +
    //     '</style>').appendTo('head')

    // использование отчёты об ошибках
    // let plurals = {}

    $("<div id='errorSummary'>Пожалуйста исправьте следующие ошибки:</div>")
        .addClass("errorMsg invalidElem")
        .append("<ul id='errorList'></ul>").hide().insertAfter("h1");

    $("form").validate({
        highlight: function (element, errorClass) {
            $(element).addClass("invalidElem");
        },
        unhighlight: function (element, errorClass) {
            $(element).removeClass("invalidElem");
        },
        errorContainer: "#errorSummary",
        errorLabelContainer: "#errorList",
        wrapper: "li",
        errorElement: "div"
    })

    $.validator.addMethod("stock", function (value, element, args) {
        return Number(value) < Number(args.data.stock)+1;
    }, function (args) {
        return 'Вы запросили ' + $(args.element).val() + " " + args.data.product + " но их в наличии только " + args.data.stock + " шт."
    })

    $("input").each(function (index, element) {
        $(element).rules("add", {
            stock: {
                index: index,
                data: data.flowers[index],
                element: element
            }
        })
    }).change(function (e) {
        $("form").validate().element($(e.target));
    })
})

