(function() {
  var button = document.getElementById('button')
  var input = document.getElementById('input')
  var list = document.getElementById('list')
  var tags = []

  button.addEventListener('click', getGitIgnore, false)

  // Initialize autocomplete
  new autoComplete({
    selector: input,
    minChars: 1,
    source: function(term, suggest){
      term = term.toLowerCase()
      var choices = files
      var matches = []
      for (var i = 0; i < choices.length; i++)
        if (~choices[i].toLowerCase().indexOf(term))
          matches.push(choices[i])
      suggest(matches)
    },
    onSelect: function(e, term, item){
      var el = item.getAttribute('data-val')
      if (!tags.includes(el)) {
        tags.push(el)
        appendTag(el)
      }
      if (tags.length > 0) {
        input.classList.add('sm')
        input.placeholder = ''
      }
      input.value = ''
    }
  })

  // Add new tag to the list of tags
  function appendTag(el) {
    var tag = document.createElement('span')
    tag.className = 'tag'
    tag.appendChild(document.createTextNode(el))
    tag.addEventListener('click', toggleRemoveTag, false)

    var remove = document.createElement('span')
    remove.className = 'remove'
    remove.appendChild(document.createTextNode('✖'))
    remove.addEventListener('click', function(e) {
      removeTag(e.target.parentElement)
    }, false)

    tag.appendChild(remove)
    list.insertBefore(tag, input)
  }

  // Toggle remove tag on click
  function toggleRemoveTag(e) {
    var el = e.target.classList

    if (!el.contains('delete')) {
      el.add('delete')
    } else {
      el.remove('delete')
    }
  }

    // Remove tag if 'Backspace' was pressed
  input.onkeydown = function(e) {
    if (e.keyCode == 8 && tags.length > 0 && input.value == '') {
      var el = input.previousElementSibling
      
      if (!el.classList.contains('delete')) {
        el.classList.add('delete')
      } else {
        removeTag(el)
      }
    }
  }

  // Delete tag from the list of tags
  function removeTag(e) {
    tags.splice(tags.indexOf(e.childNodes[0].nodeValue), 1)
    list.removeChild(e)

    input.focus()

    if (tags.length == 0) {
      input.classList.remove('sm')
      input.placeholder = 'Search Operating Systems, IDEs, or Programming Languages'
    }
  }

  // Generate .gitignore file
  function getGitIgnore() {
    var searchStr = tags.sort().toString().toLowerCase()
    if (searchStr.length != 0) {
      window.location = '/api/' + searchStr
    }
  }
}())

var files = ['Actionscript', 'Ada', 'Agda', 'Android', 'AppceleratorTitanium', 'AppEngine', 'ArchLinuxPackages','Autotools', 'C++', 'C', 'CakePHP', 'CFWheels', 'ChefCookbook', 'Clojure', 'CMake', 'CodeIgniter', 'CommonLisp', 'Composer', 'Concrete5', 'Coq', 'CraftCMS', 'CUDA', 'D', 'Dart', 'Delphi', 'DM', 'Drupal', 'Eagle', 'Elisp', 'Elixir', 'Elm', 'EPiServer', 'Erlang', 'ExpressionEngine', 'ExtJs', 'Fancy', 'Finale', 'ForceDotCom', 'Fortran', 'FuelPHP', 'Gcov', 'GitBook', 'Anjuta', 'Ansible', 'Archives', 'Bazaar', 'BricxCC', 'Calabash', 'Cloud9', 'CodeKit', 'CVS', 'DartEditor', 'Dreamweaver','Dropbox', 'Eclipse', 'EiffelStudio', 'Emacs', 'Ensime', 'Espresso', 'FlexBuilder', 'GPG', 'JDeveloper', 'JetBrains', 'Kate', 'KDevelop4', 'Lazarus', 'LibreOffice', 'Linux', 'LyX', 'macOS', 'Matlab', 'Mercurial', 'MicrosoftOffice', 'ModelSim', 'Momentics', 'MonoDevelop', 'NetBeans', 'Ninja', 'NotepadPP', 'Otto', 'Redcar', 'Redis', 'SBT', 'SlickEdit', 'Stata', 'SublimeText', 'SVN', 'SynopsysVCS', 'Tags', 'TextMate', 'TortoiseGit', 'Vagrant', 'Vim', 'VirtualEnv', 'VisualStudioCode', 'WebMethods', 'Windows', 'Xcode', 'XilinxISE', 'Go', 'Gradle', 'Grails', 'GWT', 'Haskell', 'Idris', 'IGORPro', 'Java', 'Jboss', 'Jekyll', 'Joomla', 'Julia', 'KiCad', 'Kohana', 'LabVIEW', 'Laravel', 'Leiningen', 'LemonStand', 'Lilypond', 'Lithium', 'Lua', 'Magento', 'Maven', 'Mercury', 'MetaProgrammingSystem', 'Nanoc', 'Nim', 'Node', 'Objective-C', 'OCaml', 'Opa', 'OpenCart', 'OracleForms', 'Packer', 'Perl', 'Phalcon', 'PlayFramework', 'Plone', 'Prestashop', 'Processing', 'PureScript', 'Python', 'Qooxdoo', 'Qt', 'R', 'Rails', 'RhodesRhomobile', 'ROS', 'Ruby','Rust', 'Sass', 'Scala', 'Scheme', 'SCons', 'Scrivener', 'Sdcc', 'SeamGen', 'SketchUp', 'Smalltalk', 'Stella', 'SugarCRM', 'Swift', 'Symfony', 'SymphonyCMS', 'Terraform', 'TeX', 'Textpattern', 'TurboGears2', 'Typo3', 'Umbraco', 'Unity', 'UnrealEngine', 'VisualStudio', 'VVVV', 'Waf', 'WordPress', 'Xojo', 'Yeoman', 'Yii', 'ZendFramework', 'Zephir']
