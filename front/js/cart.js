
////// gestion panier /////

// Permet de sauvegarder le panier dans le localStorage
function saveBasket(basket) { //basket en paramètre permet de dire quel panier va être enregistré
    localStorage.setItem("basket", JSON.stringify(basket)) // objet transformer en chaine de caractères 
}
// création du panier
function getBasket() {
    let basket = localStorage.getItem("basket") // enregistrement dans une variable ce que l'on récupère
    if (basket == null) { // si la donnée n'existe pas dans le panier il retournera un null
        return [] // tableau/panier vide
    } else {
        return JSON.parse(basket) // si le panier existe on transforme la chaine de caractères en objet
    }
}

// affichage des articles dans le panier
function basketItem(products) {
    let basket = JSON.parse(localStorage.getItem("basket")) // insertion localStorage
    if (basket == null || basket == 0) {
        document.querySelector("h1").innerHTML = `<p>Votre panier est vide</p>`
    } else {
        let productaddQuantity = 0
        let resultPrice = 0
        for (let product of basket) {
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
            createH2Item.innerHTML = `${item.name}`

            // création p
            let createDescriptionItem = document.createElement('p')
            createItemContentDescription.appendChild(createDescriptionItem)
            createDescriptionItem.innerHTML = `${product.color}`

            // création p
            let createPriceItem = document.createElement('p')
            createItemContentDescription.appendChild(createPriceItem)
            createPriceItem.innerHTML = `${item.price}` + ' ' + '€'

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
            createQuantity.innerHTML = "Qté :" + ' '

            // création input
            let itemQuantity = document.createElement('input')
            createItemSettingsQuantity.appendChild(itemQuantity)
            itemQuantity.setAttribute("type", "number") // type de l'input
            itemQuantity.className = ('itemQuantity')
            itemQuantity.setAttribute("name", "itemQuantity")
            itemQuantity.setAttribute("min", 1)
            itemQuantity.setAttribute("max", 100)
            itemQuantity.setAttribute("value", `${product.quantity}`)  // valeur de la quantité entrée par l'utilisateur
            itemQuantity.addEventListener("input", (e) => totalQuantityPrice(e, products)) //écoute evenement sur l'input 


            // création div product content settings delete
            let createItemSettingsDelete = document.createElement('div')
            createItemContentSettings.appendChild(createItemSettingsDelete)
            createItemSettingsDelete.className = ('cart__item__content__settings__delete')

            // création p
            let itemDelete = document.createElement('p')
            createItemSettingsDelete.appendChild(itemDelete)
            itemDelete.className = ('deleteItem')
            itemDelete.innerHTML = "Supprimer"
            itemDelete.addEventListener("click", (e) => removeFromBasket(e, products)) //écoute evenement sur l'input 

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



// fonction qui permet de changer la quantité dans l'input
function totalQuantityPrice(e, products) {
    let basket = getBasket()// appel du panier
    let valueQuantity = e.target.value
    let cartItem = e.target.closest('.cart__item')
    let dataId = cartItem.getAttribute('data-id')
    let dataColor = cartItem.getAttribute('data-color')
    let changeQuantity = basket.find(p => p.productID === dataId && p.color === dataColor)
    if (changeQuantity != undefined) {
        if (valueQuantity > 100) {
            valueQuantity = 100
        }
        changeQuantity.quantity = parseInt(valueQuantity) // transfromation de la chaine de caractères en nombre
        saveBasket(basket)
    }
    newQuantityBasket(changeQuantity) // appel de la fonction qui permet de changer la quantité total du panier
    newPriceBasket(products) // appel de la fonction qui affiche le prix total du panier à jour
}
// fonction qui permet de metre à jour la quantité
function newQuantityBasket(item) {
    let basket = getBasket()
    let totalQty = document.getElementById("totalQuantity")
    let totalQtyBasket = basket.reduce((total, item) => total + item.quantity, 0) // rajoute une quantité au panier
    totalQty.textContent = totalQtyBasket // affiche le total en direct lors d'un changement de quantité
}

// fonction qui permet de mettre à jour le prix 
function newPriceBasket(products) {
    let basket = getBasket()
    let resultPrice = 0 // initialisation à 0 du total 
    for (let product of basket) { // produit présent dans le panier
        let item = products.find(p => p._id == product.productID) // appel des informations du produit
        resultPrice += product.quantity * item.price // si on ajoute ou on retire des quantité le prix se met à jour
    }
    let totalPriceProduct = document.getElementById("totalPrice")
    totalPriceProduct.textContent = resultPrice // affiche le prix total du panier à jour
}


// fonction qui supprime le produit du local storage
function removeFromBasket(e, products) {
    let basket = getBasket() // récupération du panier
    let valueQuantity = e.target.value // addlistenner appelé 
    let cartItem = e.target.closest('.cart__item') // élement le plus proche des setAttributes data-id et data-color
    let dataId = cartItem.getAttribute('data-id') // récupération de l'attribut data-id
    let dataColor = cartItem.getAttribute('data-color') // récupération de l'attribut data-color
    let removeQuantity = basket.findIndex(p => p.productID === dataId && p.color === dataColor) // trouve l'index du produit à supprimer
    if (removeFromBasket != undefined) {
        basket.splice(removeQuantity, 1) // index removeQuantity,  -1
        alert('Article supprimé')
        saveBasket(basket) // appel de la fonction qui sauvegarde le panier 
        if (basket.length === 0) {
            document.querySelector("h1").innerHTML = `<p>Votre panier est vide</p>`
        }
    }
    newQuantityBasket(valueQuantity) // appel de la fonction qui permet de changer la quantité total du panier
    newPriceBasket(products)
    cartItem.remove() // appel de la fonction qui affiche le prix total du panier à jour
}

//fonction qui envoie le tableau des produits au back-end
let resultBasket = [] // array vide 
function idsBasket() { 
   let basket = getBasket() // appel du panier
    if (basket && basket.length > 0) { // si la longueur du panier est supérieur à 0
        for (let item of basket) {
            resultBasket.push(item.productID) // on push les produits au serveur
        }
    } else {
        document.querySelector('#order').setAttribute("value", "Le panier est vide !") // sinon on renvoi une réponse du type "Le panier est vide"
    }
    
   return resultBasket
}
////// fin gestion panier /////


////// début formulaire /////

//Bouton qui envoie le formulaire au localStorage
const order = document.getElementById("order")
order.addEventListener('click', (event) => {
    event.preventDefault();

    ////// validation formulaire /////
    let inputName = document.getElementById("firstName")
    let inputLastName = document.getElementById("lastName")
    let inputCity = document.getElementById("city")
    let inputAddress = document.getElementById("address")
    let inputMail = document.getElementById("email")
    
    // Récupération des données du formulaire
    const valuesForm = {
        contact: {
            firstName: inputName.value,
            lastName: inputLastName.value,
            address: inputAddress.value,
            city: inputCity.value,
            email: inputMail.value
        },
        products: idsBasket()
        // appel de la fonction qui permet d'appeler tous les id présents dans le panier
    }

    ////// début regex Prénom - Nom - Ville /////
    // regex formulaire
    const namesCityRegex = (value) => {
        return /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._',";\s-]{2,20}$/.test(value)
    }
     // champ prénom
    function firstNameOk() {
        const firstNameValid = inputName.value // récupére la valeur entrée par l'utilisateur
        if (namesCityRegex(firstNameValid)) { // si le champ est valide le message d'erreur ne s'affiche pas
            firstNameErrorMsg.innerHTML = ''
            return true
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner un prénom' // si le champ n'est pas valide un message d'erreur s'affiche
            return false
        }
    }
    // champ nom
    function lastNameOk() {
        const lastNameValid = inputLastName.value
        if (namesCityRegex(lastNameValid)) { // si le champ est valide le message d'erreur ne s'affiche pas
            lastNameErrorMsg.innerHTML = ''
            return true
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner un nom' // si le champ n'est pas valide un message d'erreur s'affiche
            return false
        }
    }
    // champ ville
    function cityOk() {
        const cityValid = inputCity.value
        if (namesCityRegex(cityValid)) { // si le champ est valide le message d'erreur ne s'affiche pas
            cityErrorMsg.innerHTML = ''
            return true
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner une ville' // si le champ n'est pas valide un message d'erreur s'affiche
            return false
        }
    }
    ////// fin regex Prénom - Nom - Ville /////


    //// regex Adresse /////
    const addressRegex = (value) => {
        return /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._',";\s-]{2,40}$/.test(value)
    }
    function addressOk() {
        const addressValid = inputAddress.value
        if (addressRegex(addressValid)) { // si le champ est valide le message d'erreur ne s'affiche pas
            addressErrorMsg.innerHTML = ''
            return true
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner une adresse' // si le champ n'est pas valide un message d'erreur s'affiche
            return false
        }
    }
    ////// fin regex Adresse /////

    ////// regex Email /////
    const emailRegex = (value) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    }
    function emailOk() {
        const emailValid = inputMail.value
        if (emailRegex(emailValid)) { // si le champ est valide le message d'erreur ne s'affiche pas
            emailErrorMsg.innerHTML = ''
            return true
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner un mail' // si le champ n'est pas valide un message d'erreur s'affiche
            return false
        }
    }
    ////// fin regex Email /////
    ////// fin validation formulaire /////


    ////// serveur /////
    const firstNameIsValid = firstNameOk()
    const lastNameIsValid = lastNameOk()
    const cityIsValid = cityOk()
    const addressIsValid = addressOk()
    const emailIsValid = emailOk()
    const basketValid = idsBasket()

    // fonction qui permet de changer l'input si il n'est pas valide
    function formValidate() {
        let form = event.target.closest('.cart__order__form')
        form.firstName.addEventListener('input', () => {
            firstNameOk()
        })
        form.lastName.addEventListener('input', () => {
            lastNameOk()
        })
        form.city.addEventListener('input', () => {
            cityOk()
        })
        form.address.addEventListener('input', () => {
            addressOk()
        })
        form.email.addEventListener('input', () => {
            emailOk()
        })
    }
    formValidate()


// envoie des données recupérées au serveur après validation
    if (basketValid != 0 && firstNameIsValid && lastNameIsValid && cityIsValid && addressIsValid && emailIsValid) { // envoi des champs valident au serveur
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(valuesForm),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }  // envoyé les données
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                const orderId = data.orderId // récupération du numéro de commande
                window.location.href = "./confirmation.html" + "?orderId=" + orderId; // reidrection à la page de confirmation
                return console.log(data)
            })
            .catch(function (error) { // si problème de permission un message d'erreur s'affiche
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message)
            })
        document.querySelector('#order').setAttribute("value", "Commande validée !") // message qui confirme que la commande est validée
    } 
})
////// fin serveur /////


////// fetch affichage des produits /////
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((products) => {
        basketItem(products) // appel de la fonction basketItem si c'est ok
    })
    .catch(function (error) { // si problème de permission un message d'erreur s'affiche
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message)
    })
////// fin fetch affichage des produits /////



