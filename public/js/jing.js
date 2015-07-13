io = io.connect();

function appendMessage(msgList, msg) {
    msgList.find('li').each(function(){
        $(this).removeClass('bg-primary');
    });
    msgList.append('<li class="bg-primary">' + msg + '</li>');
}

$(function(){
    // display stored messages
    messages = messages || [];
    if(messages.length) {
        var i=0, msgList = $('#msgList');
        if(msgList.hasClass('hide')) {
            msgList.removeClass('hide');
        }
        for(var i=0; i<messages.length; i++) {
            appendMessage(msgList, messages[i]);
        }
            
    }
    
    // say hello!
    io.emit('connect');
    
    // you get message
    io.on('msgget', function(data) {
        //---8<--- TO REMOVE!!!
        $('body').removeClass('jigsaw');
        //--->8--- TO REMOVE!!!
        var msgList = $('#msgList'), cDate = new Date(), li;
                
        if(msgList.hasClass('hide')) {
            msgList.removeClass('hide');
        }
        
        appendMessage(msgList, data.message);
        play('yoshiSound');
        li = msgList.find('li');        
        if(li.length > 3) {
            var fli = msgList.find('li:nth-child(' + (li.length - 3) + ')');
            fli.hide('slow', function() {
                $(this).remove();
            });
        }
    });
    
    // you get message
    io.on('gongget', function(data) {
        $('body').addClass('jigsaw');
        play('jigsawSound');
    });
});