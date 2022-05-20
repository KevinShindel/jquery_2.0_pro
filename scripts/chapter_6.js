let dom_query = document.getElementsByTagName('label');
let query = $('img[src*=daffodil]');

$('img:even'). // select all even images
    add('img[src*=primula]'). // add images with src contains primula
    add(query). // add query
    add(dom_query). // add dom query
    css('border', 'thin double red'); // set CSS styles

query = $("label")
query.first().css('border', 'thick double red');
query.last().css('border', 'thick double green');
query.eq(2).css('border', 'thick double black');
query.eq(-2).css('border', 'thick double black');

query.slice(0, 2).css('border', 'thick double black');
query.slice(4).css('border', 'thick solid red');

// фильтрация
let img_query = $('img')
let label_query = $('label')

img_query.filter('[src*=s]').css('border', 'thick double blue');
jq = $('[for*=p]')
label_query.filter(jq).css('color', 'grey');
let elem = document.getElementsByTagName('label')[1];
label_query.filter(elem).css('font-size', '1.5em')

img_query.filter(function (index) { // custom filter function w index and this context
    return this.getAttribute('src') === 'peony.png' || index === 4;
}).css('border', 'thick solid red');

img_query.not("[src*=s]").css('border', 'thick double green');

label_query.not(jq).css('color', 'blue'); // using NOT method

img_query.not(function (index) {
    return this.getAttribute('src') === 'images/peony.png' || index === 4;
}).css('border', 'thick solid red');

let dcell_query = $('div.dcell') // has method usages
dcell_query.has("img[src*=aster").css("border", "thick solid red");

jq = $("[for*=p]");
dcell_query.has(jq).css('border', 'thick solid blue');

dcell_query.map(function (index, value){ // map method need to modify elements in query
    return value.getElementsByTagName('img')[0]
}).css('boxShadow', '14px 14px 14px 12px green');

dcell_query.map(function (index, value) {
    return $(value).children()[1];
}).css('padding', '50px');

let result = img_query.is(function (index) {
    return this.getAttribute('src') === 'images/rose.png';
})
console.log('result of is query', result);

label_query.
first().css('border', '5px double green').
end().css('font-size', '18px')

dcell_query.children('img'). // addBack function is like a join
addBack().css('border', 'thick double blue')

let d_row = $('div.drow')
let child_count = d_row.children().length; // just count of query child
console.log('total child', child_count);

let img_count = d_row.find('img').length
console.log('total img', img_count);

d_row.add(dcell_query).find('img').each((index, element)=> {
    console.log('Element: ' + element.tagName + ' '+element.src);
})

jq = label_query.filter("[for*=p]").not("[for=peony]")
console.log(jq.length)

dcell_query.parent().each((index,value)=>{ // find parent
    console.log('Element: ' + value.tagName+ ' ' + value.id);
})

dcell_query.parent('#row1').each((index,value)=>{ // parent block filtration
    console.log('Element: ' + value.tagName+ ' ' + value.id);
})

img_query. // select all images
        filter("[src*=peony]", "[src*=rose]"). // filter
        parents(). // find all parents
        each((index,value)=>{ // iterate each
            console.log('Images parents: ' + value.tagName+ ' ' + value.className);
        })

img_query. // select all images
    filter("[src*=peony]", "[src*=rose]"). // filter
    parentsUntil("form", ":not(.dcell)").
    each((index,value)=>{ // parent block filtration
        console.log('Parents images until: ' + value.tagName+ ' ' + value.className);
    })

img_query.closest(".drow").each((index,value)=>{ // parent block filtration
    console.log('Images closest: ' + value.tagName+ ' ' + value.className);
})

// Перемещенение по дереву в пределах одного иенрархического уровня
let parent = $("img[src*=aster], img[src*=primula]").parent()
    let tag = parent.tagName
console.log("Parent is :", tag)
parent.siblings().css("border", "thick solid pink")

$("#row1 div.cell").siblings().css("border", "thick solid blue");

let src = $("img[src*=aster]").src;
console.log("aster src: ", src)

$("img[src*=aster]").parent().nextAll().css("border", "thick double red");

