(function() {
  var button = document.getElementById('button')
  var input = document.getElementById('input')
  var list = document.getElementById('list')
  var files = ['Actionscript', 'Ada', 'Agda', 'Android', 'AppceleratorTitanium', 'AppEngine', 'ArchLinuxPackages','Autotools', 'C++', 'C', 'CakePHP', 'CFWheels', 'ChefCookbook', 'Clojure', 'CMake', 'CodeIgniter', 'CommonLisp', 'Composer', 'Concrete5', 'Coq', 'CraftCMS', 'CUDA', 'D', 'Dart', 'Delphi', 'DM', 'Drupal', 'Eagle', 'Elisp', 'Elixir', 'Elm', 'EPiServer', 'Erlang', 'ExpressionEngine', 'ExtJs', 'Fancy', 'Finale', 'ForceDotCom', 'Fortran', 'FuelPHP', 'Gcov', 'GitBook', 'Anjuta', 'Ansible', 'Archives', 'Bazaar', 'BricxCC', 'Calabash', 'Cloud9', 'CodeKit', 'CVS', 'DartEditor', 'Dreamweaver','Dropbox', 'Eclipse', 'EiffelStudio', 'Emacs', 'Ensime', 'Espresso', 'FlexBuilder', 'GPG', 'JDeveloper', 'JetBrains', 'Kate', 'KDevelop4', 'Lazarus', 'LibreOffice', 'Linux', 'LyX', 'macOS', 'Matlab', 'Mercurial', 'MicrosoftOffice', 'ModelSim', 'Momentics', 'MonoDevelop', 'NetBeans', 'Ninja', 'NotepadPP', 'Otto', 'Redcar', 'Redis', 'SBT', 'SlickEdit', 'Stata', 'SublimeText', 'SVN', 'SynopsysVCS', 'Tags', 'TextMate', 'TortoiseGit', 'Vagrant', 'Vim', 'VirtualEnv', 'VisualStudioCode', 'WebMethods', 'Windows', 'Xcode', 'XilinxISE', 'Go', 'Gradle', 'Grails', 'GWT', 'Haskell', 'Idris', 'IGORPro', 'Java', 'Jboss', 'Jekyll', 'Joomla', 'Julia', 'KiCad', 'Kohana', 'LabVIEW', 'Laravel', 'Leiningen', 'LemonStand', 'Lilypond', 'Lithium', 'Lua', 'Magento', 'Maven', 'Mercury', 'MetaProgrammingSystem', 'Nanoc', 'Nim', 'Node', 'Objective-C', 'OCaml', 'Opa', 'OpenCart', 'OracleForms', 'Packer', 'Perl', 'Phalcon', 'PlayFramework', 'Plone', 'Prestashop', 'Processing', 'PureScript', 'Python', 'Qooxdoo', 'Qt', 'R', 'Rails', 'RhodesRhomobile', 'ROS', 'Ruby','Rust', 'Sass', 'Scala', 'Scheme', 'SCons', 'Scrivener', 'Sdcc', 'SeamGen', 'SketchUp', 'Smalltalk', 'Stella', 'SugarCRM', 'Swift', 'Symfony', 'SymphonyCMS', 'Terraform', 'TeX', 'Textpattern', 'TurboGears2', 'Typo3', 'Umbraco', 'Unity', 'UnrealEngine', 'VisualStudio', 'VVVV', 'Waf', 'WordPress', 'Xojo', 'Yeoman', 'Yii', 'ZendFramework', 'Zephir']
  var tags = []

  button.addEventListener('click', getGitIgnore, false)

  // Initialize autocomplete
  new Awesomplete(input, {
    autoFirst: true,
    minChars: 1,
    maxItems: 180,
	  list: files
  })

  var awe = document.getElementById('awe')

  input.addEventListener('awesomplete-selectcomplete', function(e){
    var el = this.value

    if (!tags.includes(el)) {
      tags.push(el)
      appendTag(el)
    }

    awe.style.width = '15px'
    list.style.padding = '0 5px'
    this.placeholder = ''
    this.value = ''
  })

  input.addEventListener('awesomplete-open', function(){
    list.style.borderBottomLeftRadius = '0'
  })

  input.addEventListener('awesomplete-close', function(){
    list.style.borderBottomLeftRadius = '5px'
  })

  // Remove tag if 'Backspace' was pressed
  input.onkeydown = function(e) {
    if (e.keyCode == 8 && tags.length > 0 && input.value == '') {
      var el = input.parentNode.previousElementSibling
      
      if (!el.classList.contains('delete')) {
        el.classList.add('delete')
      } else {
        removeTag(el)
      }

      inputWidth()
    }
  }

  input.onkeypress = function() {
    inputWidth()
  }

  // Change input width
  function inputWidth() {
    if (tags.length === 0) {
      awe.style.width = '100%'
      list.style.padding = '0 10px'
    } else {
      awe.style.width = ((input.value.length + 1) * 15) + 'px'
    }
  }

  // Generate .gitignore file
  function getGitIgnore() {
    var searchStr = tags.sort().toString().toLowerCase()
    if (searchStr.length != 0) {
      window.location = '/api/' + searchStr
    }
  }

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
    list.insertBefore(tag, input.parentElement)
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

  // Delete tag from the list of tags
  function removeTag(e) {
    tags.splice(tags.indexOf(e.childNodes[0].nodeValue), 1)
    list.removeChild(e)

    input.focus()

    if (tags.length == 0) {
      input.placeholder = 'Search Operating Systems, IDEs, or Programming Languages'
    }
  }
}())
