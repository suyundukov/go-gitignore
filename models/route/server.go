package route

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/julienschmidt/httprouter"
)

// StartServer starts server
func StartServer(db *sql.DB) {
	r := httprouter.New()

	r.ServeFiles("/public/*filepath", http.Dir("public/static/"))
	r.GET("/api/:name", apiHandler(db))
	r.GET("/", mainHandler())

	log.Fatal(http.ListenAndServe(":"+initPort(), r))
}

func initPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	return port
}
