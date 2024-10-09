import { Observable } from "../hooks/store.js";

export class BaseView<T> {
  vm;

  constructor(vm: { data: Observable<T> }) {
    this.vm = vm;
  }

  set(key: string, value: unknown) {
    this.vm.set(key, value);
  }

  destroy() {
    this.vm = undefined;
  }
}


