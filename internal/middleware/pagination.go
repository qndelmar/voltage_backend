package middleware

import (
	"context"
	"github.com/YOUR-USER-OR-ORG-NAME/YOUR-REPO-NAME/internal/helpers"
	"net/http"
	"strconv"
)

func Paginate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		pageNum, err := strconv.Atoi(r.URL.Query().Get("page"))
		if err != nil {
			w.WriteHeader(400)
			return
		}
		pageSize, err := strconv.Atoi(r.URL.Query().Get("size"))
		if err != nil {
			w.WriteHeader(400)
			return
		}
		ctx := context.WithValue(r.Context(), "page", helpers.CurrentPageWithSize{
			PageNumber: pageNum,
			PageSize:   pageSize,
		})
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
