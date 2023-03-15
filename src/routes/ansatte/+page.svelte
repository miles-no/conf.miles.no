<script>
	import { each } from 'svelte/internal';
	import Card from '@smui/card';
	import Button, { Label, Icon } from '@smui/button';

	export let data = {};
	const isActive = async (event) => {
		event.target.parentElement.classList.toggle('active');
	};
</script>

<div class="container-fluid" style="padding: 4rem;">
	<h1 class=" mdc-typography--headline2" style="text-align: left;">Vi er Miles</h1>
	<div class="container-lg" style="display: flex; flex-direction: column; gap:1rem;">
		<div class="filter-container">
			<div class="filter-wrapper">
				<Button variant="outlined">
					<Label>Oslo</Label>
				</Button>
				<Button variant="outlined">
					<Label>Bergen</Label>
				</Button>
				<Button variant="outlined">
					<Label>Trondheim</Label>
				</Button>
				<Button variant="outlined">
					<Label>Stavanger/Haugesund</Label>
				</Button>
				<Button variant="outlined">
					<Label>Ålesund</Label>
				</Button>
			</div>
			<div class="filter-wrapper">
				<Button variant="outlined" class="button-shaped-round">
					<Label>Utviklere</Label>
				</Button>
				<Button variant="outlined" class="button-shaped-round">
					<Label>Designere</Label>
				</Button>
				<Button variant="outlined" class="button-shaped-round">
					<Label>Prosjektledere</Label>
				</Button>
			</div>
		</div>
		<div class="employee-container">
			{#each data.users as user}
				<Card padded style="gap:1rem; width:fit-content;">
					<div>
						<img
							src={user.profileImage
								? user.profileImage
								: 'https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0='}
							class="card-img-top"
							alt={user.name}
						/>
					</div>
					<div class="employee-name">{user.name}</div>
				</Card>
			{/each}
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');

	/* Sets the background color of the body to blue. Sets font to Rubik */

	body {
		background-color: #0a2344;
		font-family: 'rubik', sans-serif;
	}

	/* Aligns the heading text to the center. */

	h1 {
		text-align: center;
	}

	/* Sets the width for the accordion. Sets the margin to 90px on the top and bottom and auto to the left and right */

	.accordion {
		width: 800px;
		margin: 90px auto;
		color: black;
		background-color: white;
		padding: 45px 45px;
	}

	.accordion .container {
		position: relative;
		margin: 10px 10px;
	}

	/* Positions the labels relative to the .container. Adds padding to the top and bottom and increases font size. Also makes its cursor a pointer */

	.accordion .label {
		position: relative;
		padding: 10px 0;
		font-size: 30px;
		color: black;
		cursor: pointer;
	}

	.accordion .label::before {
		content: '+';
		color: black;
		position: absolute;
		top: 50%;
		right: -5px;
		font-size: 30px;
		transform: translateY(-50%);
	}

	/* Hides the content (height: 0), decreases font size, justifies text and adds transition */

	.accordion .content {
		position: relative;
		background: white;
		height: 0;
		font-size: 20px;
		text-align: justify;
		width: 780px;
		overflow: hidden;
		transition: 0.5s;
	}

	/* Adds a horizontal line between the contents */

	.accordion hr {
		width: 100;
		margin-left: 0;
		border: 1px solid grey;
	}

	/* Unhides the content part when active. Sets the height */

	.accordion .container.active .content {
		/* height: 150px; */
		height: 100%;
	}

	/* Changes from plus sign to negative sign once active */

	.accordion .container.active .label::before {
		content: '-';
		font-size: 30px;
	}
	.filter-container {
		display: flex;
		flex-direction: column;
		align-items: end;
		gap: 1rem;
	}
	.filter-wrapper {
		display: flex;
		gap: 1rem;
	}
	.employee-container {
		display: flex;
		justify-content: space-between;
		row-gap: 1.5rem;
		flex-wrap: wrap;
		border: 1px solid;
		padding: 1rem;
	}
	img {
		height: 200px;
		width: 200px;
		border-radius: 50%;
	}
</style>
