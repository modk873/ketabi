// تخزين الأعمال الفنية في localStorage
let artworks = JSON.parse(localStorage.getItem('artworks')) || [];

// عرض الأعمال الفنية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    displayArtworks();
});

// معالجة نموذج إضافة عمل فني جديد
document.getElementById('artworkForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const description = document.getElementById('description').value;
    const imageFile = document.getElementById('image').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const artwork = {
                id: Date.now(),
                title,
                artist,
                description,
                image: e.target.result,
                date: new Date().toLocaleDateString('ar-SA')
            };

            artworks.unshift(artwork);
            localStorage.setItem('artworks', JSON.stringify(artworks));
            displayArtworks();
            this.reset();
        }.bind(this);
        reader.readAsDataURL(imageFile);
    }
});

// عرض الأعمال الفنية في المعرض
function displayArtworks() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';

    artworks.forEach(artwork => {
        const artworkCard = document.createElement('div');
        artworkCard.className = 'artwork-card';
        artworkCard.innerHTML = `
            <img src="${artwork.image}" alt="${artwork.title}">
            <div class="artwork-info">
                <h3>${artwork.title}</h3>
                <p>الفنان: ${artwork.artist}</p>
                <p>${artwork.description}</p>
                <p class="date">تاريخ الإضافة: ${artwork.date}</p>
            </div>
        `;
        galleryGrid.appendChild(artworkCard);
    });
}

// التمرير السلس إلى الأقسام
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
}); 