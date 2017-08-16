const api = {
  data : [{ "isActive": true,"content": "take out the trash"},
            {"isActive": false,"content": "feed the kid"},
            {"isActive": true,"content": "doctors apointment"}],

  get: function() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('data', this.data)
        resolve(this.data) // DO NOT DO resolve(api.data)
      }, 500)
    })
  },

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

  // Search Todos
  // k = key, val = value of the key
  // ex: search('content', 'feed') returns only todo's that have contain 'feed'
  search: function (k, val) {
    return new Promise((resolve, reject) => {
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
  }
}

class app {
  constructor(el, title) {
    api.get().then( res => {
      this.data = res
      this.render()
    })
    // set properties
    this.el = document.getElementById(el)
    this.title = title
  }

  // Create List
  render () {
    let count = this.data.length,
        listItems = ''
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

  // Add Todo
  add () {
    api.set().then( res => {
      this.data = res
      this.render()
    })
  }

  // Toggle Todo State
  toggleState () {
    api.toggle().then( res => {
      this.data = res
      this.render()
    })
  }

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

// Init the app
const todoApp = new app('lists', 'To Do List')
