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

var person = new Person('Lino');

//var name = 'Lino';

// document.write('Hello ' + name + '!');
document.write(person.hello());
