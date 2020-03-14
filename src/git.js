var execSync = require("child_process").execSync;
function getUserInfo() {
  return execSync("git config --get user.name;git config --get user.email")
    .toString()
    .trim()
    .split("\n");
}
function add(filePath) {
  //   console.log(`added file at '${filePath}'`);
  addMessage = execSync(`git add ${filePath}`).toString();
  if (addMessage.length > 0) {
    console.log("addmessage length", addMessage.length);
    console.log(addMessage);
  }

  return addMessage;
}
function diff(filePath) {
  try {
    return execSync(`git diff ${filePath}`);
  } catch (e) {
    console.error(e.toString());
  }
}
let timezone = "CST";
let userInfo = getUserInfo();
function commit(commitReason, filePath) {
  let d = new Date();
  //   d = d - d.getTimezoneOffset();
  let dateString = `${d.getMonth()}/${d.getDay()}/${d.getFullYear()}`;
  let timeString = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()} ${timezone}`;

  let commitString = `Autocommit ${dateString} ${timeString}: ${userInfo[0]} (${
    userInfo[1]
  }) ${commitReason} '${filePath}'\r\n\r\n${diff(filePath)}`.trim();
  console.log(commitString);
  try {
    execSync(`git commit -m "${commitString}"`);
  } catch (e) {
    //   swallow errors for now...
    console.error(e.toString());
  }
}
module.exports = {
  add,
  commit,
  diff
};
