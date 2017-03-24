var input = document.getElementById("input")
var list = document.getElementById("list")
var tags = []

list.addEventListener('click', toggleRemoveTag, false)

new autoComplete({
  selector: input,
  minChars: 1,
  source: function(term, suggest){
    term = term.toLowerCase()
    var choices = files
    var matches = []
    for (i = 0; i < choices.length; i++)
      if (~choices[i].toLowerCase().indexOf(term))
        matches.push(choices[i])
    suggest(matches)
  },
  onSelect: function(e, term, item){
    el = item.getAttribute('data-val')
    if (!tags.includes(el)) {
      tags.push(el)
      appendTag(el)
    }
    if (tags.length > 0) {
      input.style = "width: 20%"
      input.placeholder = ""
    }
    input.value = ""
  }
})

function getGitIgnore() {
  var searchStr = tags.sort().toString().toLowerCase()
  if (searchStr.length != 0) {
    window.location = "/api/" + searchStr
  }
}

function appendTag(el) {
  var tag = document.createElement("span")
  tag.className = "tag"
  tag.appendChild(document.createTextNode(el))

  var remove = document.createElement("span")
  remove.className = "remove"
  remove.appendChild(document.createTextNode('✖'))
  remove.addEventListener("click", removeTag, false)

  tag.appendChild(remove)
  list.insertBefore(tag, input)
}

function toggleRemoveTag(e) {
  var el = e.target.classList
  if (!el.contains('delete')) {
    el.add('delete')
  } else {
    el.remove('delete')
  }
}

function removeTag(e) {
  var el = e.target.parentElement

  tags.splice(tags.indexOf(el.childNodes[0].nodeValue), 1)
  list.removeChild(el)

  input.focus()

  if (tags.length == 0) {
    input.style = "width: 95%"
    input.placeholder = "Search Operating Systems, IDEs, or Programming Languages"
  }
}

var files = ['Actionscript', 'Ada', 'Agda', 'Android', 'AppceleratorTitanium', 'AppEngine', 'ArchLinuxPackages',' Autotools', 'C++', 'C', 'CakePHP', 'CFWheels', 'ChefCookbook', 'Clojure', 'CMake', 'CodeIgniter', 'CommonLisp', 'Composer', 'Concrete5', 'Coq', 'CraftCMS', 'CUDA', 'D', 'Dart', 'Delphi', 'DM', 'Drupal', 'Eagle', 'Elisp', 'Elixir', 'Elm', 'EPiServer', 'Erlang', 'ExpressionEngine', 'ExtJs', 'Fancy', 'Finale', 'ForceDotCom', 'Fortran', 'FuelPHP', 'Gcov', 'GitBook', 'Anjuta', 'Ansible', 'Archives', 'Bazaar', 'BricxCC', 'Calabash', 'Cloud9', 'CodeKit', 'CVS', 'DartEditor', 'Dreamweaver',' Dropbox', 'Eclipse', 'EiffelStudio', 'Emacs', 'Ensime', 'Espresso', 'FlexBuilder', 'GPG', 'JDeveloper', 'JetBrains', 'Kate', 'KDevelop4', 'Lazarus', 'LibreOffice', 'Linux', 'LyX', 'macOS', 'Matlab', 'Mercurial', 'MicrosoftOffice', 'ModelSim', 'Momentics', 'MonoDevelop', 'NetBeans', 'Ninja', 'NotepadPP', 'Otto', 'Redcar', 'Redis', 'SBT', 'SlickEdit', 'Stata', 'SublimeText', 'SVN', 'SynopsysVCS', 'Tags', 'TextMate', 'TortoiseGit', 'Vagrant', 'Vim', 'VirtualEnv', 'VisualStudioCode', 'WebMethods', 'Windows', 'Xcode', 'XilinxISE', 'Go', 'Gradle', 'Grails', 'GWT', 'Haskell', 'Idris', 'IGORPro', 'Java', 'Jboss', 'Jekyll', 'Joomla', 'Julia', 'KiCad', 'Kohana', 'LabVIEW', 'Laravel', 'Leiningen', 'LemonStand', 'Lilypond', 'Lithium', 'Lua', 'Magento', 'Maven', 'Mercury', 'MetaProgrammingSystem', 'Nanoc', 'Nim', 'Node', 'Objective-C', 'OCaml', 'Opa', 'OpenCart', 'OracleForms', 'Packer', 'Perl', 'Phalcon', 'PlayFramework', 'Plone', 'Prestashop', 'Processing', 'PureScript', 'Python', 'Qooxdoo', 'Qt', 'R', 'Rails', 'RhodesRhomobile', 'ROS', 'Ruby',' Rust', 'Sass', 'Scala', 'Scheme', 'SCons', 'Scrivener', 'Sdcc', 'SeamGen', 'SketchUp', 'Smalltalk', 'Stella', 'SugarCRM', 'Swift', 'Symfony', 'SymphonyCMS', 'Terraform', 'TeX', 'Textpattern', 'TurboGears2', 'Typo3', 'Umbraco', 'Unity', 'UnrealEngine', 'VisualStudio', 'VVVV', 'Waf', 'WordPress', 'Xojo', 'Yeoman', 'Yii', 'ZendFramework', 'Zephir']
