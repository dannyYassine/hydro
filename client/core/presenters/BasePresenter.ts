import { BaseView } from "../views/BaseView";
import { ProxyView } from "../views/ProxyView";

export class BasePresenter<V> {
    view!: typeof Proxy & BaseView<V> & V;
  
    constructor(vm: object) {
        this.view = ProxyView.fromView(new BaseView(vm));
    }
  
    // bind(vm: object) {
    //   this.view = ProxyView.fromView(new BaseView(vm));
    // }
  
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