var api = {
    getToken: function (callback) {
        var getTokenUrl = mw.config.get('wgScriptPath')+'/api.php?action=query&meta=tokens&format=json';
        var token;
        $.getJSON(getTokenUrl, function(json) {
            callback( json.query.tokens.csrftoken );
        });
    },

    getAllPageFormPages: function (callback) {
        var url = mw.config.get('wgScriptPath')+'/api.php?action=query&list=allpages&apnamespace=106&format=json';
        $.getJSON(url, function(json) {
            callback(json.query.allpages);
        });
    },

    getAllCategoryPageForms: function (callback) {
        var url = mw.config.get('wgScriptPath')+'/api.php?action=ask&query=[[Form Type::SemanticTextAnnotator]]|?SA Category Name|?SA Category Color&format=json';
        $.getJSON(url, function(json) {
            callback(json.query.results);
        });
    },

    getPageContent: function (pagename, callback) {
        var url = mw.config.get('wgScriptPath')+'/api.php?action=query&prop=revisions&rvprop=content&format=json&titles='+pagename;
        $.getJSON(url, function(json) {
            pid = Object.keys(json.query.pages)[0];
            if(pid != -1){
                callback(json.query.pages[pid].revisions[0]['*']);
            }else{
                callback('');
            }
        });
    },

    createPage: function (pagename, content, callback) {
        this.getToken(function (token) {
            var url = mw.util.wikiScript('api');
            $.post(url, {
                format: 'json',
                action: 'edit',
                title: pagename,
                text: content,
                token: token })
            .always(function() {
                callback();
            });
        });
    },

    deletePage: function (url) {
        this.getToken(function (token) {
            $.post(url, { token: token });
        });
    },

    existPage: function (pagename,callback) {
        var url = mw.config.get('wgScriptPath')+'/api.php?action=query&titles=' + pagename + '&format=json';
        $.getJSON(url, function(json) {
          debugger;
            pid = Object.keys(json.query.pages)[0];
            if(pid != -1){
                callback(true);
            }else{
                callback(false);
            }
        });
    }
};
