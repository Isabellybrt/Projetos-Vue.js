<template>
    <div id="app">
      <h1>Minha Lista de Tarefas</h1>
      <ul>
        <li
          v-for="(task, index) in tasks"
          :key="index"
          :class="{ completed: task.completed }"
        >
          <input
            type="checkbox"
            v-model="task.completed"
            @change="taskCompleted(index)"
          />
          <span @click="taskCompleted(index)">{{ task.description }}</span>
          <button class="complete-button" @click="taskCompleted(index)">
            Concluir Tarefa
          </button>
        </li>
      </ul>
      <input v-model="newTask" placeholder="Nova Tarefa" />
      <button class="add-button" @click="addTask">Adicionar Tarefa</button>
      <button class="remove-button" @click="removeTask">
        Remover Todas as Tarefas
      </button>
      <div v-if="completedMessage" class="completed-message">
        {{ completedMessage }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        tasks: [
          { description: 'Estudar para o Vestibular', completed: false },
          { description: 'Estudar para a OMIF', completed: false },
        ],
        newTask: '',
        completedMessage: '',
      };
    },
    methods: {
      taskCompleted(index) {
        if (!this.tasks[index].completed) {
          this.tasks[index].completed = true;
          this.completedMessage = `A tarefa "${this.tasks[index].description}" foi concluída!`;
        } else {
          this.completedMessage = '';
        }
      },
      addTask() {
        if (this.newTask.trim() !== '') {
          this.tasks.push({ description: this.newTask, completed: false });
          this.newTask = '';
        }
      },
      removeTask() {
        this.tasks = [];
        this.completedMessage = ''; // Limpar a mensagem
      },
    },
  };
  </script>
  
  <style>
  #app {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
  }
  
  .completed {
    text-decoration: line-through;
  }
  
  button {
    margin-top: 10px;
    padding: 8px 20px;
    margin-left: 10px;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s, color 0.3s;
  }
  
  button:hover {
    filter: brightness(1.2);
  }
  
  .task-input {
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #3498db;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  
  .task-input:focus {
    outline: none;
    border-color: #2980b9;
    box-shadow: 0 0 10px rgba(41, 128, 185, 0.8);
  }
  
  .complete-button {
    color: white;
    background-color: #4caf50;
    border-radius: 5px;
  }
  
  .add-button {
    color: white;
    background-color: #3498db;
    border-radius: 5px;
  }
  
  .remove-button {
    color: white;
    background-color: #e74c3c;
    border-radius: 5px;
  }
  
  .completed-message {
    margin-top: 10px;
    color: #2ecc71;
  }
  </style>
  