import 'vue'
// import 'element-ui'
import './c-react'
import './d'
import './a.css'
import(/* webpackChunkName: "a-async" */'./a-async')
import(/* webpackChunkName: "b-async" */'./b-async')
import(/* webpackChunkName: "c-async" */'./e.async')

function add(a, b) {
  requireFun('a')
  return a + b;
}
add(1, 2)
console.log(a)
console.log(A)

