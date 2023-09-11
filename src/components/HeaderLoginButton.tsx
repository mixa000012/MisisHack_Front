import { Show } from "solid-js";
import LoginInfo from "../stuff/LoginInfo";
import SolidButton from "./SolidButton";

export default function HeaderLoginButton() {
    const logged = LoginInfo.hasCache();
    const hideInfos = () => {
        const promises: Promise<undefined>[] = [];
        document.querySelectorAll(".infoh").forEach((infoh) => {
            promises.push(new Promise((res, rej) => {
                infoh.animate([{ opacity: 1 }, { opacity: 0 }], {
                    duration: 150,
                    iterations: 1,
                }).onfinish = () => res(undefined);
            }));
        });
        return Promise.all(promises);
    };
    const event = new Event('login');
    return <SolidButton class={["p-2", logged ? "" : "login"].join(' ')} onClick={() => {
        if (!logged) hideInfos().then(() => window.dispatchEvent(event));
    }}>
        <Show when={logged} fallback="Войти">
            <img src="/user.svg" />
        </Show>
    </SolidButton>
}