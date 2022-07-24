
<p align="center">
    <img src="https://www.namijda.de/images/product_images/popup_images/kobalt_10.jpg" width="150">
</p>

<h2 align="center"><b>if-schleife-bot</b></h2>

<h4 align="center"><b>Feature rich discord bot for the if-schleife discord server.</b></b></h4>

<p align="center">
    <a href="https://www.gnu.org/licenses/gpl-3.0" alt="License: GPLv3">
        <img src="https://img.shields.io/badge/License-GPL%20v3-blue.svg">
    </a>
    <a href="https://github.com/alexcoder04/if-schleife-bot/issues" alt="GitHub release">
        <img src="https://img.shields.io/github/issues/alexcoder04/if-schleife-bot" >
    </a>
    <a href="https://github.com/alexcoder04/if-schleife-bot/pulls" alt="GitHub release">
        <img src="https://img.shields.io/github/issues-pr/alexcoder04/if-schleife-bot" >
    </a>
    <a href="https://github.com/alexcoder04/if-schleife-bot/commits/" alt="GitHub release">
        <img src="https://img.shields.io/github/commit-activity/m/alexcoder04/if-schleife-bot" >
    </a>
    <a href="https://github.com/alexcoder04/if-schleife-bot/actions">
        <img src="https://github.com/alexcoder04/if-schleife-bot/actions/workflows/eslint.yml/badge.svg" >
    </a>
    <a href="https://github.com/alexcoder04/if-schleife-bot/graphs/code-frequency" target="_blank">
        <img src="https://img.shields.io/tokei/lines/github/alexcoder04/if-schleife-bot?label=lines&color=informational&logo=GitHub" alt="lines">
    </a>
</p>

<hr>

<p align="center">
    <a href="#description">Description</a> &bull; 
    <a href="#features">Features</a> &bull; 
    <a href="#installation-and-updates">Installation and updates</a> &bull; 
    <a href="#contribution">Contribution</a> &bull; 
    <a href="#license">License</a>
</p>

<hr>

## Description

This is the bot that helps us to manage our Discord server. Although our server
is private (for now), we decided to open-source our bot because *why not*. You
are welcome to study the code and use it for your own server if you want to (we
will appreciate if you credit us in that case).

### Features

 - assign project-/topic-specific roles with the `/subscribe` command
 - silence channels (`/dev/null` emulation :))

## Installation and updates

Build the docker application
> `docker build -t if-schleife-bot .`

Run the docker application
> `docker run if-schleife-bot`

## Contribution

We are generally open for any kind of contributions, however, as this a project
aimed for a specific Discord server, we will check if your idea makes sense in
our case.

Please note that the `main` branch is aimed for production, so all development
happens in the `dev` branch.

To contribute to the dev branch first:
Clone the repo

`git clone https://github.com/alexcoder04/if-schleife-bot`

Check to see all branches

`git branch -a`

Switch to the correct branch you want to contribute to

`git checkout dev`

## License

[![GNU GPLv3 Image](https://www.gnu.org/graphics/gplv3-127x51.png)](https://www.gnu.org/licenses/gpl-3.0.en.html)  

if-schleife-bot is Free Software: You can use, study, share, and improve it at
will. Specifically you can redistribute and/or modify it under the terms of the
[GNU General Public License](https://www.gnu.org/licenses/gpl.html) as published
by the Free Software Foundation, either version 3 of the License, or (at your
option) any later version.

