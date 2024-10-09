import { BaseView } from "./BaseView";

export class ProxyView {
    public static fromView<V>(view: BaseView<V>): typeof Proxy
    {
        return new Proxy(view, {
            set(target: BaseView<V>, p: string, newValue: unknown): boolean {
                if (target.vm.has(p)) {
                    target.vm.set(p as string, newValue);
                }
                
                return true;
              },
              get(target, p) {
                if (target.vm.has(p)) {
                    return target.vm.get(p);
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
}