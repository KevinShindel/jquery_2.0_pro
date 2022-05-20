// 4.32 обработка ошибок
try {
    var a = new Array();
    a.push('1213123');
} catch (e) {
    console.log(e.message, e.name, e.number);
} finally {
    console.log(a)
    console.log('finally block');
}
