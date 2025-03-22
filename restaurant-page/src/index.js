import { createHeader, createHome, createMenu, createContact } from './page-load.js';
import './styles.css';

function initializePage() {
  const contentDiv = document.querySelector('#content');
  contentDiv.innerHTML = '';
  
  // Add the header to the page
  const header = createHeader();
  document.body.insertBefore(header, contentDiv);
  
  // Add the home content
  createHome();
  
  // Add event listeners to the tabs
  document.getElementById('home').addEventListener('click', () => {
    showTab('home');
    createHome();
  });
  
  document.getElementById('menu').addEventListener('click', () => {
    showTab('menu');
    createMenu();
  });
  
  document.getElementById('contact').addEventListener('click', () => {
    showTab('contact');
    createContact();
  });
}

// Helper function to handle tab switching
function showTab(tabId) {
  // Hide all covers
  document.querySelectorAll('.cover').forEach(cover => {
    cover.classList.add('hidden');
  });
  
  // Show selected tab's cover
  document.getElementById(`cover${tabId}`).classList.remove('hidden');
}

initializePage();
