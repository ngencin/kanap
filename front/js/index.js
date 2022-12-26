////// affichage des produits page d'accueil /////

// API products
function getProduct(products){ // création de la fonction qui appelle l'affichage des produits
                
                    for (let product of products){ // Création d'une boucle d'un produit de mon tableau des produits
                        // Récupération lien produit
                        let createLink = document.createElement("a") // élement lien
                        createLink.href = `./product.html?_id=${product._id}` // adresse url qui contient l'id
                        document.querySelector('#items').appendChild(createLink)
                        
                        // Récupération section article
                        let createArticle = document.createElement("article") // création balise article
                        createLink.appendChild(createArticle)
                        
                        // Récupération image
                        let createImg = document.createElement("img") // création élément img 
                        let img = createArticle.appendChild(createImg) 
                        img.src = `${product.imageUrl}` // appel du lien de l'image
                        img.alt =  `${product.altTxt}` // appel de la description de l'image
                        // img.alt = product.altTxt + " test "

                        // Récupération h3
                        let createH3 = document.createElement("h3") // création du H3
                        let h3 = createArticle.appendChild(createH3)
                        h3.innerHTML = `${product.name}` // appel du h3 pour chaque produits
                        
                        // Récupération p
                        let createDescription = document.createElement("p") // création de la description
                        let description = createArticle.appendChild(createDescription)
                        description.innerHTML = `${product.description}` // appel de la description pour chaque produits
                    }

}
let productsJson = fetch("http://localhost:3000/api/products") // requête récupérer les données 
    .then(function(res){
        return res.json() // résultat requête format json
    }).then((products) => { // appel des produits
        getProduct(products) // appel de la fonction qui permet l'affichage des produits, qui permet d'éviter undefined pour les variables
    })      
    .catch(function(error) { // si problème de permission un message d'erreur s'affiche
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message)
    })        

////// fin affichage des produits page d'accueil /////