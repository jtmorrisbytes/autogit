var execSync = require("child_process").execSync;
function getUserInfo() {
  return execSync("git config --get user.name;git config --get user.email")
    .toString()
    .trim()
    .split("\n");
}
let timezone = "CST";
let userInfo = getUserInfo();
function add(filePath) {
  //   console.log(`added file at '${filePath}'`);
  addMessage = execSync(`git add ${filePath}`).toString();
  if (addMessage.length > 0) {
    S;
    console.log("addmessage length", addMessage.length);
    console.log(addMessage);
  }

  return addMessage;
}
function status(filePath) {
  // ?? means untracked
  // M means modified
  // A means added
  // blank means unchanged
  let status;
  let result;
  let resultPath;
  if (filePath) {
    result = execSync(`git status --short ${filePath}`)
      .toString()
      .trim();
  }
  if (result) {
    status = result.split(" ");
  }
  console.log("DIFF result, status", result, status);
  return status;
}
const STATUS_CODES = {
  UNTRACKED: "??",
  MODIFIED: "M",
  ADDED: "A"
};
function diff(filePath) {
  try {
    return execSync(`git diff ${filePath}`);
  } catch (e) {
    console.error(e.toString());
  }
}
function commit(commitReason, filePath) {
  let d = new Date();
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
  diff,
  status,
  STATUS_CODES
};
