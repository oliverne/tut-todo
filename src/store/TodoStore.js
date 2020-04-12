export default class TodoStore extends EventTarget {
  constructor(storageAdapter) {
    super()
    this.storage = storageAdapter
    this.todos = []

    this.on('todosChanged', this.saveAll.bind(this))

    this.loadAll().then(() => {
      this.trigger('todosLoaded', {
        todos: this.todos
      })
    })
  }

  async loadAll() {
    this.todos = await this.storage.load()
  }

  async saveAll() {
    await this.storage.save(
      this.todos.sort((a, b) => b.createdAt - a.createdAt)
    )
  }

  add(title = '') {
    if (!title || title.trim().length < 1) return

    const item = {
      title,
      id: Math.random().toString(32).slice(2).toUpperCase(),
      createdAt: Date.now(),
      completed: false
    }

    this.todos.push(item)
    this.trigger('todoAdded', item)
  }

  remove(id = '') {
    if (!this.getById(id)) return

    this.todos = this.todos.filter((item) => item.id !== id)
    this.trigger('todoRemoved', { id })
  }

  toggle(id = '') {
    if (!this.getById(id)) return

    this.todos = this.todos.map((item) =>
      item.id === id
        ? {
            ...item,
            completed: !item.completed
          }
        : item
    )

    this.trigger('todoToggled', this.getById(id))
  }

  getById(id = '') {
    return this.todos.find((item) => item.id === id)
  }

  on(eventName, handler) {
    this.addEventListener(eventName, handler, false)
    return () => this.removeEventListener(eventName, handler)
  }

  trigger(eventName, payload) {
    if (!eventName) return

    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          ...payload
        }
      })
    )

    if (eventName !== 'todoChanged') {
      this.dispatchEvent(
        new CustomEvent('todosChanged', {
          detail: {
            todos: [...this.todos]
          }
        })
      )
    }
  }
}
