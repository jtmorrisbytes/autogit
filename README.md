# autogitter

## A tool to help you auto commit on save

### INSTALLATION:

1. Make sure that you have installed [git-scm](https://git-scm.com/download/),
   [Nodejs](https://nodejs.org/en/download/) and npm first before trying to install this tool
2. configure git:
   ```
   git config --global user.name "YOUR NAME"
   git config --global user.email "YOUR EMAIL"
   ```
   If you skip this step, you will most likely get errors
3. Once you have installed git-scm, npm and nodejs, run
   ```
   npm install -g autogitter
   ```
   to install the module
4. Once you have installed autogitter, run
   ```
   npx autogitter
   ```
   from the directory you want to watch,
   and autogitter will currently watch all files <br />
   <b>in the current working directory the command was called from</b>
   except dotfiles ex: .gitignore and node_modules

### ISSUES

This tool is brand new right now, so if you have any problems,
please create a bug report on the [issues page](https://github.com/jtmorrisbytes/autogitter/issues)
