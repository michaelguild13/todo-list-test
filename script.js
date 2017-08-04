let lists = document.getElementById('lists')


class TodoItem {
  constructor ( content ) {
    this.item = this.createItem(content)
    this.item
      .getElementsByClassName('fa-check')[0]
      .addEventListener( 'click' , e => {
        this.toggleActiveState()
      })
    return this.item
  }
  // Create dom El
  createItem ( content ) {
    let container =  document.createElement('a')
    container.id = this.id = Math.random()
    container.className = 'panel-block'
    container.innerHTML = `<span class="panel-icon">
                      <i class="fa fa fa-check" aria-hidden="true"></i>
                    </span>
                    <span class="has-text-grey">${content}</span>`
    return container
  }
  // Toggle if it's completed or not
  toggleActiveState () {
    this.item.className = this.item.className.indexOf('is-active') > -1 ? 'panel-block' : 'panel-block is-active'
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
    let container =  document.createElement('div')
    container.className = 'container has-text-centered'
    container.innerHTML = `<nav class="panel" style="background-color: #fff">
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
    return container
  }
  // Add a Todo
  add (i) {
    console.log('add')
    this.listItems.prepend(i)
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
