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
    $("#flowerTmpl").template(data)
        .filter('*') // Фикс для handlebars
        .slice(0, 3).appendTo('#row1').end().end()
        .slice(3,6).appendTo('#row2').end().end()
        .slice(6).appendTo('#row3');


    function handleFormFocus(e) {
        let borderVal = e.type === 'focus' ? 'medium solid green' : '';
        $(this).css("border", borderVal);
    }
    $("input").focus(handleFormFocus).blur(handleFormFocus);

    $("input").addClass("flowerValidation").change(function (e) {
        $("form").validate().element($(e.target));
    })

    $("form").validate({
        highlight: function (element, errorClass) {
            $(element).add($(element).parent())
                .addClass("invalidElem");
        },
        unhighlight: function (element, errorClass) {
            $(element).add($(element).parent())
                .removeClass("invalidElem");
        },
        errorElement: "div",
        errorClass: "errorMsg"
    });

    $.validator.addClassRules({
        flowerValidation: {min: 0}
    })

})
