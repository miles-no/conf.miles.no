<script lang="ts">
    import JustifiedRow from "../../../../form/JustifiedRow.svelte";
    import TextField from "../../../../form/TextField.svelte";

    import {authorName, perfTitle} from '../../stores/performancesStore'
    import ComboBox from "../../../../form/ComboBox.svelte";
    import {getContext} from "svelte";
    import type {UsersByOffice} from "$lib/server/cvpartnerClient";
    import type {IComboboxOption} from "../../../../form/IComboboxOption";

    let authorItem;
    $: {
        authorName.set(authorItem?.name);
    }

    const usersByOffice: UsersByOffice = getContext('usersByOffice');

    // TODO: Many users, long list. UX would be better if the list can be structured more, eg. sections by office instead of just listing all of them?
    // TODO: Currently, assumes that names in the list are unique.
    const options:IComboboxOption[] = [];
    Object.keys(usersByOffice).forEach(officeName => {
        const users = usersByOffice[officeName];
        users.forEach(user => {
            options.push({
                ...(user as IComboboxOption),
                id: user.id,
                text: user.name
            })
        })
    });

    // Sort list by name
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
