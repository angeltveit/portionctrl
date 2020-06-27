!function(error) {
  console.error(error);
  if (typeof document === 'undefined') {
    return;
  } else if (!document.body) {
    document.addEventListener('DOMContentLoaded', print);
  } else {
    print();
  }
  function print() {
    var pre = document.createElement('pre');
    pre.className = 'errorify';
    pre.textContent = error.message || error;
    if (document.body.firstChild) {
      document.body.insertBefore(pre, document.body.firstChild);
    } else {
      document.body.appendChild(pre);
    }
  }
}({"message":"Cannot find module '/home/tobben/Documents/homebrew/kcal/client/index.js' from '/home/tobben/Documents/homebrew/kcal'","name":"Error","stack":"Error: Cannot find module '/home/tobben/Documents/homebrew/kcal/client/index.js' from '/home/tobben/Documents/homebrew/kcal'\n    at /home/tobben/Documents/work/scoutgg-clients/node_modules/browser-resolve/node_modules/resolve/lib/async.js:55:21\n    at load (/home/tobben/Documents/work/scoutgg-clients/node_modules/browser-resolve/node_modules/resolve/lib/async.js:69:43)\n    at onex (/home/tobben/Documents/work/scoutgg-clients/node_modules/browser-resolve/node_modules/resolve/lib/async.js:92:31)\n    at /home/tobben/Documents/work/scoutgg-clients/node_modules/browser-resolve/node_modules/resolve/lib/async.js:22:47\n    at FSReqCallback.oncomplete (fs.js:171:21)"})