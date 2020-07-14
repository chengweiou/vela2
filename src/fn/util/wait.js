/**
 * 顺序执行延时语法糖，使用: await wait(100)
 */
export default (t) => {
  return new Promise(resolve => { setTimeout(() => { resolve() }, t) })
}
