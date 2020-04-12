import TodoStore from './store/TodoStore.js'
import TodoApp from './components/TodoApp.js'
import LocalStorageAdapter from './store/LocalStorageAdapter.js'

document.addEventListener('DOMContentLoaded', () => {
  const storageAdapter = new LocalStorageAdapter('tutTodo')

  const app = new TodoApp({
    el: document.querySelector('.todo-app'),
    store: new TodoStore(storageAdapter)
  })

  app.run()
})
