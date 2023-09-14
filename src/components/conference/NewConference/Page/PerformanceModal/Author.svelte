<script lang="ts">
	import {authorName, ProblemFields, problemFields} from '../../stores/performancesStore'
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
    const usersList:IComboboxOption[] = [];


    // The texts are displayed in the dropdown combobox, and also what's targeted by searching in the text field.
    // So we want short texts to be displayed when possible, but when a name is duplicated and it's not the same user, both
    // the new and the previous name in the list should be displayed with a more indentifiable version: "unique-ified".
    // The "basic" text is short, the "unique" one is longer and should be uniquely resolved by a user.
    // Ie. if two user objects resolve to different unique-text, they can be assumed to be two different persons with the
    // same name and both should be displayed with unique text:
    const getBasicDisplayText = (user: BasicUser): string => user.name;
    const getUniqueDisplayText = (user: BasicUser): string => `${user.name} (${user.email})`;

    // When iterating over the users to populate the 'options' list, keep a key-value record of user objects already handled
    // (value), and what they're displayed as in the list (key). Doubles as a registry for the actual objects that will
    // be displayed in the list: since 'alreadySeen' holds references to the same objects as 'options', any duplicate users
    // can be updated in 'alreadySeen' and effect the corresponding object in 'options' as well.
    const alreadySeen: {[displayText: string]: IComboboxOption} = {};

    Object.keys(usersByOffice).forEach(officeName => {
        const users = usersByOffice[officeName];

        users.forEach(currentUser => {
            const currentBasicText = getBasicDisplayText(currentUser);
            const currentUniqueText = getUniqueDisplayText(currentUser);

            const duplicateBasicUser = alreadySeen[currentBasicText];
            const duplicateUniqueUser = alreadySeen[currentUniqueText];

            // Case 1: if this unique user has been seen before when iterating over the users, it's assumed to actually be the same
            // person listed twice. Log a warning with the details and skip the item.
            if (!!duplicateUniqueUser) {
                console.warn("Duplicate users when listing users for the combobox: at least 2 users encountered as " + currentUniqueText);

            } else {
                let displayText;
                // Case 2 (most common): no duplicate at all, just prep for populating the user with basictext and registering it in alreadySeen:
                if (!duplicateBasicUser) {
                    displayText = currentBasicText;

                // Case 3: basic text is duplicated, but not the unique one. Use the unique text and update both
                // :
                } else {
                    // Update the previously listed duplicate and its key in 'alreadySeen':
                    const newTextForDuplicate = getUniqueDisplayText(duplicateBasicUser as BasicUser);
                    duplicateBasicUser.text = newTextForDuplicate;
                    alreadySeen[newTextForDuplicate] = duplicateBasicUser;

                    displayText = currentUniqueText;
                }

                const newUser = {
                    ...(currentUser as IComboboxOption),
                    id: currentUser.id,
                    text: displayText
                };
                usersList.push(newUser);
                alreadySeen[displayText] = newUser;
            }
        });
    });

    usersList.sort( (userA, userB) => (userA.text < userB.text) ? -1 : 1 );
</script>


<ComboBox
        bind:selectedOption={authorItem}
        options={usersList}
        label="Ansvarlig"
        width="34%"
        placeholder="Ansatt"
        invalid={$problemFields.indexOf(ProblemFields.author) !== -1}
/>
