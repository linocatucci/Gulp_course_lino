class Person {
  constructor(name) {
    this.name = name;
  }
  hello() {
    if (typeof this.name === 'string') {
      return 'Hello, my name is ' + this.name + '!';
    } else {
      return 'Hello!';
    }
  }
}

var person = new Person('Andrew');

//var name = 'Lino';
var greetHTML = templates['greeting']({
  message: person.hello()
});
// document.write('Hello ' + name + '!');
// document.write(person.hello());
document.write(greetHTML);
