<!-- TODO: Much of this is copied and only slightly adapted from src/components/conference/conferenceModal/ConferenceModal.svelte .
           In order to DRY, extract and nest a common component?
           Until then, keep them up to date wherever needed. -->

<script lang="ts">
    import {urlFor} from "../../../../utils/sanityclient-utils.js";
    import ConferenceInformation from "../../conference-information/ConferenceInformation.svelte";
    import ConferenceCategoryTag from "../../../tag/conference-category-tag/ConferenceCategoryTag.svelte";
    import {PortableText} from "@portabletext/svelte";
    import type {IConference} from "../../../../model/conference";

    export let conference: Omit<IConference, '_id','_rev', '_type', '_updatedAt', 'deadline', 'eventType', 'image','imageUrl', 'internal', 'slug', 'startTime', 'timeperiod', 'title', 'price', 'tickettype'>;
</script>

<div class="new-conf-preview">
    <div class="imageWrapper">
        <img
                style="width: 100%; height: 100%;"
                alt=""
                src={conference.imageUrl
					? urlFor(conference.imageUrl).size(900, 300).quality(100).url()
					: 'https://www.miles.no/wp-content/uploads/2020/11/PT6A3984-kopi.jpg'}
                height="300"
                width="
				400"
        />
    </div>
    <div class="content">
        <h1 id="modal-heading">{conference.title}</h1>
        <div class="compactInfo">
            <ConferenceInformation {conference} />
            {#if conference.categoryTag}
                <div class="tagWrapper">
                    {#each conference.categoryTag as activityType}
                        <ConferenceCategoryTag category={activityType} />
                    {/each}
                </div>
            {/if}
        </div>
        <div>
            {#if conference.description}
                <PortableText value={conference.description} />
            {/if}
        </div>
    </div>
</div>


<style lang="scss">
  .new-conf-preview {
    width: 400px;
    border: #000 1px solid;
    border-radius: 7px;
    margin-left: 42px;
    overflow: hidden;
  }
  .imageWrapper {
    height: 200px;
  }
  .content {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem;
  }
  .compactInfo {
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
    padding: 1rem 0.5rem;
  }
  .info {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.5rem 2rem;
  }
  .tagWrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 100%;
    gap: 0.5rem;
    margin-top: 1rem;
  }
</style>
