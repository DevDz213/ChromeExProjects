# AutoApply, La Ruche édition

Une extension facile à prendre en main qui postule à votre place!

## 📋 Résumé du projet

Cette extension permet d'appliquer automatiquement aux offres sur la ruches qui nécessite un format
CV / Lettre de Motivation / Relevé. Cette automatisation inclu la génération d'un fichier pdf d'une lettre de motivation 
automatique et directement remplit dans le champ sur la page du mandat de stage. L'extension y ajoute le CV et choisit le
relevé, avant de cliquer sur postuler, fermer la page et passer au poste suivant!

**Fonctionnalités principales :**
- Détecter tous les liens vers les mandats de stage et itérer dessus
- Vérifier que la page suit le format adéquat pour postuler
- Récupère les informations de l'offre 
- Effectue un script afin de prompt ChatGPT et récupérer la lettre générée
- Crée un fichier PDF de lettre de motivation et le sauvegarde localement
- Remplir le formulaire de demande d'embauche et postuler

**Technologies utilisées :**
- Manifest V3
- JavaScript
- Chrome Extensions API

## 🚀 Installation sur Edge

### Méthode 1 : Installation en mode développeur

1. Téléchargez ou clonez ce repository
2. Ouvrez Microsoft Edge et allez sur `edge://extensions/`
3. Activez le **Mode développeur** (toggle en bas à gauche)
4. Cliquez sur **Charger l'extension décompressée**
5. Sélectionnez le dossier de l'extension contenant le fichier manifest.json à la racine 
6. L'extension apparaîtra dans votre barre d'outils (N'oubliez pas de l'épingler)

### Méthode 2 : Depuis un fichier .zip

1. Téléchargez le fichier `.zip` de l'extension
2. Décompressez le fichier
3. Suivez les étapes 2-6 de la Méthode 1

> **Note :** L'extension fonctionne également sur Chrome en suivant les mêmes étapes sur `chrome://extensions/`

## ⚙️ Configuration des onglets

### Première utilisation

1. Cliquez sur l'icône de l'extension dans la barre d'outils
2. [Étapes de configuration spécifiques]

### Organiser vos onglets

**Option 1 : [Nom de la fonctionnalité]**
- Étape 1
- Étape 2

**Option 2 : [Nom de la fonctionnalité]**
- Étape 1
- Étape 2

### Raccourcis clavier (optionnel)

- `Ctrl + Shift + Y` : [Action]
- `Ctrl + Shift + X` : [Action]

Pour modifier les raccourcis : `edge://extensions/shortcuts`

## 🐛 Bugs courants et solutions

### 1. "Could not establish connection. Receiving end does not exist"

**Cause :** Le content script n'est pas chargé dans l'onglet cible.

**Solution :**
- Rechargez l'onglet où vous utilisez l'extension
- Redémarrez l'extension depuis `edge://extensions/`
- Vérifiez que l'URL de la page est autorisée (les pages `edge://` et `chrome://` ne sont pas accessibles)

### 2. L'extension ne détecte pas les changements de page

**Cause :** Les sites en SPA (Single Page Application) ne rechargent pas la page.

**Solution :**
- Fermez et rouvrez l'onglet
- L'extension se recharge automatiquement après quelques secondes

### 3. Les permissions sont refusées

**Cause :** Permissions insuffisantes dans le manifest.

**Solution :**
1. Allez sur `edge://extensions/`
2. Trouvez votre extension
3. Cliquez sur **Détails**
4. Activez toutes les permissions nécessaires

### 4. L'extension ne s'affiche pas dans la barre d'outils

**Solution :**
- Cliquez sur l'icône Extensions (puzzle) dans la barre d'outils
- Cliquez sur l'icône "pin" à côté du nom de l'extension

### 5. [Autre bug spécifique]

**Cause :** [Description]

**Solution :**
- [Étapes de résolution]

## 📝 Notes importantes

- L'extension nécessite une connexion internet pour [fonctionnalité]
- Certaines pages web peuvent bloquer l'extension pour des raisons de sécurité
- Les données sont stockées localement dans votre navigateur

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Leak pas kho wallah c'est pas nice

---

**Développé par** Arezki Oussad 
**Version** 1.0.0
