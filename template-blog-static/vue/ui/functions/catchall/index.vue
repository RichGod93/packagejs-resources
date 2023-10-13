<template><main>
	
	<!-- Show this button on the home page, but not if this is the live version of the site (only the local version should be editable). -->
	<button
	 v-if="navigator.state.options.deployment !== 'live' && navigator.context.name === '$dom:root'"
	 @click.left.exact.stop.prevent="ma_go(navigator.context.lists['db.posts'].actions['POST'], true)"
	 type="button"
	 >Add new post</button>
	
	<!-- Show this button on the post page. -->
	<button
	 v-if="navigator.context.name === '$dom:item/db.posts'"
	 @click.left.exact.stop.prevent="ma_go(navigator.dom.root, true)"
	 type="button"
	 >Home</button>
	
	<!-- Show this button on the post page, but not if this is the live version of the site (only the local version should be editable). -->
	<button
	 v-if="navigator.state.options.deployment !== 'live' && navigator.context.name === '$dom:item/db.posts'"
	 @click.left.exact.stop.prevent="ma_go(navigator.context.actions['PATCH'], true)"
	 @click.right.stop.prevent="ma_go(navigator.context.actions['DELETE'], true)"
	 type="button"
	 >Edit post</button>
	
</main></template>
<script>
	import toolkit from "jsen-sym-toolkit-for-interfaces";
	const t = toolkit;
	export default {
		...((new t.cmp.catchallContext({
		})).pHVueConstructor)
	};
</script>
