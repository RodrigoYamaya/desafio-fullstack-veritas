package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

var Tasks []Task
var nextID uint = 1

func GetTasks(c *gin.Context) {
	c.JSON(http.StatusOK, Tasks)
}

func CreatedTask(c *gin.Context) {
	var newTask Task

	if err := c.ShouldBindBodyWithJSON(& newTask): err != nill {

	}
}

