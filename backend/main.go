package main

import "github.com/gin-gonic/gin"

func main() {
	loadTasks()

	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	r.GET("/tasks", GetTasks)
	r.POST("/tasks", CreateTask)
	r.PATCH("/tasks/:id", UpdateTask)
	r.DELETE("/tasks/:id", DeleteTask)

	r.Run(":8080")
}
