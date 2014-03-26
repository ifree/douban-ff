let INFO = xml`
<plugin name="doubafm helper" version="1.0"
        href="http://programming4fun.com"
        summary="control doubanfm player"
        xmlns="http://com.programming4fun.common">
    <author>Frei Zhang</author>
    <license href="http://opensource.org/licenses/mit-license.php">MIT</license>
    <project name="Vimperator" minVersion="2.0"/>
    <p>
        Just a simple tool for control doubanfm player golbally
    </p>
</plugin>`;

(function(){
    function execScriptInTabs(filter,domjs){
        [].forEach.call(gBrowser.tabs,function(itm){
	    var ctab=itm.linkedBrowser;
	    if(filter(ctab)){
	        var s=ctab.contentDocument.createElement('script')
	        s.textContent=domjs;
	        ctab.contentDocument.body.appendChild(s);
	    }
        });
    }
    
    mappings.add(
        [modes.NORMAL],
        [",ds"],"skip",
        function(){
            execScriptInTabs(function(ctab){
                return ctab.contentDocument.location.host.match("douban\.fm");
            },"DBR.act('skip')");//skip,pause,love
        }
    );
    mappings.add(
        [modes.NORMAL],
        [",db"],"ban",
        function(){
            execScriptInTabs(function(ctab){
                return ctab.contentDocument.location.host.match("douban\.fm");
            },"DBnnR.act('ban')");//skip,pause,love
        }
    );
    mappings.add(
        [modes.NORMAL],
        [",dl"],"like",
        function(){
            execScriptInTabs(function(ctab){
                return ctab.contentDocument.location.host.match("douban\.fm");
            },"DBR.act('love')");//skip,pause,love
        }
    );
    mappings.add(
        [modes.NORMAL],
        [",dp"],"pause",
        function(){
            execScriptInTabs(function(ctab){
                return ctab.contentDocument.location.host.match("douban\.fm");
            },"DBR.act('pause')");//skip,pause,love
        }
    );
    mappings.add(
        [modes.NORMAL],
        [",dc"],"get current music",
        function(){
            execScriptInTabs(function(ctab){
                return ctab.contentDocument.location.host.match("douban\.fm");
            },"document.title=FM.getCurrentSongInfo().url");//= =            
            [].forEach.call(gBrowser.tabs,function(itm){
	    var ctab=itm.linkedBrowser;
	    if(ctab.contentDocument.location.host.match("douban\.fm")){
                Components.classes["@mozilla.org/widget/clipboardhelper;1"]
                .getService(Components.interfaces.nsIClipboardHelper)
                .copyString(ctab.contentTitle);
	    }
        });
        }
    );
})();

