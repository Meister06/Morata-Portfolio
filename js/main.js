
const toggle = document.querySelector('.mobile-toggle');

if (toggle) {
    toggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('open');
    });
}

document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));

        btn.classList.add('active');

        const f = btn.dataset.filter;

        document.querySelectorAll('.gallery-card').forEach(card => {
            card.classList.toggle(
                'hide',
                f !== 'all' && !card.dataset.category.split(' ').includes(f)
            );
        });
    });
});

const form = document.querySelector('#contact-form');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        const d = new FormData(form);
        const subject = encodeURIComponent(d.get('subject'));
        const body = encodeURIComponent(
            `Name: ${d.get('name')}\nEmail: ${d.get('email')}\n\n${d.get('message')}`
        );

        location.href = `mailto:efrensemacio7@gmail.com?subject=${subject}&body=${body}`;
    });
}

const gallery = document.querySelector('.gallery');

if (gallery) {
    gallery.addEventListener('click', event => {
        if (event.target.tagName === 'IMG') {
            openLightbox(event.target);
        }
    });
}

function openLightbox(image) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');

    if (lightbox && lightboxImage) {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.style.display = 'flex';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');

    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});
