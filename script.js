document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('timeCapsuleForm');
    const openedCapsuleList = document.getElementById('openedCapsuleList');
    const latestCapsuleList = document.getElementById('latestCapsuleList');

    // Загрузка капсул из localStorage при загрузке страницы
    loadCapsules();

    // Обработка отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value.trim();
        const message = document.getElementById('message').value.trim();
        const unlockDate = document.getElementById('unlockDate').value;
        const imageInput = document.getElementById('image');
        let imageUrl = '';

        if (imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = function() {
                imageUrl = reader.result;
                saveAndLoadCapsule(title, message, unlockDate, imageUrl);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            saveAndLoadCapsule(title, message, unlockDate, imageUrl);
        }

        // Очистка формы
        form.reset();
    });

    // Функция для сохранения и загрузки капсулы
    function saveAndLoadCapsule(title, message, unlockDate, imageUrl) {
        const capsule = {
            title,
            message,
            unlockDate,
            imageUrl,
            createdAt: new Date().toISOString()
        };

        // Сохранение капсулы в localStorage
        saveCapsule(capsule);

        // Обновление списка капсул
        loadCapsules();
    }

    // Функция для сохранения капсулы в localStorage
    function saveCapsule(capsule) {
        let capsules = JSON.parse(localStorage.getItem('capsules')) || [];
        capsules.push(capsule);
        localStorage.setItem('capsules', JSON.stringify(capsules));
    }

    // Функция для загрузки капсул из localStorage
    function loadCapsules() {
        let capsules = JSON.parse(localStorage.getItem('capsules')) || [];
        openedCapsuleList.innerHTML = ''; // Очистка списка открытых капсул
        latestCapsuleList.innerHTML = ''; // Очистка списка последних капсул

        capsules.forEach((capsule, index) => {
            const currentDate = new Date();
            const unlockDate = new Date(capsule.unlockDate);
            const isUnlocked = currentDate >= unlockDate;

            const listItem = document.createElement('li');

            if (isUnlocked) {
                listItem.innerHTML = `
                    <span>🔓 ${capsule.title} - ${capsule.message}</span>
                    <span class="status">${capsule.unlockDate}</span>
                `;
                openedCapsuleList.appendChild(listItem);
            } else {
                listItem.innerHTML = `
                    <span>🔒 ${capsule.title} - ${capsule.unlockDate}</span>
                `;
                latestCapsuleList.appendChild(listItem);
            }

            if (capsule.imageUrl) {
                const img = document.createElement('img');
                img.src = capsule.imageUrl;
                img.style.width = '50px';
                listItem.appendChild(img);
            }
        });
    }
});
