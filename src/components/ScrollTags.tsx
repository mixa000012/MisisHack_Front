import { createMemo, createSignal, For, lazy, type JSX, Show, createResource, onMount } from "solid-js"
import LoginInfo from "../stuff/LoginInfo";
import SolidButton from "./SolidButton.tsx"
import { OpenAPI, UserService } from "../openapi/index.ts";

function Tag(props: {
    selected: boolean;
    text: string;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button {...props}
        class={[
            "rounded-full px-5 fancy transition-colors",
            props.selected
                ? "selected bg-[#FFF] text-text_main2"
                : "bg-background outline outline-2 text-text_description outline-text_description",
        ].join(' ')}>{props.text}</button>;
}

export default function ScrollTags() {
    OpenAPI.BASE = "https://api.lapki.vladexa.ru:8080"

    const news_tags = [
        "Все новости",
        "Хакатоны",
        "Победы",
        "Митапы",
        "Лекции",
        "Собрания",
        "Проекты",
        "Курсы",
    ];
    const [news_selected, setNewsSel] = createSignal(0);
    const source_tags = [
        "Все источники",
        "МИСИС",
        "Хакатон–клуб",
        "DAMN",
        "CTF",
        "Геймдев",
        "Робототехника",
        "Спортпрога",
        "AI Knowledge Club",
    ];
    const [source_selected, setSourceSel] = createSignal(0);

    const [postButton, setPostButton] = createSignal<JSX.Element | undefined>(undefined);
    onMount(async () => {
        LoginInfo.loadFromLocal();
        const data = await UserService.getUserApiV1UserGet();
        const isAdmin = data.roles.includes("ROLE_PORTAL_SUPERADMIN") || data.roles.includes("ROLE_PORTAL_ADMIN");
        setPostButton(<Show when={isAdmin}><SolidButton class="text-2xl font-medium w-full py-[6px]" onclick={() => window.location.assign("/add_post")}>Добавить пост</SolidButton></Show>);
    })

    return (<div class="flex flex-col basis-3/12 gap-y-[50px]">
        {/* <!-- Тип новости --> */}
        <div class="flex flex-row flex-wrap gap-y-[18px] gap-x-[14px]">
            <For each={news_tags}>{(tag, eli) => {
                return <Tag text={tag} selected={eli() === news_selected()} onClick={() => { console.log("Babba"); setNewsSel(eli()) }} />;
            }}</For>
        </div>
        {/* <!-- Источник новости--> */}
        <div class="flex flex-row flex-wrap gap-y-[18px] gap-x-[14px]">
            <For each={source_tags}>{(tag, eli) => {
                return <Tag text={tag} selected={eli() === source_selected()} onClick={() => { setSourceSel(eli()) }} />
            }}</For>
        </div>
        {postButton()}
    </div>);
}