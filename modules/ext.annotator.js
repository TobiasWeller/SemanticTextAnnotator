/**
 * Annotator Extension Main Script
 * Author: DominikMartin, BenjaminHosenfeld
 */
//mw.notify( $('<span>Hallo ' + mw.user.getName() + ',<br>Sie können Annotator nun benutzen indem Sie auf '+mw.msg('annotate-button-text')+' klicken...</span>') );

// flag representing the status of annotator mode
var loaded = false;

( function () {
	// append annotate button and status to menu
	if (mw.config.get('wgAction') == 'view') {
		$('#p-views>ul').append('<li id="ca-annotate"><span><a href="#" title="'+mw.msg('annotate-button-desc')+'" accesskey="a">'+mw.msg('annotate-button-text')+'</a><i class="fa fa-check" aria-hidden="true"></i></span></li>');

		// do if annotate button is clicked
		$('#ca-annotate').click(function() {
			$('body').append('<div class="annotator-loading"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>');
			loaded = !loaded;

			if(loaded){
				mw.loader.using( 'ext.annotator.module' ).then( function () {
	                $( '#ca-annotate' ).addClass( 'selected' );
					// if module is loaded message will pop up
					mw.notify( mw.message('annotate-welcome-message') );
				} );
			}else{
				//$('#content').annotator('destroy');
	            $( '#ca-annotate' ).removeClass( 'selected' );
				mw.notify( mw.message('annotate-godbye-message') );
				location.reload();
			}

	});
	}
}() );
