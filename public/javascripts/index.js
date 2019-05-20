window.onload = $(() => {
    const socket = io.connect();
    const $messageForm = $('#messageForm');
    const $message = $('#message');
    const $chat = $('#chat');
    const $userForm = $('#userForm');
    const $userFormArea = $('#userFormArea');
    const $messageArea = $('#messageArea');
    const $users = $('#users');
    const $username = $('#username');

    $messageForm.submit((e) => {
        e.preventDefault();
        socket.emit('send message', $message.val());
        $message.val('');
    });

    $userForm.submit((e) => {
        e.preventDefault();
        socket.emit('new user', $username.val(), (data) => {
            if (data) {
                $userFormArea.hide();
                $messageArea.show();
            }
        });
        $username.val('');
    });

    socket.on('new message', (data) => {
        $chat.append(`<div class="well"><strong>${data.user}</strong>: ${data.message}</div>`)
    });

    socket.on('get users', (data) => {
        let html = '';
        for (let i = 0; i < data.length; i++) {
            html += `<li class="list-group-item">${data[i]}</li>`;
        }
        $users.html(html);
    })
});
