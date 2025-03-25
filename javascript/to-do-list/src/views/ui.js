import { TodoController } from '../controllers/todoController';

export class UI {
    constructor() {
        this.controller = new TodoController();
        this.currentProjectId = this.controller.defaultProject.id;
    }

    initializeApp() {
        this.renderProjects();
        this.renderTodos(this.currentProjectId);
        this.updateProjectDropdown();
        this.setupEventListeners();
    }

    renderProjects() {
        const projectList = document.getElementById('project-list');
        projectList.innerHTML = '';
        
        this.controller.getProjects().forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');
            projectElement.dataset.projectId = project.id;
            projectElement.innerHTML = `
                <span>${project.name}</span>
                ${project.id !== this.controller.defaultProject.id ? 
                  '<button class="delete-project">X</button>' : ''}
            `;
            projectList.appendChild(projectElement);
        });

        this.updateProjectDropdown();
    }

    renderTodos(projectId) {
        this.currentProjectId = projectId;
        const project = this.controller.getProject(projectId);
        if (!project) return;
    
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        
        // Add ability to show todos from all projects
        let todosToShow = [];
        
        if (document.getElementById('show-all-todos')?.checked) {
            // If "Show all todos" is checked, gather todos from all projects
            this.controller.getProjects().forEach(proj => {
                proj.todos.forEach(todo => {
                    // Add project info to each todo for display
                    todosToShow.push({
                        todo,
                        projectName: proj.name,
                        projectId: proj.id
                    });
                });
            });
        } else {
            // Just show todos from current project
            project.todos.forEach(todo => {
                todosToShow.push({
                    todo,
                    projectName: project.name,
                    projectId: project.id
                });
            });
        }
        
        todosToShow.forEach(({ todo, projectName, projectId }) => {
            const todoElement = document.createElement('div');
            todoElement.classList.add('todo');
            todoElement.classList.add(`priority-${todo.priority}`);
            if (todo.isComplete) {
                todoElement.classList.add('completed');
            }
            todoElement.dataset.todoId = todo.id;
            todoElement.dataset.projectId = projectId;
            
            todoElement.innerHTML = `
                <div class="todo-header">
                    <input type="checkbox" class="todo-complete" ${todo.isComplete ? 'checked' : ''}>
                    <span class="todo-title">${todo.title}</span>
                    <span class="todo-date">${todo.dueDate}</span>
                    ${projectId !== this.currentProjectId ? 
                      `<span class="todo-project-badge">${projectName}</span>` : ''}
                    <button class="expand-todo">Details</button>
                    <button class="delete-todo">X</button>
                </div>
                <div class="todo-details" style="display: none;">
                    <p class="todo-description">${todo.description}</p>
                    <p class="todo-priority">Priority: ${todo.priority}</p>
                    <p class="todo-project">Project: ${projectName}</p>
                    <p class="todo-notes">${todo.notes}</p>
                    <button class="edit-todo">Edit</button>
                </div>
            `;
            
            todoList.appendChild(todoElement);
        });
        
        // Update project dropdown to reflect current project
        this.updateProjectDropdown();
    }

    setupEventListeners() {
        // Project-related event listeners
        document.getElementById('add-project-form').addEventListener('submit', e => {
            e.preventDefault();
            const projectName = document.getElementById('project-name').value;
            if (projectName.trim()) {
                this.controller.createProject(projectName);
                this.renderProjects();
                document.getElementById('project-name').value = '';
            }
        });

        document.getElementById('project-list').addEventListener('click', e => {
            if (e.target.classList.contains('delete-project')) {
                const projectDiv = e.target.closest('.project');
                const projectId = projectDiv.dataset.projectId;
                this.controller.deleteProject(projectId);
                this.renderProjects();
                this.renderTodos(this.controller.defaultProject.id);
            } else if (e.target.closest('.project')) {
                const projectId = e.target.closest('.project').dataset.projectId;
                this.renderTodos(projectId);
            }
        });

        // Todo-related event listeners
        document.getElementById('add-todo-form').addEventListener('submit', e => {
            e.preventDefault();
            const title = document.getElementById('todo-title').value;
            const description = document.getElementById('todo-description').value;
            const dueDate = document.getElementById('todo-date').value;
            const priority = document.getElementById('todo-priority').value;
            const notes = document.getElementById('todo-notes').value;
            // Get selected project ID from dropdown
            const projectId = document.getElementById('todo-project').value;
            
            if (title.trim() && dueDate) {
                this.controller.createTodo(
                    projectId, title, description, dueDate, priority, notes
                );
                // Render todos for the project where the todo was added
                this.renderTodos(projectId);
                
                // Reset form
                document.getElementById('add-todo-form').reset();
                // Set the project dropdown back to current project
                document.getElementById('todo-project').value = this.currentProjectId;
            }
        });

        document.getElementById('todo-list').addEventListener('click', e => {
            const todoDiv = e.target.closest('.todo');
            if (!todoDiv) return;
            
            const todoId = todoDiv.dataset.todoId;
            const projectId = todoDiv.dataset.projectId;
            
            if (e.target.classList.contains('delete-todo')) {
                this.controller.deleteTodo(projectId, todoId);
                this.renderTodos(this.currentProjectId);
            } else if (e.target.classList.contains('expand-todo')) {
                const detailsDiv = todoDiv.querySelector('.todo-details');
                detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
            } else if (e.target.classList.contains('todo-complete')) {
                this.controller.toggleTodoComplete(projectId, todoId);
                this.renderTodos(this.currentProjectId);
            } else if (e.target.classList.contains('edit-todo')) {
                // Show edit form logic here with project selection
            }
        });

        document.getElementById('show-all-todos')?.addEventListener('change', () => {
            this.renderTodos(this.currentProjectId);
        });
    }

    updateProjectDropdown() {
      const projectDropdown = document.getElementById('todo-project');
      if (!projectDropdown) return;
      
      // Clear existing options
      projectDropdown.innerHTML = '';
      
      // Add options for each project
      this.controller.getProjects().forEach(project => {
          const option = document.createElement('option');
          option.value = project.id;
          option.textContent = project.name;
          if (project.id === this.currentProjectId) {
              option.selected = true;
          }
          projectDropdown.appendChild(option);
      });
  }
}