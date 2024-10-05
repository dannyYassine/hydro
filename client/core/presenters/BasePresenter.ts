import { BaseView } from "../views/BaseView";

export class BasePresenter {
    view?: BaseView;
  
    constructor() {}
  
    bind(vm: object) {
      this.view = new BaseView(vm);
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