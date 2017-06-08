function json2Form(json) {
  
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  console.log(str);
  return str.join("&");
}
module.exports = {
  json2Form: json2Form,
}