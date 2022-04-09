<script>
    import { onMount } from "svelte";
    import { isSignedIn } from "../lib/store.js";
    import Animation from "./Animation.svelte";

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
                const _isSignedIn = gapi.auth2
                    .getAuthInstance()
                    .isSignedIn.get();
                if (_isSignedIn) {
                    console.log("User already signed in!");
                    $isSignedIn = true;
                } else {
                    console.log("User not signed in :/");
                    $isSignedIn = false;
                }
            });
    };

    const initializeGapi = async () => {
        gapi.load("client:auth2", start);
    };

    const signIn = async () => {
        await gapi.auth2.getAuthInstance().signIn();
        $isSignedIn = true;
    };

    const signOut = async () => {
        if (confirm("Are you sure? 🥲")) {
            await gapi.auth2.getAuthInstance().disconnect();
            $isSignedIn = false;
        }
    };

    onMount(initializeGapi);
</script>

<svelte:head>
    <script src="https://apis.google.com/js/api.js"></script>
</svelte:head>

<div class="flex justify-center">
    {#if $isSignedIn == true || $isSignedIn == false}
        {#if !$isSignedIn}
            <button
                class="m-3 p-3 text-stone-100 font-semibold rounded-xl shadow-md focus:outline-none bg-greenish hover:bg-greenish-dark"
                on:click={signIn}
            >
                Sign in
            </button>
        {:else}
            <button
                class="m-3 p-3 text-stone-100 font-semibold rounded-xl shadow-md focus:outline-none bg-greenish hover:bg-greenish-dark"
                on:click={signOut}
            >
                Sign out
            </button>
        {/if}
    {:else}
        <Animation />
    {/if}
</div>

<!-- <button type="button" class="bg-indigo-500 ... flex justify-center" disabled>
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
