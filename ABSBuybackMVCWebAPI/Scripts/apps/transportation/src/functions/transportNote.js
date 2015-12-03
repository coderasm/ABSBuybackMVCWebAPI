export let transportNoteFunctions = {
    get created() {
        return (new Date(this.CreatedDT)).toLocaleString();
    }
}