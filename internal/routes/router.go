package routes

import (
	"github.com/YOUR-USER-OR-ORG-NAME/YOUR-REPO-NAME/internal/controllers"
	"github.com/YOUR-USER-OR-ORG-NAME/YOUR-REPO-NAME/internal/middleware"
	"github.com/go-chi/chi/v5"
	"net/http"
)

func Init(r chi.Router) {
	r.Get("/", Pong)
	r.Route("/articles", func(r chi.Router) {
		r.With(middleware.Paginate).Get("/", controllers.GetArticles)
	})
}

func Pong(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("pong"))
}
