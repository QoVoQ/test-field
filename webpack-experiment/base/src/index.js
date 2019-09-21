import { A, B } from './a'
import './side-effect'
console.log('Hello, I am child')
A()
B()

function add(a, b) {
  requireFun('a')
  return a + b;
}
add(1, 2)
add(1, 2)
add(1, 2)
console.log(a)

function requireFun(name) {
  return require(`./${name}.png`)
}
