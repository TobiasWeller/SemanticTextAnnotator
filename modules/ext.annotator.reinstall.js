(function() {
    if ($('#reinstall-btn').length) {
        //existiert
        //Füge button ein
        $('#reinstall-btn').click(function() {
            swal({
                title: mw.msg('sta-reinstall-header'),
                text: mw.msg('sta-request-reinstall'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: mw.msg('sta-confirm-reinstall')
            }).then(function() {
                appendLoadingSpinner();
                //Form neu Installieren
                api.createPage('Form:TextAnnotation', getFormText(), function() {
                    window.location.reload(false);
                });
                //Template neu Installieren
                api.createPage('Template:TextAnnotation', getTemplateText(), function() {
                    window.location.reload(false);
                });
                //TextAnnotation Category
                api.createPage('Category:TextAnnotation', 'This is the TextAnnotation category used by Semantic Text Annotator.\n\n[[Category:Annotation]]', function() {
                    window.location.reload(false);
                });
                //Annotation Category
                api.createPage('Category:Annotation', 'This is the Annotation category used by the Annotator Tools.', function() {
                    window.location.reload(false);
                });
                //Properties:
                reinstallProperty('Property:Annotation_of', '[[Has type::Page]]');
                reinstallProperty('Property:AnnotationComment', '[[Has type::Text]]');
                reinstallProperty('Property:LastModificationDate', '[[Has type::Date]]');
                reinstallProperty('Property:LastModificationUser', '[[Has type::Page]]');
                reinstallProperty('Property:AnnotationMetadata', '[[Has type::Code]]');

                //For every form:

                api.getAllCategoryPageForms(function(results) {
                    Object.keys(results).forEach(function(prop) {
                        //  var category = {};
                        var categoryForm = results[prop].fulltext.split('#')[0];
                        //    category['form_url'] = results[prop].fullurl.split('#')[0];
                        //    category['name'] = results[prop].printouts['SA Category Name'][0];
                        //    category['color'] = results[prop].printouts['SA Category Color'][0];
                        replaceSubobject(categoryForm);
                    });
                });
            })

        });

    }

}());

function reinstallProperty(pagename, content) {
    api.createPage(pagename, content, function() {
        window.location.reload(false);
    });
}

function replaceSubobject(pagename) {
    api.getPageContent(pagename, function(content) {
        var tmp = content;
        content = content.replace(/({{#subobject:SemanticTextAnnotator)(.|\n)*?(}})/i, "");
        if (content == tmp) {
            alert('Could not Reinstall Form ' + pagename);
        }
        api.createPage(pagename, content, function() {
            window.location.reload(false);
        });
    });
}

function getFormText() {
    var text = '<noinclude>' + '\n';
    text += 'Please do not use or modify this form because it belongs to Semantic Text Annotator Extension.' + '\n';
    text += '</noinclude><includeonly>' + '\n';
    text += '{{{for template|TextAnnotation}}}' + '\n';
    text += '{| class="formtable"' + '\n';
    text += '! AnnotationOf: ' + '\n';
    text += '| {{{field|AnnotationOf|hidden}}}' + '\n';
    text += '|-' + '\n';
    text += '! AnnotationComment: ' + '\n';
    text += '| {{{field|AnnotationComment|hidden}}}' + '\n';
    text += '|-' + '\n';
    text += '! LastModificationDate: ' + '\n';
    text += '| {{{field|LastModificationDate|hidden}}}' + '\n';
    text += '|-' + '\n';
    text += '! LastModificationUser: ' + '\n';
    text += '| {{{field|LastModificationUser|hidden}}}' + '\n';
    text += '|-' + '\n';
    text += '! AnnotationMetadata: ' + '\n';
    text += '| {{{field|AnnotationMetadata|hidden}}}' + '\n';
    text += '|}' + '\n';
    text += '{{{end template}}}' + '\n';
    text += "'''Free text:'''" + '\n';
    text += '{{{standard input|free text|rows=3}}}' + '\n';
    text += '{{{standard input|save}}} {{{standard input|preview}}} {{{standard input|cancel}}}' + '\n';
    text += '</includeonly>\n'
    return text;
}

function getTemplateText() {
    var text = '<noinclude>' + '\n';
    text += 'This is the "TextAnnotation" template.' + '\n';
    text += 'It should be called in the following format:' + '\n';
    text += '<pre>' + '\n';
    text += '{{TextAnnotation' + '\n';
    text += '|AnnotationOf=' + '\n';
    text += '|AnnotationComment=' + '\n';
    text += '|LastModificationDate=' + '\n';
    text += '|LastModificationUser=' + '\n';
    text += '|AnnotationMetadata=' + '\n';
    text += '}}' + '\n';
    text += '</pre>' + '\n';
    text += 'Edit the page to see the template text.' + '\n';
    text += '</noinclude><includeonly>{| class="wikitable"' + '\n';
    text += '! Annotation of' + '\n';
    text += '| [[Annotation of::{{{AnnotationOf|}}}]] ' + '\n';
    text += '|-' + '\n';
    text += '! Annotation Comment' + '\n';
    text += '| [[AnnotationComment::{{{AnnotationComment|}}}]] ' + '\n';
    text += '|-' + '\n';
    text += '! Last Modification Date' + '\n';
    text += '| [[LastModificationDate::{{{LastModificationDate|}}}]] ' + '\n';
    text += '|-' + '\n';
    text += '! Last Modification User' + '\n';
    text += '| [[LastModificationUser::{{{LastModificationUser|}}}]] ' + '\n';
    text += '|-' + '\n';
    text += '! Annotation Metadata' + '\n';
    text += '| [[AnnotationMetadata::{{{AnnotationMetadata|}}}]] ' + '\n';
    text += '|}' + '\n\n';

    text += '[[Category:TextAnnotation]]' + '\n';
    text += '</includeonly>' + '\n';

    return text;
}
