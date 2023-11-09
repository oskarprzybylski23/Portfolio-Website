// ---- NAVIGATION BAR BEHAVIOUR ----
// Script to change navigation bar colours based on page section
document.addEventListener("DOMContentLoaded", function () {
  // Get all the navigation links
  var navLinks = document.querySelectorAll(".nav-link");

  // Calculate the position of each section on the page
  var sections = document.querySelectorAll("section");
  var footer = document.querySelector("footer");
  var sectionPositions = [];

  function calculateSectionPositions() {
    sectionPositions = Array.from(sections).map(function (section) {
      return {
        id: section.id,
        top: section.offsetTop,
        bottom: section.offsetTop + section.offsetHeight,
      };
    });
  }

  calculateSectionPositions(); // Initial calculation of section positions

  // Recalculate section positions on window resize
  window.addEventListener("resize", function () {
    calculateSectionPositions();
  });

  // Add scroll event listener to track the position
  window.addEventListener("scroll", function () {
    var currentPosition = window.pageYOffset;

    // Reset the color of all navigation links
    navLinks.forEach(function (link) {
      link.style.color = "";
    });

    // Check if scroll position is within the footer section
    var isOverFooter = currentPosition >= footer.offsetTop;

    if (!isOverFooter) {
      // Find the current section based on the scroll position
      var currentSection = sectionPositions.find(function (section) {
        return (
          currentPosition >= section.top && currentPosition < section.bottom
        );
      });
      // If a current section is found, change the color of its corresponding navigation link
      if (currentSection) {
        var currentLink = document.querySelector(
          'a[href="#' + currentSection.id + '"]'
        );
        if (currentLink) {
          currentLink.style.color = "var(--highlight)"; // Set the desired color
        }
      }

      // Change the color of all links if the scroll position is within the second and fourth sections
      if (
        currentPosition >= sectionPositions[1].top &&
        currentPosition < sectionPositions[3].bottom
      ) {
        navLinks.forEach(function (link) {
          if (link.style.color !== "var(--highlight)") {
            link.style.color = "var(--font-dark)"; // Set the desired color
          }
        });
      }

      // Show navigation links if they were hidden
      navLinks.forEach(function (link) {
        link.style.display = "";
      });
    } else {
      // Hide navigation links when scrolling over the footer
      navLinks.forEach(function (link) {
        link.style.display = "none";
      });
    }
  });
});

// ---- GENERATING CARDS -----
// data for the cards
const cardData = [
  {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    link: 'https://oskarprzybylski23.github.io/Hiking-Game/',
    imageSrc: 'assets/hikingGame.PNG',
    heading: 'Hiking Game',
  },
  {
    content:
      'Quake Finder is a web app designed to empower users to explore historical earthquake data from around the world. With Quake Finder, users can delve into seismic events and understand their impact.',
    link: 'https://fac29a.github.io/Oskar-Zukhra-Project/',
    imageSrc: 'assets/QuakeFinder.PNG',
    heading: 'Quake Finder',
  },
  {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    link: 'https://www.freecodecamp.org/',
    imageSrc: 'assets/taskManager.png',
    heading: 'Task Manager',
  },
  {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    link: 'https://oskarprzybylski23.github.io/Hiking-Game/',
    imageSrc: 'assets/hikingGame.PNG',
    heading: 'Hiking Game',
  },
];

// Get the template element and the container
const cardTemplate = document.getElementById("card-template");
const cardContainer = document.getElementById("four-content-container");

// Function to create and append cards to the container
function createCard(card) {
  const cardClone = document.importNode(cardTemplate.content, true);
  const cardContent = cardClone.querySelector(".card-content");
  const cardLink = cardClone.querySelector(".page-link");
  const cardImage = cardClone.querySelector(".card-image img");
  const cardHeading = cardClone.querySelector(".card-heading h3");

  // Set card data
  cardContent.querySelector("p").textContent = card.content;
  cardLink.href = card.link;
  cardImage.src = card.imageSrc;
  cardImage.alt = card.heading;
  cardHeading.textContent = card.heading;

  // Append the cloned card to the container
  cardContainer.appendChild(cardClone);
}

// Loop through the card data and create cards
cardData.forEach(createCard);
