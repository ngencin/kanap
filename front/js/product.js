// Récupération des paramètres URL en JS 
const url = new URL(window.location.href);
const params = url.searchParams.get("_id");
console.log(url);
console.log(params);

// Récupération des produits de l'API

let productsJson = fetch("http://localhost:3000/api/products") // requête récupérer les données 
    .then(function(res){
        return res.json() // résultat requête format json
    }).then((products) => { // appel des produits
        getProduct(products) // appel de la fonction qui permet l'affichage des produits, qui permet d'éviter undefined pour les variables
});                       

