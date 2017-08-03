let lists = document.getElementById('lists')


class TodoItem {
  constructor ( content ) {
    this.item = this.createItem(content)
  }
  createItem ( content ) {
    let div =  document.createElement('div')
    div.id = this.id = Math.random()
    div.className = 'panel-block'
    div.innerHTML = `${content}`
    return div
  }
}

class TodoList {
  constructor(title) {
    this.list = this.createList(title)
    this.listItems = this.list.getElementsByClassName('todo-list')[0]
    // add event listener for adding new items
    this.list
      .getElementsByClassName('input')[0]
      .addEventListener( 'keyup' , e =>{
        if (e.keyCode == 13 && e.target.value !== '') {
          this.add(new TodoItem(e.target.value))
          // clear input
          e.target.value = ''
        }
      })
    // insert into dom
    lists.prepend(this.list)
  }
  // Create List
  createList (title) {
    let div =  document.createElement('div')
    div.className = 'container has-text-centered'
    div.innerHTML = `<nav class="panel" style="background-color: #fff">
                      <p class="panel-heading">
                        ${title}
                      </p>
                      <div class="panel-block">
                        <p class="control has-icons-left">
                          <input class="input is-small" type="text" placeholder="Add a todo">
                          <span class="icon is-small is-left">
                            <i class="fa fa-add"></i>
                          </span>
                        </p>
                      </div>
                      <div class="todo-list">
                      </div>
                    </nav>`
    return div
  }
  // Add a Todo
  add (i) {
    console.log('add')
    this.listItems.prepend(i.item)
  }
  // Remove a Todo
  remove () {
    console.log('remove')
  }
  // Toggle done state of Todo
  toggleActive () {
    console.log('toggle')
  }
}


const myList = new TodoList('todo list');
