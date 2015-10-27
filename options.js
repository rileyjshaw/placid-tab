;(function (placid) {
  // Debounce an arbitrary function by {delay} milliseconds
  function debounce(fn, delay) {
    var timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(fn, delay || 500);
    };
  }

  // Save all input values except for colors that haven't changed from default
  function save_options () {
    localStorage.links = JSON.stringify(textInputs.map(function (input) {
      return input.value;
    }));

    localStorage.colors = JSON.stringify(colorInputs.map(function (input, i) {
      var color = input.value;
      var defaultColor = placid.color_at(i);
      return color === defaultColor ? null : color;
    }));
  }

  // Restore select box state to saved value from localStorage
  function restore_options () {
    var savedLinks = JSON.parse(localStorage.links || '[]');
    var savedColors = JSON.parse(localStorage.colors || '[]');

    if (savedLinks.length)
      textInputs.forEach(function (input, i) { input.value = savedLinks[i]; });

    if (savedColors.length)
      colorInputs.forEach(function (input, i) { input.value = savedColors[i] || placid.color_at(i); });
  }

  // DOM
  var textInputs = [].slice.call(document.querySelectorAll('input[type=text]'));
  var colorInputs = [].slice.call(document.querySelectorAll('input[type=color]'));
  var darkMode = document.getElementById('dark-mode');

  // Event listeners
  document.addEventListener('DOMContentLoaded', restore_options, false);
  darkMode.addEventListener('click', placid.toggle_theme, false);
  textInputs.concat(colorInputs).forEach(function (input) {
    input.addEventListener('input', debounce(save_options), false);
  });
})(this.placid || (this.placid = {}));
