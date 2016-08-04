/**
 * Thanks to nick for this snippet.
 *
 * Customize the message module so it wont constantly be telling the user that
 * lookup tables have been loaded and written to.
 * Unfortunately this is the least evil way I was able to find to
 * override the message handling.
 */
if (Splunk.Module.Message) {
    Splunk.Module.Message= $.klass(Splunk.Module.Message, {
        getHTMLTransform: function($super){
            // Please dont tell me any 'info' about lookups, nor 'error' about entityLabelSingular, etc...
            // Thank you that is all.
            var argh = [
                {contains:"lookup", level:"info"},
                {contains:"Results written to", level:"info"},
                {contains:"entityLabelSingular", level:"error"},
                {contains:"auto-finalized", level:"info"},
                {contains:"Your timerange was substituted", level:"info"},
                {contains:"unusually slow", level:"warn"},
                {contains:"Specified field(s) missing from results", level:"warn"}
            ];
            for (var i=0,len=this.messages.length; i<len; i++){
                var message = this.messages[i];
                for (var j=0,jLen=argh.length;j<jLen;j++) {
                    if ((message.content.indexOf(argh[j]["contains"])!=-1) && (message.level == argh[j]["level"])) {

                        this.messages.splice(i,1);
                        break;
                    }
                }
            }
            return $super();
        }
    });
}

// Hide help links on the help page
$('a[href$="_help_help"]').each(function() {
  this.style.display = 'none';
});
