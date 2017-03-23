<p align="center">
  <br>
  <a href="https://gitignore.nurlan.co">
    <img src="https://i.nurlan.co/go-gitignore.svg" width="100%" height="120">
  </a>
  <br><br>
  <a href='https://travis-ci.org/nurlansu/go-gitignore'>
    <img src='https://travis-ci.org/nurlansu/go-gitignore.svg?branch=appengine'>
  </a>
  <br><br>
  <strong>Generate .gitignore files for your project</strong>
</p>

## What's it ???

go-gitignore is a web app designed to help you create .gitignore files for your Git repositories written in Go. Inspired by [gitignore.io][git-io]. It's lightweight version of gitignore.io, no jQuery, no Bootstrap, no Swift and no Vapor.

## How to run app locally ?

Before you get started make sure you have an up-to-date version of Go and Node, on macOS with [Homebrew][brew] installed you can run :

```bash
$ brew install node
$ brew install go
```

After that you can run:

```bash
$ go get -d github.com/nurlansu/go-gitignore
$ cd $GOPATH/src/github.com/nurlansu/go-gitignore
```

Now we can install all necessary `node` modules :

```bash
$ npm install
```

To build front-end stuff, you should run:

```bash
$ npm build
```

And at the end you can run the app using this command:

```bash
$ go run main.go
```

And that's all. Normally you could see the app running on http://localhost:8080

## Dependencies

This app uses [httprouter][router] for routing. You can make it work without, by changing 3-4 lines of code, but I like the way httprouter routes request.

## Demo

The live version can be found on https://gitignore.nurlan.co

## Thanks

- .gitignore files come from [github/gitignore][gitignore]
- main idea and maybe design comes from [joeblau/gitignore.io][git-io-gh]
- autocompletion comes from [Pixabay/JavaScript-autoComplete][autocomplete]

## License

<p align="center">
  <a href="./LICENSE"><img src="https://i.nurlan.co/logo.svg" width="100%" height="128"></a>
  <a href="./LICENSE"><strong>MIT</strong></a>
</p>



[autocomplete]: https://github.com/Pixabay/JavaScript-autoComplete
[brew]: https://brew.sh
[git-io]: https://gitignore.io
[git-io-gh]: https://github.com/joeblau/gitignore.io
[gitignore]: https://github.com/github/gitignore
[router]: https://github.com/julienschmidt/httprouter
