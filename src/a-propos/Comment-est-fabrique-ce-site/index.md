---
date: "2015-02-01"
title: Comment est fabriqué ce site
template: post.html
draft: false
---

# Comment est fabriqué ce site

* Garder une arborescence du site reflétant l'organisation du contenu dans le répertoire source.
* Avoir la possibilité d'avoir des "articles-répertoires" et non pas uniquement des "articles-documents".
    * un "article-répertoire" : `http://mon_url.org/section/article/` équivalent à `http://mon_url.org/section/article/index.html`
    * un "article-document" : `http://mon_url.org/section/article.html`

## Pourquoi ne pas avoir utilisé XXX ou YYY ?

*Parce que.*

Celà fait maintenant quelques temps que je "joue" avec différents outils pour construire des sites statiques : Wintersmith, Grunt, Gulp, Metalsmith, Assemble, Hexo, ... *adnauseam*.

Un *générateur de site* n'est qu'un script transformant un ensemble de contenus et contenants (fichiers et répertoires) en un site web. Ce qui est important c'est la structure qui est manipulée.

Dans le même esprit que notes/2014/faire-un-site-statique-simplement, je souhaitais revenir "à la base" de ce qui constitue un site web pour de la publication personnelle.

C'est sûr qu'il aurait été beaucoup plus simple de m'adapter ou de tordre un outil existant (Jekyll, Assemble ou autre), c'est une autre démarche.

### Arborescence du site

C'est un aspect complètement structurant : **un site web est une arborescence**. Et ce sont les chemins de cette arborecence qui constituent les URLs (adresses web).

Par exemple, je souhaite absolument conserver le fait que l'arborescence du site soit le reflet de l'arborescence des fichiers sources. Pour parler "hype", la structure du site reste isomorphe avec celle de ses sources.

Par contre, celà nécessite éventuellement des mécanismes permettant de créer facilement un nouveau contenu, en respectant une organisation existante.

#### URLs et permalinks

On peut distinguer quelques façons de faire différentes pour mettre à disposition un contenu en ligne :

* section/année/mois/jour/titre.html
* section/année/titre/index.html
* section/titre/index.html
* section/titre.html



Une problématique se pose tout de même en cas de réorganisation, de renommage ou de déplacement : comment indiquer aux visiteurs que tel article a été renommé ou déplacé à un autre endroit du site ?


