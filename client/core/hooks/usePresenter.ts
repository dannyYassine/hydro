import { useEffect, useRef } from "react";
import { BasePresenter } from "../presenters/BasePresenter";

export function usePresenter(PresenterClass: typeof BasePresenter, vm = {}): BasePresenter {
  let ref = useRef(PresenterClass);

  if (ref.current === PresenterClass) {
    ref.current = new PresenterClass();
    ref.current.created();
  }

  const { current: presenter } = ref;

  presenter.onRender();

  useEffect(() => {
    presenter.bind(vm);
    presenter.mounted();
    return () => presenter.destroyed();
  }, []);

  return presenter;
}
