package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

var Tasks []Task

func GetTasks(c *gin.Context) {
	c.JSON(http.StatusOK, Tasks)
}

func CreatedTask(c *gin.Context) {
	var newTask Task

	if err := c.ShouldBindJSON(&newTask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   true,
			"message": "Invalid request body",
			"details": err.Error(),
		})
		return
	}

	newTask.ID = uuid.New().String()
	newTask.Status = "A fazer"
	newTask.CreatedAt = time.Now()

	Tasks = append(Tasks, newTask)

	c.JSON(http.StatusCreated, newTask)
}

func UpdateTask(c *gin.Context) {
	id := c.Param("id")
	var newTask Task

	if err := c.ShouldBindJSON(&newTask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   true,
			"message": "Invalid request body",
			"details": err.Error(),
		})
		return

	}

	for i, u := range Tasks {
		if u.ID == id {
			Tasks[i].Title = newTask.Title
			Tasks[i].Description = newTask.Description
			Tasks[i].Status = newTask.Status

			c.JSON(http.StatusOK, newTask)
			return

		}
	}

	c.JSON(http.StatusNotFound, gin.H{
		"error":   true,
		"message": "Task not found",
	})

}

func DeleteTask(c *gin.Context) {
	id := c.Param("id")

	for i, u := range Tasks {
		if u.ID == id {
			Tasks = append(Tasks[:i], Tasks[i+1:]...)
			c.JSON(http.StatusOK, gin.H{
				"error":   false,
				"message": "Task deleted successfully",
			})
			return
		}

	}

	c.JSON(http.StatusNotFound, gin.H{
		"error":   true,
		"message": "Task not found",
	})

}
