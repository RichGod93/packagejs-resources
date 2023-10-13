<template>
	<main>
		<article>

			<header>
				<h1>{{ context.attributes['title']['='] }}</h1>
				<p><small>Posted on {{ {'01':'Jan.','02':'Feb.','03':'Mar.','04':'Apr.','05':'May','06':'Jun.','07':'Jul.','08':'Aug.','09':'Sep.','10':'Oct.','11':'Nov.','12':'Dec.'}[context.attributes['slug']['+'].substr(4, 2)] }} {{ parseInt(context.attributes['slug']['+'].substr(6, 2)) }}, {{ context.attributes['slug']['+'].substr(0, 4) }}</small></p>
				<hr />
			</header>

			<!-- Pass in the navigator so that the post body can use state/context variables in its template if necessary. -->
			<component-body
			 v-if="bodyIsLoading === false && bodyError === false"
			 :bodyHTML="bodyHTML"
			 :navigator="navigator"
			 />
			<div v-else>
				<p v-if="bodyError === true">
					Page content failed to load. Please refresh this page, or
					<small>&nbsp;</small>
					<a :href="'?'+Date.now()"><button type="button">Click here to retry</button></a>
				</p>
				<div v-else>
					<component
					 v-if="navigator.loader"
					 :is="navigator.loader"
					 :navigator="navigator"
					 />
					<div v-else>
						<p>Loading...</p>
					</div>
				</div>
			</div>

		</article>
	</main>
</template>
<script>
	import toolkit from "jsen-sym-toolkit-for-interfaces";
	const t = toolkit;
	export default {
		...((new t.cmp.itemDefault({
			components: {
				'component-body': require('./body.vue').default
			},
			data: {
				
				// @assign
				//  We load the post's body from the websites static assets (/static/posts/{slug}/body.html), and use these variables to track progress.
				'bodyHTML': '<div />',
				'bodyIsLoading': true,
				'bodyError': false
				
	    },
			created () {
				return new Promise (async (resolve, reject) => {
					
					// @action
					this.ms_init_created();
					
					// @switch
					//  If there is a post (not 404) then load the post's body from the static assets folder (/static/posts/{slug}/body.html).
					if (!!this.context.attributes) {
						try {
							this.bodyHTML = '<div>' + (await t.utl.httpRequest(
								this.navigator.state.window.location.origin + '/static/posts/' + this.context.attributes['slug']['='] + '/body.html',
								'GET'
							)).body + '</div>';
						} catch ($e) {
							this.bodyError = true;
						}
					}
					
					// @assign
					this.bodyIsLoading = false;
					
				});
			},
			mounted () {
				
				// @assign
				//  Update the page's meta title to the post's title.
				this.navigator.state.window.document.title = this.context.attributes['title']['='] + ' | ' + this.navigator.state.window.document.querySelector('meta[name="siteTitle"]').getAttribute('content');
				
				// @assign
				//  Update the page's meta description to the post's description.
				this.navigator.state.window.document.querySelector('meta[name="description"]').setAttribute(
					'content',
					this.context.attributes['description']['=']
				);
				
			}
		})).pHVueConstructor)
	};
</script>
