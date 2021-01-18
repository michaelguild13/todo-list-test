1. move `const todoApp = new app('lists', 'To Do List')` after app class (bottom of file)

2. change from arrow function to function scope. arrow functions are enclosing scope as for functions are lexical
~~~
get: function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('data', this.data)
      resolve(this.data) // DO NOT DO resolve(api.data)
    }, 500)
  })
},
~~~
3. in `class app` call `this.render()` in the promise for `api.get()`
~~~
class app {
  constructor(el, title) {
    api.get().then( res => {
      this.data = res
      this.render()
    })
~~~
4. set `listItems = ''`. It's undefined because initially `listItems` is declared but not set.
5. use the event value to push the new item to the `api.data`
~~~
// Add Todo
set: function() {
  let item = {'isActive' : true, 'content' : event.target.value }
  this.data.push(item)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('data', this.data)
      resolve(this.data)
    }, 100)
  })
},
~~~
6. Create a new Api end point called `api.toggle` and call that inside of `app.toggle()` with a rerender.
~~~
// api.toggle
toggle: function() {
  this.data.map( i => {
    if( i.content === event.target.innerText ) {
      i.isActive = (!i.isActive)
    }
  })

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('data', this.data)
      resolve(this.data)
    }, 100)
  })
},
~~~
~~~
// app.toggle
toggleState () {
  api.toggle().then( res => {
    this.data = res
    this.render()
  })
}
~~~
7. Update `api.search` to use a filter and return the results
~~~
search: (k, val) => new Promise((resolve, reject) => {
  setTimeout(() => {
    let filter = api.data.filter((v) => v[k].indexOf(val) > -1 )
    resolve(filter)
  }, 100)
})
~~~
8. Update `api.search` to check if value is a string or boolean
~~~
search: (k, val) => new Promise((resolve, reject) => {
  setTimeout(() => {
    let filter
    if ( typeof val === 'string') {
      filter = api.data.filter((v) => v[k].indexOf(val) > -1 )
    } else {
      filter = api.data.filter((v) => v[k] === val )
    }
    resolve(filter)
  }, 100)
})
~~~
