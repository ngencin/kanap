## Projet 5 - Implémentez un site e-commerce dynamique  

### Étape 1 : Prendre en main les maquettes HTML / CSS
● Affichez les 4 pages HTML fournies dans votre navigateur  

### Étape 2 : Manipuler l’API  
● Bien prendre le temps de lire le ReadMe du repo GitHub fourni !  
● Une fois l’API lancée, consultez l’URL renseignée dans les spécifications fonctionnelles et techniques du projet, dans le but de vérifier le bon fonctionnement de celle-ci. L’idée ici est de voir, depuis votre navigateur par exemple, le JSON retourné par l’API, que ce soit lorsqu’on demande à l’API l’ensemble des produits, ou bien seulement un produit précis (via son id)  

### Étape 3 : Insérer les produits dans la page d’accueil  
● En JS, commencez par requêter l’API pour lui demander l’ensemble des produits ; récupérer la réponse émise, et parcourir celle-ci pour insérer chaque élément (chaque produit) dans la page d’accueil (dans le DOM)  

### Étape 4 : Faire le lien entre un produit de la page d’accueil et la page Produit  
● Renseignez-vous sur le terme “URLSearchParams”. C’est grâce à cette notion que votre page Produit va pouvoir “savoir” lequel des différents produits de l’API afficher  
● Pour chacun des produits de la page d’accueil, il va falloir bien paramétrer la balise “a” et son attribut “href”  

### Étape 5 : Récupérer l’id du produit à afficher  
● Vous êtes maintenant en mesure de savoir lequel des produits de l’API nous allons vouloir afficher dans la page Produit. Il va donc falloir récupérer l’id du produit en question dans l’URL (URLSearchParams)  

### Étape 6 : Insérer un produit et ses détails dans la page Produit  
● Interroger l’API pour récupérer les détails du produit  
● Insérer ces détails dans la page Produit (dans le DOM)  

### Étape 7 : Ajouter des produits dans le panier  
● Techniquement parlant, le panier peut être un array qui contiendrait trois choses :  
○ l’id du produit  
○ la quantité du produit  
○ la couleur du produit  
● Il est nécessaire d’utiliser localStorage pour pouvoir accéder à cet array depuis la page Panier  
● Lorsqu’on ajoute un produit au panier, si celui-ci n'était pas déjà présent dans le panier, on ajoute un nouvel élément dans l’array  
● Lorsqu’on ajoute un produit au panier, si celui-ci était déjà présent dans le panier (même id + même couleur), on incrémente simplement la quantité du produit correspondant dans l’array  

### Étape 8 : Afficher un tableau récapitulatif des achats dans la page Panier  
● Depuis la page Panier, récupérer le panier (l’array) via localStorage  
● Parcourir l’array  
● Créer et insérer des éléments dans la page Panier  

### Étape 9 : Gérer la modification et la suppression de produits dans la page Panier  
● Concernant la modification, il va falloir recourir à l'événement de modification (addEventListener de type change) pour observer le changement de la quantité  
● Aussi, la méthode Element.closest() devrait permettre de cibler le produit que vous souhaitez supprimer (où dont vous souhaitez modifier la quantité) grâce à son identifiant et sa couleur  

### Étape 10 : Passer la commande  
● Récupérer et analyser les données saisies par l’utilisateur dans le formulaire  
● Afficher un message d’erreur si besoin (par exemple lorsqu’un utilisateur renseigne “bonjour” dans le champ “e-mail”)  
● Constituer un objet contact (à partir des données du formulaire) et un tableau de produits  

### Étape 11 : Afficher le numéro de commande  
● Effectuer une requête POST sur l’API et récupérer l’identifiant de commande dans la réponse de celle-ci  
● Rediriger l’utilisateur sur la page Confirmation, en passant l’id de commande dans l’URL, dans le but d’afficher le numéro de commande  
● Si ce numéro doit être affiché, celui-ci ne doit pas être conservé / stocké  

### Étape 12 : Mettre en place le plan de test d’acceptation  
● Maintenant que l'ensemble du code JS est écrit, il faut mettre en place le plan de test d’acceptation. L’idée principale est de vérifier l’alignement entre le cahier des charges / les spécifications fonctionnelles, et le produit réalisé  
 
