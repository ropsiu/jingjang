io = io.connect();

$(function () {
    io.emit('connect');
    io.on('connected', function (data) {
        var el = $('#currConnectedCnt');
        el.hide('fast', function (e) {
            el.html(data.message);
            el.show('slow');
        });
    });

    $('#sendMsgForm').on('submit', function (e) {
        e.preventDefault();
        var msgField = $(this).find('#msg');
        var msg = $('<textarea/>').text(msgField.val()).html(), lmc = $('#lastMessageContainer');
        console.log(msg);
        msgField.val('');
        if (msg.length) {
            var cDate = new Date();
            msg = (cDate.now()) + ' <strong>' + msg + '</strong>';
            io.emit('msgsend', msg);
            if (lmc.hasClass('hide')) {
                lmc.removeClass('hide');
            }
            $('#lastMessage').hide('fast', function () {
                $(this).html(msg).show('slow');
            });
        }
        return false;
    });
    
    $('#startDemoForm').on('submit', function (e) {
        e.preventDefault();
        var currentTeamId = $('#currentTeamId').val();
        var currentTeamName = $("#currentTeamId option[value='" + currentTeamId + "']").text();
        var lmc = $('#lastMessageContainer');
        var cDate = new Date();
        
        msg = (cDate.now()) + ' [<span class="teamName">' + currentTeamName + '</span>] <strong>We\'re starting! Hurry up!</strong>';
        var resp = {
            "message": msg,
            "currentTeamId": currentTeamId
        };
        
        io.emit('startDemoSend', resp);
        if (lmc.hasClass('hide')) {
            lmc.removeClass('hide');
        }
        $('#lastMessage').hide('fast', function () {
            $(this).html(msg).show('slow');
        });
        
        return false;
    });
    
    $('#endDemoForm').on('submit', function (e) {
        e.preventDefault();
        var currentTeamId = $('#currentTeamId').val();
        var currentTeamName = $("#currentTeamId option[value='" + currentTeamId + "']").text();
        var msgField = $(this).find('#msg');
        var lmc = $('#lastMessageContainer');
        var cDate = new Date();
        
        msg = (cDate.now()) + ' [<span class="teamName">' + currentTeamName + '</span>] <strong>We have done.</strong>';
        var resp = {
            "message": msg,
            "currentTeamId": currentTeamId
        };
        io.emit('endDemoSend', resp);
        if (lmc.hasClass('hide')) {
            lmc.removeClass('hide');
        }
        $('#lastMessage').hide('fast', function () {
            $(this).html(msg).show('slow');
        });
        
        return false;
    });
    
    $('#sendGongForm').on('submit', function (e) {
        e.preventDefault();
        io.emit('gongsend');
        return false;
    });

});