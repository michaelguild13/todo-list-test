/*
RULES
- Do TODO's in Alpha order, starting with TODO:A
- Do not modify api timeout's, they simulate the server lag
*/

const api = {
  data : [{ "isActive": true,"content": "take out the trash"},
            {"isActive": false,"content": "feed the kid"},
            {"isActive": true,"content": "doctors apointment"}],

  // TODO: fix the resolve & explain why this.data is undefined
  // Get All Todo's
  get: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('data', this.data)
      resolve(this.data) // DO NOT DO resolve(api.data)
    }, 500)
  }),

  // Add Todo
  set: (i) => new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('data', api.data)
      resolve(api.data)
    }, 100)
  }),

  // Search Todos
  // k = key, val = value of the key
  // ex: search('content', 'feed') returns only todo's that have contain 'feed'
  search: (k, val) => new Promise((resolve, reject) => {
    api.data.map((v,i,a)=>{
      if (v[k].indexOf(val) === -1){
        api.data.splice(0,i)
      }
    })
    setTimeout(() => {
      console.log('data', api.data)
      resolve(api.data)
    }, 100)
  })
}

// Init the app
const todoApp = new app('lists', 'To Do List')

class app {

  constructor(el, title) {
    api.get().then( res => this.data = res)
    // set properties
    this.el = document.getElementById(el)
    this.title = title
    this.render()
  }

  // Create List
  render () {
    // TODO: Fix runtime error "length is undefined"
    // TODO: Fix the undefined in the dom list
    let count = this.data.length,
        listItems
    // create list
    while (count--){
      listItems += `<a class="panel-block ${( this.data[count].isActive ? '' : 'is-active' )}" onClick="todoApp.toggleState()">
                      <span class="panel-icon">
                        <i class="fa fa-check"></i>
                      </span>
                      ${this.data[count].content}
                    </a>`
    }
    const list = `<div class="panel bg-w">
                    <p class="panel-heading">
                     ${this.title}
                    </p>
                    <p class="control has-icons-left">
                      <!-- inline js is bad practice but this is for testing purposes -->
                      <input class="input is-small" type="text" placeholder="Add" onkeydown="javascript: if(event.keyCode == 13){ todoApp.add(this.value); this.value='';}">
                      <span class="icon is-small is-left">
                        <i class="fa fa-plus"></i>
                      </span>
                    </p>
                    ${listItems}
                  </div>`

    this.el.innerHTML = list
  }

  // TODO: Update the server with the new item
  // Add Todo
  add (i) {
    api.set(i).then( res => {
      this.data = res
      this.render()
    })
  }

  // TODO: Toggle the State of the item
  // Toggle Todo State
  toggleState (i) {

  }

  // TODO: Fix Mutation on searches
  // TODO: Fix for boolean values ex: api.search('isactive', true) should work
  // TODO: create debounce so user can only filter once every 3 seconds
  // Filter
  filter (key, val) {
    if (key) {
      api.search(key, val).then( res => {
        this.data = res
        this.render()
      })
    } else {
      api.get().then( res => {
        this.data = res
        this.render()
      })
    }
  }
}
