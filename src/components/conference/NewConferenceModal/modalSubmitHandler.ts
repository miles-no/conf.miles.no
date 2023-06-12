import {initModal, pending} from "./newConferenceStores.js";
import type {IToastContextProps} from "../../toast/toast-context";


const alertAndKeepModal = (message:string, error:string|Error, submitData:any, toastContext:IToastContextProps) => {
    toastContext.createToastBody(
        'error',
        '❌ Something went wrong!',
        message);
    console.log("Error when trying to create a new conference:");
    console.error(error);
    console.log("Submitted conference data:", submitData);
    pending.set(false);
    toastContext.setDuration(-1);
    toastContext.showToast();
}

export const submitAndHandleModal = async (submitData:BodyInit|null|undefined, toastContext:IToastContextProps) => {
    pending.set(true);

    try {
        const response = await fetch('/api/create-ext-conference', {
            method: 'POST',
            body: submitData
        });

        const result = await response.json();

        if (result?.ok) {
            if (!(result?.warnings) || !result.warnings.length) {
                toastContext.setDuration(5000);
                toastContext.createToastBody('success', "✅ Success!", "The conference was created.");

            } else {
                toastContext.createToastBody(
                    'warning',
                    '🤔 Created with warning(s)',
                `The conference was created, but with ${result.warnings.length} warning message(s). Better take a second look at things:\n\n- ` + result.warnings.join("\n- "));
                console.log(`The conference was created, but with ${result.warnings.length} warning message(s):`);
                result.warnings.forEach( (warning:string) => console.warn(`    - ${warning}`));
                console.log("Submitted conference data:", submitData);
                toastContext.setDuration(-1);
            }
            toastContext.showToast();
            initModal();

        } else {
            alertAndKeepModal(result.statusText, result.statusText, submitData, toastContext);
        }

    } catch (e:any) {
        alertAndKeepModal("See the console log for details.", e, submitData, toastContext);
    }
}

