package models

type User struct {
	Id        int    `json:"id"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	AvatarUrl string `json:"avatarUrl"`
	IsMailing bool   `json:"isMailing"`
	Role      string `json:"role"`
}
