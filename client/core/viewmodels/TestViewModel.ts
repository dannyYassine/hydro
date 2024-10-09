import { ViewModel } from "./ViewModel";

export class TestViewModel extends ViewModel {
    constructor(readonly name: string) {
        super();
    }
}