import { TextView } from "@/app/(tabs)/test";
import { BasePresenter } from "./BasePresenter"

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
    }
}