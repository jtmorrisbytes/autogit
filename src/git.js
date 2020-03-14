var execSync = require("child_process").execSync;
function getUserInfo() {
  return execSync("git config --get user.name;git config --get user.email")
    .toString()
    .trim()
    .split("\n");
}
function add(filePath) {
  return execSync(`git add ${filePath}`);
}
function diff(filePath) {
  return execSync(`git diff ${filePath}`);
}
let timezone = "CST";
let userInfo = getUserInfo();
function generateCommitMessage(userInfo, commitReason, filePath) {
  let d = new Date();
  //   d = d - d.getTimezoneOffset();
  let dateString = `${d.getMonth()}/${d.getDay()}/${d.getFullYear()}`;
  let timeString = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()} ${timezone}`;
  let diff = gitDiff(filePath);
  let commitString = `Autocommit ${dateString} ${timeString}: ${userInfo[0]} (${userInfo[1]}) ${commitReason} '${filePath}'\r\n\r\n${diff}`;
  console.log(commitString);
}
module.exports = {
  add,
  generateCommitMessage,
  diff
};
