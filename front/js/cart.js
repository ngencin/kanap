

// Permet de sauvegarder le panier dans le localStorage
function saveBasket(basket){ //basket en paramètre permet de dire quel panier va être enregistré
    localStorage.setItem("basket", JSON.stringify(basket)) // objet transformer en chaine de caractères 
}
// création du panier
function getBasket(){
    let basket = localStorage.getItem("basket") // enregistrement dans une variable ce que l'on récupère
    if(basket == null){ // si la donnée n'existe pas dans le panier il retournera un null
        return[] // tableau/panier vide
    }else{
        return JSON.parse(basket) // si le panier existe on transforme la chaine de caractères en objet
    }
}


// affichage des articles dans le panier
function basketItem(products){
    let basket = JSON.parse(localStorage.getItem("basket")) // insertion localStorage
    if(basket == null || basket == 0){
       document.querySelector("h1").innerHTML = `<p>Votre panier est vide</p>`
    }else{
        let productaddQuantity = 0
        let resultPrice = 0
        for(let product of basket){
        let item = products.find(p => p._id == product.productID)

//création article
        let createItem = document.getElementById('cart__items') // Insertion de l'id cart__items
        let articleItem = document.createElement('article')  // création de l'élement article 
        articleItem.className = ('cart__item') // récupération de la class cart__item
        createItem.appendChild(articleItem) // parent cart__items enfant article
        articleItem.setAttribute("data-id", `${product.productID}`) // récupération des attributs
        articleItem.setAttribute("data-color", `${product.color}`)  // récupération des attributs
        
        // création div cart product
        let createImgItem = document.createElement('div') // création de la div cart__item__img
        articleItem.appendChild(createImgItem) // parent article enfant cart__item__img
        createImgItem.className = ('cart__item__img')

        // création img
        let createImg = document.createElement("img") // création de l'élément img 
        createImgItem.appendChild(createImg) // parent cart__item__img enfant img
        createImg.src = `${item.imageUrl}` // appel du lien de l'image
        createImg.alt = `${item.altTxt}` // text alternatif si l'image ne s'affiche pas 

        // création div cart product content
        let createItemContent = document.createElement('div')
        articleItem.appendChild(createItemContent)
        createItemContent.className = ('cart__item__content')

        // création div cart product content description
        let createItemContentDescription = document.createElement('div')
        createItemContent.appendChild(createItemContentDescription)
        createItemContentDescription.className = ('cart__item__content__description')

        // création h2
        let createH2Item = document.createElement('h2')
        createItemContentDescription.appendChild(createH2Item)
        createH2Item.innerHTML= `${item.name}`

        // création p
        let createDescriptionItem = document.createElement('p')
        createItemContentDescription.appendChild(createDescriptionItem)
        createDescriptionItem.innerHTML= `${product.color}`

        // création p
        let createPriceItem = document.createElement('p')
        createItemContentDescription.appendChild(createPriceItem)
        createPriceItem.innerHTML= `${item.price}`+ ' ' +'€'

        // création div cart product content settings
        let createItemContentSettings = document.createElement('div')
        createItemContent.appendChild(createItemContentSettings)
        createItemContentSettings.className = ('cart__item__content__settings')

        // création div cart product settings qty
        let createItemSettingsQuantity = document.createElement('div')
        createItemContentSettings.appendChild(createItemSettingsQuantity)
        createItemSettingsQuantity.className = ('cart__item__content__settings__quantity')

        // création p
        let createQuantity = document.createElement('p')
        createItemSettingsQuantity.appendChild(createQuantity)
        createQuantity.innerHTML= "Qté :" + ' '

        // création input
        let itemQuantity = document.createElement('input') 
        createItemSettingsQuantity.appendChild(itemQuantity)
        itemQuantity.setAttribute("type", "number") // type de l'input
        itemQuantity.className = ('itemQuantity') 
        itemQuantity.setAttribute("name", "itemQuantity")
        itemQuantity.setAttribute("min", "1") 
        itemQuantity.setAttribute("max", "100")
        itemQuantity.setAttribute("value", `${product.quantity}`)  // valeur de la quantité entrée par l'utilisateur
        itemQuantity.addEventListener("change",() => totalQuantityPrice(product, itemQuantity.value, products)) //écoute evenement sur l'input 

       
        // création div product content settings delete
        let createItemSettingsDelete = document.createElement('div')
        createItemContentSettings.appendChild(createItemSettingsDelete)
        createItemSettingsDelete.className = ('cart__item__content__settings__delete')

        // création p
        let itemDelete = document.createElement('p')
        createItemSettingsDelete.appendChild(itemDelete)
        itemDelete.className = ('deleteItem')
        itemDelete.innerHTML = "Supprimer"
        itemDelete.addEventListener("click",() => removeFromBasket(product, products)) //écoute evenement sur l'input 
        
        //total quantité dans le panier
        productaddQuantity += product.quantity
        let quantityBasket = document.getElementById("totalQuantity")
        quantityBasket.innerHTML = `<span id="totalQuantity">${productaddQuantity}</span>`
        
         //calcul prix total panier
        resultPrice += product.quantity * item.price
        let priceBasket = document.getElementById("totalPrice")
        priceBasket.innerHTML = `<span id="totalPrice">${resultPrice}</span>`
        }
    } 
} 



    // fonction qui permet de changer la quantité avec l'input
    function totalQuantityPrice(item, newQuantity, products){
        let basket = getBasket()// appel du panier
        let changeQuantity = basket.find(p => p.productID === item.productID && p.color === item.color)
        if(changeQuantity != undefined){
            if(newQuantity > 100){
                newQuantity = 100 // quantité comprise en 1 et 100
            }
        changeQuantity.quantity = parseInt(newQuantity) // transfromation de la chaine de caractères en nombre
        saveBasket(basket)
        }   
        newQuantityBasket(item) // appel de la fonction qui permet de changer la quantité total du panier
        newPriceBasket(products) // appel de la fonction qui affiche le prix total du panier à jour
          
    }
// fonction qui permet de metre à jour la quantité
    function newQuantityBasket(item){
        let basket = getBasket()
        let totalQty = document.getElementById("totalQuantity")
        let totalQtyBasket = basket.reduce((total, item) => total + item.quantity, 0) // rajoute une quantité au panier
        totalQty.textContent = totalQtyBasket // affiche le total en direct lors d'un changement de quantité
    }

    // fonction qui permet de mettre à jour le prix 
    function newPriceBasket(products){
        let basket = getBasket()
        let  resultPrice = 0 // initialisation à 0 du total 
        for(let product of basket){ // produit présent dans le panier
            let item = products.find(p => p._id == product.productID) // appel des informations du produit
            resultPrice += product.quantity * item.price // si on ajoute ou on retire des quantité le prix se met à jour
        }
        let totalPriceProduct = document.getElementById("totalPrice")
        totalPriceProduct.textContent =  resultPrice // affiche le prix total du panier à jour
    }
    

    // fonction qui supprime le produit du local storage
    function removeFromBasket(item, products){
        let basket = getBasket()
        let removeQuantity = basket.findIndex(p => p.productID === item.productID && p.color === item.color) // trouve l'index du produit à supprimer
        if(removeQuantity != undefined){
        basket.splice(removeQuantity, 1) // index removeQuantity,  -1
        alert('Article supprimé')
        deleteArticleBasket(item) // appel de la fonction qui permet de supprimer le produit afficher dans le panier
        saveBasket(basket) // appel de la fonction qui sauvegarde le panier 
            if (basket.length === 0) {
                document.querySelector("h1").innerHTML = `<p>Votre panier est vide</p>`
            }
        } 
        newQuantityBasket(item) // appel de la fonction qui permet de changer la quantité total du panier
        newPriceBasket(products) // appel de la fonction qui affiche le prix total du panier à jour
    }

    //fonction qui supprime l'affichage du produit dans le panier lorsqu'il est supprimé
    function deleteArticleBasket(item){
        let articleDelete = document.querySelector(`article[data-id="${item.productID}"][data-color="${item.color}"]`) // selectionne l'id et la couleur du produit à supprimer
        articleDelete.remove() // supprime le produit afficher dans le panier
    }

///////////////// Formulaire /////////////////


function submitOrder(event){
    let basket = getBasket()
    event.preventDefault() // ne pas rafraichir la page lors du click
    if (basket.length === 0) // si la longueur du tableau est = à 0
    alert("Veuillez remplir le panier") // un message d'erreur s'affiche
    let form = document.querySelector(".cart__order__form")
    let inputElements = contactElements() // appel de la fonction contactElements

}

function contactElements(){
    let elements = { //création d'un objet 
    contact: {
    firstname:"string",
    lastname:  "string",
    address:  "string",
    city:  "string",
    email: "string"
    },
    products: ["string"]
    }
    return elements
}
let order = document.getElementById("order")
order.addEventListener('click', (event) => submitOrder(event))










fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((products) => {
 basketItem(products); // appel de la fonction basketItem si c'est ok
})
.catch(function(error) { // si problème de permission un message d'erreur s'affiche
console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
});