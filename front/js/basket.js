////// gestion panier /////

// Permet de sauvegarder le panier dans le localStorage
function saveBasket(basket){ //basket en paramètre permet de dire quel panier va être enregistré
    localStorage.setItem("basket", JSON.stringify(basket)) // objet transformer en chaine de caractères 

}
// Création du panier
function getBasket(){
    let basket = localStorage.getItem("basket") // enregistrement dans une variable ce que l'on récupère
    if(basket == null){ // si la donnée n'existe pas dans le panier il retournera un null
        return[] // tableau/panier vide
    }else{
        return JSON.parse(basket) // si le panier existe on transforme la chaine de caractères en objet
    }
}
// Ajout au panier
function addBasket(product){ //variable product
    let basket = getBasket() // récupération du panier
    let foundProduct = basket.find(p => p._id == product._id && p.color == product.color) // recherche dans le panier si il y a un produit dont l'id est égal à l'id du produit que le client souhaite ajouter
    if(foundProduct == undefined){ // si le produit n'est pas dans le panier
       basket.push(product) // on l'ajoute au panier
    } 
    else{ // si le produit est dans le panier
        foundProduct.quantity += product.quantity // ajoute à la quantité existante la quantité a ajouter
    }
    saveBasket(basket) // sauvegarde du panier
} 
////// fin gestion panier /////