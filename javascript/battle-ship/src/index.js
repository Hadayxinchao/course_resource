import "./styles.css"
import { GameUI } from "./ui";

document.addEventListener("DOMContentLoaded", () => {
  const gameUI = new GameUI();
  gameUI.createModeSelection();
});