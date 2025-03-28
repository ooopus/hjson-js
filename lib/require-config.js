let fs=require("fs");
let Hjson=require("./hjson");

// allows you to require a hjson file, e.g.:
// require("hjson/lib/require-config");
// let cfg=require("./test.hjson");

require.extensions[".hjson"]=function(module, filename) {
  let content=fs.readFileSync(filename, "utf8");
  module.exports=Hjson.parse(content);
};
