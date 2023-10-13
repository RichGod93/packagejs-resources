<template>
  <div v-html="componentHTML" />
</template>

<script>
export default {
    props: ['bodyHTML', 'navigator'],
    data () {
      
      // @assign
  		let componentHTML = this.bodyHTML;
  		
  		// @action
  		//  Replace any navigator template variables used in post bodies (this can be done more easily / automatically with an external library) -- just done manually here as an example.
  		componentHTML = componentHTML.replace(/\{\{navigator\.context\.name\}\}/g, this.navigator.context.name);
  		
  		// @return
      return {
        componentHTML: componentHTML
      };
      
    }
	};
</script>
