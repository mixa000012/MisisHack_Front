import type { JSX } from "solid-js/jsx-runtime";

export default function SolidButton(props: {children: JSX.Element} & JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button {...props} class={["w-fit place-self-center text-center items-start gap-1 hover:text-text_main active:text-text_main hover:bg-gradient-to-r hover:from-[#A470E5] hover:via-[#6A96ED] hover:to-[#80E1CA] active:bg-bpress rounded-full active:bg-none bg-binactive text-text_main2 text-2xl font-medium", props.class].join(' ')}>
        {props.children}
    </button>
} 