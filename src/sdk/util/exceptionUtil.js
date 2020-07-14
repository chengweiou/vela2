export default class {
  static createRest(status, message) {
    switch (status) {
      default: return { code: '-1', message: status + ': ' + message }
    }
  }
}
