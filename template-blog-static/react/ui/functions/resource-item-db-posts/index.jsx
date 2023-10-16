import React from "react";
import toolkit from "jsen-sym-toolkit-for-interfaces";
const t = toolkit;
import ComponentBody from "./body.jsx";
const Component = function (
	...args
) {
	React.Component.call(this, ...args);
	t.cmp.itemDefault(this);
	
	// @signature
	this.loadBody = async function () {
		
		// @assign
		//  We load the post's body from the websites static assets (/static/posts/{slug}/body.html), and use these variables to track progress.
		this.bodyHTML = '';
		this.bodyIsLoading = true;
		this.bodyError = false;
		
		// @assign
		//  Update the page's meta title to the post's title.
		this.navigator.state.window.document.title = this.navigator.context.attributes['title']['='] + ' | ' + this.navigator.state.window.document.querySelector('meta[name="siteTitle"]').getAttribute('content');
		
		// @assign
		//  Update the page's meta description to the post's description.
		this.navigator.state.window.document.querySelector('meta[name="description"]').setAttribute(
			'content',
			this.navigator.context.attributes['description']['=']
		);
		
		// @switch
		//  If there is a post (not 404) then load the post's body from the static assets folder (/static/posts/{slug}/body.html).
		if (!!this.navigator.context.attributes) {
			try {
				await this.navigator.ma_watch_call(
					[this.navigator.context,this.navigator], // catchall comp watches nav
					(async () => {
						this.bodyHTML = (await t.utl.httpRequest(
							this.navigator.state.window.location.origin + '/static/posts/' + this.navigator.context.attributes['slug']['='] + '/body.html',
							'GET'
						)).body;
					})
				);
			} catch ($e) {
				this.bodyError = true;
			}
		}
		
		// @assign
		this.bodyIsLoading = false;
		
	};
	
	// @signature
	this.componentDidMount = async function () {
		
		// @action
		await this.ma_mounted_default();
		
		// @action
		await this.loadBody();
		
	};
	
	// @assign
	let previousContext = this.navigator.context;
	
	// @signature
	this.componentWillUpdate = async function () {
		
		// @repeat
	  this.watchers.forEach((watcher) => {
	    this.navigator.ms_unwatch(this, watcher);
	  });
	  
	  // @assign
	  this.watchers.length = 0;
	  
	};

	// @signature
	this.componentDidUpdate = async function () {
		
		// @action
		this.watchers.push(...[this.navigator.ms_watch(
			this,
			this.navigator.context
		)]);
		
		// @switch
		if (previousContext !== this.navigator.context) {
			
			// @action
			await this.loadBody();
			
			// @assign
			previousContext = this.navigator.context;
			
		}
		
	};
	
	// @signature
	this.render = function () {
		return (<>{this.navigator.context.name === '$dom:item/db.posts' ? (<main>
			
			<article>

				<header>
					<h1>{ this.navigator.context.attributes['title']['='] }</h1>
					<p><small>Posted on { {'01':'Jan.','02':'Feb.','03':'Mar.','04':'Apr.','05':'May','06':'Jun.','07':'Jul.','08':'Aug.','09':'Sep.','10':'Oct.','11':'Nov.','12':'Dec.'}[this.navigator.context.attributes['slug']['+'].substr(4, 2)] } { parseInt(this.navigator.context.attributes['slug']['+'].substr(6, 2)) }, { this.navigator.context.attributes['slug']['+'].substr(0, 4) }</small></p>
					<hr />
				</header>
				
				{/*<!-- Pass in the navigator so that the post body can use state/context variables in its template if necessary. -->*/}
				{this.bodyIsLoading === false && this.bodyError === false ? (
					<ComponentBody {...{
						'bodyHTML': this.bodyHTML,
						'navigator': this.navigator
					}} />
				) : (<div>
					{this.bodyError === true ? (<p>
						Page content failed to load. Please refresh this page, or
						<small>&nbsp;</small>
						<a href={'?'+Date.now()}><button type="button">Click here to retry</button></a>
					</p>) : (<div>
						{this.navigator.loader ? (
							<this.navigator.loader {...{
								'navigator': this.navigator
							}} />
						) : (<div>
							<p>Loading...</p>
						</div>)}
					</div>)}
				</div>)}

			</article>
			
		</main>) : (<></>)}</>);
	};
	
	return;
	
};
Component.prototype = Object.create(React.Component.prototype);
Component.prototype.constructor = Component;
Component.ma_on_navigate = t.cmp.itemDefault.ma_on_navigate;
export default Component;
