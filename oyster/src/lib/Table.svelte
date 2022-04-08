<script>
    import { languages, words, isSignedIn } from "./store.js";
    import Animation from "./Animation.svelte";

    const range = "A1:Z";
    const getContent = async (fileId) => {
        const content = await gapi.client.drive.files
            .get({
                fileId: fileId,
                alt: "media",
            })
            .then((res) => {
                return res.body;
            });
        return content;
    };

    const getConfig = async () => {
        const config = await gapi.client.drive.files
            .list({
                spaces: "appDataFolder",
                fields: "nextPageToken, files(id, name)",
                pageSize: 100,
            })
            .then((res) => {
                if (res) {
                    return res.result.files[0].id;
                }
            });
        return config;
    };

    const getWords = async (id) => {
        const data = await gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: id,
                range: range,
            })
            .then((response) => {
                const range = response.result;
                if (range.values.length > 0) {
                    const languages = range.values[0];
                    const data = [];
                    let temp = {};
                    const zip = (a, b) => a.map((x, i) => [x, b[i]]);
                    for (const row of range.values.slice(1)) {
                        temp = {};
                        for (const [language, word] of zip(languages, row)) {
                            temp[language] = word;
                        }
                        data.push(temp);
                    }
                    return data;
                } else {
                    console.log("No data");
                }
            });
        return data;
    };

    const getLanguages = async (id) => {
        const languages = await gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: id,
                range: range,
            })
            .then((response) => {
                const range = response.result;
                const languages = range.values[0];
                return languages;
            });
        return languages;
    };

    const all = async () => {
        const config = await getConfig().then((config) => config);
        const content = await getContent(config).then((content) => content);
        const id = JSON.parse(content).sheetId;
        const words_ = await getWords(id).then((data) => data);
        const languages_ = await getLanguages(id).then((data) => data);
        words_.forEach((word) => {
            console.log(word);
        });
        console.log(`pizza ${languages_}`);
        $languages = languages_;
        $words = words_;
    };

    $: if ($isSignedIn) {
        all();
    }
</script>

<div class="flex justify-center">
    {#if $isSignedIn == true}
        {#if $words.length}
            <table class="table-auto overflow-auto overflow-hidden rounded-xl">
                <thead class="border-g bg-blueish">
                    <tr>
                        {#each $languages as language}
                            <th
                                scope="col"
                                class="text-sm font-bold text-stone-100 px-6 py-4 text-center"
                            >
                                {language}
                            </th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each $words as word}
                        <tr class="bg-stone-50 border-b">
                            {#each $languages as language}
                                <td
                                    class="text-sm text-blueish p-3 text-center"
                                >
                                    {word[language]}
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        {:else}
            <Animation />
        {/if}
    {/if}
</div>
