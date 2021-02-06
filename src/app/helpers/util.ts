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
}