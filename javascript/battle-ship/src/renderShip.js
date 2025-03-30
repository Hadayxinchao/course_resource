export function renderShip(ship, isVertical = false) {
  const shipElement = document.createElement("div");
  shipElement.classList.add("ship-piece");
  shipElement.style.width = isVertical ? "30px" : `${30 * ship.length}px`;
  shipElement.style.height = isVertical ? `${30 * ship.length}px` : "30px";
  shipElement.dataset.length = ship.length;
  shipElement.draggable = true;

  return shipElement;
}