# ProjetSI-Creacosm Frontend

## Charte graphique
#3D64A5

## Accès au site sur téléphone

Pour accéder au site sur votre téléphone, suivez les étapes suivantes :

1. Assurez-vous que votre téléphone soit connecté aux même réseau que votre pc.
2. Executez la commande : 
```bash
ng serve --host 0.0.0.0
```
3. Dans la barre d'adresse, entrez l'URL : ``http://votre-addresse-ip/4200`` (que vous retrouverez dans la partie network une fois que vous excuterez la commande ci dessus )
4. Vous pouvez maintenant naviguer et utiliser l'application sur votre téléphone.

## Installation et démarrage en local

Pour installer et démarrer l'application en local, suivez ces étapes :

1. Clonez le dépôt du projet :
    ```bash
    git clone https://github.com/hild365/CREACOSM-Frontend.git
    ```
2. Accédez au répertoire du frontend :
    ```bash
    cd CREASCOSM-Frontend
    ```
3. Installez les dépendances :
    ```bash
    npm install
    ```
4. Pour executer la commande `ng` en globale :
   ```bash
   npm start
   ```
5. Ensuite executez angular :
   ```bash
   ng serve
   ```
6. Ouvrez votre navigateur et accédez à `http://localhost:4200` pour voir l'application en action.

## Composants Angular

### Accueil

Le composant `Accueil` est la page d'accueil de l'application. `Je rajouterai un champ nommé "code" pour crée des sessions pour les groupes de joueurs.`

### Tableau- Réponse - Analyse

Pour communiquer avec le serveur il vous faudra creer un `service` avec la commande ```ng generate service services/nom-du-service ```.
J'ai crée une fentre modale qui présente `un tutoriel` et qui apparait une seule fois (dans la session) lorsqu'on clique sur les onglets `(Vous l'aurez compris si vous rafraichissez la page elle seront là une seule fois encore)`. Vous devrez modifiez le `tutorialContent` pour la partie contenu du tutoriel 
dans chaque `component.ts`.


## Crédits

Ceci est un projet universitaire, développé pendant la L3 MIAGE à l'Université d'Orléans.

Participants :

- Esteban Draily
- Koffi-Hild Gomado
- Vincent Gonnet
- Arthur Goudal
