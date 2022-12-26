////// récupération numéro de commande /////

// Récupération des paramètres URL en JS 
const url = new URL(window.location.href);
let params = (new URL(document.location)).searchParams;
let orderId = params.get("orderId");

// affichage du numéro de la commande
function getOrder() {
    localStorage.clear();
    const orderBasketId = document.getElementById("orderId")
    orderBasketId.innerHTML = `<span id="orderId">${orderId}</span>`
}
getOrder()

////// fin récupération numéro de commande /////