var data = null

async function showRandomDish(){
    let api = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    let list = await api.json()
    const meal = list.meals[0]
    data = meal
    console.log(meal)
    document.getElementById('randomDish').innerHTML= meal.strMeal;
    document.getElementById("randomImage").src = meal.strMealThumb
}
showRandomDish()



function showOtherData(object){
    console.log(object)
    const otherData = document.getElementById("otherData")
    otherData.innerHTML = `<div class="video-container">
                                <iframe src="${object.strYoutube.replace('watch?v=', 'embed/')}" allowfullscreen></iframe>
                            </div>`
    document.getElementById("ingre").style.visibility = 'visible'

}


function showIngredients(object){
    let ingredients = []
    let measures = []
    for (let i = 1; i <= 20; i++) { 
        let ingredient = object[`strIngredient${i}`];
        let measure = object[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(ingredient);
            measures.push(measure)
        }
    };
    console.log(ingredients)
    console.log(measures)
    const ingreDiv = document.getElementById("ingredientsList")
    let dataToAppend = `<h3>
                            Ingredients:
                        </h3>
                        <ul>`
    for(let i = 0; i< measures.length;i++){
        dataToAppend+=`<li>${measures[i]} ${ingredients[i]}</li>`
    }
    dataToAppend+=`</ul>`
    ingreDiv.innerHTML = dataToAppend
    showOtherData(object)
}

document.getElementById("random").addEventListener(('click'),() => {
    showIngredients(data)
})


document.getElementById("close").addEventListener(('click'),() => {
    document.getElementById("ingre").style.visibility = "hidden"
})