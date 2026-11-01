
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

        // Open images
        if (event.target.tagName === 'IMG') {
            openLightbox(event.target);
        }

        // Open videos
        if (event.target.tagName === 'VIDEO') {
            openLightbox(event.target);
        }

    });
}


function openLightbox(media) {

    const lightbox = document.getElementById('lightbox');

    const lightboxImage = document.getElementById('lightbox-image');

    const lightboxVideo = document.getElementById('lightbox-video');


    if (!lightbox || !lightboxImage || !lightboxVideo) {
        return;
    }


    // Reset previous media
    lightboxImage.style.display = 'none';
    lightboxVideo.style.display = 'none';

    lightboxVideo.pause();
    lightboxVideo.removeAttribute('src');
    lightboxVideo.load();


    // If clicked media is an image
    if (media.tagName === 'IMG') {

        lightboxImage.src = media.src;
        lightboxImage.alt = media.alt;

        lightboxImage.style.display = 'block';

    }


    // If clicked media is a video
    else if (media.tagName === 'VIDEO') {

        lightboxVideo.src = media.currentSrc || media.src;

        lightboxVideo.style.display = 'block';

        lightboxVideo.load();

    }


    lightbox.style.display = 'flex';

}


function closeLightbox() {

    const lightbox = document.getElementById('lightbox');

    const lightboxImage = document.getElementById('lightbox-image');

    const lightboxVideo = document.getElementById('lightbox-video');


    if (lightbox) {
        lightbox.style.display = 'none';
    }


    if (lightboxImage) {
        lightboxImage.src = '';
    }


    if (lightboxVideo) {

        lightboxVideo.pause();

        lightboxVideo.removeAttribute('src');

        lightboxVideo.load();

    }

}


// Close lightbox using Escape key
document.addEventListener('keydown', event => {

    if (event.key === 'Escape') {
        closeLightbox();
    }

});

