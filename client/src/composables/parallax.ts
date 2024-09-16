interface Itranslate {
  translateX: number;
  translateY: number;
}

export function parallax(
  queryAll: string,
  class1: string,
  class2: string,
  translate1: Itranslate,
  translate2: Itranslate,
  e?: Event,
) {
  const event = e as MouseEvent;
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const htmlElements: NodeListOf<HTMLElement> =
    document.querySelectorAll(queryAll);
  htmlElements.forEach((el) => {
    const firstItem: HTMLElement = el.querySelector(class1);
    const secondItem: HTMLElement = el.querySelector(class2);
    //переписать
    if (
      e.target === firstItem ||
      e.target === secondItem ||
      e.target === el.firstChild.firstChild ||
      e.target === el.firstChild ||
      e.target === el
    ) {
      const firstItemX = mouseX - coords(firstItem).x + 100;
      const firstItemY = mouseY - coords(firstItem).y + 100;
      firstItem.style.transform = `translateY(-${firstItemY / translate1.translateY}px) translateX(-${firstItemX / translate1.translateX}px)`;
      const secondItemX = mouseX - coords(secondItem).x - 100;
      const secondItemY = mouseY - coords(secondItem).y;
      secondItem.style.transform = `translateY(${secondItemY / translate2.translateY}px) translateX(${secondItemX / translate2.translateX}px)`;
    }
  });
}
function coords(el: HTMLElement) {
  const coords = el.getBoundingClientRect();
  return {
    x: coords.left,
    y: coords.top,
  };
}
