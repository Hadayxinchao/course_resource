import beeImage from '../img/bee.svg';
import dripping from '../img/dripping.png';

// Add this new function to create menu content
function createMenu() {
  const content = document.querySelector('#content');
  content.innerHTML = '';
  content.classList.add('content');

  // Create menu heading with bees
  const menuHeading = document.createElement('div');
  menuHeading.classList.add('heading-container', 'menu-container');

  const beeLeft = document.createElement('img');
  beeLeft.classList.add('decorations', 'menu-bee-left');
  beeLeft.src = beeImage;

  const beeRight = document.createElement('img');
  beeRight.classList.add('decorations', 'menu-bee-right');
  beeRight.src = beeImage;

  const headingDiv = document.createElement('div');
  headingDiv.classList.add('heading', 'menu-heading');
  const h1 = document.createElement('h1');
  h1.textContent = 'Menu';
  headingDiv.appendChild(h1);

  menuHeading.appendChild(beeLeft);
  menuHeading.appendChild(beeRight);
  menuHeading.appendChild(headingDiv);
  content.appendChild(menuHeading);

  // Create beverages section
  createMenuSection('Beverages', content);
  
  // Beverages items
  createMenuItem(
    'Honey Tea',
    'A warm, sweet tea made with the highest quality honey and a bit of lemon to start your day off right!',
    '$2',
    'honeyTea.jpg',
    'Picture of honey tea.',
    content
  );

  createMenuItem(
    'Beary Tea',
    'A comforting, almost filling, tea that is infused with the flavors of several kinds of berries. Best served cold, but can be served hot on request.',
    '$3',
    'bearyTea.jpg',
    'Picture of beary tea.',
    content
  );

  // Create sides section
  createMenuSection('Sides', content);
  
  // Sides items
  createMenuItem(
    'Toast and Jam',
    'A slice of toast, your choice of bread, and our homemade blackberry or raspberry jam.',
    '$1',
    'toast.jpg',
    'Picture of toast and jam.',
    content
  );

  createMenuItem(
    'Fresh Fruit',
    'A small bowl of fresh fruit, whatever we find at the market for the day.',
    '$3',
    'fruit.jpg',
    'Picture of a bowl of fruit.',
    content
  );

  // Create main dishes section
  createMenuSection('Main Dishes', content);
  
  // Main dishes items
  createMenuItem(
    'Pancakes',
    'A stack of homemade buttermilk pancakes, served with our locally sourced maple syrup.',
    '$4',
    'pancakes.jpg',
    'Picture of pancakes.',
    content
  );

  createMenuItem(
    'French Toast',
    'Two slices of the best french toast you will ever eat, served with our locally sourced maple syrup.',
    '$5',
    'frenchToast.jpg',
    'Picture of french toast.',
    content
  );

  createMenuItem(
    'Beary Veggie Sandwich',
    'Do you like vegetables? Then this is the sandwich for you! Stuffed full of a variety of fresh produce, it will fill you up.',
    '$8',
    'veggieSandwich.jpg',
    'Picture of veggie sandwich.',
    content
  );

  createMenuItem(
    'BLT',
    'Interested in the Beary Veggie Sandwich but also love bacon? Say no more.',
    '$6',
    'blt.jpg',
    'Picture of a BLT.',
    content
  );

  createMenuItem(
    'Bagel and Lox',
    'Our house specialty, you can\'t go wrong with a hearty bagel topped with sustainably harvested salmon.',
    '$8',
    'lox.jpg',
    'Picture of bagel and lox.',
    content
  );

  createMenuItem(
    'Honeycomb',
    'Are you a bear like us? Then you will love our honeycomb. And, yes humans, it is just a piece of honeycomb, not the popular breakfast cereal.',
    '$6',
    'honeyComb.jpg',
    'Picture of honeycomb.',
    content
  );

  createMenuItem(
    'Beary Bowl',
    'Get a big ole bowl of our berries! Side of honey is $1 extra.',
    '$7',
    'berryBowl.jpeg',
    'Picture of a berry bowl.',
    content
  );

  createMenuItem(
    'The Beary Best Porridge',
    'Made by Baby Bear himself, this porridge is guarenteed to be just right, or your money back.',
    '$5',
    'porridge.jpg',
    'Picture of porridge.',
    content
  );

  return content;
}

// Helper function to create a menu section (e.g., Beverages, Sides, Main Dishes)
function createMenuSection(title, parentElement) {
  const sectionContainer = document.createElement('div');
  sectionContainer.classList.add('heading-container', 'sub-container');

  const headingDiv = document.createElement('div');
  headingDiv.classList.add('heading', 'sub-heading');
  const h2 = document.createElement('h2');
  h2.textContent = title;
  headingDiv.appendChild(h2);

  const hiveImg = document.createElement('img');
  hiveImg.classList.add('decorations', 'sub-container-hive');
  hiveImg.src = 'https://web.archive.org/web/20221024060550im_/https://eckben.github.io/bearysBreakfastBar/img/honeycomb.svg';

  sectionContainer.appendChild(headingDiv);
  sectionContainer.appendChild(hiveImg);
  parentElement.appendChild(sectionContainer);
}

// Helper function to create menu items
function createMenuItem(name, description, price, imageName, imageAlt, parentElement) {
  const menuItemOuter = document.createElement('div');
  menuItemOuter.classList.add('comb-outer', 'menu-outer');
  
  const menuItemInner = document.createElement('div');
  menuItemInner.classList.add('comb-inner', 'menu-inner');

  // Create item name
  const itemName = document.createElement('h3');
  itemName.classList.add('item-name');
  itemName.textContent = name;

  // Create item description
  const itemDescription = document.createElement('p');
  itemDescription.classList.add('item-description');
  itemDescription.textContent = description;

  // Create item price
  const itemPrice = document.createElement('p');
  itemPrice.classList.add('item-price');
  itemPrice.textContent = price;

  // Create item image
  const itemPic = document.createElement('div');
  itemPic.classList.add('item-pic');
  itemPic.title = imageAlt;
  itemPic.style.backgroundImage = `url("https://web.archive.org/web/20221024060550/https://eckben.github.io/bearysBreakfastBar/img/${imageName}")`;

  // Append elements to menu item
  menuItemInner.appendChild(itemName);
  menuItemInner.appendChild(itemDescription);
  menuItemInner.appendChild(itemPrice);
  menuItemInner.appendChild(itemPic);
  menuItemOuter.appendChild(menuItemInner);
  parentElement.appendChild(menuItemOuter);
}

function createHeader() {
  const header = document.querySelector('header');
  header.innerHTML = '';
  
  const nav = document.createElement('nav');
  
  // Create cover for Home tab
  const coverHome = document.createElement('div');
  coverHome.id = 'coverhome';
  coverHome.classList.add('cover');
  coverHome.textContent = 'Home';
  
  const drippingHome = document.createElement('img');
  drippingHome.classList.add('dripping');
  drippingHome.src = dripping;
  drippingHome.alt = '';
  coverHome.appendChild(drippingHome);
  
  // Create cover for Menu tab
  const coverMenu = document.createElement('div');
  coverMenu.id = 'covermenu';
  coverMenu.classList.add('cover', 'hidden');
  coverMenu.textContent = 'Menu';
  
  const drippingMenu = document.createElement('img');
  drippingMenu.classList.add('dripping');
  drippingMenu.src = dripping;
  drippingMenu.alt = '';
  coverMenu.appendChild(drippingMenu);
  
  // Create cover for Contact tab
  const coverContact = document.createElement('div');
  coverContact.id = 'covercontact';
  coverContact.classList.add('cover', 'hidden');
  coverContact.textContent = 'Contact';
  
  const drippingContact = document.createElement('img');
  drippingContact.classList.add('dripping');
  drippingContact.src = dripping;
  drippingContact.alt = '';
  coverContact.appendChild(drippingContact);
  
  // Create tab list
  const tabList = document.createElement('ul');
  tabList.classList.add('tab-list');
  
  const homeTab = document.createElement('li');
  homeTab.id = 'home';
  homeTab.textContent = 'Home';
  
  const menuTab = document.createElement('li');
  menuTab.id = 'menu';
  menuTab.textContent = 'Menu';
  
  const contactTab = document.createElement('li');
  contactTab.id = 'contact';
  contactTab.textContent = 'Contact';
  
  tabList.appendChild(homeTab);
  tabList.appendChild(menuTab);
  tabList.appendChild(contactTab);
  
  // Append all elements to the nav
  nav.appendChild(coverHome);
  nav.appendChild(coverMenu);
  nav.appendChild(coverContact);
  nav.appendChild(tabList);
  
  header.appendChild(nav);
  
  return header;
}

function createHome() {
  const home = document.querySelector('#content');
  home.innerHTML = '';
  home.classList.add('content');

  // Create heading container with bees
  const headingContainer = document.createElement('div');
  headingContainer.classList.add('heading-container');

  const beeLeft = document.createElement('img');
  beeLeft.classList.add('decorations', 'bee-left');
  beeLeft.src = beeImage;

  const beeRight = document.createElement('img');
  beeRight.classList.add('decorations', 'bee-right');
  beeRight.src = beeImage;

  const headingDiv = document.createElement('div');
  headingDiv.classList.add('heading');
  const h1 = document.createElement('h1');
  h1.textContent = "Beary's Breakfast Bar";
  headingDiv.appendChild(h1);

  headingContainer.appendChild(beeLeft);
  headingContainer.appendChild(beeRight);
  headingContainer.appendChild(headingDiv);
  home.appendChild(headingContainer);

  // Create review section
  const reviewOuter = document.createElement('div');
  reviewOuter.classList.add('comb-outer', 'review-outer');
  const reviewInner = document.createElement('div');
  reviewInner.classList.add('comb-inner', 'review-inner');

  const review = document.createElement('p');
  review.classList.add('review');
  review.textContent = "Beary's has the best porridge! The atmosphere and customer service make you feel like you are sitting in the middle of the woods, eating like a bear! This is exactly the kind of place that I like to return to again and again.";

  const customer = document.createElement('p');
  customer.classList.add('customer');
  customer.textContent = "Goldilocks";

  reviewInner.appendChild(review);
  reviewInner.appendChild(customer);
  reviewOuter.appendChild(reviewInner);
  home.appendChild(reviewOuter);

  // Create hours section
  const hoursOuter = document.createElement('div');
  hoursOuter.classList.add('comb-outer', 'info-hours-outer');
  const hoursInner = document.createElement('div');
  hoursInner.classList.add('comb-inner', 'info-hours-inner');

  const h3Hours = document.createElement('h3');
  h3Hours.classList.add('hours');
  h3Hours.textContent = 'Hours';

  const hours = {
    sunday: 'Sunday: 8am - 8pm',
    monday: 'Monday: 6am - 6pm',
    tuesday: 'Tuesday: 6am - 6pm',
    wednesday: 'Wednesday: 6am - 6pm',
    thursday: 'Thursday: 6am - 10pm',
    friday: 'Friday: 6am - 10pm',
    saturday: 'Saturday: 8am - 10pm'
  };

  hoursInner.appendChild(h3Hours);
  
  Object.entries(hours).forEach(([day, time]) => {
    const p = document.createElement('p');
    p.classList.add(day);
    p.textContent = time;
    hoursInner.appendChild(p);
  });

  hoursOuter.appendChild(hoursInner);
  home.appendChild(hoursOuter);

  // Create location section
  const locationOuter = document.createElement('div');
  locationOuter.classList.add('comb-outer', 'info-location-outer');
  const locationInner = document.createElement('div');
  locationInner.classList.add('comb-inner', 'info-location-inner');

  const h3Location = document.createElement('h3');
  h3Location.classList.add('location');
  h3Location.textContent = 'Location';

  const address = document.createElement('p');
  address.classList.add('address');
  address.textContent = '123 Forest Drive, Forestville, Maine';

  locationInner.appendChild(h3Location);
  locationInner.appendChild(address);
  locationOuter.appendChild(locationInner);
  home.appendChild(locationOuter);

  // Add honeycomb decoration
  const hive = document.createElement('img');
  hive.classList.add('decorations', 'hive');
  home.appendChild(hive);

  return home;
}

function createContact() {
  const content = document.querySelector('#content');
  content.innerHTML = '';
  content.classList.add('content');

  // Create contact heading with bees
  const contactHeading = document.createElement('div');
  contactHeading.classList.add('heading-container', 'contact-container');

  const beeLeft = document.createElement('img');
  beeLeft.classList.add('decorations', 'contact-bee-left');
  beeLeft.src = beeImage;

  const beeRight = document.createElement('img');
  beeRight.classList.add('decorations', 'contact-bee-right');
  beeRight.src = beeImage;

  const headingDiv = document.createElement('div');
  headingDiv.classList.add('heading', 'contact-heading');
  const h1 = document.createElement('h1');
  h1.textContent = 'Contact Us';
  headingDiv.appendChild(h1);

  contactHeading.appendChild(beeLeft);
  contactHeading.appendChild(beeRight);
  contactHeading.appendChild(headingDiv);
  content.appendChild(contactHeading);

  // Create contact cards
  createContactCard(
    'Mama Bear',
    'Chef',
    '555-555-5554',
    'totallyRealEmail@notFake.com',
    'mamabear.png',
    "Mama Bear's Photo",
    content
  );

  createContactCard(
    'Papa Bear',
    'Manager',
    '555-555-5555',
    'perfectlyRealEmail@notFake.com',
    'papabear.jpeg',
    "Papa Bear's Photo",
    content
  );

  createContactCard(
    'Baby Bear',
    'Waiter',
    '555-555-5556',
    'totallyRealEmail@notFake.com',
    'babybear.jpeg',
    "Baby Bear's Photo",
    content
  );

  return content;
}

// Helper function to create contact cards
function createContactCard(name, position, phone, email, imageName, imageAlt, parentElement) {
  const contactCardOuter = document.createElement('div');
  contactCardOuter.classList.add('comb-outer', 'contact-outer');
  
  const contactCardInner = document.createElement('div');
  contactCardInner.classList.add('comb-inner', 'contact-inner');

  // Create person name
  const personName = document.createElement('h3');
  personName.classList.add('person');
  personName.textContent = name;

  // Create position
  const personPosition = document.createElement('p');
  personPosition.classList.add('position');
  personPosition.textContent = position;

  // Create phone
  const personPhone = document.createElement('p');
  personPhone.classList.add('phone');
  personPhone.textContent = phone;

  // Create email
  const personEmail = document.createElement('p');
  personEmail.classList.add('email');
  personEmail.textContent = email;

  // Create contact image
  const contactPic = document.createElement('div');
  contactPic.classList.add('contact-pic');
  contactPic.title = imageAlt;
  contactPic.style.backgroundImage = `url("https://web.archive.org/web/20221024060550/https://eckben.github.io/bearysBreakfastBar/img/${imageName}")`;

  // Append elements to contact card
  contactCardInner.appendChild(personName);
  contactCardInner.appendChild(personPosition);
  contactCardInner.appendChild(personPhone);
  contactCardInner.appendChild(personEmail);
  contactCardInner.appendChild(contactPic);
  contactCardOuter.appendChild(contactCardInner);
  parentElement.appendChild(contactCardOuter);
}

// Function to initialize the page

export { createHeader, createHome, createMenu, createContact };