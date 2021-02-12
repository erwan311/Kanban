# Erwan Bouvron Kanban

L'application est disponible sur Netlify: https://erwan-kanban.netlify.app/

Pour installer les dépendances, il faut installer node : https://nodejs.org/en/
- npm install
- npm run serve

Ce projet est réalisé à partir de VueJs, et du plugin vue-kanban : https://github.com/BrockReece/vue-kanban
J'ai utilisé le composant kanban-board dans le App.vue, afin de créer un kanban.

J'ai ensuite créé 3 différents composants :
  - Card.vue : permet d'afficher les informations d'un bloc (titre et priorité)
  - Form.vue : formulaire qui permet d'ajouter un bloc (une tache), avec un titre et une priorité
  - Params.vue : permet de choisir le trie des différents blocs (priorité croissante ou décroissante)

Pour importer les taches de la base de données, j'ai utilisé le module airtable
  - Select sur la base de donnée, puis pour chaque element, on créé une nouvelle tache avec le titre et la priorité

J'ai par la suite utilisé materializecss pour améliorer le design : http://materializecss.com/
  - Création des Cards
  - Création des Inputs pour le formulaire
  - Création d'un FeatureDiscovery pour le réglage
