<script>
	import { onMount } from "svelte";

	const CLIENT_ID =
		"582485760308-aim00v0sor96v66bn2h4rgerqo1f1g74.apps.googleusercontent.com";
	const API_KEY = "AIzaSyBUANl-jEVX7FlqOIGr3hVYrH3WUwvLFtU";
	const DISCOVERY_DOCS = [
		"https://sheets.googleapis.com/$discovery/rest?version=v4",
		"https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
	];
	const SCOPES =
		"https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata";
	const start = async () => {
		gapi.client
			.init({
				apiKey: API_KEY,
				clientId: CLIENT_ID,
				discoveryDocs: DISCOVERY_DOCS,
				scope: SCOPES,
			})
			.then(() => {
				const isSignedIn = gapi.auth2
					.getAuthInstance()
					.isSignedIn.get();
				if (isSignedIn) {
					console.log("User already signed in!");
				} else {
					console.log("User not signed in :/");
				}
			});
	};

	const initializeGapi = async () => {
		gapi.load("client:auth2", start);
	};

	const signIn = async () => {
		gapi.auth2.getAuthInstance().signIn();
	};

	const getConfig = async () => {
		test = "boi";
		gapi.client.drive.files
			.list({
				spaces: "appDataFolder",
				fields: "nextPageToken, files(id, name)",
				pageSize: 100,
			})
			.then((res) => {
				if (res) {
					console.log(res.result.files[0].id);
				}
				test = "end.";
			});
	};

	onMount(initializeGapi);
	let test = "hee";
</script>

<svelte:head>
	<script src="https://apis.google.com/js/api.js"></script>
</svelte:head>

<div class="container p-10">
	<h1 class="text-blueish text-3xl flex justify-center">this</h1>
	<p>{test}</p>
	<button on:click={signIn}>Sign in</button>
	<button on:click={getConfig}>Get config</button>
	<!-- <svg
		role="status"
		class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-rose-600"
		viewBox="0 0 100 101"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
		/>
	</svg> -->
	<!-- <button
		type="button"
		class="bg-indigo-500 ... flex justify-center"
		disabled
	>
		<svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
			<circle
				class="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				stroke-width="4"
			/>
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
		Processing...
	</button> -->
</div>
