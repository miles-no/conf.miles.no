<script>
	import { each } from "svelte/internal";
    export let data = {}

    const isActive = async (event) => {
		event.target.parentElement.classList.toggle('active');
	};
</script>

<div class="container-fluid">
    <div class="accordion-body">
        <div class="accordion">
            <h1>Ansatte</h1>
            {#each data.offices as office}
            <hr>
            <div class="container" on:click={isActive}>
                <div class="label">{office.name}</div>
                <div class="container-fluid content">
                    <div class="row">
                    {#each data.users.filter(u => u.office == office.name) as user}
                        <div class="col">
                            <div class="card" style="width: 18rem;">
                                <img src="{user.profileImage}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <p class="card-text">{user.name}</p>
                                </div>
                            </div>
                        </div>
                    {/each}
                    </div>
                </div>
            </div>
            <hr>
            {/each}
        </div>
    </div>
</div>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');

/* Sets the background color of the body to blue. Sets font to Rubik */

body {
  background-color: #0A2344;
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
</style>