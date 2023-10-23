export class InMemoryValue<T> {
  constructor(private value?: T) {}

  set(value: T) {
    this.value = value;
  }

  get() {
    return this.value;
  }

  delete() {
    this.value = undefined;
  }
}
