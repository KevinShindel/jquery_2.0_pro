// Поиск элементов в DOM
let elements = document.getElementsByTagName("img");
for (let i = 0; i < elements.length; i++) {
    console.log("Элемент: " + elements[i].tagName + " " + elements[i].src);
    // Изменение DOM
    elements[i].src = '../images/snowdrop.png';
    // Использование DOM для изменения стилей элементов
    elements[i].style.opacity = 0.5;
}
// Обработка событий
Array.from(elements).forEach((item, index, arr) => {
    item.onmouseover = (e) => e.target.style.opacity = 1;
    item.onmouseout = (e) => e.target.style.opacity = 0.5;
})
