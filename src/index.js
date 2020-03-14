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
  git.add(path);
  git.commit("created file at", path);
  console.log("Watching file", path);
});
watcher.on("unlink", path => {
  git.add(path);
  git.commit("removed file at", path);
});
watcher.on("error", console.error);
// watcher.on("raw", console.log);
