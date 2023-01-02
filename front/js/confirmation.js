////// récupération numéro de commande /////

// Récupération des paramètres URL en JS 
const url = new URL(window.location.href) // Url de la page en cours de visite
let params = (new URL(document.location)).searchParams // Ananlyse du paramètre orderId
let orderId = params.get("orderId") // argument de la requête contenu dans l'url

// affichage du numéro de la commande
function getOrder() {
    localStorage.clear(); // nettoyage du localStorage
    const orderBasketId = document.getElementById("orderId") // récupération de l'élement HTML OrderId
    orderBasketId.innerHTML = `<span id="orderId">${orderId}</span>` // affichage du numéro récupéré via l'orderId
}
getOrder() // appel de la fonction

////// fin récupération numéro de commande /////