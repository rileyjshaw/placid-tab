;(function(placid) {
  // Returns the color at an index, based on the current theme
  function color_at (i) {
    return COLORS[isDark ? 'dark' : 'light'][i];
  }

  // Sets the page's color to match the current theme
  function render () {
    var savedColors = JSON.parse(localStorage.colors || '[]');
    body.className = (isDark ? 'dark' : 'light') + '-mode';

    if (isOptionsPage) {
      toggle.className = 'icon-' + (isDark ? 'sun' : 'moon');
      colorInputs.forEach(function (input, i) {
        input.value = savedColors[i] || color_at(i);
      });
    }
  }

  // Toggles the theme between 'light-mode' and 'dark-mode'
  function toggle_theme () {
    localStorage.darkMode = isDark = !isDark;
    render();
  }

  // Color sets for each theme
  var COLORS = {
    dark:  ['#3f3027', '#30273f', '#27303f', '#3f2730'],
    light: ['#efe0d7', '#e0d7ef', '#d7e0ef', '#efd7e0'],
  };

  // Pull the saved theme preference from localStorage
  var isDark = JSON.parse(localStorage.darkMode || false);

  // DOM
  var body = document.body;
  var colorInputs = [].slice.call(document.querySelectorAll('.colorwrapper input'));

  var isOptionsPage = colorInputs.length;

  if (isOptionsPage)
    var toggle = document.getElementById('dark-mode').querySelector('span');

  // Set the page's color
  render();

  // Exports
  placid.color_at = color_at;
  placid.toggle_theme = toggle_theme;
})(this.placid || (this.placid = {}));
