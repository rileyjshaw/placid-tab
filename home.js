// grab proper links & styles from localStorage
;(function () {
  var head = document.head;
  var style = document.createElement('style');
  var anchors = document.querySelectorAll('a');
  var links = JSON.parse(localStorage['links']);
  var colors = JSON.parse(localStorage['colors']);

  // Add proper hrefs to <a>s
  links.forEach(function (link, i) {
    if (link) anchors[i].href = (link.substring(0, 4) === 'http' ? '' : 'http://') + link;
  });

  // Add a <style> tag to <head> that'll trigger the proper color change
  // on <a> hovers. Event listeners? Nah too mainstream.
  colors.forEach(function (color, i) {
    var declaration = document.createTextNode('a:nth-child(' + (i + 1) + '):hover ~ svg path { fill: ' + color + ';}');
    style.appendChild(declaration);
  });

  head.appendChild(style);
})();
