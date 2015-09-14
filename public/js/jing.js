io = io.connect();

function appendMessage(msgList, msg, msgClass) {
    msgClass = msgClass || 'bg-primary';
    
    msgList.find('li').each(function(){
        $(this).removeClass();
    });
    msgList.append('<li class="' + msgClass + '">' + msg + '</li>');
}

function fixMessagesList(msgList) {
    var li = msgList.find('li');        
    if(li.length > messagesListLength) {
        var fli = msgList.find('li:nth-child(' + (li.length - messagesListLength) + ')');
        fli.hide('slow', function() {
            $(this).remove();
        });
    }
}

function unhideMessagesList(msgList) {
    if(msgList.hasClass('hide')) {
        msgList.removeClass('hide');
    }
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
        $('body').removeClass();
                
        var msgList = $('#msgList');
                
        unhideMessagesList(msgList);
        
        appendMessage(msgList, data.message);
        play('yoshiSound');
        fixMessagesList(msgList);
    });
    
    // you get message
    io.on('gongget', function(data) {
        $('body').addClass('jigsaw');
        play('jigsawSound');
    });
    
    io.on('startDemoGet', function(data) {
        $('body').removeClass();
        $('body').addClass('startDemo');
        
        var msgList = $('#msgList');
        unhideMessagesList(msgList);
        appendMessage(msgList, data.message, 'bg-danger');
        playAudioFile(data.audioFile);
        fixMessagesList(msgList);
        
    });
    
    io.on('endDemoGet', function(data) {
        $('body').removeClass();
        $('body').addClass('endDemo');
        
        var msgList = $('#msgList');
        unhideMessagesList(msgList);
        appendMessage(msgList, data.message, 'bg-success');
        playAudioFile(data.audioFile);
        fixMessagesList(msgList);
        
    });
});