package route

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"sort"
	"strings"

	"github.com/nurlansu/go-gitignore/models/database"

	"github.com/julienschmidt/httprouter"
)

func contains(arr []string, str string) bool {
	for _, val := range arr {
		if val == str {
			return true
		}
	}
	return false
}

func mainHandler() httprouter.Handle {
	res, err := ioutil.ReadFile("public/index.html")
	if err != nil {
		log.Fatalf("Error, parsing index.html: %v", err)
	}

	return func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		w.Write(res)
	}
}

func apiHandler(db *sql.DB) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		params := ps.ByName("name")
		names := strings.Split(params, ",")
		sort.Strings(names)

		var res []byte
		if contains(names, "list") {
			res = apiResponse(db, "list", []string{})
		} else {
			res = apiResponse(db, "", names)
		}
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		w.Write(res)
	}
}

func apiResponse(db *sql.DB, val string, names []string) []byte {
	var res []byte

	if val == "list" {
		res = database.GetItem(db, "all").Body
	} else {
		for _, name := range names {
			ignoreTitle := []byte(fmt.Sprintf("\n%s %s %s\n", "###", strings.Title(name), "###"))
			content := database.GetItem(db, name).Body
			content = append(ignoreTitle, content...)
			res = append(res, content...)
		}
	}

	return res
}
