package database

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog"
	"log"
)

type DatabaseConfig struct {
	User     string
	Password string
	Host     string
	Port     string
	Name     string
}

type Database struct {
	db     *pgxpool.Pool
	logger zerolog.Logger // TODO Logger with levels
}

func RunClient(ctx context.Context, c *DatabaseConfig) *pgxpool.Pool {
	connStr := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", c.User, c.Password, c.Host, c.Port, c.Name)

	config, err := pgxpool.ParseConfig(connStr)

	if err != nil {
		log.Panicln(err)
	}
	config.MinConns = 1
	config.MaxConns = 256
	dbpool, err := pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		log.Panicln(err)
	}
	if err := dbpool.Ping(ctx); err != nil {
		log.Fatal(fmt.Errorf("\nFail to connect the database.\nPlease make sure the connection info is valid %#v", c))
		return nil
	}
	return dbpool
}

func WrapDatabase(db *pgxpool.Pool) *Database {
	return &Database{db: db}
}
