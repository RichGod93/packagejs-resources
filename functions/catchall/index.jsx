import React from "react";
import toolkit from "jsen-sym-toolkit-for-interfaces";
const t = toolkit;
import "./index.css";
const Component = function (...args) {
	React.Component.call(this, ...args);
	t.cmp.catchallContext(this);

	// @signature
	this.onClickAddNode = async (event) => {
		if (!event.altKey && !event.shiftKey && !(event.metaKey || event.ctrlKey)) {
			// @action
			this.ma_go(
				event,
				this.navigator.context.lists["db.posts"].actions["POST"],
				true
			);
		}
	};

	// @signature
	this.onClickEditNode = async (event) => {
		if (event.altKey && !event.shiftKey && !(event.metaKey || event.ctrlKey)) {
			// @action
			this.ma_go(event, this.navigator.context.actions["DELETE"], true);
		} else if (
			!event.altKey &&
			!event.shiftKey &&
			!(event.metaKey || event.ctrlKey)
		) {
			// @action
			this.ma_go(event, this.navigator.context.actions["PATCH"], true);
		}
	};

	// @readme: CUSTOM (added menu toggle button)
	let menuOpen = false;

	// @readme: CUSTOM (added menu toggle button)
	// @signature
	this.onClickMenuToggle = async (event) => {
		if (!event.altKey && !event.shiftKey && !(event.metaKey || event.ctrlKey)) {
			// @assign
			menuOpen = !menuOpen;

			// @action
			this.navigator.state.window.document
				.querySelector("#app")
				.setAttribute("class", menuOpen ? "menuOpen" : "");

			// @action
			this.forceUpdate();
		}
	};

	// @signature
	this.render = function () {
		return (
			<main>
				{/*<!-- @readme: CUSTOM (added header) -->*/}
				<header class="inverted">
					<small>
						<a
							onClick={(e) => {
								this.ma_go(e, this.navigator.dom.root, true);
							}}
							href="/"
						>
							<h1>Clone</h1>
							<img src="/static/images/logo.png" />
						</a>
					</small>
					<nav>
						<hr />
						<small>
							<a
								onClick={(e) => {
									this.ma_go(e, "/about", true);
								}}
								href="/about"
							>
								<strong>About</strong>
							</a>
							<a
								onClick={(e) => {
									this.ma_go(e, "/press", true);
								}}
								href="/press"
							>
								<strong>Press</strong>
							</a>
							<a
								onClick={(e) => {
									this.ma_go(e, "/scheduling", true);
								}}
								href="/scheduling"
							>
								<strong>Scheduling</strong>
							</a>
							<a
								onClick={(e) => {
									this.ma_go(e, "/contact", true);
								}}
								href="/contact"
							>
								<strong>Contact</strong>
							</a>
							<a
								onClick={(e) => {
									this.ma_go(e, "/request", true);
								}}
								href="/request"
							>
								<strong>Request a greeting</strong>
							</a>
							{this.navigator.state.options.deployment !== "live" &&
								this.navigator.context.name === "$dom:root" ? (
								<>
									<a onClick={this.onClickAddNode}>
										<strong>Add new post</strong>
									</a>
								</>
							) : (
								<></>
							)}
							{this.navigator.state.options.deployment !== "live" &&
								this.navigator.context.name === "$dom:item/db.posts" ? (
								<>
									<a onClick={this.onClickEditNode}>
										<strong>Edit post</strong>
									</a>
								</>
							) : (
								<></>
							)}
						</small>
						<hr />
					</nav>
				</header>

				{/*<!-- @readme: CUSTOM (added menu toggle button) -->*/}
				<button
					id="openMenu"
					type="button"
					className="button plain"
					onClick={this.onClickMenuToggle}
				>
					{menuOpen ? <>X</> : <>|</>}
				</button>

				{/*<!-- @readme: CUSTOM (added footer) -->*/}
				<footer class="inverted">
					<small>
						<img src="/static/images/logo.png" />
						<br />
						<strong>An Example Website in the Style of The Barack Obama Website</strong>
					</small>
					<small>© 2023 | Legal & Privacy</small>
				</footer>

				{/*<!-- @readme: CUSTOM (remove default nav buttons) -->*/}
				{/*<!-- Show this button on the home page, but not if this is the live version of the site (only the local version should be editable). -->*/}
				{/*<!-- {this.navigator.state.options.deployment !== 'live' && this.navigator.context.name === '$dom:root' ? (<>
				<button
				 type="button"
				 onClick={this.onClickAddNode}
				 >Add new post</button>
			</>) : (<></>)} -->*/}

				{/*<!-- @readme: CUSTOM (remove default nav buttons) -->*/}
				{/*<!-- Show this button on the post page, but not if this is the live version of the site (only the local version should be editable). -->*/}
				{/*<!-- {this.navigator.context.name === '$dom:item/db.posts' ? (<>
				<button
				 type="button"
				 onClick={((e) => { this.ma_go(e, this.navigator.dom.root, true) })}
				 >Home</button>
			</>) : (<></>)} -->*/}

				{/*<!-- @readme: CUSTOM (remove default nav buttons) -->*/}
				{/*<!-- Show this button on the post page, but not if this is the live version of the site (only the local version should be editable). -->*/}
				{/*<!-- {this.navigator.state.options.deployment !== 'live' && this.navigator.context.name === '$dom:item/db.posts' ? (<>
				<button
				 type="button"
				 onClick={this.onClickEditNode}
				 >Edit post</button>
			</>) : (<></>)} -->*/}
			</main>
		);
	};

	return;
};



Component.prototype = Object.create(React.Component.prototype);
Component.prototype.constructor = Component;
export default Component;
