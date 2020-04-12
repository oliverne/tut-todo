import TodoItem from './TodoItem.js'

export default class TodoApp {
  constructor({ el, store }) {
    this.el = el
    this.store = store
    this.initialized = false
    console.log('TodoApp created')
  }

  run() {
    if (this.initialized) return

    this.todoInput = this.el.querySelector('.todo-input')
    this.todoList = this.el.querySelector('.todo-list')

    this.el.addEventListener('click', this.delegateClick.bind(this), false)
    this.todoInput.addEventListener(
      'keyup',
      this.onEnterPressed.bind(this),
      false
    )

    this.store.on('todosLoaded', this.populateTodos.bind(this))
    this.store.on('todosChanged', this.onTodosChanged.bind(this))
    this.store.on('todoAdded', this.onTodoAdded.bind(this))
    this.store.on('todoRemoved', this.onTodoRemoved.bind(this))
    this.store.on('todoToggled', this.onTodoToggled.bind(this))

    this.todoInput.focus()
    this.initialized = true
  }

  populateTodos(e) {
    const items = e.detail.todos
    const frag = document.createDocumentFragment()

    items.forEach((item) => {
      const newItem = new TodoItem(item)
      frag.append(newItem.render())
    })

    this.todoList.append(frag)
  }

  onTodosChanged(e) {
    const yeah = this.el.querySelector('.todo-yeah')

    if (!e.detail.todos || e.detail.todos.length < 1) {
      yeah.style.display = 'block'
    } else {
      yeah.style.display = 'none'
    }

    window.requestAnimationFrame(() => {
      window.feather.replace()
    })
  }

  onEnterPressed(e) {
    if (e.keyCode === 13) {
      const addButton = this.el.querySelector(
        '[data-todo-event-action="addTodo"]'
      )
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      })

      addButton.dispatchEvent(clickEvent)
    }
  }

  onTodoAdded(e) {
    if (!e || e.type !== 'todoAdded') return

    const newItem = new TodoItem(e.detail)
    const rendered = newItem.render()

    this.todoList.prepend(rendered)
    this.todoInput.value = ''
  }

  onTodoRemoved(e) {
    if (!e || e.type !== 'todoRemoved') return

    const todoId = e.detail && e.detail.id
    const target = this.el.querySelector(`[data-todo-id="${todoId}"]`)

    if (target) target.remove()
  }

  onTodoToggled(e) {
    if (!e || e.type !== 'todoToggled') return

    const todoId = e.detail && e.detail.id
    const target = this.el.querySelector(`[data-todo-id="${todoId}"]`)

    if (!target) return

    const toggledItem = new TodoItem(e.detail)
    const rendered = toggledItem.render()

    target.parentNode.replaceChild(rendered, target)
  }

  delegateClick(e) {
    const target = e && e.target
    const eventAction = target.dataset.todoEventAction

    if (e.preventDefault) e.preventDefault()
    if (!target || !eventAction) return

    switch (eventAction) {
      case 'addTodo':
        this.store.add(this.todoInput.value)
        break
      case 'removeTodo':
        this.store.remove(target.dataset.todoRefId)
        break
      case 'toggleTodo':
        this.store.toggle(target.dataset.todoRefId)
        break
      default:
        throw new Error(
          '잘못된 액션입니다. data-todo-event-action을 제대로 정의하셨나요?'
        )
    }
  }
}
