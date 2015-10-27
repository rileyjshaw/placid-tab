;(function (placid) {
  // DOM
  var head = document.head;
  var style = document.createElement('style');
  var anchors = document.querySelector('.content').querySelectorAll('a');

  // Grab proper links & styles from localStorage
  var links = JSON.parse(localStorage.links || '[]');
  var colors = JSON.parse(localStorage.colors || '[]');

  // Add protocols to <a>s
  links.forEach(function (link, i) {
    if (link) anchors[i].href = (link.substring(0, 4) === 'http' ? '' : 'http://') + link;
  });

  // Add a <style> tag to <head> that'll trigger the proper color change
  // on <a> hovers. Event listeners? Nah too mainstream.
  colors.forEach(function (color, i) {
    color = color || placid.color_at(i);
    style.appendChild(
      document.createTextNode('.content a:nth-child(' + (i + 1) + '):hover ~ svg path { fill: ' + color + ';}')
    );
  });
  head.appendChild(style);
})(this.placid || (this.placid = {}));
