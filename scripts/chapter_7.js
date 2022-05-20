// // создание элементов с использованием функции $
let newElements = $('<div class="dcell"><img src="../images/lily.png" alt="lily"/></div>')
newElements.each((index, element) => {
    console.log("new element: " + element.tagName + " " + element.className);
})
// >> new element: DIV dcell

newElements.children().each((idx, element)=>{
    console.log("Children element: " + element.tagName + " " + element.src);
})
// >> children element: IMG http://localhost:63342/images/lily.png

// Создание новых элементов путём клонирования существующих
let newElem = $("div.dcell").clone()
newElem.each((idx, element) => {
    console.log("new element: " + element.tagName + " " + element.className);
})

newElem.children("img").each((idx, element) => {
    console.log("Children element: " + element.tagName + " " + element.src);
})

// создание элементов средствами DOM API
let divElement = document.createElement("div");
divElement.classList.add("dcell")
let imgElement = document.createElement("img");
imgElement.src = "images/lily.png"
divElement.appendChild(imgElement);

let newElems = $(divElement);
newElems.each((inx, element)=>{
        console.log("new element: " + element.tagName + " " + element.className);
})

newElems.children("img").each((inx, element)=>{
    console.log("children element: " + element.tagName + " " + element.src);
})

// Вставка дочерних элементов и элементов-потомков
newElems = $("<div class='dcell'></div>")
    .append("<img src='../images/lily.png' alt='lily'/>")
    .append("<label for='lily'>Лилии</label>")
    .append("<input name='lily' value='0' required id='lily' />")
newElems.css("border", "thick solid red")

$("#row1").append(newElems);
console.log('worked');

// Вставка содержимое в начало элементов
$("<div class='dcell'></div>").
    append("<img src='../images/orchid.png' alt='ochid'/>").
    append("<label for='orchid'>Орхидеи</label>").
    append("<input name='orchid' value='0' required type='number'/>")
newElems = $("<div class='dcell'></div>")

// Использование метода wrap
newElem = $("<div></div>").css("border", "thick solid green")
$("div.drow").wrap(newElem);

//  использование метода WrapAll (работает для родительского обьекта)
$("div.drow").wrapAll(newElem)


$("<div/>").css("border", "thick solid red");
$("img").wrapAll(newElem);
newElem = $("<div><small>some text</small></div>")

$("img").first().parent().replaceWith(newElem)

// удаление элементов
// detach -> связаные данные остаюятся
// remove -> связаные данные удаляются
$("img[src*=daffodil], img[src*=snow]").parent().remove();

$("#row1").children().eq(1).empty().css("border", "thick solid red") // очистить элемент

// использование unwrap
$("div.dcell").unwrap();

