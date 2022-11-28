
// Récupération des paramètres URL en JS 
const url = new URL(window.location.href);
let params = (new URL(document.location)).searchParams;
let productID = params.get('_id'); 



// Récupération des produits de l'API
let productsJson = fetch(`http://localhost:3000/api/products/${productID}`) // url qui récupère l'ID du produit
    .then(function(res){
        return res.json() // résultat requête format json
    }).then((products) => { // appel des produits
       getProduct(products) // appel de la fonction qui permet l'affichage des produits, qui permet d'éviter undefined pour les variables
});


    function getProduct(products){  
        let itemImg = document.querySelector('article div.item__img') // récupération de la div item_img se trouvant dans la balise article
            itemImg.innerHTML=`<img src=${products.imageUrl}>` // affiche l'image du produit

            let itemTitle = document.getElementById("title") // récupère l'ID title
            itemTitle.innerHTML = `<h1 id="title">${products.name}</h1>` // affiche le titre du produit

            let createPrice = document.getElementById("price")  // récupère l'ID price
            createPrice.innerHTML = `<span id="price">${products.price}</span>` // affiche le prix du produit
            
            let itemDescription = document.getElementById("description") // récupère l'ID description
            itemDescription.innerHTML = `<p id="description">${products.description}</p>` // affiche la description du produit

            let itemColors = document.getElementById("colors") // récupère l'ID colors
                for (let color of products.colors){ // boucle for qui permet d'afficher les couleurs
                itemColors.innerHTML += `<option value=" ">${color}</option>` // affiche la liste déroulante des couleurs 
                }
    }

    // Localstorage
    localStorage.setItem['itemQuantity', 'colors'];
    console.log(localStorage)