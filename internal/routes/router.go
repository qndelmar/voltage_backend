package routes

import (
	"github.com/go-chi/chi/v5"
	"net/http"
)

func Init(r chi.Router) {
	r.Get("/", Pong)

}

func Pong(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("pong"))
}
