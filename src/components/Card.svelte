<script>
	// export let author;
	// export let title;
	// export let cssClass;
	// export let linkUrl;
	// export let datelocation;
	// export let slug;
	export let agenda;

	
	export let conferenceName
	

	
	let currentConferance = agenda.conferencetimes.filter(x => {return x.conference == conferenceName})[0]
	console.log(currentConferance)

</script>

<div class="col-sm-6 p-5">
	<a href="{conferenceName}/agenda/{agenda.slug}">
		<div class="card milescard {agenda.cssclass}">
			<div class="space">
				<div class="datelocation">&lt;{currentConferance.date} / {currentConferance.time} / {currentConferance.room}&gt;</div>
				<h1 class="text">{agenda.authorConcat}</h1>
				<h2 class="text">{agenda.title}</h2>
			</div>
			<div class="elements">
				<div class="icon"><strong>&gt;&gt;</strong></div>
				<div class="profile-pictures show">
					<!-- <img class="profile-image rounded-circle" src="https://via.placeholder.com/150" alt="Person" /> -->
				</div>
			</div>
			{#if agenda.format == "Workshop"}
			<a class="link" href={agenda.workshoplink}>
				<div class="footer">
					Gå direkte til kodeverkstedet!<strong>&gt;&gt;</strong>
				</div>
			</a>		
			{/if}
		
		</div>
	</a>
</div>

<style>
	.milescard {
		width: 18rem;
		height: 22rem;
		border: 5px solid #000;
		border-radius: 0%;
	}
	.milescard:hover {
		background-color: rgb(184, 38, 28);
		color: #fff;
	}
	.show {
		display: none;
	}
	.milescard:hover .show {
		display: block;
	}
	.space {
		padding: 10px;
	}
	.even {
		background-color: transparent;
		color: #000;
	}
	.odd {
		background-color: #000;
		color: #fff;
	}
	h1 {
		font-family: 'Work Sans', sans-serif;
		font-weight: bold;
		text-transform: uppercase;
		margin-bottom: 1em;
	}
	h2 {
		font-family: 'Work Sans', sans-serif;
		text-transform: uppercase;
		font-size: 1.5em;
	}
	.datelocation {
		padding: 5px;
		font-size: 0.8rem;
	}
	.elements {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
	}
	.icon {
		font-family: 'Work Sans', sans-serif;
		font-size: 3em;
		text-align: center;
		width: 3em;
	}
	a {
		text-decoration: none;
	}
	.link {
		color: #000;
	}
	.link:hover {
		color: #000;
		text-decoration: underline;
	}
	.footer {
		position: absolute;
		width: 100%;
		background-color: rgb(242, 116, 120);
		color: #000;
		bottom: 0;
		padding: 3px;
	}
	.profile-pictures {
		float: right;
		/* position: absolute;
        bottom: 15%;
        right: 10%; */
	}
	.profile-image {
		width: 50px;
	}
</style>
