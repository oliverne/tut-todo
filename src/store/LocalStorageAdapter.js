export default class LocalStorageAdapter {
  constructor(storageKey = 'tutDodo') {
    this.storageKey = storageKey
    this.storage = window.localStorage
  }

  async load() {
    try {
      const data = JSON.parse(this.storage.getItem(this.storageKey))
      return data || []
    } catch (err) {
      console.log(err)
      return []
    }
  }

  async save(data = []) {
    try {
      const payload = JSON.stringify(data)
      this.storage.setItem(this.storageKey, payload)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
