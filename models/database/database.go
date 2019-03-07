package database

import (
	"database/sql"
	"log"
	"os"

	// Importing Sqlite3 lib
	_ "github.com/mattn/go-sqlite3"
)

// Item is a model for Ignore
type Item struct {
	ID   string `json:"id"`
	Body []byte `json:"body"`
}

// GetItem returns item from database
func GetItem(db *sql.DB, id string) Item {
	sql := "SELECT * FROM ignores WHERE id = ?"

	stmt, err := db.Prepare(sql)
	if err != nil {
		log.Printf("Error, preparing statement : %v", err)
	}
	defer stmt.Close()

	res := Item{}

	err = stmt.QueryRow(id).Scan(&res.ID, &res.Body)
	if err != nil {
		log.Printf("Error, getting item in DB : %v", err)
	}

	return res
}

// PutItem puts item in database
func PutItem(db *sql.DB, id string, body []byte) {
	sql := "INSERT INTO ignores(id, body) VALUES(?, ?)"

	stmt, err := db.Prepare(sql)
	if err != nil {
		log.Printf("Error, preparing statement : %v", err)
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(id, body)
	if err != nil {
		log.Printf("Error, putting item in DB : %v", err)
		return
	}
}

// Open create a new sqlite file
func Open(path string) *sql.DB {
	os.Remove(path)
	db, err := sql.Open("sqlite3", path)
	if err != nil || db == nil {
		log.Fatalf("Error, opening database : %v", err)
	}

	createTable(db)

	return db
}

func createTable(db *sql.DB) {
	sql := `
	CREATE TABLE IF NOT EXISTS ignores(
        id TEXT NOT NULL PRIMARY KEY,
        body BLOB
    );
	`
	_, err := db.Exec(sql)
	if err != nil {
		log.Fatalf("Error, creating table : %v", err)
	}
}
