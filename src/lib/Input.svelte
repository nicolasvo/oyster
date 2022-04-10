<script>
    export let label;
    export let name;
    export let type;
</script>

<div>
    <label class="text-blueish font-bold" for={name}>{label}</label>
</div>
<div>
    <input
        class="p-2 text-blueish bg-stone-50 rounded-md border-none focus:ring-2 focus:ring-pinkish"
        id={name}
        {name}
        {type}
    />
</div>
