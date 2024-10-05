import { BasePresenter } from "./BasePresenter"

export class TestPresenter extends BasePresenter {
    onButtonPressed(): void {
        const value = this.view!.data.count;
        this.view!.data.count = (value + 1);
    }
}