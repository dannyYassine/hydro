import { BasePresenter } from "../presenters/BasePresenter.js";

export class BaseView<T> {
  vm;

  constructor(vm: BasePresenter) {
    this.vm = vm;
  }

  update(key: string, value: unknown) {
    this.vm.data.set(key, value);
  }

  get data(): T {
    return this.vm.data;
  }

  get(key: string): unknown {
    this.vm.data.get(key);
  }

  get methods() {
    return this.vm.methods;
  }

  destroy() {
    this.vm = undefined;
  }
}


