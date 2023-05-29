class Header {
    constructor(title) {
      this.title = title;
    }
  
    render() {
      return `<h1>${this.title}</h1>`;
    }
  }
  
  class TaskList {
    constructor(items) {
      this.items = items;
    }
  
    render() {
      const listItems = this.items.map((item) => `<li>${item}</li>`).join('');
      return `<ul>${listItems}</ul>`;
    }
  }
  
  class TaskListItem {
    constructor(text, priority) {
      this.text = text;
      this.priority = priority;
    }
  
    render() {
      const priorityClass = this.priority ? 'priority' : '';
      return `<li class="${priorityClass}">${this.text}</li>`;
    }
  }
  
  module.exports = { Header, TaskList, TaskListItem };
 