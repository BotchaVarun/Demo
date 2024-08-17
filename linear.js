let speed = 2000; // Default speed
const speedInput = document.getElementById("speed");

// Update speed based on input value
speedInput.addEventListener("input", function() {
    switch(speedInput.value) {
        case '0':
            speed = 1500;
            break;
        case '1':
            speed = 1000;
            break;
        case '2':
            speed = 800;
            break;
        case '3':
            speed = 500;
            break;
        default:
            speed = 2000; // Default if out of range
    }
    console.log(speed);
});
/* menu info animation (pseudo code) */
var e1 = document.querySelector('.e1');
var e2 = document.querySelector('.e2');
var e3 = document.querySelector('.e3');
var e4 = document.querySelector('.e4');
var e5 = document.querySelector('.e5');
var data = document.querySelector('.menu1 h1');
let searchInterval;
let currentIndex = 0;
let isPaused = false;
let isSearching = false; // Ensure only one instance of search runs

document.addEventListener("DOMContentLoaded", function() {
    initializeArray(); // Initialize with default array values when the page loads
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSearch() {
    if (isSearching) return;  // Prevent multiple instances
    isSearching = true;
    
    isPaused = false;
    const searchInput = document.getElementById('search-value').value;
    const searchValue = parseInt(searchInput);
    document.querySelectorAll('.btn-1-re-start').forEach(function(element) {
        element.classList.toggle('display'); // Toggles the display class
    });
    
    document.querySelectorAll('.btn-1-start').forEach(function(element) {
        element.classList.toggle('none'); // Toggles the none class
    });

    // Check if search value is empty or not a number
    if (isNaN(searchValue) || searchInput.trim() === '') {
        alert("Please enter a valid number to search for.");
        isSearching = false; // Reset the search state
        return;
    }
    
    const elements = document.querySelectorAll('.element-value');
    let found = false;  // Flag to check if element is found
    
    while (currentIndex < elements.length) {
        e2.classList.toggle('show');
        
        if (isPaused) {
            await new Promise(resolve => searchInterval = resolve);
        }

        const currentElement = elements[currentIndex];
        console.log(elements[currentIndex]);
        currentElement.classList.add('highlight', 'compared');

        await sleep(500); // Example speed, you can adjust this

        currentElement.classList.remove('highlight');
        data.innerHTML = "key element " + searchValue + " is compared to the element " + elements[currentIndex].textContent;
        
        if (parseInt(currentElement.textContent) === searchValue) {
            e2.classList.remove('show');
            e3.classList.remove('show');
            e4.classList.toggle('show');
            e5.classList.remove('show');
            data.innerHTML = "key element " + searchValue + " is found at the index of  " + currentIndex;
            currentElement.classList.add('found');
            found = true;  // Mark as found
            break;
        } else {
            e2.classList.remove('show');
            e3.classList.toggle('show');
            e4.classList.remove('show');
            e5.classList.remove('show');
            currentElement.classList.remove('compared');
        }

        currentIndex++;
    }

    // If the element is not found, show e5
    if (!found) {
        e2.classList.remove('show');
        e3.classList.remove('show');
        e4.classList.remove('show');
        e5.classList.toggle('show');
        data.innerHTML = "key element " + searchValue + " is not found in the array ";
    }
    
    isSearching = false; // Reset the search state
}

function pauseSearch() {
    isPaused = true;
}

function resumeSearch() {
    isPaused = false;
    if (searchInterval) {
        searchInterval();
    }
}

function restartSearch() {
    if (isSearching) return;  // Prevent restarting if search is in progress

    isPaused = true;
    currentIndex = 0;
    const elements = document.querySelectorAll('.element-value');
    elements.forEach(element => {
        element.classList.remove('highlight', 'found', 'compared');
    });
    startSearch();
}

function initializeArray() {
    const input = document.getElementById('array-input').value;
    let values = [];
    
    if (input) {
        values = input.split(',').map(v => v.trim()).filter(v => !isNaN(v)).map(v => parseInt(v));
    }

    if (values.length === 0) {
        values = Array.from({ length: 11 }, () => Math.floor(Math.random() * 100));
    }
    
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';

    values.forEach((value, index) => {
        const elementContainer = document.createElement('div');
        elementContainer.className = 'array-element';

        const elementValue = document.createElement('div');
        elementValue.className = 'element-value';
        elementValue.textContent = value;

        const elementIndex = document.createElement('div');
        elementIndex.className = 'element-index';
        elementIndex.textContent = index;

        elementContainer.appendChild(elementValue);
        elementContainer.appendChild(elementIndex);
        arrayContainer.appendChild(elementContainer);
    });
}



/************************************************* */





/* arrow animation */

function showarrow1() {
    var arrow1 = document.querySelector('.arrow1 i');
    var menu1 = document.querySelector('.menu1');
    
    arrow1.classList.toggle('rotate'); // Rotate the arrow
    menu1.classList.toggle('expand'); // Expand or collapse the menu
    
    // Optional: Add responsive behavior
    if (window.innerWidth < 768) { // For mobile or small screens
        menu1.style.width = '100px'; // Example width for small screens
    } else {
        menu1.style.width = ''; // Reset to default width for larger screens
    }
}

// Add event listener for window resize to handle responsive behavior
window.addEventListener('resize', showarrow1);

function showarrow2() {
    var arrow2 = document.querySelector('.arrow2 i');
    var menu2 = document.querySelector('.menu2');
    var menu2Info = document.querySelector('.menu2-info');

    // Toggle the rotation of the arrow
    arrow2.classList.toggle('rotate');

    // Toggle the expansion of the menu2 and menu2-info
    menu2.classList.toggle('expand');
    menu2Info.classList.toggle('expand');

    // Optional: Add responsive behavior
    if (window.innerWidth < 768) { // For mobile or small screens
        menu2.style.width = '100px'; // Example width for small screens
    } else {
        menu2.style.width = ''; // Reset to default width for larger screens
    }
}

window.addEventListener('resize', showarrow2);


window.addEventListener('resize', showarrow2);

/* full screen */
function fullscreen() {
    const theoryContainer = document.getElementById('Visualization');
    const controls = document.querySelector('.controls');
    
    theoryContainer.classList.add('fullscreen-active');

    // Move controls into the Theory container
    theoryContainer.appendChild(controls);
}

function normalscreen() {
    const theoryContainer = document.getElementById('Visualization');
    const controls = document.querySelector('.controls');
    
    theoryContainer.classList.remove('fullscreen-active');

    // Move controls back to the original location
    document.querySelector('.content').appendChild(controls);
}

/*  buttons to start */
document.querySelectorAll('.btn1-start').forEach(function(startButton) {
    startButton.addEventListener('click', function() {
        console.log("Start button clicked");

        document.querySelectorAll('.btn1-re-start').forEach(function(restartButton) {
            restartButton.classList.remove('none'); // Show the Re-Start button
            console.log("Re-Start button shown");
        });
        startButton.classList.add('none'); // Hide the Start button
        console.log("Start button hidden");
    });
});

document.querySelectorAll('.btn2-pause').forEach(function(startButton) {
    startButton.addEventListener('click', function() {
        console.log("Start button clicked");

        document.querySelectorAll('.btn2-resume').forEach(function(restartButton) {
            restartButton.classList.remove('none'); // Show the Re-Start button
            console.log("Re-Start button shown");
        });

        startButton.classList.add('none'); // Hide the Start button
        console.log("Start button hidden");
    });
});
document.querySelectorAll('.btn2-resume').forEach(function(startButton) {
    startButton.addEventListener('click', function() {
        console.log("Start button clicked");

        document.querySelectorAll('.btn2-pause').forEach(function(restartButton) {
            restartButton.classList.remove('none'); // Show the Re-Start button
            console.log("Re-Start button shown");
        });

        startButton.classList.add('none'); // Hide the Start button
        console.log("Start button hidden");
    });
});

function toggle() {
    var menu = document.querySelector('.prompt-menu');
    menu.classList.toggle('visible');
    console.log('Menu toggled'); // Debugging log
}

