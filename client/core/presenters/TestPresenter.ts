import { TextView } from "@/app/(tabs)/test";
import { BasePresenter } from "./BasePresenter"

export class TestPresenter extends BasePresenter<TextView> {
    onButtonPressed(): void {
        const value = this.view!.data.count;
        this.view!.data.count = (value + 1);
    }
}