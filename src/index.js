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
watcher.on("add", path => {
  console.log("Watching file", path);
});
watcher.on("unlink", path => {
  console.log("a file was removed", path);
});
watcher.on("error", console.error);
// watcher.on("raw", console.log);
watcher.on("all", git.commit);
