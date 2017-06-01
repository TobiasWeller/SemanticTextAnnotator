function startRepairMode (annotationsStore) {
    var stepCount = 0;

    swal({
        title: mw.msg('sta-repair-welcome-title'),
        text: mw.msg('sta-repair-welcome-text'),
        type: 'info',
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then(function () {
        nextAnnotation();
    },
    function () {
        nextAnnotation();
    });

    function nextAnnotation() {
        if(stepCount < annotationsStore.removedAnnotations.length){
            var annotator = $('#content').annotator().annotator().data('annotator');
            var annotation = annotationsStore.removedAnnotations[stepCount];
            swal({
                title: mw.msg('sta-repair-info-title'),
                type: 'info',
                html:
                'Quote: <b>'+annotation.quote+'</b><br>' +
                'Created at: <i>'+util.formatDate(annotation.data_creacio)+'</i><br>' +
                'User: <i>'+annotation.user.name+'</i><br>' +
                'Category: <i>'+annotation.category+'</i><br><br>' +
                '<a target="_blank" href="' +
                mw.config.get('wgScript') + '/Annotation:' +
                mw.config.get('wgPageName') + '/' + annotation.id +
                '">' + mw.msg( 'sta-article-link' ) + '</a><br>' +
                '<br>' + mw.msg('sta-repair-annotation-info-text'),
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: mw.msg('sta-repair'),
                cancelButtonText: mw.msg('sta-skip')
            }).then(function () {
                stepCount++;
                $('.annotator-wrapper').bind('click.repair', function () {
                    var tmp_annotation = annotator.setupAnnotation(annotator.createAnnotation());
                    annotator.adder.hide();
                    annotation.ranges = tmp_annotation.ranges; //$.extend(true, [], tmp_annotation.ranges);
                    annotation.quote = tmp_annotation.quote;
                    updateAnnotationMetadata(annotation);

                    $('.annotator-wrapper').unbind('click.repair');

                    swal({
                        title: mw.msg('sta-repair-done-title'),
                        text: mw.msg('sta-repair-done-text'),
                        type: 'success',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    }).then(function () {
                        nextAnnotation();
                    },
                    function () {
                        nextAnnotation();
                    });
                });
            }, function () {
                stepCount++;
                nextAnnotation();
            });
        }else{
            swal({
                title: mw.msg('sta-repair-all-done-title'),
                text:  mw.msg('sta-repair-all-done-text'),
                type: 'success'
            }).then(function () {
                endRepairMode();
            }, function () {
                endRepairMode();
            });
        }
    }
}

function endRepairMode() {
    $('body').append('<div class="annotator-loading"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>');
    location.reload();
}

function updateAnnotationMetadata(annotation) {
    api.getPageContent('Annotation:' + mw.config.get('wgPageName') + '/' + annotation.id, function (content) {
        if(content.length > 0){
            var page_content = content.replace(/\|AnnotationMetadata=.*/g, '|AnnotationMetadata='+util.fromJsonToEscaped(annotation));
            api.createPage('Annotation:' + mw.config.get('wgPageName') + '/' + annotation.id, page_content);
        }
    });
}