import { Observable } from "../hooks/store.js";
import { BasePresenter } from "../presenters/BasePresenter.js";

export class BaseView<T> {
  vm;

  constructor(vm: { data: Observable<T> }) {
    this.vm = vm;
  }

  update(key: string, value: unknown) {
    this.vm.data.set(key, value);
  }

  get data(): T {
    return this.vm.data;
  }

  get methods() {
    return this.vm.methods;
  }

  destroy() {
    this.vm = undefined;
  }
}


