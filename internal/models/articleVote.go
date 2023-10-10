package models

type ArticleVote struct {
	Id      int     `json:"id"`
	Author  User    `json:"author"`
	Article Article `json:"article"`
	Vote    int     `json:"vote"`
}
