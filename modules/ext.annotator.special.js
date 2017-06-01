api.getAllCategoryPageForms(function(results) {
    var categories = [];
    Object.keys(results).forEach(function(prop) {
        var category = {};
        category['form'] = results[prop].fulltext.split('#')[0];
        category['form_url'] = results[prop].fullurl.split('#')[0];
        category['name'] = results[prop].printouts['SA Category Name'][0];
        category['color'] = results[prop].printouts['SA Category Color'][0];
        categories.push(category);
    });

    printTable(categories);
});

function printTable(categories) {
    // Set all highlight colors here.
    // Append css class '.annotator-hl-sia-COLOR' to modules/lib/plugins/annotator_view/css/style.css
    // and add translation
    var hl_colors = ['red', 'yellow', 'green', 'blue', 'grey'];
    $( "#sa-categories" ).empty();
    $( "#sa-categories" ).append( '<table id="categories-table" class="table table-sm table-hover" style="margin-bottom: 0px;"><tr></tr></table>' );
    // TODO: localization
    $( "#categories-table tr" ).append( '<th>'+mw.msg('sta-category')+'</th><th>'+mw.msg('sta-pageforms-form')+'</th><th>'+mw.msg('sta-color')+'</th><th></th>' );
    categories.forEach(function(category) {
        var row = $( "<tr></tr>" );
        $( "#categories-table" ).append(row);

        $( row ).append( '<td>' + category.name + '</td>' );
        $( row ).append( '<td><a href="' + category.form_url + '">' + category.form + '</a></td>' );
		$( row ).append( '<td><span class="special-color-preview annotator-hl-'+category.color+'"></span></td>' );

        var button = $( '<button class="btn btn-danger">'+mw.msg('sta-delete')+'</button>' );
        button.click(function() {
            deleteCategoryPageFormAssignment(category.name, category.form, category.color);
        });
        var button_col = $( '<td style="text-align: right;"></td>' ).append( button );
        $( row ).append( button_col );
    });

    var row = $( "<tr></tr>" );
    $( "#categories-table" ).append(row);

    $( row ).append( '<td><input id="new_category_name" class="form-control" type="text"></td>' );
    $( row ).append( '<td><select id="new_category_form" class="form-control"></select></td>' );

    var categories_form = categories.map(function (item) {
        return item.form;
    });
    categories_form.push('Form:TextAnnotation');

    api.getAllPageFormPages(function(allpages) {
        allpages.forEach(function(item) {
            if(categories_form.indexOf(item.title) == -1){
                $( "#new_category_form" ).append( '<option>' + item.title + '</option>' );
            }
        });
    });
    $( row ).append( '<td><select id="new_category_color" class="form-control"></select></td>' );

    $( '#new_category_color' ).addClass('annotator-hl-' + hl_colors[0]);

    var hl_color_classes = '';
    hl_colors.forEach(function (color) {
        hl_color_classes += 'annotator-hl-' + color + ' '
    });

    hl_colors.forEach(function (color) {
        var color_option = $( '<option class="annotator-hl-' + color + '" value="' + color + '">' + mw.msg("sta-" + color) + '</option>' );
        $( '#new_category_color' ).append( color_option );
        $( '#new_category_color' ).change(function () {
            var selected_color = $( "#new_category_color" ).val();
            $( '#new_category_color' ).removeClass(hl_color_classes);
            $( '#new_category_color' ).addClass('annotator-hl-' + selected_color);
        });
    });

    var button = $( '<button class="btn btn-primary">'+mw.msg('sta-add')+'</button>' );
    button.click(function() {
        var name = $( "#new_category_name" ).val();
        var form = $( "#new_category_form" ).val();
        var color = $( "#new_category_color" ).val();
		buildCategoryPageFormAssignment(name, form, color);
    });
    var button_col = $( '<td style="text-align: right;"></td>' ).append( button );
    $( row ).append( button_col );
}

function deleteCategoryPageFormAssignment(name, form, color){
    appendLoadingSpinner();
    api.getPageContent(form, function (old_form_content) {
        old_form_content = old_form_content.replace('{{#subobject:SemanticTextAnnotator\n|Form Type=SemanticTextAnnotator\n|SA Category Name='+name+'\n|SA Category Color='+color+'\n}}\n', '');
        // Remove text annotation template
        old_form_content = old_form_content.replace(/({{{for template\|TextAnnotation}}})(.|\n)*({{{end template}}})/i, "");

        api.createPage(form, old_form_content, function () {
            window.location.reload(true);
        });
    });
}

function buildCategoryPageFormAssignment(name, form, color){
    if(name.length < 1 || form.length < 1){
        return;
    }
    appendLoadingSpinner();
    api.getPageContent(form, function (new_form_content) {
        api.getPageContent('Form:TextAnnotation', function (sa_form_content) {
            var regex_start = /\{\{\{for template\|TextAnnotation}}}/g;
            var regex_end = /\{\{\{end template}}}/g;
            var text_annotation_form_content = util.extractTextBetweenRegexes(sa_form_content, regex_start, regex_end);

            new_form_content = new_form_content.replace(/'''[\w\s]+:'''/g, text_annotation_form_content + '\n\'\'\'Free text:\'\'\'');
            new_form_content = new_form_content.replace('</noinclude>', '{{#subobject:SemanticTextAnnotator\n|Form Type=SemanticTextAnnotator\n|SA Category Name='+name+'\n|SA Category Color='+color+'\n}}\n</noinclude>');

            api.createPage(form, new_form_content, function () {
                window.location.reload(true);
            });
        });
    });
}

function appendLoadingSpinner() {
    $('body').append('<div class="annotator-loading"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>');
}
