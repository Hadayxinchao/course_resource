import './styles.css';
import { Dropdown } from './components/dropdown';

document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    new Dropdown(dropdown);
  });
});