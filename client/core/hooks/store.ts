import { useEffect, useRef, useState } from "react";

export function useSelector<T>(selector: (state) => T, store?: unknown): T {
  let [value, setValue] = useState(selector(state));

  useEffect(() => {
    const unregister = (store ?? state).on((newState) => {
      setValue(selector(newState));
    });

    return () => unregister();
  }, []);

  return value;
}

export function useSelectorKey<T>(key, selector, store?): T {
  let [value, setValue] = useState(selector(state));

  useEffect(() => {
    const unregister = (store ?? state).onKey(key, (newState) => {
      setValue(selector(newState));

      return () => unregister();
    });
  }, []);

  return value;
}

export function useStore(data = {}): Store {
  let ref = useRef(new Store(data));

  // if (!ref.current) {
  //   ref.current = new Store(data);
  // }
  const { current: store } = ref;

  return store;
}

export function useData(data = {}): State {
  let ref = useRef(new State(data));

  if (!ref.current) {
    ref.current = new State(data);
  }
  const { current: state } = ref;

  state.bind();

  return state;
}

export type Observable<T> = T;

export function useProxyData<T>(data = {}): Observable<T> {
  let ref = useRef(
    new Proxy(new State(data), {
      set(target: State, p: string, newValue: unknown): boolean {
        target.set(p as string, newValue);
        return true;
      },
      get(target, p) {
        if (target[p]) {
          return target[p];
        }

        return target.get(p);
      },
    })
  );

  ref.current.bind();

  return ref.current as T;
}

export class Store {
  l = [];
  keys = {};
  data;

  constructor(data = {}) {
    this.data = data;
  }

  set(key: string, value: unknown) {
    this.data[key] = value;
    this.emitKey(key);
    this.emit();
  }
  get<T>(key: string): T {
    return this.data[key] as T;
  }
  on(cb: () => void) {
    this.l.push(cb);

    return () => {
      this.l = this.l.filter((l) => l !== cb);
    };
  }
  onKey(key, cb: () => void) {
    if (!this.keys[key]) {
      this.keys[key] = [];
    }
    this.keys[key].push(cb);

    return () => {
      this.keys[key] = this.keys[key].filter((l) => l !== cb);
    };
  }
  emit() {
    this.l.forEach((cb) => cb(this.data));
  }
  emitKey(key) {
    if (!this.keys[key]) {
      return;
    }
    this.keys[key].forEach((cb) => cb(this.data));
  }
}

export class State extends Store {
  react = {};

  constructor(data = {}) {
    super(data);

    this.bind();
  }

  set(key: string, value: unknown) {
    super.set(key, value);
    this.react[key][1](value);
  }

  bind(): void {
    Object.keys(this.data).map((key) => {
      let [value, setValue] = useState(this.data[key]);
      this.react[key] = [value, setValue];
    });
  }

  get(key) {
    const value = this.react[key];
    if (value === undefined) {
      return undefined;
    }

    return value[0];
  }
}

export const state = new Store({ count: 0 });
