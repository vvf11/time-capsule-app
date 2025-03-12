// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('timeCapsuleForm');
    const capsuleList = document.getElementById('capsuleList');

    // Загрузка капсул из localStorage при загрузке страницы
    loadCapsules();

    // Обработка отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = document.getElementById('message').value;
        const unlockDate = document.getElementById('unlockDate').value;

        if (!message || !unlockDate) {
            alert('Please fill in both fields.');
            return;
        }

        // Создание новой капсулы
        const capsule = {
            message,
            unlockDate,
            createdAt: new Date().toISOString()
        };

        // Сохранение капсулы в localStorage
        saveCapsule(capsule);

        // Очистка формы
        form.reset();

        // Обновление списка капсул
        loadCapsules();
    });

    // Функция для сохранения капсулы в localStorage
    function saveCapsule(capsule) {
        let capsules = JSON.parse(localStorage.getItem('capsules')) || [];
        capsules.push(capsule);
        localStorage.setItem('capsules', JSON.stringify(capsules));
    }

    // Функция для загрузки капсул из localStorage
    function loadCapsules() {
        let capsules = JSON.parse(localStorage.getItem('capsules')) || [];
        capsuleList.innerHTML = ''; // Очистка списка

        capsules.forEach((capsule, index) => {
            const listItem = document.createElement('li');

            const currentDate = new Date();
            const unlockDate = new Date(capsule.unlockDate);
            const isUnlocked = currentDate >= unlockDate;

            listItem.innerHTML = `
                <span>${isUnlocked ? '🔓' : '🔒'} ${capsule.message}</span>
                <span class="status">${isUnlocked ? 'Unlocked' : `Unlock on ${capsule.unlockDate}`}</span>
            `;

            capsuleList.appendChild(listItem);
        });
    }
});
