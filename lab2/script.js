"use strict";

document.addEventListener('DOMContentLoaded', function() {
    // State management
    const state = {
        lists: {
        },
        deletedTodo: null,
        currentListId: 'default'
    };

    // DOM Elements
    const listsContainer = document.getElementById('lists-container');
    const addListInput = document.getElementById('new-list-input');
    const addListBtn = document.getElementById('add-list-btn');
    const undoContainer = document.getElementById('undo-container');
    const undoBtn = document.getElementById('undo-btn');
    const modal = document.getElementById('confirmation-modal');
    const modalMessage = document.getElementById('modal-message');
    const confirmDelete = document.getElementById('confirm-delete');
    const cancelDelete = document.getElementById('cancel-delete');

    // Add a new list
    addListBtn.addEventListener('click', function() {
        const listName = addListInput.value.trim();
        if (listName) {
            createNewList(listName);
            addListInput.value = '';
        }
    });

    addListInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const listName = addListInput.value.trim();
            if (listName) {
                createNewList(listName);
                addListInput.value = '';
            }
        }
    });

    // Undo deletion
    undoBtn.addEventListener('click', function() {
        if (state.deletedTodo) {
            const { listId, todo, index } = state.deletedTodo;
            state.lists[listId].todos.splice(index, 0, todo);
            renderList(listId);
            state.deletedTodo = null;
            undoContainer.classList.add('hidden');
        }
    });

    // Modal handlers
    confirmDelete.addEventListener('click', function() {
        const todoToDelete = modal.dataset.todoId;
        const listId = modal.dataset.listId;
        const index = parseInt(modal.dataset.todoIndex);
        
        // Store the deleted todo for potential undo
        const deletedTodo = state.lists[listId].todos.splice(index, 1)[0];
        state.deletedTodo = { listId, todo: deletedTodo, index };
        
        renderList(listId);
        modal.classList.add('hidden');
        undoContainer.classList.remove('hidden');
    });

    cancelDelete.addEventListener('click', function() {
        modal.classList.add('hidden');
    });

    // Event delegation for dynamic elements
    document.addEventListener('click', function(e) {
        // Toggle list
        if (e.target.closest('.list-title-container')) {
            const listElement = e.target.closest('.todo-list');
            toggleList(listElement);
        }

        // Add todo
        if (e.target.classList.contains('add-todo-btn')) {
            const listElement = e.target.closest('.todo-list');
            const listId = listElement.dataset.listId;
            const input = listElement.querySelector('.new-todo-input');
            const todoText = input.value.trim();
            
            if (todoText) {
                addTodo(listId, todoText);
                input.value = '';
            }
        }

        // Delete todo
        if (e.target.classList.contains('todo-delete')) {
            const todoElement = e.target.closest('.todo-item');
            const listElement = e.target.closest('.todo-list');
            const listId = listElement.dataset.listId;
            const todoIndex = Array.from(todoElement.parentNode.children).indexOf(todoElement);
            const todoText = state.lists[listId].todos[todoIndex].text;
            
            // Show confirmation modal
            modalMessage.textContent = `Czy na pewno chcesz usunąć zadanie o treści: ${todoText}`;
            modal.dataset.todoId = todoElement.dataset.id;
            modal.dataset.listId = listId;
            modal.dataset.todoIndex = todoIndex;
            modal.classList.remove('hidden');
        }

        // Toggle todo completion
        if (e.target.classList.contains('todo-checkbox')) {
            const todoElement = e.target.closest('.todo-item');
            const listElement = e.target.closest('.todo-list');
            const listId = listElement.dataset.listId;
            const todoIndex = Array.from(todoElement.parentNode.children).indexOf(todoElement);
            
            toggleTodoCompletion(listId, todoIndex);
        }
    });

    // Handle input events for search
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('search-input')) {
            const listElement = e.target.closest('.todo-list');
            const listId = listElement.dataset.listId;
            const searchText = e.target.value;
            const caseSensitive = listElement.querySelector('.case-sensitive-checkbox').checked;
            
            filterTodos(listId, searchText, caseSensitive);
        }

        if (e.target.classList.contains('case-sensitive-checkbox')) {
            const listElement = e.target.closest('.todo-list');
            const listId = listElement.dataset.listId;
            const searchText = listElement.querySelector('.search-input').value;
            const caseSensitive = e.target.checked;
            
            filterTodos(listId, searchText, caseSensitive);
        }
    });

    // Handle keypress events
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('new-todo-input') && e.key === 'Enter') {
            const listElement = e.target.closest('.todo-list');
            const listId = listElement.dataset.listId;
            const todoText = e.target.value.trim();
            
            if (todoText) {
                addTodo(listId, todoText);
                e.target.value = '';
            }
        }
    });

    // Handle list title edits
    document.addEventListener('blur', function(e) {
        if (e.target.classList.contains('list-title')) {
            const listElement = e.target.closest('.todo-list');
            const listId = listElement.dataset.listId;
            const newTitle = e.target.textContent.trim();
            
            if (newTitle) {
                state.lists[listId].title = newTitle;
            } else {
                e.target.textContent = state.lists[listId].title;
            }
        }
    }, true);

    // Functions
    function createNewList(listName) {
        const listId = 'list_' + Date.now();
        state.lists[listId] = {
            title: listName,
            todos: []
        };

        const listTemplate = `
            <div class="todo-list active" data-list-id="${listId}">
                <div class="list-header">
                    <div class="list-title-container">
                        <div class="toggle-icon">▼</div>
                        <h2 class="list-title" contenteditable="true">${listName}</h2>
                    </div>
                    <div class="search-container">
                        <input type="text" class="search-input" placeholder="Search...">
                        <label class="case-sensitive-label">
                            <input type="checkbox" class="case-sensitive-checkbox">
                            Case sensitive
                        </label>
                    </div>
                </div>
                
                <div class="list-content">
                    <div class="add-todo-container">
                        <input type="text" class="new-todo-input" placeholder="Add a new task...">
                        <button class="add-todo-btn">+</button>
                    </div>
                    
                    <ul class="todos-list">
                        <!-- Tasks will be added here by JavaScript -->
                    </ul>
                </div>
            </div>
        `;

        listsContainer.insertAdjacentHTML('beforeend', listTemplate);
    }

    function addTodo(listId, text) {
        const todo = {
            id: 'todo_' + Date.now(),
            text: text,
            completed: false,
            completedDate: null
        };

        state.lists[listId].todos.push(todo);
        renderList(listId);
    }

    function toggleTodoCompletion(listId, todoIndex) {
        const todo = state.lists[listId].todos[todoIndex];
        todo.completed = !todo.completed;
        
        if (todo.completed) {
            todo.completedDate = new Date();
        } else {
            todo.completedDate = null;
        }
        
        renderList(listId);
    }

    function toggleList(listElement) {
        listElement.classList.toggle('active');
    }

    function filterTodos(listId, searchText, caseSensitive) {
        const listElement = document.querySelector(`.todo-list[data-list-id="${listId}"]`);
        const todoElements = listElement.querySelectorAll('.todo-item');
        
        todoElements.forEach((todoElement, index) => {
            const todoText = state.lists[listId].todos[index].text;
            let match = true;
            
            if (searchText) {
                if (caseSensitive) {
                    match = todoText.includes(searchText);
                } else {
                    match = todoText.toLowerCase().includes(searchText.toLowerCase());
                }
            }
            
            todoElement.style.display = match ? '' : 'none';
        });
    }

    function renderList(listId) {
        const listElement = document.querySelector(`.todo-list[data-list-id="${listId}"]`);
        const todosListElement = listElement.querySelector('.todos-list');
        todosListElement.innerHTML = '';
        
        state.lists[listId].todos.forEach(todo => {
            const dateString = todo.completedDate 
                ? `Completed: ${formatDate(todo.completedDate)}` 
                : '';
            
            const todoTemplate = `
                <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                    <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                    <span class="todo-text">${todo.text}</span>
                    <span class="todo-date">${dateString}</span>
                    <button class="todo-delete">×</button>
                </li>
            `;
            
            todosListElement.insertAdjacentHTML('beforeend', todoTemplate);
        });
        
        // Apply current search filter
        const searchInput = listElement.querySelector('.search-input');
        const caseSensitive = listElement.querySelector('.case-sensitive-checkbox').checked;
        if (searchInput.value) {
            filterTodos(listId, searchInput.value, caseSensitive);
        }
    }

    function formatDate(date) {
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
});