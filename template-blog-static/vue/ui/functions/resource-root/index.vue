<template>
	<main>
		
		<component-search
		 :pIJSENModInterfaceClsStateExtVueJSClsDOMNavigator="navigator"
		 :pIContextAction="context.lists['db.posts'].actions['GET']"
		 />
		
		<div v-for="(v, i) in context.lists['db.posts'].items">
			<p>
				<a
				 @click.stop.prevent="ma_go(v)"
				 :href="'/db.posts/'+v.attributes['slug']['=']"
				 :title="v.attributes['title']['=']"
				 ><u>{{ v.attributes['title']['='] }}</u></a>
				<br />
				{{ v.attributes['description']['='] }}
			</p>
		</div>
		
		<component-search-loadmore
		 :pIJSENModInterfaceClsStateExtVueJSClsDOMNavigator="navigator"
		 :pIContextAction="context.lists['db.posts'].actions['GET']"
		 />
		
	</main>
</template>
<script>
	import toolkit from "jsen-sym-toolkit-for-interfaces";
	const t = toolkit;
	export default {
		...((new t.cmp.rootDefault({
			components: {
				"component-search": t.vue.searchContext,
				"component-search-loadmore": t.vue.searchLoadmore
      },
      async mounted () {
				
				// @action
				await this.ma_mounted_default();
				
				// @assign
				//  Update the page's meta title to the site's title.
				this.navigator.state.window.document.title = this.navigator.state.window.document.querySelector('meta[name="siteTitle"]').getAttribute('content');
				
				// @assign
				//  Update the page's meta description to the site's description.
				this.navigator.state.window.document.querySelector('meta[name="description"]').setAttribute(
					'content',
					this.navigator.state.window.document.querySelector('meta[name="siteDescription"]').getAttribute('content')
				);
				
			},
			async ma_on_navigate (
			  navigator,
				to,
				...args
			) {
				
				// @switch
				//  Handle "pretty paths" with custom rules.
				if (to.path.replace(/\/$/g, '') === '/example') {
					
					// @action
					//  Get the post for this pretty path.
					navigator.context = await navigator.ma_path_to_context(
						"/db.posts/example"
					);
					
					// @assign
					//  Update the page's meta title to the post's title.
					navigator.state.window.document.title = navigator.context.attributes['title']['='];
					
					// @assign
					//  Update the page's meta description to the post's description.
					navigator.state.window.document.querySelector('meta[name="description"]').setAttribute(
					  'content',
					  navigator.context.attributes['description']['=']
					);
					
					// @return
					//  End navigation.
					return;
					
				} else {
					
					// @return
					//  If no pretty paths were matched, then perform default navigation.
					return await t.cmp.rootDefault.ma_on_navigate(...arguments);
					
				}
				
			}
		})).pHVueConstructor)
	};
</script>
