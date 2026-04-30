

export const invertColorInElement = (element) => {
    const elementsInsideDiv = element.querySelectorAll('*');

    // Пройдитесь по всем элементам и инвертируйте их цвет
    elementsInsideDiv.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        const currentColor = computedStyle.color;
    
        // Инвертируйте текущий цвет и установите его обратно
        const invertedColor = invertRGBColor(currentColor);

        element.style.color = invertedColor;
      });
}


export const invertBackgroundInElement = (element) => {
    const elementsInsideDiv = element.querySelectorAll('*');

    

    // Пройдитесь по всем элементам и инвертируйте их цвет
    elementsInsideDiv.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        const currentColor = computedStyle.background;

        console.log(currentColor);
    
        // Инвертируйте текущий цвет и установите его обратно
        const invertedColor = invertRGBColor(currentColor);

        element.style.background = invertedColor;
      });
}


// Функция для инвертирования цвета в формате RGB
function invertRGBColor(rgbColor) {
    // Разберите строку RGB на компоненты (красный, зеленый, синий)
    const components = rgbColor.match(/\d+/g);
    
    if (components && components.length === 3) {
      const invertedR = 255 - parseInt(components[0]);
      const invertedG = 255 - parseInt(components[1]);
      const invertedB = 255 - parseInt(components[2]);
      
      // Соберите инвертированный цвет и верните его в формате RGB
      return `rgb(${invertedR}, ${invertedG}, ${invertedB})`;
    }

  // Если формат не распознан, верните исходное значение
  return rgbColor;
}