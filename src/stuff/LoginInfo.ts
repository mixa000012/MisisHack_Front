import { OpenAPI, UserService } from "../openapi";

export default class LoginInfo {
    // @ts-ignore: Set via setter
    #email: string;
    // @ts-ignore: Set via setter
    #password: string;

    #token: string;

    public constructor(
        email: string,
        password: string,
        token: string,
    ) {
        this.#email = email;
        this.#password = password;
        this.#token = token;
    }

    public static loadFromLocal(): LoginInfo | undefined {
        const email = window.localStorage.getItem("email");
        const password = window.localStorage.getItem("password");
        const token = window.localStorage.getItem("token");

        if (email && password && token) {
            OpenAPI.HEADERS = {
                "Authorization": `Bearer ${token}`
            }
            return new LoginInfo(email, password, token);
        } else {
            return undefined;
        }
    }

    public get email() {
        return this.#email;
    }

    public get password() {
        return this.#password;
    }

    public get token() {
        return this.#token;
    }

    public set email(email) {
        this.#email = email;
        window.localStorage.setItem("email", this.#email);
    }

    public set password(password) {
        this.#password = password;
        window.localStorage.setItem("password", this.#password)
    }

    public set token(token) {
        this.#token = token;

        OpenAPI.HEADERS = {
            "Authorization": `Bearer ${this.#token}`
        };

        window.localStorage.setItem("token", this.#token);
    }

    private toLoginData(): Parameters<typeof UserService.loginForTokenApiV1UserTokenPost>["0"] {
        const username = this.#email;
        const password = this.#password;

        return {
            username,
            password
        }
    }

    public writeToStorage() {
        window.localStorage.setItem("email", this.#email);
        window.localStorage.setItem("password", this.#password)
        window.localStorage.setItem("token", this.#token);
    }

    public static hasCache(): boolean {
        const email = window.localStorage.getItem("email");
        const password = window.localStorage.getItem("password");
        const token = window.localStorage.getItem("token");
        return !!(email && password && token);
    }
}