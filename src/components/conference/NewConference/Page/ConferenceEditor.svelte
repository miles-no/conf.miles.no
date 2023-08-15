<script lang="ts">
    import Form from "./Form.svelte";
    import Preview from "./Preview.svelte";
    import ButtonFooterRow from "./ButtonFooterRow.svelte";
    import type {IPreviewConference} from "./IPreviewConference.js";
    import type {IToastContextProps} from "../../../toast/toast-context.js";
    import {description, endDate, location, name, selectedCategoryTags, startDate, url} from "../stores.js";


    export let
        conference: IPreviewConference,
        submitText: string,
        submit: (toastContext:IToastContextProps) => void;

    $: conference = {
        title: $name,
        startDate: $startDate?.toDateString(),
        endDate: $endDate?.toDateString(),
        categoryTag: $selectedCategoryTags,
        description: $description,
        location: $location,
        url: $url,
    }
</script>



<div class="edit-and-preview-row">
    <Form />
    <div class="preview-col">
        <Preview {conference} />
    </div>
</div>
<ButtonFooterRow {submitText} {submit} />




<style lang="scss">
  .edit-and-preview-row {
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  @media only screen and (min-width: 1325px) {
    .preview-col {
      flex-basis: calc(400px + 4rem);
    }
  }

  @media only screen and (max-width: 1324px) {
    .preview-col {
      width: 100%;
    }
    .edit-and-preview-row {
      flex-direction: column;

      :global(.new-conf-edit) {
        border-right: none;
        padding-right: 0;
      }
      :global(.new-conf-preview) {
        margin-top: 40px;
        margin-bottom: 40px;
        margin-left: auto;
      }
    }
  }

  @media only screen and (max-width: 760px) {
    .edit-and-preview-row {
      :global(.new-conf-preview) {
        margin-right: auto;
      }
    }

  }
</style>
