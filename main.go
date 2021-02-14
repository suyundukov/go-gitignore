package main

import (
	"database/sql"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/nurlansu/go-gitignore/models/database"
	"github.com/nurlansu/go-gitignore/models/route"
)

var (
	fileList []string
)

func main() {
	db := database.Open("./db.sqlite")
	loadIgnoreFiles(db)
	route.StartServer(db)
}

func loadIgnoreFiles(db *sql.DB) {
	err := filepath.Walk("gitignore/", walker)
	if err != nil {
		log.Fatalf("Error, in filepath.Walk(): %v", err)
	}

	var names []string

	for _, file := range fileList {
		data, err := ioutil.ReadFile(file)
		if err != nil {
			log.Fatalf("Error, reading files: %v", err)
		}
		name := strings.TrimSuffix(filepath.Base(file), ".gitignore")
		names = append(names, name)
		database.PutItem(db, strings.ToLower(name), data)
	}

	database.PutItem(db, "all", []byte(strings.Join(names, ",")))

	return
}

func walker(path string, f os.FileInfo, err error) error {
	if filepath.Ext(path) == ".gitignore" {
		fileList = append(fileList, path)
	}

	return nil
}
