package main

import (
	"database/sql"
	"fmt"
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
	fmt.Println("I'm starting")
	db := database.Open("./data/db.sqlite")
	loadIgnoreFiles(db)
	fmt.Println("I'm OK")
	route.StartServer(db)
}

func loadIgnoreFiles(db *sql.DB) {
	err := filepath.Walk("data/gitignore/", walker)
	if err != nil {
		log.Fatalf("Error, in filepath.Walk(): %v", err)
	}

	for _, file := range fileList {
		data, err := ioutil.ReadFile(file)
		if err != nil {
			log.Fatalf("Error, reading files: %v", err)
		}
		name := strings.ToLower(strings.TrimSuffix(filepath.Base(file), ".gitignore"))
		database.PutItem(db, name, data)
	}

	return
}

func walker(path string, f os.FileInfo, err error) error {
	if filepath.Ext(path) == ".gitignore" {
		fileList = append(fileList, path)
	}

	return nil
}
