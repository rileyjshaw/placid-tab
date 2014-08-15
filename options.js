;(function () {
  function save_options () {
    var links = [];
    var colors = [];

    for (var i = 0, _len = textInputs.length; i < _len; i++) {
      links[i] = textInputs[i].value;
    }
    localStorage['links'] = JSON.stringify(links);

    for (var i = 0, _len = colorInputs.length; i < _len; i++) {
      colors[i] = colorInputs[i].value;
    }
    localStorage['colors'] = JSON.stringify(colors);

    save.innerHTML = '<span class='icon-checkmark'>';
    setTimeout(function () {
      save.innerHTML = '<span class='icon-disk'>';
    }, 1500);
  }

  // Restores select box state to saved value from localStorage.
  function restore_options () {
    var savedLinks = JSON.parse(localStorage['links']);
    var savedColors = JSON.parse(localStorage['colors']);

    if (savedLinks) {
      for (var i = 0, _len = textInputs.length; i < _len; i++)
        textInputs[i].value = savedLinks[i];
    }
    if (savedColors) {
      for (var i = 0, _len = colorInputs.length; i < _len; i++)
        colorInputs[i].value = savedColors[i];
    }
  }

  function saveIfEnter (e) {
    if (e.keyCode === 13) save_options();
  }

  // DOM
  var textInputs = document.querySelectorAll('input[type=text]');
  var colorInputs = document.querySelectorAll('input[type=color]');
  var save = document.getElementById('save');

  // Event listeners
  document.addEventListener('keydown', saveIfEnter, false);
  document.addEventListener('DOMContentLoaded', restore_options, false);
  save.addEventListener('click', save_options, false);
})();