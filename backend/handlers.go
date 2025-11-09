package main

import (
	"net/http"
	"time"

	"encoding/json"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

var Tasks []Task

const filePath = "tasks.json"

func loadTasks() {
	file, err := os.ReadFile(filePath)
	if err != nil {
		Tasks = []Task{}
		return
	}
	json.Unmarshal(file, &Tasks)
}

func saveTasks() {
	data, err := json.MarshalIndent(Tasks, "", "  ")
	if err != nil {
		return
	}
	os.WriteFile(filePath, data, 0644)
}

func GetTasks(c *gin.Context) {
	c.JSON(http.StatusOK, Tasks)
}

func CreateTask(c *gin.Context) {
	var newTask Task

	if err := c.ShouldBindJSON(&newTask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   true,
			"message": "Invalid request body",
			"details": err.Error(),
		})
		return
	}

	if newTask.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   true,
			"message": "O título da tarefa é obrigatório",
		})
		return
	}

	validStatus := map[string]bool{"A fazer": true, "Em andamento": true, "Concluída": true}
	if newTask.Status != "" && !validStatus[newTask.Status] {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   true,
			"message": "Status inválido. Use: 'A fazer', 'Em andamento' ou 'Concluída'",
		})
		return
	}

	if newTask.Status == "" {
		newTask.Status = "A fazer"
	}

	newTask.ID = uuid.New().String()
	newTask.CreatedAt = time.Now()

	Tasks = append(Tasks, newTask)
	saveTasks()

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

	if newTask.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   true,
			"message": "O título da tarefa é obrigatório",
		})
		return
	}

	validStatus := map[string]bool{"A fazer": true, "Em andamento": true, "Concluída": true}
	if newTask.Status != "" && !validStatus[newTask.Status] {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   true,
			"message": "Status inválido. Use: 'A fazer', 'Em andamento' ou 'Concluída'",
		})
		return
	}

	for i, u := range Tasks {
		if u.ID == id {
			Tasks[i].Title = newTask.Title
			Tasks[i].Description = newTask.Description
			Tasks[i].Status = newTask.Status
			saveTasks()

			c.JSON(http.StatusOK, gin.H{
				"error":   false,
				"message": "Tarefa atualizada com sucesso",
				"task":    Tasks[i],
			})

			return

		}
	}

	c.JSON(http.StatusNotFound, gin.H{
		"error":   true,
		"message": "tarefa não encontrada",
	})

}

func DeleteTask(c *gin.Context) {
	id := c.Param("id")

	for i, u := range Tasks {
		if u.ID == id {
			Tasks = append(Tasks[:i], Tasks[i+1:]...)
			saveTasks()

			c.JSON(http.StatusOK, gin.H{
				"error":   false,
				"message": "Tarefa removida com sucesso",
			})

			return
		}

	}

	c.JSON(http.StatusNotFound, gin.H{
		"error":   true,
		"message": "tarefa não encontrada",
	})

}
