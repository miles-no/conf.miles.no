import {initStore, pending} from "./stores/stores.js";
import type {IToastContextProps} from "../../toast/toast-context";
import { goto } from '$app/navigation';
import type {ToastType} from "svelte-toasts/types/common";
import type {IDescription} from "../../../model/event";
import type {NewPerformance} from "./stores/performancesStore";

const CREATE_CONF_API_URL = '/api/create-conference';
const EDIT_CONF_API_URL = '/api/conference';

const redirectAfterSuccessfulSubmit = (slug: string) => {
    goto(`/konferanser/${slug}`);
}

const alertAndKeepModal = (message:string, error:string|Error, submitData:ISubmitData, toastContext:IToastContextProps) => {
    toastContext.createToastBody(
        'error',
        'Something went wrong',
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

export interface ISubmitData {
    slug?: string,
    title: string,
    url: string,
    startDate: string,
    endDate: string,
    callForPapersDate?: string,
    categoryTag: string[],
    description?: IDescription[],
    location?: string,
    image?: string,
	performances?: NewPerformance[]
}

export const submitNewConferenceAndHandleModal = async (submitData:ISubmitData, toastContext:IToastContextProps) => {
    pending.set(true);

    try {
        const response = await fetch(CREATE_CONF_API_URL, {
            method: 'POST',
            body: JSON.stringify(submitData)
        });

        const result = await response.json();

        if (result?.ok) {
            const toast:ToastDataType = {
                type:"success",
                title:"",
                description:""
            };

            if (!(result?.warnings) || !result.warnings.length) {
                toast.title="Success";
                toast.description="The conference was created.";

            } else {
                toast.duration = 10000 + 7000 * result.warnings.length;
                toast.type='warning';
                toast.title='Created with warning(s)';
                toast.description=`The conference was created, but with ${result.warnings.length} warning message(s):   '${result.warnings.join("',   '")}'`;

                console.log(`The conference was created, but with ${result.warnings.length} warning message(s):`);
                result.warnings.forEach( (warning:string) => console.warn(`    - ${warning}`));
                console.log("Submitted conference data:", submitData);
            }
            initStore();

            // Store warning in sessionStorage for picking it back up after navigating to the created item:
            if (typeof sessionStorage !== "undefined") {
                const sessionStorageKey = `new-conference-toast-` + result.slug;
                sessionStorage.setItem(sessionStorageKey, JSON.stringify(toast));
            };

            redirectAfterSuccessfulSubmit(result.slug);

        } else {
            alertAndKeepModal(result.statusText, result.statusText, submitData, toastContext);
        }

    } catch (e:any) {
        alertAndKeepModal("See the console log for details.", e, submitData, toastContext);
    }
}


export const submitEditedConferenceAndHandleModal = async (submitData:ISubmitData, toastContext:IToastContextProps) => {
    pending.set(true);

    try {
        const response = await fetch(EDIT_CONF_API_URL, {
            method: 'PUT',
            body: JSON.stringify(submitData)
        });

        const result = await response.json();

        if (result?.ok) {
            const toast:ToastDataType = {
                type:"success",
                title:"",
                description:""
            };

            if (!(result?.warnings) || !result.warnings.length) {
                toast.title="Success";
                toast.description="The conference was updated.";

            } else {
                toast.duration = 10000 + 7000 * result.warnings.length;
                toast.type='warning';
                toast.title='Created with warning(s)';
                toast.description=`The conference was updated, but with ${result.warnings.length} warning message(s):   '${result.warnings.join("',   '")}'`;

                console.log(`The conference was created, but with ${result.warnings.length} warning message(s):`);
                result.warnings.forEach( (warning:string) => console.warn(`    - ${warning}`));
                console.log("Submitted conference data:", submitData);
            }
            initStore();

            // Store warning in sessionStorage for picking it back up after navigating to the created item:
            if (typeof sessionStorage !== "undefined") {
                const sessionStorageKey = `new-conference-toast-` + result.slug;
                sessionStorage.setItem(sessionStorageKey, JSON.stringify(toast));
            };

            redirectAfterSuccessfulSubmit(result.slug);

        } else {
            alertAndKeepModal(result.statusText, result.statusText, submitData, toastContext);
        }

    } catch (e:any) {
        alertAndKeepModal("See the console log for details.", e, submitData, toastContext);
    }
}
