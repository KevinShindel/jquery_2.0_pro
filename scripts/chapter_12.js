// handlebars
(function ($) {
    let compiled = {};
    $.fn.template = function (data) {
        let template = $.trim($(this).first().html());
        if (compiled[template] === undefined) {
            compiled[template] = Handlebars.compile(template);
        }
        return $(compiled[template](data));
    }
})($);

