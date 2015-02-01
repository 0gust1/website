
---
date: 2014-11-11
title: Des CSS inline, générées en JS ?
template: post.html
---

# Des CSS inline, générées en JS ?
<small>Sortez les crucifix et les gousses d'ail</small>

**Réaction "à chaud" (et peu structurée) à la présentation de @vjeux**

**<https://speakerdeck.com/vjeux/react-css-in-js>**


## Contexte :

Vjeux expose une façon de gérer les CSS, sur les projets de grande échelle qui utilisent React (<http://facebook.github.io/react/>).[^somesamplefootnote]

[^somesamplefootnote]: un deux trois
    <http://seenthis.net>

    mlkqmslkd
    <img src="http://davidwalsh.name/wp-content/themes/punky/images/logo.png">
    hehe

La solution technique a été proposée pour garantir la consistance à grande échelle du style des composants et faciliter le travail entre les designers / développeurs avec les mainteneurs des composants utilisés chez eux (Facebook).

Il présente d'abord les "contournements" qui ont été utilisés pour résoudre les problèmes auxquels ils ont été confrontés (extension de la syntaxe de CSS, inversion de contrôle sur les composants).

Enfin, il expose une solution "choquante" qui résoud simplement les problématiques exposées.

**Spoiler** : les styles sont gérés en JS et injectés dans les composants, dans l'attribut style (oui, oui, des **styles inline** : cachez les enfants, fermez les portes, sortez les fusils et les fourches ^^).

**Rappel :** React utilise un "DOM virtuel" et utilise ensuite le navigateur comme moteur de rendu (le développeur ne touche plus du tout le DOM du navigateur).

## *React*ion

Passé le "choc initial" :), les slides me laissent avec certaines constatations et questions.

* Impact sur la performance ? Sur le papier les styles inline sont performants. Mais sur un DOM comportant plusieurs centaines (ou plus) de noeuds avec des styles inline, je ne sais pas ?
* Les mécanismes natifs des CSS (cascade, héritage, surcharge, priorité des sélécteurs) sont "évacués". Tout est à gérer par JS (ce qui offre aussi des possibilités intéressantes : utiliser `require();`, merger des objets, variabiliser simplement, etc...).
* Les styles inlines sont impossible à surcharger dans le DOM du navigateur, cela interdit beaucoup de choses.
* Quid de la cohabitation avec une architecture CSS classique ? (tous les sites ne sont pas en "full JS — si on le désactive il n'y a plus rien") ?


*— When you have a hammer, everything looks like a nail —*

Ce n'est pas la première fois que l'on essaye de résoudre les "problèmes" de CSS (qui sont en général contextuels à une utilisation, un produit, à une organisation, un workflow d'équipes) via l'introduction d'un langage de programmation (préprocesseur). *TODO : retrouver des références / articles sur le sujet*

Il faut également noter qu'une partie des problèmes exposés et résolus par l'injection en CSS inline ne sont pas des universaux, et ne valent que dans le contexte de Facebook. Surtout les parties "*non deterministic resolution*" et "*breaking isolation*", les 5 autres sont résolus par les pre-processeurs CSS et les méthodologies CSS (BEM par ex.).

Bref, pour ma part, je trouve l'approche intéressante et adaptée au contexte présenté. Par contre, je serais prudent si jamais j'étais amener à travailler avec.

Il ne faudrait pas élever trop vite la solution technique — contextuelle aux problématiques d'ingénierie *chez* Facebook — au rang de bonne pratique ou de standard. Par contre, c'est tout de même intéressant d'imaginer ce que pourrait autoriser une gestion purement programmatique du style.

Si j'ai l'occasion d'avoir un petit projet "full react", j'essairais peut être cette approche, pour voir ce que ça donne à l'usage.


<http://pchiusano.github.io/2014-07-02/css-is-unnecessary.html>

