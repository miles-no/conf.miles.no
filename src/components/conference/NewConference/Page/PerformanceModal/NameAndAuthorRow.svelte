<script lang="ts">
    import JustifiedRow from "../../../../form/JustifiedRow.svelte";
    import TextField from "../../../../form/TextField.svelte";

    import {authorName, perfTitle} from '../../stores/performancesStore'
    import ComboBox from "../../../../form/ComboBox.svelte";
    import {getContext} from "svelte";
    import type {BasicUser, UsersByOffice} from "$lib/server/cvpartnerClient";
    import type {IComboboxOption} from "../../../../form/IComboboxOption";

    let authorItem;
    $: {
        authorName.set(authorItem?.name);
    }

    const usersByOffice: UsersByOffice = getContext('usersByOffice');

    // TODO: Many users, long list. UX would be better if the list can be structured more, eg. sections by office instead of just listing all of them?
    const options:IComboboxOption[] = [];


    // The texts are displayed in the dropdown combobox, and also what's targeted by searching in the text field.
    // The "basic" one is short, but possibly duplicated across two different persons (eg. same full name, it happens),
    // the "unique" one is longer and should be uniquely resolved by a user. Ie. if two user objects resolve to different
    // unique-text, they can be assumed to be two different persons and both should be displayed (but then both with unique text):
    const getBasicUserText = (user: BasicUser): string => user.name;
    const getUniqueUserText = (user: BasicUser): string => `${user.name} (${user.email})`;

    // Tool to ensure unique texts in the dropdown (but only unique-ified if necessary, trying to keep it short for readability):
    // when iterating over the users to populate the 'options' list, keep a record over users objects already handled (value) and
    // what they're displayed as in the list (key):
    const alreadySeen: {[text: string]: IComboboxOption} = {};

    Object.keys(usersByOffice).forEach(officeName => {
        const users = usersByOffice[officeName];

        users.forEach(currentUser => {
            // Displayable text for the user in the dropdown list
            const currentBasicText = getBasicUserText(currentUser);
            const currentUniqueText = getUniqueUserText(currentUser);

            // Has this user already been listed with the short and basic text?
            const duplicateBasicUser = alreadySeen[currentBasicText];

            // Has this user already been listed but with a unique-ified text?
            const duplicateUniqueUser = alreadySeen[currentUniqueText];

            // Case 1: if this unique user has been seen before when iterating over the users, it's assumed to actually be the same
            // person listed twice. Log a warning with the details and skip the item.
            if (!!duplicateUniqueUser) {
                console.warn("Duplicate users when listing users for the combobox: at least 2 users encountered as " + currentUniqueText);

            } else {
                let currentText;
                // Case 2 (most common): no duplicate at all, just prep for populating the user with basictext and registering it in alreadySeen:
                if (!duplicateBasicUser) {
                    currentText = currentBasicText;

                // Case 3: basic text is duplicated, but not the unique one. Use the unique text and update both
                // ('alreadySeen' // holds references to the same objects as 'options', so updating the duplicateBasicUser
                // object that was found in 'alreadySeen' will update the corresponding object previously populated in
                // 'options' as well):
                } else {
                    // Update the previously listed duplicate and its key in 'alreadySeen':
                    const newTextForDuplicate = getUniqueUserText(duplicateBasicUser as BasicUser);
                    duplicateBasicUser.text = newTextForDuplicate;
                    delete alreadySeen[currentBasicText];
                    alreadySeen[newTextForDuplicate] = duplicateBasicUser;

                    currentText = currentUniqueText;
                }

                const newUser = {
                    ...(currentUser as IComboboxOption),
                    id: currentUser.id,
                    text: currentText
                };
                options.push(newUser);
                alreadySeen[currentText] = newUser;
            }
        });
    });

    // Finally, sort list by text
    options.sort( (userA, userB) => (userA.text < userB.text) ? -1 : 1 );
</script>

<div class="textfield-row">
    <JustifiedRow>
        <TextField bind:value={$perfTitle} label="Tittel" placeholder="Tittel" width="62%" required />
        <ComboBox bind:selectedOption={authorItem} {options} label="Ansvarlig" width="34%" placeholder="Ansatt" />
    </JustifiedRow>
</div>

<style lang="scss">
  @media only screen and (max-width: 616px) {
    .textfield-row {
      :global(.justified-row) {
        flex-direction: column;
      }
      :global(.labeled-field) {
        width:100% !important;
        margin-bottom: 20px;
      }
    }
  }
</style>
