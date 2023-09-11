import { createSignal, For, onMount, type JSX, createEffect, Show } from "solid-js"
import SolidButton from "./SolidButton";
import { toValidTransitionName } from "./NewsCard";
import { NewsService, OpenAPI, UserService } from "../openapi";
import LoginInfo from "../stuff/LoginInfo";

function Tag(props: { text: string } & JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button {...props} type="button" class={["rounded-full transition-colors text-[17px] px-5 border-2 border-text_description text-text_description hover:text-text_main hover:border-text_main active:bg-binactive active:text-text_main2 active:border-binactive", props.class].join(' ')}>{props.text}</button>
}

export default function PostAdder() {
    const news_tags = ["Хакатоны", "Победы", "Митапы", "Лекции", "Собрания", "Проекты", "Курсы"];
    const [selectedNews, setSelectedNews] = createSignal<number[]>([]);
    const source_tags = ["МИСИС", "Спортпрога", "Хакатон–клуб", "DAMN", "CTF", "Геймдев", "Робототехника", "AI Knowledge Club"];
    const [selectedSources, setSelectedSources] = createSignal<number[]>([]);
    const time = new Date();

    const [title, setTitle] = createSignal("Пример заголовка");

    const [imageB, setImageB] = createSignal<ImageBitmap | undefined>();
    const [gray, setGray] = createSignal<Promise<ImageBitmap> | undefined>();
    const [imageName, setImageName] = createSignal<string | undefined>();
    const [imageF, setImageF] = createSignal<File>();

    onMount(async () => {
        const blackPixel = document.createElement('img');
        blackPixel.src = "/grey.png";
        setGray(blackPixel.decode().then(() => createImageBitmap(blackPixel)));

        OpenAPI.BASE = "https://api.lapki.vladexa.ru:8080"
        const info = LoginInfo.loadFromLocal();

        if(!info) {
            window.history.back();
            return;
        }

        const data = await UserService.getUserApiV1UserGet();
        const isAdmin = data.roles.includes("ROLE_PORTAL_SUPERADMIN") || data.roles.includes("ROLE_PORTAL_ADMIN");

        if (!isAdmin) {
            window.history.back();
            return;
        }
    });
    return <div class="flex flex-row gap-[230px] px-[93px] mt-[42px]">
        <div class="w-[337px]">
            <h2 class="text-2xl font-medium text-text_main">Редактирование</h2>
            <form class="flex flex-col gap-5 text-text_main mt-5 text-xl" id="post_adder" onSubmit={async (ev) => {
                ev.preventDefault();

                const imageFed = imageF();
                if (!imageFed) {
                    return;
                }
                const form = ev.currentTarget;
                const formData = new FormData(form);

                const descr = formData.get('description') as string;
                const reader = new Promise<string>((res, rej) => {
                    const read = new FileReader();

                    read.onloadend = () => {
                        res(read.result as string);
                    }

                    read.onerror = _ => {
                        rej(read.error)
                    }

                        read.readAsBinaryString(imageFed);
                });

                const tags = selectedNews().map(i => news_tags[i]).concat(selectedSources().map(i => source_tags[i]))

                NewsService.createNewApiV1NewsNewsPost({
                    description: descr,
                    end_of_registration: time.toISOString(),
                    start_of_registration: time.toISOString(),
                    image: await reader,
                    // image: "",
                    news_tags: tags,
                    title: title()
                });
            }}>
                <label class="flex flex-col gap-2">
                    Заголовок
                    <input required type="text" class="items-center px-4 py-[7px] bg-sbackground rounded-full text-[17px] font-normal" value={title()} onChange={(ev) => setTitle(ev.currentTarget.value)} />
                </label>
                <label class="flex flex-col">
                    Загрузка обложки
                    <label for="file" class="px-12 py-[6px] mx-auto justify-center items-center rounded-full hover:bg-background hover:text-text_main outline hover:outline-text_main hover:outline-2 bg-binactive cursor-pointer text-text_main2 flex mt-[27px]">Загрузить</label>
                    <input required name="file" id="file" type="file" accept="image/*" class="opacity-0 w-0 h-0" onChange={async (ev) => {
                        const files = ev.currentTarget.files;
                        if (files && files[0]) {
                            const img: File = files[0];
                            setImageF(_ => img);
                            setImageName(img.name);
                            const bitmap = await createImageBitmap(img);
                            setImageB(bitmap);
                        }
                    }} />
                    <span class="text-[17px] font-normal text-text_description mx-auto">файлы .png, .jpeg</span>
                    <Show when={imageName()}>
                        <div class="flex flex-row gap-1 justify-center">
                            <img class="self-center w-5 h-5 rounded-full rotate-180 border-2 border-text_main" src="/arrow_down.svg"></img>
                            <span>{imageName()}</span>
                        </div>
                    </Show>
                </label>
                <label class="flex flex-col gap-2">
                    Описание
                    <textarea name="description" required class="p-4 rounded-[30px] bg-sbackground resize-none overflow-y-hidden text-[17px] font-normal h-28" />
                </label>
                <label>
                    Тэги
                    <div class="flex flex-row flex-wrap gap-[14px] mt-2">
                        <For each={news_tags}>{(el, idx) =>
                            <Tag text={el} class={selectedNews().includes(idx()) ? "bg-text_main border-text_main text-text_main2 hover:text-text_main2" : undefined} onClick={() => {
                                setSelectedNews(news => {
                                    if (news.includes(idx())) { return news.filter(id => id !== idx()) } else { news.push(idx()); }
                                    return [...news]
                                })
                            }} />}
                        </For>
                    </div>
                    <hr class="my-[15px] h-[2px] bg-text_description text-text_description"></hr>
                    <div class="flex flex-row flex-wrap gap-[14px]">
                        <For each={source_tags}>{(el, idx) =>
                            <Tag text={el} class={selectedSources().includes(idx()) ? "bg-text_main border-text_main text-text_main2 hover:text-text_main2" : undefined} onClick={() => {
                                setSelectedSources(news => {
                                    if (news.includes(idx())) { return news.filter(id => id !== idx()) } else { news.push(idx()); }
                                    return [...news]
                                })
                            }} />
                        }
                        </For>
                    </div>
                </label>
            </form>
        </div>
        <div class="text-text_main">
            <h2 class="text-2xl font-medium">Превью</h2>
            <div class="bg-sbackground px-[18px] py-5 rounded-[30px]">
                <div class="flex flex-row gap-x-3">
                    <canvas class="w-[228px] aspect-square bg-repeat rounded-[30px]" style={{ "view-transition-name": toValidTransitionName(title()) + 'i' }} ref={(image) => {
                        createEffect(() => {
                            const context = image.getContext("bitmaprenderer");
                            if (!imageB() && gray()) {
                                gray()!.then((loaded) => context?.transferFromImageBitmap(loaded));
                            }
                            context?.transferFromImageBitmap(imageB()!)
                        })
                    }}>
                    </canvas>
                    <time class="text-2xl font-normal rounded-full bg-[#80E1CA] h-fit text-text_main2 px-5 py-2" datetime={time.toUTCString()}>{time.getDate().toString().padStart(2, '0')}.{(time.getMonth() + 1).toString().padStart(2, '0')}</time>
                </div>
                <div class="flex flex-row gap-x-3 mt-[15px]">
                    <h3 class="text-2xl font-medium text-text_main" style={{ "view-transition-name": toValidTransitionName(title()) }}>{title()}</h3>
                    <button class="rounded-full border-2 border-text_main ml-auto"><img src="/arrow_down.svg"></img></button>
                </div>
            </div>
            <SolidButton class="flex flex-row px-5 mt-5 py-1" form="post_adder" type="submit">
                <span class="font-medium text-2xl">Опубликовать</span>
                <img src="/arrow-long.svg" class="self-center ml-[78px]"></img>
            </SolidButton>
        </div>
    </div>
}