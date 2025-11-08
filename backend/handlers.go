package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

var Tasks []Task
var nextID uint = 1

func GetTasks(c *gin.Context) {
	c.JSON(http.StatusOK, Tasks)
}

func CreatedTask(c *gin.Context) {
	var newTask Task

	if err := c.ShouldBindJSON(&newTask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Error": err.Error()})
		return
	}

	newTask.ID = nextID
	newTask.Status = "A fazer"
	newTask.CreatedAt = time.Now()
	nextID++
	Tasks = append(Tasks, newTask)

	c.JSON(http.StatusCreated, newTask)
}
