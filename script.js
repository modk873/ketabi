// تخزين الأعمال الفنية في localStorage
let artworks = JSON.parse(localStorage.getItem('artworks')) || [];

// إضافة لوحات افتراضية إذا كان المعرض فارغاً
if (artworks.length === 0) {
    artworks = [
        {
            id: 1,
            title: "الطبيعة الصامتة",
            artist: "أحمد محمد",
            description: "لوحة زيتية تعبر عن جمال الطبيعة الصامتة مع التركيز على التفاصيل الدقيقة للألوان والظلال",
            image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            date: new Date().toLocaleDateString('ar-SA')
        },
        {
            id: 2,
            title: "المدينة القديمة",
            artist: "سارة أحمد",
            description: "رسم بالألوان المائية يصور جمال العمارة التقليدية في المدينة القديمة",
            image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            date: new Date().toLocaleDateString('ar-SA')
        },
        {
            id: 3,
            title: "البحر والسماء",
            artist: "محمد علي",
            description: "لوحة تجريدية تعبر عن تناغم ألوان البحر والسماء عند الغروب",
            image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            date: new Date().toLocaleDateString('ar-SA')
        },
        {
            id: 4,
            title: "الوجه البشري",
            artist: "ليلى حسن",
            description: "رسم بالفحم يعبر عن تعابير الوجه الإنسانية بشكل واقعي",
            image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            date: new Date().toLocaleDateString('ar-SA')
        },
        {
            id: 5,
            title: "الزهور البرية",
            artist: "عمر خالد",
            description: "لوحة زيتية تظهر جمال الزهور البرية في الربيع",
            image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            date: new Date().toLocaleDateString('ar-SA')
        },
        {
            id: 6,
            title: "الموسيقى والحركة",
            artist: "نورا سعيد",
            description: "عمل تجريدي يعبر عن إيقاع الموسيقى من خلال الألوان والخطوط",
            image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            date: new Date().toLocaleDateString('ar-SA')
        }
    ];
    localStorage.setItem('artworks', JSON.stringify(artworks));
}

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