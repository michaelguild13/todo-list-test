/*
RULES
- Do TODO's in Alpha order, starting with TODO:A
- Do not modify api timeout's, they simulate the server lag
- Feel free to optimize the code however you see fit
*/

const api = {
  data : [{ "isActive": true,"content": "take out the trash"},
            {"isActive": false,"content": "feed the kid"},
            {"isActive": true,"content": "doctors apointment"}],

  // TODO:A: fix the resolve & explain why this.data is undefined
  get: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('data', this.data)
      resolve(this.data)
    }, 3000)
  }),

  set: (i) => new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('data', api.data)
      resolve(api.data)
    }, 3000)
  }),

  // TODO:C: Fix Mutation on searches
  // TODO:C: Fix for boolean values ex: api.search('isactive', true) should work
  // Search Todos
  // k = key, val = value of the key
  // ex search('content', 'feed') returns only todo's that have contain 'feed'
  search: (k, val) => new Promise((resolve, reject) => {
    api.data.map((v,i,a)=>{
      if (v[k].indexOf(val) === -1){
        api.data.splice(0,i)
      }
    })
    setTimeout(() => {
      console.log('data', api.data)
      resolve(api.data)
    }, 1000)
  })
}

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
    // TODO:B: Fix runtime error "length is undefined"
    // TODO:B: Fix the undefined in the dom list
    let count = this.data.length,
          listItems
    // create list
    while (count--){
      listItems += `<a class="panel-block ${( this.data[count].isActive ? '' : 'is-active' )}">
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
    // update dom
    this.el.innerHTML = list
  }
  // TODO:C: Update the server with the new item
  // Add a Todo
  add (i) {
    api.set(i).then( res => {
      this.data = res
      this.render()
    })
  }
  // TODO:D: Remove item
  // Remove a Todo
  remove (i) {
  }
  // TODO:E: Toggle the State of the item
  // Toggle Todo State
  toggleState (i) {

  }
  // TODO:F: create debounce so user can only filter once every 5 seconds
  // TODO:F: let user know the filter is processing/loading
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

const todoApp = new app('lists', 'To Do List')
