////// affichage des produits /////

// Récupération des paramètres URL en JS 
const url = new URL(window.location.href);
let params = (new URL(document.location)).searchParams;
let productID = params.get('_id')

// Récupération des produits de l'API
let productJson = fetch(`http://localhost:3000/api/products/${productID}`) // url qui récupère l'ID du produit
    .then(function (res) {
        return res.json() // résultat requête format json
    }).then((product) => { // appel des produits
        getProduct(product) // appel de la fonction qui permet l'affichage des produits, qui permet d'éviter undefined pour les variables
    })
    .catch(function (error) { // si problème de permission un message d'erreur s'affiche
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message)
    })

// fonction qui permet d'afficher les produits
function getProduct(product) {
    let itemImg = document.querySelector('article div.item__img') // récupération de la div item_img se trouvant dans la balise article
    itemImg.innerHTML = `<img src=${product.imageUrl}>` // affiche l'image du produit

    let itemTitle = document.getElementById("title") // récupère l'ID title
    itemTitle.innerHTML = `<h1 id="title">${product.name}</h1>` // affiche le titre du produit

    let createPrice = document.getElementById("price") // récupère l'ID price
    createPrice.innerHTML = `<span id="price">${product.price}</span>` // affiche le prix du produit

    let itemDescription = document.getElementById("description")  // récupère l'ID description
    itemDescription.innerHTML = `<p id="description">${product.description}</p>` // affiche la description du produit

    let itemColors = document.getElementById("colors")  // récupère l'ID colors
    for (let color of product.colors) {  // boucle for qui permet d'afficher les couleurs
        itemColors.innerHTML += `<option value="${color}">${color}</option>`  // affiche la liste déroulante des couleurs 
    }

    // écoute de l'événement clic
    const addCart = document.getElementById('addToCart')  // récupération de l'élement sur lequel on détecte le clic
    addCart.addEventListener('click', function () {   // écoute de l'évenement addCart
        let detailProduct = { // création objet
            productID: params.get('_id'), // id du produit
            color: colors.value, // couleur du produit
            quantity: Number(quantity.value) // quantité affichée en nombre du produit
        }
        if (quantity.value > 0 && quantity.value <= 100 && colors.value != '') { // choisir la quantité comprise entre 1 et 100 et une couleur
            addBasket(detailProduct)
            alert('Produit ajouté avec succès dans le panier') // si tout est ok on ajoute au panier
        } else {
            alert('Vous devez ajouter une quantité entre 1 et 100 et une couleur') // si ce n'est pas le cas un message d'alerte s'affichera
        }  // si tout est ok on indique que l'article est bien ajouté au panier
    })
}
////// fin affichage des produits /////