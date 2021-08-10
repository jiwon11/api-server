import { Container } from 'typedi';

class ExampleClass {
  print() {
    console.log('I am alive!');
  }
}

/** Request an instance of ExampleClass from TypeDI. */
const classInstance = Container.get(ExampleClass);

/** We received an instance of ExampleClass and ready to work with it. */
classInstance.print();
