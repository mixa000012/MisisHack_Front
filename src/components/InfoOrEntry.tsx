import { createEffect, createSignal, type JSX, onMount, Show } from "solid-js";
import { OpenAPI, UserService } from "../openapi";
import LoginInfo from "../stuff/LoginInfo";

export enum State {
    Info, Login, Register
}

export default function InfoOrEntry(props: {
    state: State,
    children: JSX.Element
}) {
    OpenAPI.BASE = "https://api.lapki.vladexa.ru:8080"
    let entry: HTMLFormElement;
    const [state, setState] = createSignal(props.state);

    onMount(() => {
        window.addEventListener('login', () => { setState(State.Login) })
        window.addEventListener('register', () => { setState(State.Register) })
    });


    const slideInAnimation = [
        {
            opacity: 0
        },
        {
            opacity: 1
        }
    ];

    const slideOutAnimation = [
        {
            opacity: 1
        },
        {
            opacity: 0
        }
    ];

    const timings: KeyframeAnimationOptions = {
        duration: 150,
        iterations: 1,
    };

    createEffect(() => {
        if ((state() === State.Login || state() === State.Register) && entry) {
            entry.animate(slideInAnimation, timings);
        }
    })
    const flowOut = (form: HTMLElement) => {
        form.animate(slideOutAnimation, timings).onfinish = () => {
            setState(State.Info);
            window.dispatchEvent(event);
        }
    };
    const event = new Event("infoshow");
    // document.getElementById('fuck')?.animate(slideOutAnimation)
    return (
        <Show when={(state() === State.Login || state() === State.Register) && !LoginInfo.loadFromLocal()} fallback={props.children}>
            <form ref={(form) => {
                entry = form;
                window.addEventListener('info', () => flowOut(form));
                // window.addEventListener('login', () => {flowOut(form)});
                // window.addEventListener('register', () => {flowOut(form)});
            }} onSubmit={async (event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const data = new FormData(form);
                const username = data.get("email") as string | null;
                const password = data.get("password") as string | null;
                if (!(username && password)) { console.assert(username && password); return; }
                if (state() === State.Register) {
                    await UserService.createUserApiV1UserUsersPost({ email: username, password });
                }
                const tdata = await UserService.loginForTokenApiV1UserTokenPost({ password, username });
                const token = tdata.access_token;
                const user = new LoginInfo(username, password, token);
                user.writeToStorage();
                location.reload();
            }} class="flex flex-col col-span-2 justify-center align-middle bg-sbackground w-[61%] m-auto rounded-[30px] py-6 px-28 mt-12">
                <h2 class="font-medium text-2xl text-center">{state() === State.Login ? "Войти" : "Регистрация"}</h2>
                <div class="flex flex-col mt-8 gap-y-6">
                    <label class="text-xl">
                        Электронная почта<br />
                        <span class="text-text_description text-lg">Необходимо указать мисисовскую почту (edu.misis.ru)</span>
                        <input name="email" required type="email" class="border-2 rounded-full px-5 py-2 w-full bg-sbackground" placeholder="mXXXXXX@edu.misis.ru"></input>
                    </label>
                    <label class="text-xl">
                        Пароль
                        <input name="password" required class="border-2 rounded-full px-5 py-2 w-full bg-sbackground mt-2" type="password"></input>
                    </label>
                </div>
                <button type="submit" class="px-[68px] w-fit place-self-center mt-9 mb-[18px] text-center items-start gap-1 hover:text-text_main active:text-text_main hover:bg-gradient-to-r hover:from-[#A470E5] hover:via-[#6A96ED] hover:to-[#80E1CA] active:bg-bpress rounded-full active:bg-none bg-binactive text-text_main2 text-2xl font-medium py-[10px]">Войти</button>
            </form>
        </Show>);
}
