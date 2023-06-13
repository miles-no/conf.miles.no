import {initModal, pending} from "./newConferenceStores.js";
import type {IToastContextProps} from "../../toast/toast-context";

import type {ToastType} from "svelte-toasts/types/common";
import {makeid} from "../../../utils/conference-utils";


const alertAndKeepModal = (message:string, error:string|Error, submitData:any, toastContext:IToastContextProps) => {
    toastContext.createToastBody(
        'error',
        'Something went wrong! ❌',
        message);
    console.log("Error when trying to create a new conference:");
    console.error(error);
    console.log("Submitted conference data:", submitData);
    pending.set(false);
    toastContext.setDuration(-1);
    toastContext.showToast();
}

export type ToastDataType = {
    type:ToastType,
    title:string,
    description:string,
    duration?:number
};

export const submitAndHandleModal = async (submitData:BodyInit|null|undefined, toastContext:IToastContextProps) => {
    pending.set(true);

    try {
        const response = await fetch('/api/create-ext-conference', {
            method: 'POST',
            body: submitData
        });

        const result = await response.json();

        if (result?.ok) {
            const toast:ToastDataType = {
                type:"success",
                title:"",
                description:""
            };

            if (!(result?.warnings) || !result.warnings.length) {
                toast.title="Success! ✅";
                toast.description="The conference was created.";

            } else {
                toast.duration = 10000 + 7000 * result.warnings.length;
                toast.type='warning';
                toast.title='Created with warning(s) 🤔';
                toast.description=`The conference was created, but with ${result.warnings.length} warning message(s). Better take a second look at things:   '${result.warnings.join("',   '")}'`;

                console.log(`The conference was created, but with ${result.warnings.length} warning message(s):`);
                result.warnings.forEach( (warning:string) => console.warn(`    - ${warning}`));
                console.log("Submitted conference data:", submitData);
            }
            initModal();

            // Store warning in sessionStorage for picking it back up after navigating to the created item:
            if (typeof sessionStorage !== "undefined") {
                const sessionStorageKey = `new-conference-toast-` + result.slug;
                sessionStorage.setItem(sessionStorageKey, JSON.stringify(toast));
            };

            window.location.href = `/konferanser/ekstern/${result.slug}`;

        } else {
            alertAndKeepModal(result.statusText, result.statusText, submitData, toastContext);
        }

    } catch (e:any) {
        alertAndKeepModal("See the console log for details.", e, submitData, toastContext);
    }
}

