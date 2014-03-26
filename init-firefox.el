;;; init-firefox.js --- A set of functions to control firefox

;;; Commentary:
;; use moz-repl to interactive firefox with Emacs

;;; Code:

(autoload 'inferior-moz-process "moz" "MozRepl process" t)

(defun send-to-ff (content)
  (comint-send-string (inferior-moz-process)
                      content
                      )
  )

(defun ff-exec-script-in-tabs (script url-regex) 
  (send-to-ff
   (format "
(function(script,u){
        [].forEach.call(gBrowser.tabs,function(itm){
	    var ctab=itm.linkedBrowser;
	    if(ctab.contentDocument.location.host.match(u)){
	        var s=ctab.contentDocument.createElement('script')
	        s.textContent=script;
	        ctab.contentDocument.body.appendChild(s);
	    }
        });        
    })(\"%s\",\"%s\");
"
script url-regex
)
   )
  )

(defun fm-exec (script)
  (ff-exec-script-in-tabs script "douban\.fm")
  )

(defun fm-skip ()
  (interactive)
  (fm-exec "DBR.act('skip')")
  )

(defun fm-ban ()
  (interactive)
  (fm-exec "DBnnR.act('ban')")
  )

(defun fm-love ()
  (interactive)
  (fm-exec "DBR.act('love')")
  )

(defun fm-pause ()
  (interactive)
  (fm-exec "DBR.act('pause')")
  )

(defun fm-copy-song ()
  (interactive)
  (fm-exec "document.title=FM.getCurrentSongInfo().url")
  (send-to-ff "
[].forEach.call(gBrowser.tabs,function(itm){
	    var ctab=itm.linkedBrowser;
	    if(ctab.contentDocument.location.host.match('douban\.fm')){
                Components.classes['@mozilla.org/widget/clipboardhelper;1']
                .getService(Components.interfaces.nsIClipboardHelper)
                .copyString(ctab.contentTitle);
	    }});"
))

;;; init-firefox.js ends here

(provide 'init-firefox)

;;; init-firefox.el ends here
