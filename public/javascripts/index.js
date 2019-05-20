window.onload = $(() => {
    const socket = io.connect();
    const $messageForm = $('#messageForm');
    const $message = $('#message');
    const $chat = $('#chat');

    $messageForm.submit((e) => {
        e.preventDefault();
        console.log('submitted');
    })
});
