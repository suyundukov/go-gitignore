(function() {
  var button = document.getElementById('button');
  var input = document.getElementById('input');
  var list = document.getElementById('list');
  var files = ['Actionscript', 'Ada', 'Agda', 'Android', 'AppEngine', 'AppceleratorTitanium', 'ArchLinuxPackages', 'Autotools', 'C++', 'C', 'CFWheels', 'CMake', 'CUDA', 'CakePHP', 'ChefCookbook', 'Clojure', 'CodeIgniter', 'CommonLisp', 'Composer', 'Concrete5', 'Coq', 'CraftCMS', 'D', 'DM', 'Dart', 'Delphi', 'Drupal', 'EPiServer', 'Eagle', 'Elisp', 'Elixir', 'Elm', 'Erlang', 'ExpressionEngine', 'ExtJs', 'Fancy', 'Finale', 'ForceDotCom', 'Fortran', 'FuelPHP', 'GWT', 'Gcov', 'GitBook', 'Anjuta', 'Ansible', 'Archives', 'Backup', 'Bazaar', 'BricxCC', 'CVS', 'Calabash', 'Cloud9', 'CodeKit', 'DartEditor', 'Diff', 'Dreamweaver', 'Dropbox', 'Eclipse', 'EiffelStudio', 'Emacs', 'Ensime', 'Espresso', 'FlexBuilder', 'GPG', 'Images', 'JDeveloper', 'JEnv', 'JetBrains', 'KDevelop4', 'Kate', 'Lazarus', 'LibreOffice', 'Linux', 'LyX', 'MATLAB', 'Mercurial', 'MicrosoftOffice', 'ModelSim', 'Momentics', 'MonoDevelop', 'NetBeans', 'Ninja', 'NotepadPP', 'Octave', 'Otto', 'PSoCCreator', 'Patch', 'PuTTY', 'Redcar', 'Redis', 'SBT', 'SVN', 'SlickEdit', 'Stata', 'SublimeText', 'SynopsysVCS', 'Tags', 'TextMate', 'TortoiseGit', 'Vagrant', 'Vim', 'VirtualEnv', 'Virtuoso', 'VisualStudioCode', 'WebMethods', 'Windows', 'Xcode', 'XilinxISE', 'macOS', 'Go', 'Godot', 'Gradle', 'Grails', 'Haskell', 'IGORPro', 'Idris', 'JBoss', 'Java', 'Jekyll', 'Joomla', 'Julia', 'KiCad', 'Kohana', 'Kotlin', 'LabVIEW', 'Laravel', 'Leiningen', 'LemonStand', 'Lilypond', 'Lithium', 'Lua', 'Magento', 'Maven', 'Mercury', 'MetaProgrammingSystem', 'Nanoc', 'Nim', 'Node', 'OCaml', 'Objective-C', 'Opa', 'OpenCart', 'OracleForms', 'Packer', 'Perl', 'Perl6', 'Phalcon', 'PlayFramework', 'Plone', 'Prestashop', 'Processing', 'PureScript', 'Python', 'Qooxdoo', 'Qt', 'R', 'ROS', 'Rails', 'RhodesRhomobile', 'Ruby', 'Rust', 'SCons', 'Sass', 'Scala', 'Scheme', 'Scrivener', 'Sdcc', 'SeamGen', 'SketchUp', 'Smalltalk', 'Stella', 'SugarCRM', 'Swift', 'Symfony', 'SymphonyCMS', 'TeX', 'Terraform', 'Textpattern', 'TurboGears2', 'Typo3', 'Umbraco', 'Unity', 'UnrealEngine', 'VVVV', 'VisualStudio', 'Waf', 'WordPress', 'Xojo', 'Yeoman', 'Yii', 'ZendFramework', 'Zephir', 'Bazel', 'InforCMS', 'Kentico', 'Phoenix', 'Exercism', 'Hugo', 'JBoss4', 'JBoss6', 'Cordova', 'Meteor', 'NWjs', 'Nuxt', 'Vue', 'Snap', 'Logtalk', 'Bitrix', 'CodeSniffer', 'Magento1', 'Magento2', 'Pimcore', 'ThinkPHP', 'Puppet', 'Drupal7', 'JupyterNotebooks', 'Nikola', 'Racket', 'Red', 'Splunk', 'Xilinx', 'AtmelStudio', 'IAR_EWARM'];
  var tags = [];

  button.addEventListener('click', getGitIgnore, false);

  // Initialize autocomplete
  new Awesomplete(input, {
    autoFirst: true,
    minChars: 1,
    maxItems: 30,
	  list: files
  });

  var awe = document.getElementById('awe');

  input.addEventListener('awesomplete-selectcomplete', function(e){
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
  window.onload = input.focus();

  // On autocomplete window opening
  input.addEventListener('awesomplete-open', function(){
    list.style.borderBottomLeftRadius = '0';
  });

  // On autocomplete window closing
  input.addEventListener('awesomplete-close', function(){
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
