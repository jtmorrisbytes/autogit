const chokidar = require("chokidar");
let git = require("./git");

console.log();
const watcher = chokidar.watch("**/**", {
  persistent: true,
  ignored: /node_modules|.git|(?:(^|[\/\\])\..)/
  //   cwd: __dirname
});

watcher.on("ready", () => {
  console.log("ready for changes");
});

watcher.on("change", path => {
  git.add(path);
  git.commit("updated file at", path);
});
// the watcher will emit this event on startup when searching
// for files to add
watcher.on("add", path => {
  console.log("Watching file", path);
});
// the watcher will emit this event when a file was deleted
watcher.on("unlink", path => {
  git.add(path);
  git.commit("removed file at", path);
});
watcher.on("error", console.error);
// watcher.on("raw", console.log);
