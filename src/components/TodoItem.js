/**
 * <div class="todo-item" data-todo-id="TODO_ID">
 *   <a href="#" data-todo-event-action="toggleTodo" data-todo-ref-id="TODO_ID"><i data-feather="circle"></i></a>
 *   또는
 *   <a href="#" data-todo-event-action="toggleTodo" data-todo-ref-id="TODO_ID"><i data-feather="check-circle"></i></a>
 *
 *   <div class="todo-item-title">미완료일 경우</div>
 *   또는
 *   <div class="todo-item-title todo-item-title--completed">완료일 경우</div>
 *
 *   <a href="#" data-todo-event-action="removeTodo" data-todo-ref-id="TODO_ID"><i data-feather="x"></i></a>
 * </div>
 */
export default class TodoItem {
  constructor({ id, title = '', createdAt, completed = false }) {
    this.id = id
    this.title = title.trim()
    this.createdAt = createdAt || Date.now()
    this.completed = completed
    this.el = document.createDocumentFragment()
  }

  render() {
    const itemDiv = document.createElement('div')
    itemDiv.classList.add('todo-item')
    itemDiv.dataset.todoId = this.id
    if (this.completed) {
      itemDiv.classList.add('todo-item--completed')
    }

    const titleDiv = document.createElement('div')
    titleDiv.classList.add('todo-item-title')
    titleDiv.appendChild(document.createTextNode(this.title))
    if (this.completed) {
      titleDiv.classList.add('todo-item-title--completed')
    }

    const checkIcon = document.createElement('i')
    checkIcon.dataset.feather = this.completed ? 'check-circle' : 'circle'

    const checkButton = document.createElement('a')
    checkButton.setAttribute('href', '#')
    checkButton.dataset.todoEventAction = 'toggleTodo'
    checkButton.dataset.todoRefId = this.id
    checkButton.appendChild(checkIcon)

    const xIcon = document.createElement('i')
    xIcon.dataset.feather = 'x'

    const removeButton = document.createElement('a')
    removeButton.setAttribute('href', '#')
    removeButton.dataset.todoEventAction = 'removeTodo'
    removeButton.dataset.todoRefId = this.id
    removeButton.appendChild(xIcon)

    itemDiv.appendChild(checkButton)
    itemDiv.appendChild(titleDiv)
    itemDiv.appendChild(removeButton)

    return itemDiv
  }
}
