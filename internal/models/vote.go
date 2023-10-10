package models

type Vote struct {
	CommentId int  `json:"commentId"`
	Author    User `json:"author"`
	Vote      int  `json:"vote"`
}
