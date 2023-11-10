# Data visualisation
![Data visualisation](/images/Banner.jpg)
[Live demo](https://washupo.github.io/dataVisualisation/)
# Description
Based on a article with data in the form of HTML tables and a php file, we were asked to create interactive data visualisation graphics using javascript. 

I decided to work with plot and d3.js because they seem to be the more complete ones. 

This consolidation challenge helped me assess my ability to solve a problem inspired from real-life situations using your new javascript muscles 

# Screenschots
![Graph1 screenshot](/images/Ajax.gif)
![Graph2 screenshot](/images/Graph1.png)
![Graph3 screenshot](/images/Graph2.png)
![Desktop screenshot](/images/Screenshot.jpg)

# Techs utilisés 
- Javascript
- Vite
- D3.js
- Plot

# Development
## Cloning the Repository

1. Navigate to the directory that you would like to clone the repository into using commands like:
    `cd`: to change your working directory.
    `cd ../` to "go back" a level in your directory tree.
2. Clone the remote repository and create a local copy on your machine using this command:

    `git clone git@github.com:yvessoham/Javascript.git`

3. Now you can see the contents of the remote repository on your machine by moving into the newly cloned directory:

    `cd Javascript/`
    `ls -la`

## Updating Your Local Repository

When changes are made to the remote repository, they will not automatically sync with your local copy. You can update your local directory by running the following command when your working directory is `Javascript`. You can check your working directory by running pwd, the last item in the path should be `Javascript/`.

To update your local git directory:
`git pull`

**Note:** on `git pull` errors: You may get a `git pull` error if you have made changes to files in your local git directory. This is ok, and normal. If you get an error when you `pull` (or update) the repo that says something like "Your local changes to the following files will be overwritten by merge’", you can do a `git stash` to address this. To find out how to do this, go to https://git-scm.com/book/en/v1/Git-Tools-Stashing to read all about it.

## Updating Your Local Changes To The Remote Repository

1. `git status` 
    Always a good idea, this command shows you what branch you're on, what files are in the working or staging directory, and any other important information.
2. `git checkout [branch-name]`
    Switches to the specified branch and updates the working directory.
3. `git commit -m "descriptive message"`
    Records file snapshots permanently in version history.
4. `git push` 
    Uploads all local branch commits to the remote.

<!-- # Copyright 
()[] - Source -->