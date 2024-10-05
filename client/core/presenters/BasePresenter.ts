import { BaseView } from "../views/BaseView";

export class BasePresenter<V> {
    view?: BaseView<V> & V;
  
    constructor() {}
  
    bind(vm: object) {
      this.view = new Proxy(new BaseView(vm), {
        set(target: BaseView<V>, p: string, newValue: unknown): boolean {
            if (target.vm.data.has(p)) {
                target.vm.data.set(p as string, newValue);
            }
            
            return true;
          },
          get(target, p) {
            if (target.vm.data.has(p)) {
                return target.vm.data.get(p);
            }

            if (p in target.vm) {
                return target.vm[p];
            }

            if (p in target) {
                return target[p];
            }
    
            return undefined;
          }
      })
    }
  
    created() {
    //   console.log("created", this);
    }
  
    onRender() {
    //   console.log("render", this);
    }
  
    mounted() {
    //   console.log("mounted", this);
    }
  
    destroyed() {
      this.view?.destroy();
      this.view = undefined;
    }
  }