// API products

/*fetch("http://localhost:3000/api/products") // requête récupérer les données 
    .then(function(res){
        return res.json() // résultat requête format json
  }).then(function(value){
        console.log(value); // affichage produits
});*/

async function getProducts(){
   const response = await fetch("http://localhost:3000/api/products")
    console.log(response)
    const responseJson = await response.json()
    console.log(responseJson)
}
getProducts().then()


// Products

