import EventBus from "../services/EventBus";
import { BaseView } from "../views/BaseView";
import { ProxyView } from "../views/ProxyView";

export class BasePresenter<V> {
    view!: typeof Proxy & BaseView<V> & V;
  
    constructor(vm: object) {
        this.view = ProxyView.fromView(new BaseView(vm));
    }

    events(): object {
        return {};
    }
  
    // bind(vm: object) {
    //   this.view = ProxyView.fromView(new BaseView(vm));
    // }
  
    created() {
        const events = this.events();
        Object.keys(events).forEach((key) => {
            EventBus.on(key, events[key].bind(this));
        });
    //   console.log("created", this);
    }
  
    onRender() {
    //   console.log("render", this);
    }
  
    mounted() {
    //   console.log("mounted", this);
    }
  
    destroyed() {
        const events = this.events();
        Object.keys(events).forEach((key) => {
            EventBus.off(key, events[key].bind(this));
        });

      this.view?.destroy();
      this.view = undefined;
    }
  }