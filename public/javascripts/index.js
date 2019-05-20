window.onload = $(() => {
    const socket = io.connect();
    const $messageForm = $('#messageForm');
    const $message = $('#message');
    const $chat = $('#chat');

    $messageForm.submit((e) => {
        e.preventDefault();
        socket.emit('send message', $message.val());
        $message.val('');
    });

    socket.on('new message', (data) => {
        $chat.append(`<div class="well">${data.message}</div>`)
    })
});
