#!/usr/bin/env node
const chokidar = require("chokidar");
let git = require("./git");

console.log(
  "NOTE: Make sure your repository is in sync before using this tool " +
    "as it currently does not make efforts to resolve conflicts"
);
const watcher = chokidar.watch("**/**", {
  persistent: true,
  ignored: /node_modules|(?:(^|[\/\\])\..)/
  //   cwd: __dirname
});

watcher.on("ready", () => {
  // try to commit on startup... swallow error if it fails
  // not an optimal solution, but for now it will work
  try {
    git.commitAll("on startup");
  } catch (e) {}

  console.log("ready for changes");
});

watcher.on("change", path => {
  let status = git.status(path);
  if (
    status === git.STATUS_CODES.MODIFIED ||
    status === git.STATUS_CODES.UNTRACKED
  ) {
    git.add(path);
    git.commit("updated file at", path);
  } else {
    console.log(`'${path}' not modified`);
  }
  //   git.add(path);
  //   git.commit("updated file at", path);
});
// the watcher will emit this event on startup when searching
// for files to add
watcher.on("add", path => {
  let status = git.status(path);
  if (
    status === git.STATUS_CODES.MODIFIED ||
    status === git.STATUS_CODES.UNTRACKED
  ) {
    git.add(path);
    console.log(`added file '${path}'`);
  }
  //   console.log("Watching file", path);
});
// the watcher will emit this event when a file was deleted
watcher.on("unlink", path => {
  let status = git.status(path);
  if (status && status !== git.STATUS_CODES.MODIFIED) {
    git.add(path);
    git.commit("removed file at", path);
  } else {
    console.log(`'${path}' was not tracked by git. ignoring`);
  }
});
watcher.on("error", console.error);
// watcher.on("raw", console.log);
//
