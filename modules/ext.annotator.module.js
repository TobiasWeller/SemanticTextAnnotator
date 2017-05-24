/**
 * Annotator Extension Module Script
 * Author: DominikMartin, BenjaminHosenfeld
 */

( function () {
	var url = mw.config.get('wgScriptPath')
		+'/api.php?action=ask&query='
		+'[[Category:TextAnnotation]]'
		+'[[Annotation of::'+mw.config.get('wgPageName')+']]'
		+'|?AnnotationComment|?AnnotationMetadata&format=json';
	$.getJSON(url, function(json) {
		var annotations = util.parseAskApiCall(json);
		annotationsStore.init(annotations);
	})
		.done(function() {
			/* start annotator if loading successfully */
			console.log("loading annotations completed");

			api.getAllCategoryPageForms(function(results) {
				categories = new Object();
				Object.keys(results).forEach(function(prop) {
					categoriesMap[results[prop].printouts['SA Category Name'][0]] = results[prop].fulltext;
					categories[results[prop].printouts['SA Category Name'][0]] = 'annotator-hl-'+results[prop].printouts['SA Category Color'][0];
				});
				initAnnotator();
			});
		})
		.fail(function() {
			console.log("loading annotations error");
		})
}() );

function initAnnotator(){
	if (typeof $.fn.annotator !== 'function') {
		console.error("annotator not found");
	} else {
		var content = $('#content').annotator();

		var annotator = content.annotator().data('annotator');
		annotator.addPlugin('Permissions', {
			user: {id: mw.user.getId(), name: mw.user.getName()},
			userId: function (user) {
				if (user && user.id) {
					return user.id;
				}
				return user;
			},
			userAuthorize: function(action, annotation, user) {
				if (annotation.permissions) {
					return true;
				}
			},
			showViewPermissionsCheckbox: false,
			showEditPermissionsCheckbox: false
		});

		content.annotator('addPlugin', 'Categories', categories);
		content.annotator('addPlugin', 'AnnotatorViewer');
		content.annotator('addPlugin', 'Search');
		content.annotator('addPlugin', 'MediaWiki');
	}
	$('.annotator-loading').hide();
}

var categoriesMap = new Object();
var categories;