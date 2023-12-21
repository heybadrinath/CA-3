// Consolidated DOM selections
const randomDishElement = document.getElementById('randomDish');
const randomImageElement = document.getElementById('randomImage');
const otherDataElement = document.getElementById('otherData');
const ingreDiv = document.getElementById('ingredientsList');
const searchBar = document.getElementById('searchBar');
const searchContent = document.getElementById('searchContent');
const randomButton = document.getElementById('random');
const closeButton = document.getElementById('close');

// Initializing the data variable to store fetched meal information
let data = null;

// Function to fetch and display a random dish
async function showRandomDish() {
    try {
        const api = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const list = await api.json();
        const meal = list.meals[0];

        // Storing fetched meal data in the 'data' variable
        data = meal;

        // Displaying the name of the meal and its image
        randomDishElement.innerHTML = meal.strMeal;
        randomImageElement.src = meal.strMealThumb;

    } catch (error) {
        console.log('Error fetching random dish:', error);
    }
}
// Calling the function to display a random dish when the page loads
showRandomDish();

// Function to display ingredients for a selected dish
function showIngredients(object) {
    const ingredients = [];
    const measures = [];

    let i = 1;
    while (object[`strIngredient${i}`]) {
        const ingredient = object[`strIngredient${i}`];
        const measure = object[`strMeasure${i}`];
        if (ingredient.trim() !== '') {
            ingredients.push(ingredient);
            measures.push(measure);
        }
        i++;
    }

    const dataToAppend = `<h3>Ingredients:</h3><ul>${measures
        .map((measure, index) => `<li>${measure} ${ingredients[index]}</li>`)
        .join('')}</ul>`;
    ingreDiv.innerHTML = dataToAppend;
    showOtherData(object);
}

// Error handling for YouTube link
function showOtherData(object) {
    if (!object.strYoutube) {
        console.log('No YouTube link available for this meal');
        return;
    }

    const youtubeLink = object.strYoutube.replace('watch?v=', 'embed/');
    otherDataElement.innerHTML = `<div class="video-container">
                                    <iframe src="${youtubeLink}" allowfullscreen></iframe>
                                </div>`;
    document.getElementById('ingre').style.visibility = 'visible';
}

// Event listeners using previously declared variables
randomButton.addEventListener('click', () => {
    showIngredients(data);
});

closeButton.addEventListener('click', () => {
    document.getElementById('ingre').style.visibility = 'hidden';
});

searchBar.addEventListener('input', searchDish);

// Function to search for dishes based on user input
async function searchDish() {

    const searchTerm = searchBar.value.trim();

    if (searchTerm === '') {
        searchContent.innerHTML = '<p>No dishes searched.</p>';
        return;
    }

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchTerm}`;
    try {
        const response = await fetch(apiUrl);
        const responseData = await response.json();
        displaySearchResults(responseData.meals);
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

// Function to display search results based on the fetched data
function displaySearchResults(meals) {
    searchContent.innerHTML = '';

    if (!meals) {
        searchContent.innerHTML = '<p>No results found.</p>';
        return;
    }

    meals.forEach((meal) => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('searchResult');
        mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="searchImage">
            <p>${meal.strMeal}</p>
        `;
        searchContent.appendChild(mealDiv);
    });
    searchContent.scrollIntoView({ behavior: 'smooth' });
}
