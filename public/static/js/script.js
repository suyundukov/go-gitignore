(function() {
  var awe;
  var button = document.querySelector('.button');
  var input = document.querySelector('input');
  var list = document.querySelector('.box');
  var tags = [];

  button.addEventListener('click', getGitIgnore, false);

  input.addEventListener('awesomplete-selectcomplete', function(e) {
    var el = this.value;

    if (!tags.includes(el)) {
      tags.push(el);
      appendTag(el);
    }

    awe.style.width = '15px';
    list.style.padding = '0 5px';
    this.placeholder = '';
    this.value = '';
  })

  // Focus on input, just in case if html autofocus failed
  window.onload = function() {
    getIgnoreList();
    input.focus();
  }

  // On autocomplete window opening
  input.addEventListener('awesomplete-open', function() {
    list.style.borderBottomLeftRadius = '0';
  });

  // On autocomplete window closing
  input.addEventListener('awesomplete-close', function() {
    list.style.borderBottomLeftRadius = '5px';
  });

  // Remove tag if 'Backspace' was pressed
  input.onkeydown = function(e) {
    if (e.keyCode == 8 && tags.length > 0 && this.value == '') {
      var el = this.parentNode.previousElementSibling;
      removeTag(el);
      inputWidth();
    }
  }

  // If any key was pressed
  input.onkeypress = function() {
    inputWidth();
  }

  // Change input width
  function inputWidth() {
    if (tags.length === 0) {
      awe.style.width = '100%';
      list.style.padding = '0 10px';
      input.placeholder = 'Search Operating Systems, IDEs, or Programming Languages';
    } else {
      awe.style.width = ((input.value.length + 1) * 15) + 'px';
    }
  }

  // Get all .gitignore files
  function getIgnoreList() {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', '/api/list', true);
    ajax.onreadystatechange = function() {
      if (ajax.readyState == XMLHttpRequest.DONE) {
        var files = ajax.responseText.split(',');

        // Initialize autocomplete
        new Awesomplete(input, {
          autoFirst: true,
          minChars: 1,
          maxItems: 30,
          list: files
        });

        awe = document.querySelector('.awesomplete');
      }
    }
    ajax.send(null);
  }

  // Generate .gitignore file
  function getGitIgnore() {
    var searchStr = tags.sort().toString().toLowerCase();
    if (searchStr.length != 0) {
      window.location = '/api/' + searchStr;
    }
  }

  // Add new tag to the list of tags
  function appendTag(el) {
    var tag = document.createElement('span');
    tag.className = 'tag';
    tag.appendChild(document.createTextNode(el));

    var remove = document.createElement('span');
    remove.className = 'remove';
    remove.appendChild(document.createTextNode('✖'));
    remove.addEventListener('click', function(e) {
      removeTag(e.target.parentElement);
    }, false);

    tag.appendChild(remove);
    list.insertBefore(tag, input.parentElement);
  }

  // Delete tag from the list of tags
  function removeTag(e) {
    tags.splice(tags.indexOf(e.childNodes[0].nodeValue), 1);
    list.removeChild(e);
    input.focus();
    inputWidth();
  }
}());
