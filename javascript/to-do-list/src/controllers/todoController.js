import { Todo } from '../models/todo';
import { Project } from '../models/project';

export class TodoController {
    constructor() {
        this.projects = [];
        this.defaultProject = new Project('Default');
        this.projects.push(this.defaultProject);
        this.loadFromLocalStorage();
    }

    createProject(name) {
        const project = new Project(name);
        this.projects.push(project);
        this.saveToLocalStorage();
        return project;
    }

    deleteProject(projectId) {
        // Don't allow deletion of default project
        if (projectId === this.defaultProject.id) return false;
        
        this.projects = this.projects.filter(project => project.id !== projectId);
        this.saveToLocalStorage();
        return true;
    }

    getProjects() {
        return this.projects;
    }

    getProject(projectId) {
        return this.projects.find(project => project.id === projectId);
    }

    createTodo(projectId, title, description, dueDate, priority, notes) {
        const project = this.getProject(projectId) || this.defaultProject;
        const todo = new Todo(title, description, dueDate, priority, notes);
        project.addTodo(todo);
        this.saveToLocalStorage();
        return todo;
    }

    deleteTodo(projectId, todoId) {
        const project = this.getProject(projectId);
        if (!project) return false;
        
        project.removeTodo(todoId);
        this.saveToLocalStorage();
        return true;
    }

    updateTodo(projectId, todoId, title, description, dueDate, priority, notes) {
        const project = this.getProject(projectId);
        if (!project) return false;
        
        const todo = project.todos.find(todo => todo.id === todoId);
        if (!todo) return false;
        
        todo.updateDetails(title, description, dueDate, priority, notes);
        this.saveToLocalStorage();
        return true;
    }

    toggleTodoComplete(projectId, todoId) {
        const project = this.getProject(projectId);
        if (!project) return false;
        
        const todo = project.todos.find(todo => todo.id === todoId);
        if (!todo) return false;
        
        todo.toggleComplete();
        this.saveToLocalStorage();
        return true;
    }

    saveToLocalStorage() {
        localStorage.setItem('todoProjects', JSON.stringify(this.projects));
    }

    loadFromLocalStorage() {
        const savedProjects = localStorage.getItem('todoProjects');
        if (savedProjects) {
            // Simple restoration - in a real app you'd need to properly rehydrate the class instances
            const parsedData = JSON.parse(savedProjects);
            // Ensure default project exists
            this.projects = parsedData.map(projectData => {
              const project = new Project(projectData.name);
              project.id = projectData.id;
              
              // Rehydrate todos for each project
              if (projectData.todos && Array.isArray(projectData.todos)) {
                project.todos = projectData.todos.map(todoData => {
                  const todo = new Todo(
                    todoData.title,
                    todoData.description,
                    todoData.dueDate,
                    todoData.priority,
                    todoData.notes,
                    todoData.isComplete
                  );
                  todo.id = todoData.id;
                  return todo;
                });
              }
              
              return project;
            });
            
            // Set default project
            if (!this.projects.length) {
              this.projects.push(this.defaultProject);
            } else {
              this.defaultProject = this.projects[0];
            }
        }
    }
}