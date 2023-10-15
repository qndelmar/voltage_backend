package main

import (
	"context"
	"github.com/YOUR-USER-OR-ORG-NAME/YOUR-REPO-NAME/internal/database"
	"github.com/YOUR-USER-OR-ORG-NAME/YOUR-REPO-NAME/internal/routes"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"net/http"
	"time"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))
	routes.Init(r)

	dbpool := database.RunClient(context.Background(), &database.DatabaseConfig{
		User:     "postgres",
		Password: "postgres",
		Name:     "voltageDB",
		Host:     "localhost",
		Port:     "5432",
	})
	db := database.WrapDatabase(dbpool)
	if db == nil {
	}
	http.ListenAndServe(":8080", r)
}
