import {initModal, pending} from "./newConferenceStores.js";

const alertAndKeepModal = (message:string, error:string|Error, submitData:any) => {
    alert(`❌ Something went wrong!\n\n${message}`);
    console.log("Error when trying to create a new conference:");
    console.error(error);
    console.log("Submitted conference data:", submitData);
    pending.set(false);
}

export const submitAndHandleModal = async (submitData:BodyInit|null|undefined) => {
    pending.set(true);

    try {
        const response = await fetch('/api/create-ext-conference', {
            method: 'POST',
            body: submitData
        });

        const result = await response.json();


        if (result?.ok) {
            if (!(result?.warnings) || !result.warnings.length) {
                alert("✅ Success! The conference was created.");

            } else {
                alert(`🤔 The conference was created, but with ${result.warnings.length} warning message(s). Better take a second look at things:\n\n- ` + result.warnings.join("\n- "));
                console.log(`The conference was created, but with ${result.warnings.length} warning message(s):`);
                result.warnings.forEach( (warning:string) => console.warn(`    - ${warning}`));
                console.log("Submitted conference data:", submitData);
            }
            initModal();

        } else {
            alertAndKeepModal(result.statusText, result.statusText, submitData);
        }

    } catch (e:any) {
        alertAndKeepModal("See the console log for details.", e, submitData);
    }
}
