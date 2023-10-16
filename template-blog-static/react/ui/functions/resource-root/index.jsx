import React from "react";
import toolkit from "jsen-sym-toolkit-for-interfaces";
const t = toolkit;
const Component = function (
	...args
) {
	React.Component.call(this, ...args);
	t.cmp.rootDefault(this);
	
	// @signature
	this.componentDidMount = async function () {
		
		// @action
		await this.ma_mounted_default();
		
		// @action
		//  Because we're going to access a child context, we have to manually add it to the watch list (react only).
		this.watchers.push(this.navigator.ms_watch(
      this,
      this.navigator.context.lists['db.posts']
    ));
		
		// @assign
		//  Update the page's meta title to the site's title.
		this.navigator.state.window.document.title = this.navigator.state.window.document.querySelector('meta[name="siteTitle"]').getAttribute('content');
		
		// @assign
		//  Update the page's meta description to the site's description.
		this.navigator.state.window.document.querySelector('meta[name="description"]').setAttribute(
			'content',
			this.navigator.state.window.document.querySelector('meta[name="siteDescription"]').getAttribute('content')
		);
		
	};
	
	// @signature
	this.render = function () {
		return (<>{this.navigator.context.name === '$dom:root' ? (<main>
			
			<t.react.searchContext {...{
				"pIJSENModInterfaceClsStateExtReactJSClsDOMNavigator": this.navigator,
				"pIContextAction": this.navigator.context.lists['db.posts'].actions['GET']
			}} />
			
			{this.navigator.context.lists['db.posts'].items.map((v, i) => {
				return (<p key={"lists-"+i}>
					<a
					 onClick={((e) => { this.ma_go(e, v) })}
					 href={'/db.posts/'+v.attributes['slug']['=']}
					 title={v.attributes['title']['=']}
					 ><u>{ v.attributes['title']['='] }</u></a>
					<br />
					{ v.attributes['description']['='] }
				</p>);
			})}
			
			<t.react.searchLoadmore {...{
				"pIJSENModInterfaceClsStateExtReactJSClsDOMNavigator": this.navigator,
				"pIContextAction": this.navigator.context.lists['db.posts'].actions['GET']
			}} />
			
		</main>) : (<></>)}</>);
	};
	
	return;
	
};
Component.prototype = Object.create(React.Component.prototype);
Component.prototype.constructor = Component;

Component.ma_on_navigate = async function (
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

export default Component;
