# UP Slick Slider Block

Un bloc de diaporama moderne, accessible et responsive pour l'éditeur WordPress Gutenberg, propulsé par Slick Carousel.

## Fonctionnalités

- 🎯 Intégration complète avec l'éditeur de blocs Gutenberg
- 🖼️ Prise en charge de plusieurs images avec affichage personnalisable
- 📱 Design responsive qui fonctionne sur tous les appareils
- ♿ Conforme WCAG 2.1 pour l'accessibilité
- 🎨 Flèches de navigation et points personnalisables
- 🔄 Animations de défilement fluides
- ⚡ Performance optimisée

## Installation

1. Téléchargez le plugin
2. Uploadez-le sur votre site WordPress
3. Activez le plugin via le menu 'Extensions' de WordPress
4. Ajoutez le bloc "UP Slick Slider" dans vos articles ou pages

## Développement

### Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Environnement de développement WordPress

### Configuration

```bash
# Cloner le dépôt
git clone [url-du-depot]

# Installer les dépendances
npm install

# Démarrer le développement
npm run start

# Construire pour la production
npm run build
```

### Structure du Projet

```
up-bk-slick-slider/
├── assets/               # Ressources statiques
│   └── slick/           # Fichiers Slick carousel
├── build/               # Fichiers compilés
├── src/                 # Fichiers sources
│   ├── block.json      # Configuration du bloc
│   ├── edit.js         # Composant éditeur
│   ├── editor.scss     # Styles éditeur
│   ├── index.js        # Enregistrement du bloc
│   ├── render.php      # Rendu frontend
│   ├── save.js         # Composant de sauvegarde
│   └── styles.scss     # Styles frontend
├── .gitignore          # Règles Git ignore
├── package.json        # Dépendances et scripts
├── README.md           # Ce fichier
└── webpack.config.js   # Configuration de build
```

## Utilisation

1. Dans l'éditeur de blocs WordPress, cliquez sur le bouton "+" pour ajouter un nouveau bloc
2. Recherchez "UP Slick Slider" ou trouvez-le dans la catégorie Média
3. Ajoutez des images à votre diaporama
4. Personnalisez les paramètres dans la barre latérale du bloc :
   - Nombre de diapositives à afficher
   - Nombre de diapositives à faire défiler
   - Options de lecture automatique
   - Flèches de navigation
   - Navigation par points
   - Points de rupture responsive

## Contribution

1. Forkez le dépôt
2. Créez votre branche de fonctionnalité (`git checkout -b feature/super-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout d'une super fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/super-fonctionnalite`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence GPL v2 ou ultérieure - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Crédits

- Construit avec [WordPress Scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/)
- Fonctionnalité de diaporama propulsée par [Slick Carousel](https://kenwheeler.github.io/slick/)
- Créé par [GEHIN Nicolas]

## Support

Pour obtenir de l'aide, veuillez [ouvrir un ticket](url-des-issues) sur GitHub ou nous contacter via notre site web.
