document.addEventListener('DOMContentLoaded', function() {
    // Set friend's name and age
    document.getElementById('friendName').textContent = 'Sakshi';
    document.getElementById('age').textContent = '22';

    // ===== MUSIC PLAYER =====
    const birthdaySong = document.getElementById('birthdaySong');
    const musicControl = document.getElementById('musicControl');
    const musicText = document.getElementById('musicText');
    let isMusicPlaying = false;
    
    function toggleMusic() {
        if (isMusicPlaying) {
            birthdaySong.pause();
            musicText.textContent = "Play Music";
        } else {
            birthdaySong.play()
                .then(() => musicText.textContent = "Pause Music")
                .catch(e => {
                    musicText.textContent = "Click to Enable";
                    alert("Please click anywhere first to enable music");
                });
        }
        isMusicPlaying = !isMusicPlaying;
    }
    
    musicControl.addEventListener('click', toggleMusic);
    
    // ===== MAIN GALLERY =====
    const photos = [
        'assets/images/memory1.jpg',
        'assets/images/memory2.jpg',
        'assets/images/memory3.jpg'
    ];
    
    const gallery = document.getElementById('photoGallery');
    let currentPhotoIndex = 0;
    
    function initGallery() {
        photos.forEach((photo, index) => {
            const img = document.createElement('img');
            img.src = photo;
            img.alt = `Memory ${index + 1}`;
            img.classList.add(index === 0 ? 'active' : '');
            gallery.appendChild(img);
        });
    }
    
    function showPhoto(index) {
        const images = gallery.querySelectorAll('img');
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
    }
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        showPhoto(currentPhotoIndex);
    });
    
    document.getElementById('prevBtn').addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        showPhoto(currentPhotoIndex);
    });
    
    initGallery();
    setInterval(() => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        showPhoto(currentPhotoIndex);
    }, 3000);

    // ===== 2x2 FRAMES =====
    const frameGalleries = {
        frame1: {
            title: "Fun Time Together",
            images: [
                'assets/images/fun1.jpg',
                'assets/images/fun2.jpg',
                'assets/images/fun3.jpg',
                'assets/images/fun4.jpg'
            ]
        },
        frame2: {
            title: "Best Friends",
            images: [
                'assets/images/friends1.jpg',
                'assets/images/friends2.jpg',
                'assets/images/friends3.jpg',
                'assets/images/friends4.jpg'
            ]
        },
        frame3: {
            title: "Adventure We Had",
            images: [
                'assets/images/adventure1.jpg',
                'assets/images/adventure2.jpg',
                'assets/images/adventure3.jpg',
                'assets/images/adventure4.jpg'
            ]
        },
        frame4: {
            title: "Laughing Together",
            images: [
                'assets/images/laugh1.jpg',
                'assets/images/laugh2.jpg',
                'assets/images/laugh3.jpg',
                'assets/images/laugh4.jpg'
            ]
        }
    };

    Object.keys(frameGalleries).forEach(frameId => {
        const gallery = document.getElementById(frameId);
        const { images } = frameGalleries[frameId];
        let currentIndex = 0;
        
        // Add images
        images.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `${frameId} ${index + 1}`;
            img.classList.add(index === 0 ? 'active' : '');
            gallery.appendChild(img);
        });

        // Navigation
        const prevBtn = gallery.parentElement.querySelector('.frame-prev');
        const nextBtn = gallery.parentElement.querySelector('.frame-next');
        
        function showImage(index) {
            const images = gallery.querySelectorAll('img');
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });

        // Auto-advance
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, 5000);
    });

    // ===== TYPEWRITER MESSAGE =====
    const message = `Happy Birthday to the most amazing friend! 🎉\n\n`
        + `On your special day, I want you to know how much you mean to me.\n\n`
        + `Your smile brightens my darkest days, and your laughter is my favorite melody.\n\n`
        + `May this year bring you endless joy and wonderful adventures! 🥳`;
    
    const typedMessage = document.getElementById('typedMessage');
    let i = 0;
    
    function typeWriter() {
        if (i < message.length) {
            typedMessage.innerHTML += message.charAt(i) === '\n' ? '<br>' : message.charAt(i);
            i++;
            setTimeout(typeWriter, 20);
        }
    }
    
    setTimeout(typeWriter, 1000);

    // ===== WISH MODAL =====
    const wishModal = document.getElementById('wishModal');
    const wishBtn = document.getElementById('wishBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sendWishBtn = document.getElementById('sendWishBtn');
    
    wishBtn.addEventListener('click', () => {
        wishModal.style.display = 'flex';
        createConfetti();
    });
    
    closeBtn.addEventListener('click', () => wishModal.style.display = 'none');
    
    sendWishBtn.addEventListener('click', () => {
        const wishText = document.getElementById('wishText').value.trim();
        if (wishText) {
            alert('Your wish has been sent to the universe! 🌠');
            wishModal.style.display = 'none';
        } else {
            alert('Please write your wish first!');
        }
    });

    // ===== COUNTDOWN TIMER =====
    function updateCountdown() {
        const now = new Date();
        const birthday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const diff = birthday - now;
        
        document.getElementById('days').textContent = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById('hours').textContent = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById('minutes').textContent = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById('seconds').textContent = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // ===== CONFETTI EFFECT =====
    function createConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const container = document.getElementById('confetti');
        container.innerHTML = '';
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
            container.appendChild(confetti);
        }
    }
});

// Confetti animation
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: absolute;
        width: 10px;
        height: 10px;
        opacity: 0;
    }
    @keyframes confettiFall {
        0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 1; }
    }
`;
document.head.appendChild(style);