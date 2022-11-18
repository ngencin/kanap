// API products

/*fetch("http://localhost:3000/api/products") // requête récupérer les données 
    .then(function(res){
        return res.json() // résultat requête format json
  }).then(function(value){
        console.log(value); // affichage produits
});*/

async function getProducts(){
   const response = await fetch("http://localhost:3000/api/products")
    const responseJson = await response.json()
   
   
    // Array Json

let valeur = responseJson[0].imageUrl // récupère valeur du array Json


// Products

// Récupération lien produit
let createLink = document.createElement("a") // élement lien
createLink.href = "./product.html?id=42" // adresse url
createLink.text='Kanap'
let link = document.querySelector('#items').appendChild(createLink) // element parent items , enfant de cet élement article


// Récupération section article
let createArticle = document.createElement("article") // création balise article
let article = createLink.appendChild(createArticle) // balise article enfant de cardArticle


// Récupération image
let createImg = document.createElement("img") // création élément img 
createImg.text = "Kanap Sinopé" 
let img = createArticle.appendChild(createImg) 
img.src = valeur    // appel de l'image via array json


// Récupération h3
let createH3 = document.createElement("h3")
let h3 = createArticle.appendChild(createH3)
}
getProducts().then()

