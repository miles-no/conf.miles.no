<script context="module">
	import client from '../../../../sanityClient';
	export async function load({ params }) {
		const { konferanse, slug } = params;

		const conference = await client.fetch(
			/* groq */ `
			*[
        _type == "conference" &&
        slug.current == $konferanse
      ][0] {
        ...,
        "performance": performances[submission->slug.current match $slug][0]{
          dateAndTime,
          location,
          performanceUrls,
          submission->{..., authors[]->{..., "imageUrl": image.asset->url}}
        }
      }
		`,
    { konferanse, slug }
		);

		if (!conference || !conference.performance) {
			return {
				status: 404
			};
		}

		return {
			props: {
				performance: conference.performance,
        submission: conference.performance.submission
			}
		};
	}
</script>

<script>
  import { PortableText } from '@portabletext/svelte';
	export let performance;
  export let submission;
</script>

<div class="container">
  <div class="row">
    <div class="col col-md-9">
      <h1>{submission.title}</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Dato</th>
            <th scope="col">Sted</th>
            <th scope="col">Tid</th>
            <th scope="col">Format</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{performance.dateAndTime}</td>
            <td>{performance.location}</td>
            <td>{performance.dateAndTime}</td>
            <td>{submission.submissionType}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <PortableText value={submission.description} />
      </div>
    </div>
    <div class="col col-md-3">
      {#each submission.authors as author}
        <img src={author.imageUrl} alt={author.image.alt} />
        <h2 class="centertext">{author.name}</h2>
      {/each}
    </div>
  </div>
</div>
