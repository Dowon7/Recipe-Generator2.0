let drinkChoice;
let drinkList = [];
let drinkId = [];
let drinkInfo;
searchdrink("whiskey");

document.getElementById('drink-ingredient-input').addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("add-button").click();
    }
  });


function drinkFinder(){
    let drinkChoice = document.getElementById("drink-ingredient-input").value;
    searchdrink(drinkChoice);
    document.getElementById("drink-ingredient-input").value = ""
}

function searchdrink(keyWords){
    console.log(keyWords)
    const settings = {
        "async": false,
        "crossDomain": true,
        "url": `https://the-cocktail-db.p.rapidapi.com/filter.php?i=${keyWords}`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "10aec3ffa7mshdac16678f4fa80bp13ac63jsnadcdde4c2a5b",
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        drinkList = response;
        displaydrink(drinkList);
})}

function displaydrink(drinkList){
    for (let index = 0;index<3; index++){
        console.log(drinkList);
        console.log(index);
        console.log(drinkList.drinks);
        drinkId.push(drinkList.drinks[index].idDrink);
        let drink = $(`.card${(index+4)}-img-top`);
        drink.attr("src", drinkList.drinks[index].strDrinkThumb);
        let label = $(`.card-title${(index+4)}`);
        label.text(drinkList.drinks[index].strDrink);
        
    }

    let DrinkDrinkBtn = $("#show-more-drink");
    DrinkDrinkBtn.removeClass("d-none").addClass("d-flex");
    console.log(drinkId);
    
    
}

function getdrink(drinkId){
    const settings = {
        "async": false,
        "crossDomain": true,
        "url": `https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${drinkId}`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "10aec3ffa7mshdac16678f4fa80bp13ac63jsnadcdde4c2a5b",
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        drinkInfo = response;
        return drinkInfo;
})}

function showdrink(event){
    console.log("CLick")
    let num = event.getAttribute("number");
    number = parseInt(num);
    // console.log(number);
    let id = drinkId[(number-4)];
    //localStorage.setItem('lastdrink', drinkInfo[(number-1)].id);
    getdrink(drinkId[(number-4)]);
    console.log(drinkId[(number-4)])
    console.log(drinkInfo.drinks[0].strDrink)

}

function resetFind(){
    $(".list-group-item").remove();
    drinkIngredientCount = 0;
    drinkChoice = "";
    drinkList = [];
}

function showMoreDrink(){
    drinkId=[];
    console.log("Drink");
    console.log(drinkList);
    drinkList.drinks.splice(0,3);
    console.log(drinkList);
    displaydrink(drinkList);
    
}

