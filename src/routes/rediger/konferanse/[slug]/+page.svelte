<script lang="ts">
    import {onMount} from "svelte";
    import Form from "../../../../components/conference/NewConference/Page/Form.svelte";
    import type { IConference } from '../../../../model/conference';

    import {
        name,
        startDate,
        endDate,
        selectedCategoryTags,
        description,
        location,
        url,
        initStore
    } from "../../../../components/conference/NewConference/stores";
    import ButtonFooterRow from "../../../../components/conference/NewConference/Page/ButtonFooterRow.svelte";
    import Preview from "../../../../components/conference/NewConference/Page/Preview.svelte";
    import {type IPreviewConference} from "../../../../components/conference/NewConference/Page/IPreviewConference";

    export let data: IConference;
    let conference: IPreviewConference;

    onMount(() => {
        initStore({
            name: data.title,
            startDate: data.startDate,
            endDate: data.endDate,
            categoryTag: data.categoryTag || [],
            description: data.description[0].children[0].text,
            location: data.location,
            url: data.url
        });
    });

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


<h1>Redigere konferanse</h1>
<div class="edit-and-preview-row">
    <Form />
    <div class="preview-col">
        <Preview {conference} />
    </div>
</div>
<ButtonFooterRow />



<style lang="scss">
  h1 {
    font-family: var(--mdc-typography-headline1-font-family, var(--mdc-typography-font-family, Inter, Roboto, sans-serif)); ;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 40px;
  }

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
