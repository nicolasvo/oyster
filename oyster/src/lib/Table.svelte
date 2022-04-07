<script>
    import { onMount } from "svelte";

    const getConfig = async () => {
        gapi.client.drive.files
            .list({
                spaces: "appDataFolder",
                fields: "nextPageToken, files(id, name)",
                pageSize: 100,
            })
            .then((res) => {
                if (res) {
                    console.log(res.result.files[0].id);
                    return res.result.files[0].id;
                }
            });
    };

    const readConfig = async (fileId) => {
        gapi.client.drive.files
      .get({
        fileId: fileId,
        alt: "media",
      })
      .then((res) => {
        return res.body;
      });
    };

    const all = async () => {
        // const _id = await getConfig();
        // const _content = await readConfig(_id);
        console.log('boi');
        // console.log(getConfig);
        console.log(_id);
        // console.log(_content);

    }
    // onMount(getConfig);
</script>

<div class="flex justify-center">
    <button
        class="m-5 p-3 text-stone-100 font-semibold rounded-xl shadow-md focus:outline-none bg-greenish hover:bg-greenish-dark"
        on:click={all}
    >
        Get config
    </button>
    <table class="table-auto overflow-auto overflow-hidden rounded-xl">
        <thead class="border-g bg-blueish">
            <tr>
                <th
                    scope="col"
                    class="text-sm font-bold text-stone-100 px-6 py-4 text-center"
                >
                    Heading
                </th>
                <th
                    scope="col"
                    class="text-sm font-bold text-stone-100 px-6 py-4 text-center"
                >
                    Heading
                </th>
                <th
                    scope="col"
                    class="text-sm font-bold text-stone-100 px-6 py-4 text-center"
                >
                    Heading
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-stone-50 border-b">
                <td class="text-sm text-blueish p-3 text-center"> Cell </td>
                <td class="text-sm text-blueish p-3 text-center"> Cell </td>
                <td class="text-sm text-blueish p-3 text-center"> Cell </td>
            </tr>
            <tr class="bg-stone-50 border-b">
                <td class="text-sm text-blueish p-3 text-center"> Cell </td>
                <td class="text-sm text-blueish p-3 text-center"> Cell </td>
                <td class="text-sm text-blueish p-3 text-center"> Cell </td>
            </tr>
        </tbody>
    </table>
</div>
