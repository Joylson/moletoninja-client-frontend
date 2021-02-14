export default class Util {
    static compare = (v1: string | number, v2: string | number) =>
        v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

    static createParams = (param: string, value: any, params: string) => {
        if (!value) return params;

        let include = '';
        if (params.length > 0) include += '&';
        else include += '?';

        return params += `${include}${param}=${value}`
    }

    public static isValidEmail(email: string): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
}