let ingredientCount = 0;
let ingredientArray = [];
let recipeList = [];
let recipeId = [];
let recipeInfo;

setUp();

function findLast(){
    console.log("last1");
    let lastRecipe = window.localStorage.getItem('lastRecipe');
    console.log(lastRecipe);
    const settings = {
        "async": false,
        "crossDomain": true,
        "url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${lastRecipe}/information`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "10aec3ffa7mshdac16678f4fa80bp13ac63jsnadcdde4c2a5b",
            "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        recipeList.push(response);
        console.log("last");
})
};

function findSnack(){
    console.log("snack1");
    const settings = {
        "async": false,
        "crossDomain": true,
        "url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=dessert&number=1`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "10aec3ffa7mshdac16678f4fa80bp13ac63jsnadcdde4c2a5b",
            "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        recipeList.push(response.recipes[0]);
        console.log("random");
})};

function findRandom(){
    console.log("random1");
    const settings = {
        "async": false,
        "crossDomain": true,
        "url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=lunch&number=1`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "10aec3ffa7mshdac16678f4fa80bp13ac63jsnadcdde4c2a5b",
            "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        recipeList.push(response.recipes[0]);
        console.log("random");
})};


function setUp() {
    findLast();
    findSnack();
    findRandom();
    console.log(recipeList);
    
    displayRecipe(recipeList);
  };

document.getElementById('ingredient-input').addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("add-button").click();
    }
  });

function addIngredient() {
    let newIngredient = document.getElementById("ingredient-input").value;
    
    ingredientArray[ingredientCount] = newIngredient;
    const ingridient = $("<span>");
    ingridient.text(newIngredient);

    const delButton = $("<button>").addClass("btn-close");
    delButton.attr("aria-label","Close");
    delButton.attr("item-count", ingredientCount);
    delButton.click(removeIngredient);

    const itemWrapper = $("<div>").addClass("list-item-wrapper");
    itemWrapper.append(ingridient);
    itemWrapper.append(delButton);

    const listItem = $("<li>").addClass(`list-group-item list-group-item-action ${ingredientCount}`);
    listItem.append(itemWrapper);

    const ingredientList = $(".ingredient-list");
    ingredientList.append(listItem);

    document.getElementById("ingredient-input").value = "";

    ingredientCount +=1;

    return delButton;
}

function removeIngredient(event){
    let number = event.target;
    console.log(number.getAttribute("item-count"));
    console.log(event.target);
    const removedItem = $(`.${number.getAttribute("item-count")}`);
    removedItem.remove();
    ingredientArray[number.getAttribute("item-count")] = null;
    console.log(ingredientArray);
}

function recipeFinder(){
    recipeCount = 0;
    const filtered = ingredientArray.filter(function (el) {
        return el != null;
    });
    searchRecipe(filtered.join(", "));
}

function NAVrecipeSearch(event){
    event.preventDefault();
    let searchQuery = document.getElementById("NAV-search").value;
    const settings = {
        "async": false,
        "crossDomain": true,
        "url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${searchQuery}&number=18`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "10aec3ffa7mshdac16678f4fa80bp13ac63jsnadcdde4c2a5b",
            "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        recipeList = response.results;
        displayRecipe(recipeList);
});}

function searchRecipe(keyWords){
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" + keyWords + "&number=18"
    const settings = {
        "async": false,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "10aec3ffa7mshdac16678f4fa80bp13ac63jsnadcdde4c2a5b"
        }
    };
    $.ajax(settings).done(function (response) {
	console.log(response);
    recipeList = response;
    displayRecipe(recipeList);
})}

function displayRecipe(recipeList){
    for (let index = 0;index<3; index++){
        console.log(recipeList);
        console.log(index);
        console.log(recipeList[index]);
        recipeId.push(recipeList[index].id);
        let recipe = $(`.card${(index+1)}-img-top`);
        recipe.attr("src", recipeList[index].image);
        let label = $(`.card-title${(index+1)}`);
        if (isNaN(recipeList[index].likes)){
            label.text(recipeList[index].title);
        }
        else{
            label.text(recipeList[index].title + " (" + recipeList[index].likes +"👍)");    
            let usedIngredientCount = $(`.used-ingredient${(index+1)}`);
            usedIngredientCount.text(`Uses ${recipeList[index].usedIngredientCount} selected ingredient(s)`);
            let missedIngredientCount = $(`.missed-ingredient${(index+1)}`);
            missedIngredientCount.text(`Missing ${recipeList[index].missedIngredientCount} ingredient(s)`);
        }
    }

    let showMoreBtn = $("#show-more");
    showMoreBtn.removeClass("d-none").addClass("d-flex");
    recipeId.join("%");
    console.log(recipeId);
    getRecipe(recipeId);
    recipeId = [];
}

function getRecipe(recipeId){
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=" + recipeId
    const settings = {
        "async": false,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "10aec3ffa7mshdac16678f4fa80bp13ac63jsnadcdde4c2a5b"
        }
    };
    $.ajax(settings).done(function (response) {
	console.log(response);
    recipeInfo = response;
    return recipeInfo;
})}

function showRecipe(event){
    console.log("CLick")
    let num = event.getAttribute("number");
    number = parseInt(num);
    let id = recipeId[(number-1)];
    localStorage.setItem('lastRecipe', recipeInfo[(number-1)].id);
    let recipeUrl = recipeInfo[(number-1)].sourceUrl;
    window.open(recipeUrl, '_blank').focus();

}

function resetFind() {
    $(".list-group-item").remove();
    ingredientCount = 0;
    ingredientArray = [];
    recipeList = [];
}

function showMore(){
    console.log("SHOWMORE");
    console.log(recipeList);
    recipeList.splice(0,3);
    console.log(recipeList);
    displayRecipe(recipeList);
}

//dark mode
var isDark = false;

document.getElementById('NAV-theme-btn').addEventListener("click", function(){
  
    
    if (isDark) {
        $('body').css({ 'background-color': '#ffffff', color: '#1a1a1a' });
        isDark = !isDark;

    } else {
        $('body').css({ 'background-color': '#1a1a1a', color: '#1a1a1a' });
        isDark = !isDark;
    }
});
//LIGHT DARK MODE END

const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
    }  
})


