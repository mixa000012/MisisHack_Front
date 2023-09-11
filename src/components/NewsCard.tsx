export function toValidTransitionName(name: string): string {
    name = name.toLowerCase();
    const russian_letters = [
        "а",
        "б",
        "в",
        "г",
        "д",
        "е",
        "ё",
        "ж",
        "з",
        "и",
        "й",
        "к",
        "л",
        "м",
        "н",
        "о",
        "п",
        "р",
        "с",
        "т",
        "у",
        "ф",
        "х",
        "ц",
        "ч",
        "ш",
        "щ",
        "ь",
        "ъ",
        "э",
        "ю",
        "я",
        ' '
    ];
    const english_trans = [
        "a",
        "b",
        "v",
        "g",
        "d",
        "ye",
        "yo",
        "zh",
        "z",
        "i",
        "yu",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "r",
        "s",
        "t",
        "u",
        "f",
        "h",
        "z",
        "ch",
        "ha",
        "hya",
        "yoy",
        "yay",
        "ye",
        "yu",
        "ya",
        '_'
    ];
    for (let i = 0; i < russian_letters.length; i++) {
        name = name.replaceAll(russian_letters[i], english_trans[i]);
    }
    return name;
}
export default function NewsCard(props: {
    title: string;
    release_date: Date;
    image: string;
    id: number;
}) {
    const { title, release_date, image, id } = props;
    const day = release_date.getDate().toString().padStart(2, "0");
    const month = release_date.getMonth().toString().padStart(2, "0");
    const transition_title = toValidTransitionName(title);

    return <article class="flex flex-col bg-sbackground rounded-[30px] p-5 h-fit">
        <div class="flex flex-row gap-x-3">
            <img
                src={image}
                alt="News Logo"
                class="rounded-[30px] shrink w-[calc(100%-77px)]"
                style={{"view-transition-name": transition_title + 'i'}}
                // transition: name={transition_title + 'i'}
            />
            <time
                datetime={release_date.toUTCString()}
                class="text-text_main2 bg-[#80E1CA] px-5 py-3 w-fit h-fit rounded-full"
            >{day}.{month}</time>
        </div>
        <div class="flex flex-row mt-[15px] ml-0 place-items-center">
            <h3
                class="text-2xl font-medium grow text-text_main"
                style={{"view-transition-name": transition_title}}
                // transition: name={transition_title}
                
            >
                {title}
            </h3>
            <button
                class="rounded-full outline outline-2 outline-[#FFF] w-fit h-fit ml-4"
            ><img src="/arrow_down.svg" alt="Arrow Down" /></button>
        </div>
    </article>;
}