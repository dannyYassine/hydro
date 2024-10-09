import { TextView } from "@/app/(tabs)/test";
import { BasePresenter } from "./BasePresenter"
import { ViewModel } from "../viewmodels/ViewModel";
import { TestViewModel } from "../viewmodels/TestViewModel";

export class TestPresenter extends BasePresenter<TextView> {
    name: string = 'hello';
    user: {name: string, email: string} = {name: 'Danny', email: ''};

    mounted() {
        this.view!.set('name', this.user.name);
    }

    onNameChange(text: string): void {
        this.user.name = text;

        if (this.user.name.length < 10) {
            this.view!.set('name', this.user.name);
        }
    }

    onEmailChange(text: string): void {
        this.user.email = text;

        if (this.user.email.length < 15) {
            this.view!.set('email', this.user.email);
        }
    }

    onButtonPressed(): void {
        const value = this.view!.count;

        this.view!.count = (value + 1);

        if (this.view?.count > 4) {
            this.view?.showMessage(this.name);
        }
    }
}