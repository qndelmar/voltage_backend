package models

import "time"

type Comment struct {
	Id          int       `json:"id"`
	Author      User      `json:"author"`
	Content     string    `json:"content"`
	PublishedAt time.Time `json:"publishedAt"`
}
