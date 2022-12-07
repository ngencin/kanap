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
        itemQuantity.addEventListener("change",() => totalQuantityPrice(product.productID, itemQuantity.value)) //écoute evenement sur l'input 
       

        // création div product content settings delete
        let createItemSettingsDelete = document.createElement('div')
        createItemContentSettings.appendChild(createItemSettingsDelete)
        createItemSettingsDelete.className = ('cart__item__content__settings__delete')

        // création p
        let itemDelete = document.createElement('p')
        createItemSettingsDelete.appendChild(itemDelete)
        itemDelete.className = ('deleteItem')
        itemDelete.innerHTML = "Supprimer"
        itemDelete.addEventListener("change",() => removeFromBasket(product.productID, itemQuantity.value)) //écoute evenement sur l'input 
        } 
    } 
}

// fonction qui permet de chaner la quantité avec l'input
function totalQuantityPrice(product, newQuantity){
    let basket = getBasket() // appel du panier
    let foundProduct = basket.find(p => p._id == product._id) // si l'id est égal à l'id dans le panier
    if(foundProduct != undefined){
        foundProduct.quantity = parseInt(newQuantity) // transfromation de la chaine de caractères en nombre 
        foundProduct.quantity < 100 // quantité comprise en 1 et 100
    } saveBasket(basket)
}


fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((products) => {
 basketItem(products); // appel de la fonction basketItem si c'est ok
})
.catch(function(error) { // si problème de permission un message d'erreur s'affiche
console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
});