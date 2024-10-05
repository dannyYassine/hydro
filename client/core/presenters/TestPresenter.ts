import { TextView } from "@/app/(tabs)/test";
import { BasePresenter } from "./BasePresenter"

export class TestPresenter extends BasePresenter<TextView> {
    onButtonPressed(): void {
        const value = this.view!.count;
        this.view!.count = (value + 1);
        this.view!.hi();
    }
}