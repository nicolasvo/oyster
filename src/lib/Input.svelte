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
        class="text-blueish bg-stone-50 rounded-md border-none p-2"
        id={name}
        {name}
        {type}
    />
</div>
