<script>
    import { languages, words, isSignedIn, sheetId } from "./store.js";
    import Animation from "./Animation.svelte";
    import Input from "./Input.svelte";

    let loadingState = false;
    const availableLanguages = [
        { code: "af", name: "Afrikaans" },
        { code: "sq", name: "Albanian" },
        { code: "ar", name: "Arabic" },
        { code: "hy", name: "Armenian" },
        { code: "az", name: "Azerbaijani" },
        { code: "eu", name: "Basque" },
        { code: "be", name: "Belarusian" },
        { code: "bg", name: "Bulgarian" },
        { code: "ca", name: "Catalan" },
        { code: "zh-CN", name: "Chinese (Simplified)" },
        { code: "zh-TW", name: "Chinese (Traditional)" },
        { code: "hr", name: "Croatian" },
        { code: "cs", name: "Czech" },
        { code: "da", name: "Danish" },
        { code: "nl", name: "Dutch" },
        { code: "en", name: "English" },
        { code: "et", name: "Estonian" },
        { code: "tl", name: "Filipino" },
        { code: "fi", name: "Finnish" },
        { code: "fr", name: "French" },
        { code: "gl", name: "Galician" },
        { code: "ka", name: "Georgian" },
        { code: "de", name: "German" },
        { code: "el", name: "Greek" },
        { code: "ht", name: "Haitian Creole" },
        { code: "iw", name: "Hebrew" },
        { code: "hi", name: "Hindi" },
        { code: "hu", name: "Hungarian" },
        { code: "is", name: "Icelandic" },
        { code: "id", name: "Indonesian" },
        { code: "ga", name: "Irish" },
        { code: "it", name: "Italian" },
        { code: "ja", name: "Japanese" },
        { code: "ko", name: "Korean" },
        { code: "lv", name: "Latvian" },
        { code: "lt", name: "Lithuanian" },
        { code: "mk", name: "Macedonian" },
        { code: "ms", name: "Malay" },
        { code: "mt", name: "Maltese" },
        { code: "no", name: "Norwegian" },
        { code: "fa", name: "Persian" },
        { code: "pl", name: "Polish" },
        { code: "pt", name: "Portuguese" },
        { code: "ro", name: "Romanian" },
        { code: "ru", name: "Russian" },
        { code: "sr", name: "Serbian" },
        { code: "sk", name: "Slovak" },
        { code: "sl", name: "Slovenian" },
        { code: "es", name: "Spanish" },
        { code: "sw", name: "Swahili" },
        { code: "sv", name: "Swedish" },
        { code: "th", name: "Thai" },
        { code: "tr", name: "Turkish" },
        { code: "uk", name: "Ukrainian" },
        { code: "ur", name: "Urdu" },
        { code: "vi", name: "Vietnamese" },
        { code: "cy", name: "Welsh" },
        { code: "yi", name: "Yiddish" },
    ];
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

    let noData;

    const getWords = async (id) => {
        const data = await gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: id,
                range: range,
            })
            .then((response) => {
                const range = response.result;
                if (range.values && range.values.length > 0) {
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
                    noData = "Select languages first";
                    loadingState = false;
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
                const languages = range.values ? range.values[0] : [];
                return languages;
            });
        return languages;
    };

    const all = async () => {
        loadingState = true;
        const config = await getConfig().then((config) => config);
        const content = await getContent(config).then((content) => content);
        $sheetId = JSON.parse(content).sheetId;
        $words = await getWords($sheetId).then((data) => data);
        $languages = await getLanguages($sheetId).then((data) => data);
        loadingState = false;
    };

    $: if ($isSignedIn) {
        all();
    }

    $: if ($languages.length > 0) {
        console.log("ground control");
        noData = false;
    }

    // async function addWord(e) {
    const addWord = async (e) => {
        loadingState = true;
        e.preventDefault();
        const formData = new FormData(e.target);
        let i = 0;
        let values = [];
        let words_ = [];
        formData.forEach((w) => words_.push(w));
        const countWords = words_.filter((w) => w != "").length;
        if (countWords > 1) {
            formData.forEach((v) => {
                if (v) {
                    values.push(v);
                } else {
                    values.push("");
                }
            });
        } else if (countWords == 1) {
            formData.forEach((v, k) => {
                if (v) {
                    $languages.forEach((l) => {
                        if (k != l) {
                            values.push(
                                `=GOOGLETRANSLATE("${v}";"${k}";"${l}")`
                            );
                        } else {
                            values.push(v);
                        }
                    });
                    i++;
                }
            });
        }
        console.log(values);
        const params = {
            spreadsheetId: $sheetId,
            range: range,
            valueInputOption: "USER_ENTERED",
        };
        const valueRangeBody = {
            range: "A1:Z",
            majorDimension: "ROWS",
            values: [values],
        };
        await gapi.client.sheets.spreadsheets.values
            .append(params, valueRangeBody)
            .then(async (_) => {
                $words = await getWords($sheetId).then((data) => data);
            });
        loadingState = false;
        toggleWordForm();
    };

    const deleteWord = async (rowIndex) => {
        loadingState = true;
        const params = {
            spreadsheetId: $sheetId,
        };
        const requestBody = {
            requests: [
                {
                    deleteRange: {
                        range: {
                            startRowIndex: rowIndex,
                            endRowIndex: rowIndex + 1,
                        },
                        shiftDimension: "ROWS",
                    },
                },
            ],
        };
        await gapi.client.sheets.spreadsheets
            .batchUpdate(params, requestBody)
            .then(async () => {
                $words = await getWords($sheetId).then((data) => data);
            });
        loadingState = false;
    };

    const selectLanguages = async (language) => {
        loadingState = true;
        if ($languages.includes(language)) {
            const params = {
                spreadsheetId: $sheetId,
            };
            const columnIndex = $languages.indexOf(language);
            const requestBody = {
                requests: [
                    {
                        deleteRange: {
                            range: {
                                startColumnIndex: columnIndex,
                                endColumnIndex: columnIndex + 1,
                            },
                            shiftDimension: "COLUMNS",
                        },
                    },
                ],
            };
            await gapi.client.sheets.spreadsheets
                .batchUpdate(params, requestBody)
                .then(async () => {
                    $words = await getWords($sheetId).then((data) => data);
                    $languages = await getLanguages($sheetId).then(
                        (data) => data
                    );
                });
            loadingState = false;
        } else {
            const column = columnToLetter($languages.length + 1);

            const requestBody = {
                spreadsheetId: $sheetId,
                range: `${column}1`,
                valueInputOption: "USER_ENTERED",
                values: [[language]],
            };
            await gapi.client.sheets.spreadsheets.values
                .update(requestBody)
                .then(async () => {
                    $words = await getWords($sheetId).then((data) => data);
                    $languages = await getLanguages($sheetId).then(
                        (data) => data
                    );
                });
            loadingState = false;
        }
    };

    const columnToLetter = (column) => {
        let temp,
            letter = "";
        while (column > 0) {
            temp = (column - 1) % 26;
            letter = String.fromCharCode(temp + 65) + letter;
            column = (column - temp - 1) / 26;
        }
        return letter;
    };

    let wordForm = false;
    const toggleWordForm = async () => {
        wordForm = !wordForm;
    };
</script>

<div class="flex justify-center">
    {#if noData}
        <p class="p-5 text-blueish">{noData}</p>
    {/if}
    {#if $isSignedIn == true}
        {#if $languages.length}
            <div class="overflow-x-auto">
                <table
                    class="m-3 table-auto overflow-auto overflow-hidden rounded-xl"
                >
                    <thead class="border-g bg-blueish">
                        <tr>
                            {#each $languages as language}
                                <th
                                    scope="col"
                                    class="text-xs font-bold text-stone-100 px-6 py-4 text-center"
                                >
                                    {availableLanguages.find(
                                        (o) => o.code === language
                                    ).name}
                                </th>
                            {/each}
                            <th
                                scope="col"
                                class="font-bold text-stone-100 px-6 py-4 text-center"
                            />
                        </tr>
                    </thead>
                    <tbody>
                        {#if $words.length}
                            {#each $words as word, i}
                                <tr class="bg-stone-50 border-b">
                                    {#each $languages as language}
                                        <td
                                            class="text-blueish p-3 text-center"
                                        >
                                            {#if word[language]}
                                                {word[language]}
                                            {/if}
                                        </td>
                                    {/each}
                                    <td class="text-blueish p-3 text-center">
                                        <button
                                            class="flex justify-center items-center"
                                            on:click={() => deleteWord(i + 1)}
                                        >
                                            <svg
                                                class="object-scale-down h-5 stroke-greenish-dark"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 25 25"
                                                fill="none"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                        {:else}
                            <tr class="bg-stone-50 border-b">
                                {#each $languages as _}
                                    <td class="p-3" />
                                {/each}
                                <td class="p-3" />
                            </tr>
                        {/if}
                    </tbody>
                </table>
            </div>
        {/if}
    {/if}
</div>
{#if loadingState}
    <div class="flex justify-center">
        <Animation />
    </div>
{/if}
<div class="flex justify-center">
    <!-- https://flowbite.com/docs/components/dropdowns/ -->
    <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        class="m-3 p-3 text-stone-100 font-semibold rounded-xl shadow-md focus:outline-none bg-blueish hover:bg-blueish-dark"
        type="button"
        >Select languages
    </button>

    <div
        id="dropdown"
        class="hidden z-10 w-64 h-80 bg-stone-50 rounded-md divide-y divide-gray-100 overflow-y-scroll shadow"
        data-popper-placement="bottom"
    >
        <ul class="py-1 text-blueish" aria-labelledby="dropdownDefault">
            {#each availableLanguages as language}
                <li>
                    <a
                        href="#"
                        on:click={() => selectLanguages(language["code"])}
                        class="block py-2 px-4 hover:bg-gray-100"
                    >
                        {#if $languages.includes(language["code"])}
                            {language["name"]}
                            <svg
                                class="object-scale-down h-5 fill-greenish-dark inline-block align-top"
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                ><path d="M0 0h24v24H0V0z" fill="none" /><path
                                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                                /></svg
                            >
                        {:else}
                            {language["name"]}
                        {/if}
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</div>
<div class="flex justify-center">
    {#if wordForm}
        <form on:submit={addWord}>
            <div class="grid content-center">
                {#each $languages as language}
                    <div class="p-2">
                        <Input label={language} name={language} type="text" />
                    </div>
                {/each}
                <div class="grid grid-cols-2">
                    <button
                        class="m-3 p-3 text-stone-100 font-semibold rounded-xl shadow-md focus:outline-none bg-blueish hover:bg-blueish-dark"
                        on:click={toggleWordForm}
                    >
                        Cancel
                    </button>
                    <button
                        class="m-3 p-3 text-stone-100 font-semibold rounded-xl shadow-md focus:outline-none bg-blueish hover:bg-blueish-dark"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </form>
    {:else}
        <button
            class="m-3 p-3 text-stone-100 font-semibold rounded-xl shadow-md focus:outline-none bg-blueish hover:bg-blueish-dark"
            on:click={toggleWordForm}
        >
            Add word
        </button>
    {/if}
</div>

<svelte:head>
    <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script>
</svelte:head>
