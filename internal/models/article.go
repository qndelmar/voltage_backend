package models

import "time"

type Article struct {
	ArticleId   int       `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Content     string    `json:"content"`
	UrlToImage  string    `json:"urlToImage"`
	PublishedAt time.Time `json:"publishedAt"`
	Category    Category  `json:"category"`
	Views       int       `json:"views"`
	Comments    []Comment `json:"comments"`
}

type Result struct {
	isSuccessful bool
	message      string
}

type ArticleManager interface {
	Create(Article) (Result, error)
	Delete(Article) (Result, error)
	Edit(Article) (Result, error)
	GetSingle(int) Article
	GetMany() []Article
}
