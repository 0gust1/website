---
date: 2014-12-28
title: Faire un site statique simplement ?
template: post.html
---

# Faire un site statique simplement ?

## Contexte : 

```Des outils (très) simples pour du statique manquent (et me plairaient bien car suis non-expert en la matière).
```

<https://twitter.com/emmanuelc/status/543025073226256385>


Outil simple : adapté à une utilisation relativement particulière.
Masquer la complexité du code, donc faire des choix et restreindre ce qui est possible.

**Simplicités des sites statiques :**

* Pas de BDD, juste une génération de fichiers simples.
* L'arborescence correspond à des répertoires.
* Publier peut être rendu aussi simple que de créer un fichier, écrire dedans et le sauver.

**Difficultés et spécificités des sites statiques :**

* Le templating (si on veut modifier l'apparence globale du site, il faut se rapprocher du code).
* Gestion de la navigation (menus, liens) : selon l'organisation du site, c'est parfois assez complexe 
* Interface en ligne de commande, installation assez technique.

## Imaginons...

On peut imaginer une application desktop très simple, qui pourrait convenir à une utilisation minimale, type site web vitrine ou carnet personnel.

* Une fenêtre sur laquelle on viendrait glisser / déposer le dossier local du site depuis l'explorateur de fichiers
* Un bouton "prévisualisation" qui lancerait le navigateur sur une instance locale et éphémère du site, qui se recharge automatiquement si l'on change le contenu d'un fichier.
* Un bouton publier/mettre à jour (génération des fichiers et synchronisation)
* Une page de config éditoriale (nom de l'auteur, nom du site, mots clef, URL du site distant, etc.)
* Une page de config technique (synchronisation, SSH/FTP etc.)

Et peut être (mais est-ce vraiment une bonne idée, si on veut rester minimaliste ?):

* Une vue d'édition : syntaxe améliorée (markdown ou autre) <=> rendu final
* Une vue arborescente du site.

Toutes ces fonctionnalités là (hors IHM), les outils en ligne de commande le font très bien, mais après une prise en main technique plus ou moins longue.

La bonne nouvelle c'est qu'une application de ce genre (une application/interface de publication web) est réalisable "facilement" avec du JS et du HTML (grâce à node-webkit).

Il pourrait être intéressant aussi de se limiter juste à une "interface", que l'on pourrait "adapter" à différents générateurs statiques (Assemble, Jekyll, metalsmith, etc etc. etc.) 







