export const getStateAsObj = <Type>(key: string) => {
    return (JSON.parse(window.localStorage.getItem(key) as string) as Type);
}

export const setStateInLocalStrage = <Type>(localStorage_key: string, obj_key: string, value: any) => {
    const obj = getStateAsObj(localStorage_key) as Object;
    const new_obj = {
        ...obj,
        [obj_key]: value,
    } as Type
    window.localStorage.setItem(localStorage_key, JSON.stringify(new_obj));
    return new_obj;
}