document.getElementById('timeCapsuleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const message = document.getElementById('message').value;
    const unlockDate = document.getElementById('unlockDate').value;

    // Здесь можно добавить логику для сохранения сообщения и даты разблокировки
    console.log('Message:', message);
    console.log('Unlock Date:', unlockDate);

    alert('Time capsule sealed!');
});