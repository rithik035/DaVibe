
const appData = {
  "samplePhotos": [
    {
      "id": "1",
      "title": "Royal Indian Wedding Ceremony",
      "category": "wedding", 
      "image": "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      "likes": 124,
      "comments": 8,
      "description": "Traditional Indian wedding ceremony with vibrant decorations"
    },
    {
      "id": "2", 
      "title": "Pre-Wedding Photoshoot", 
      "category": "pre-wedding",
      "image": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
      "likes": 89,
      "comments": 12,
      "description": "Romantic pre-wedding session in scenic location"
    },
    { 
      "id": "3",
      "title": "Wedding Reception Celebration",
      "category": "events",
      "image": "https://cdn.pixabay.com/photo/2020/12/09/12/38/glasses-5817358_1280.jpg", 
      "likes": 156,
      "comments": 6,
      "description": "Elegant wedding reception with stunning decorations"
    },
    { 
      "id": "4",
      "title": "Bridal Portrait",
      "category": "wedding",
      "image": "https://cdn.pixabay.com/photo/2021/04/12/08/19/bride-6171757_1280.jpg",
      "likes": 203,
      "comments": 15,
      "description": "Beautiful bridal portrait capturing traditional elegance"
    },
    {
      "id": "5",
      "title": "Mehendi Ceremony", 
      "category": "events",
      "image": "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
      "likes": 178,
      "comments": 9,
      "description": "Intricate mehendi ceremony with family celebrations"
    },
    { 
      "id": "6",
      "title": "Couple's First Look",
      "category": "wedding",
      "image": "https://cdn.pixabay.com/photo/2021/08/03/21/16/bride-6520538_1280.jpg",
      "likes": 245,
      "comments": 18,
      "description": "Emotional first look moment between bride and groom"
    }
  ],
  "sampleVideos": [
    {
      "id": "v1", 
      "title": "Wedding Highlights Reel",
      "category": "wedding",
      "thumbnail": "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      "duration": "03:45",
      "likes": 312,
      "comments": 24,
      "description": "Beautiful wedding highlights showcasing the entire celebration"
    },
    {
      "id": "v2",
      "title": "Pre-Wedding Story", 
      "category": "pre-wedding",
      "thumbnail": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
      "duration": "02:30",
      "likes": 189,
      "comments": 16,
      "description": "Romantic pre-wedding video story of the couple"
    }
  ],
  "trendingContent": [
    {
      "id": "t1",
      "type": "photo",
      "title": "Minimalist Wedding Decor Trends 2025",
      "image": "https://cdn.pixabay.com/photo/2016/11/23/17/56/wedding-1854074_1280.jpg",
      "description": "Clean, elegant wedding setups are trending this year"
    },
    {
      "id": "t2", 
      "type": "photo",
      "title": "Traditional Meets Modern Bridal Look",
      "image": "https://cdn.pixabay.com/photo/2020/05/22/07/46/model-5204225_1280.jpg",
      "description": "Contemporary styling with traditional Indian elements"
    },
    {
      "id": "t3",
      "type": "video",
      "title": "Drone Photography in Indian Weddings",
      "Video": "data/BrideVideo.mp4",
      "description": "Aerial shots creating stunning wedding cinematography"
    }
  ],
  "testimonials": [
    {
      "id": "1",
      "name": "Priya & Arjun",
      "text": "DaVibe Photography captured our wedding beautifully. Every moment was preserved with such artistry and emotion.",
      "rating": 5,
      "wedding_date": "December 2024"
    },
    {
      "id": "2", 
      "name": "Sneha & Vikram",
      "text": "Professional, creative, and so easy to work with. Our photos are absolutely stunning!",
      "rating": 5,
      "wedding_date": "November 2024" 
    },
    {
      "id": "3",
      "name": "Kavya & Rohit", 
      "text": "The team understood our vision perfectly and delivered beyond our expectations.",
      "rating": 5,
      "wedding_date": "October 2024"
    }
  ],
  "services": [
    "Wedding Photography",
    "Pre-Wedding Shoots", 
    "Wedding Cinematography",
    "Reception Photography",
    "Engagement Sessions",
    "Mehendi & Sangeet Coverage",
    "Destination Wedding Photography",
    "Bridal Portraits",
    "Family Photography",
    "Album Design & Printing"
  ],
  "photographerInfo": {
    "name": "Rajesh Kumar",
    "bio": "Award-winning wedding photographer with over 10 years of experience capturing love stories across India. Specializing in Indian weddings, I blend traditional aesthetics with contemporary artistry to create timeless memories.",
    "experience": "10+ Years",
    "weddings_shot": "500+", 
    "awards": ["Wedding Photographer of the Year 2023", "Best Indian Wedding Photography 2022", "Creative Excellence Award 2021"],
    "location": "Based in Mumbai, Available Pan-India",
    "social": {
      "instagram": "@davibephotography",
      "facebook": "DaVibePhotography", 
      "youtube": "DaVibeStudio"
    }
  }
};

// Global Variables
let currentSlide = 0;
let currentTestimonial = 0;
let currentLightboxIndex = 0;
let currentGalleryItems = [];
let userLikes = {};
let userComments = {};

// Initialize user data from localStorage if available
try {
  userLikes = JSON.parse(localStorage.getItem('davibe_likes')) || {};
  userComments = JSON.parse(localStorage.getItem('davibe_comments')) || {};
} catch (e) {
  userLikes = {};
  userComments = {};
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupHeroSlideshow();
    loadPortfolioContent();
    loadTrendingContent();
    loadTestimonials();
    loadServices();
    loadFeaturedStories();
    setupEventListeners();
    setupFormValidation();
}

// Navigation
function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(15, 15, 15, 0.98)';
            } else {
                navbar.style.background = 'rgba(15, 15, 15, 0.95)';
            }
        }
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbar = document.querySelector('.navbar');
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = section.offsetTop - navHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Hero Slideshow
function setupHeroSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');

    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        showSlide(currentSlide);
    }

    // Auto-advance slides
    setInterval(nextSlide, 5000);

    // Event listeners
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
}

// Portfolio Content
function loadPortfolioContent() {
    loadPhotoGallery();
    loadVideoGallery();
    setupPortfolioFilters();
    setupPortfolioTabs();
    setupPortfolioSearch();
}

function loadPhotoGallery() {
    const gallery = document.getElementById('photoGallery');
    if (!gallery) return;

    gallery.innerHTML = '';
    appData.samplePhotos.forEach((photo, index) => {
        const photoElement = createPhotoElement(photo, index);
        gallery.appendChild(photoElement);
    });
    
    currentGalleryItems = appData.samplePhotos;
}

function createPhotoElement(photo, index) {
    const div = document.createElement('div');
    div.className = `portfolio-item photo-item ${photo.category}`;
    div.innerHTML = `
        <div style="position: relative; cursor: pointer;" class="photo-container" data-index="${index}">
            <img src="${photo.image}" alt="${photo.title}" loading="lazy">
            <div class="portfolio-item-overlay">
                <button class="btn btn--primary view-full-btn" data-index="${index}">
                    <i class="fas fa-expand"></i> View Full
                </button>
            </div>
        </div>
        <div class="portfolio-item-info">
            <h3>${photo.title}</h3>
            <p>${photo.description}</p>
            <div class="portfolio-actions">
                <button class="like-btn ${userLikes[photo.id] ? 'liked' : ''}" data-id="${photo.id}" data-type="photo">
                    <i class="${userLikes[photo.id] ? 'fas' : 'far'} fa-heart"></i>
                    <span class="like-count">${photo.likes + (userLikes[photo.id] ? 1 : 0)}</span>
                </button>
                <button class="comment-btn" data-index="${index}">
                    <i class="far fa-comment"></i> ${photo.comments}
                </button>
                <button class="share-btn" data-id="${photo.id}" data-type="photo">
                    <i class="fas fa-share"></i> Share
                </button>
            </div>
        </div>
    `;
    
    // Add click event to open lightbox
    const photoContainer = div.querySelector('.photo-container');
    const viewButton = div.querySelector('.view-full-btn');
    
    const openLightboxHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openLightbox(index, 'photos');
    };
    
    photoContainer.addEventListener('click', openLightboxHandler);
    viewButton.addEventListener('click', openLightboxHandler);
    
    return div;
}

function loadVideoGallery() {
    const gallery = document.getElementById('videoGallery');
    if (!gallery) return;

    gallery.innerHTML = '';
    appData.sampleVideos.forEach((video, index) => {
        const videoElement = createVideoElement(video, index);
        gallery.appendChild(videoElement);
    });
}

function createVideoElement(video, index) {
    const div = document.createElement('div');
    div.className = `video-item ${video.category}`;
    div.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}">
            <button class="play-button" data-video-id="${video.id}">
                <i class="fas fa-play"></i>
            </button>
            <span class="video-duration">${video.duration}</span>
        </div>
        <div class="portfolio-item-info">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            <div class="portfolio-actions">
                <button class="like-btn ${userLikes[video.id] ? 'liked' : ''}" data-id="${video.id}" data-type="video">
                    <i class="${userLikes[video.id] ? 'fas' : 'far'} fa-heart"></i>
                    <span class="like-count">${video.likes + (userLikes[video.id] ? 1 : 0)}</span>
                </button>
                <button class="comment-btn" data-video-id="${video.id}">
                    <i class="far fa-comment"></i> ${video.comments}
                </button>
                <button class="share-btn" data-id="${video.id}" data-type="video">
                    <i class="fas fa-share"></i> Share
                </button>
            </div>
        </div>
    `;
    return div;
}

// Portfolio Filtering
function setupPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterPortfolio(btn.dataset.filter);
        });
    });
}

function filterPortfolio(category) {
    const activeTab = document.querySelector('.portfolio-tabs .tab-btn.active');
    if (!activeTab) return;
    
    const items = document.querySelectorAll(activeTab.dataset.tab === 'photos' ? '.photo-item' : '.video-item');
    
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Portfolio Tabs
function setupPortfolioTabs() {
    const tabButtons = document.querySelectorAll('.portfolio-tabs .tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            switchPortfolioTab(btn.dataset.tab);
        });
    });
}

function switchPortfolioTab(tab) {
    const contents = document.querySelectorAll('.portfolio-content .tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    const targetContent = document.getElementById(`${tab}-tab`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Reset filters
    const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilterBtn) {
        allFilterBtn.classList.add('active');
        document.querySelectorAll('.filter-btn:not([data-filter="all"])').forEach(btn => {
            btn.classList.remove('active');
        });
    }
}

// Portfolio Search
function setupPortfolioSearch() {
    const searchInput = document.getElementById('portfolioSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchPortfolio(e.target.value.toLowerCase());
        });
    }
}

function searchPortfolio(searchTerm) {
    const activeTab = document.querySelector('.portfolio-tabs .tab-btn.active');
    if (!activeTab) return;
    
    const items = document.querySelectorAll(activeTab.dataset.tab === 'photos' ? '.photo-item' : '.video-item');
    
    items.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Trending Content
function loadTrendingContent() {
    loadTrendingPhotos();
    loadTrendingVideos();
    setupTrendingTabs();
}

function loadTrendingPhotos() {
    const grid = document.getElementById('trendingPhotosGrid');
    if (!grid) return;

    const trendingPhotos = appData.trendingContent.filter(item => item.type === 'photo');
    grid.innerHTML = '';
    
    trendingPhotos.forEach(item => {
        const element = createTrendingElement(item);
        grid.appendChild(element);
    });
}

function loadTrendingVideos() {
    const grid = document.getElementById('trendingVideosGrid');
    if (!grid) return;

    const trendingVideos = appData.trendingContent.filter(item => item.type === 'video');
    grid.innerHTML = '';
    
    trendingVideos.forEach(item => {
        const element = createTrendingElement(item);
        grid.appendChild(element);
    });
}

function createTrendingElement(item) {
    const div = document.createElement('div');
    div.className = 'trending-item';
    
    if (item.type === 'video') {
        // Create video element with no controls, looping, and muted
        div.innerHTML = `
            <video autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover;">
                <source src="${item.Video}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="trending-item-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="trending-meta">
                    <span class="trending-type">${item.type.toUpperCase()}</span>
                    <span class="trending-date">Trending Now</span>
                </div>
            </div>
        `;
    } else {
        // Keep existing photo markup
        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="trending-item-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="trending-meta">
                    <span class="trending-type">${item.type.toUpperCase()}</span>
                    <span class="trending-date">Trending Now</span>
                </div>
            </div>
        `;
    }
    return div;
}


function setupTrendingTabs() {
    const tabButtons = document.querySelectorAll('.trending-tabs .tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            switchTrendingTab(btn.dataset.tab);
        });
    });
}

function switchTrendingTab(tab) {
    const contents = document.querySelectorAll('.trending-content .tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    const targetContent = document.getElementById(tab);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// Featured Stories
function loadFeaturedStories() {
    const grid = document.getElementById('featuredStories');
    if (!grid) return;

    // Use a subset of photos as featured stories
    const featuredPhotos = appData.samplePhotos.slice(0, 3);
    grid.innerHTML = '';

    featuredPhotos.forEach((photo, index) => {
        const storyElement = createStoryElement(photo, index);
        grid.appendChild(storyElement);
    });
}

function createStoryElement(photo, index) {
    const div = document.createElement('div');
    div.className = 'story-card';
    div.innerHTML = `
        <img src="${photo.image}" alt="${photo.title}">
        <div class="story-card-content">
            <h3>${photo.title}</h3>
            <p>${photo.description}</p>
            <div class="story-stats">
                <span><i class="far fa-heart"></i> ${photo.likes}</span>
                <span><i class="far fa-comment"></i> ${photo.comments}</span>
                <span><i class="far fa-eye"></i> ${Math.floor(Math.random() * 1000 + 500)}</span>
            </div>
        </div>
    `;
    
    div.addEventListener('click', () => {
        openLightbox(index, 'featured');
    });
    
    return div;
}

// Testimonials
function loadTestimonials() {
    const carousel = document.getElementById('testimonialsCarousel');
    if (!carousel) return;

    carousel.innerHTML = '';
    appData.testimonials.forEach((testimonial, index) => {
        const testimonialElement = createTestimonialElement(testimonial, index);
        carousel.appendChild(testimonialElement);
    });

    // Show first testimonial
    showTestimonial(0);
    setupTestimonialControls();
}

function createTestimonialElement(testimonial, index) {
    const div = document.createElement('div');
    div.className = `testimonial ${index === 0 ? 'active' : ''}`;
    
    const stars = '★'.repeat(testimonial.rating);
    
    div.innerHTML = `
        <div class="testimonial-rating">${stars}</div>
        <div class="testimonial-text">"${testimonial.text}"</div>
        <div class="testimonial-author">${testimonial.name}</div>
        <div class="testimonial-date">${testimonial.wedding_date}</div>
    `;
    return div;
}

function setupTestimonialControls() {
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = currentTestimonial === 0 
                ? appData.testimonials.length - 1 
                : currentTestimonial - 1;
            showTestimonial(currentTestimonial);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % appData.testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }

    // Auto-advance testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % appData.testimonials.length;
        showTestimonial(currentTestimonial);
    }, 8000);
}

function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
}

// Services
function loadServices() {
    const servicesList = document.getElementById('servicesList');
    if (!servicesList) return;

    servicesList.innerHTML = '';
    appData.services.forEach(service => {
        const li = document.createElement('li');
        li.textContent = service;
        servicesList.appendChild(li);
    });
}

// Lightbox
function openLightbox(index, type) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription) {
        console.error('Lightbox elements not found');
        return;
    }
    
    let items;
    if (type === 'photos') {
        items = appData.samplePhotos;
    } else if (type === 'featured') {
        items = appData.samplePhotos.slice(0, 3);
    }
    
    if (!items || !items[index]) {
        console.error('Invalid lightbox data');
        return;
    }
    
    currentLightboxIndex = index;
    currentGalleryItems = items;
    
    const item = items[index];
    lightboxImage.src = item.image;
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
    
    updateLightboxLike(item);
    loadLightboxComments(item.id);
    
    lightbox.style.display = 'flex';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        
        // Hide comments section
        const commentsSection = document.getElementById('commentsSection');
        if (commentsSection) {
            commentsSection.classList.remove('active');
        }
    }
}

function updateLightboxLike(item) {
    const likeBtn = document.getElementById('lightbox-like');
    if (!likeBtn) return;
    
    const heartIcon = likeBtn.querySelector('i');
    const likeCount = likeBtn.querySelector('.like-count');
    
    if (heartIcon && likeCount) {
        const isLiked = userLikes[item.id];
        heartIcon.className = isLiked ? 'fas fa-heart' : 'far fa-heart';
        likeCount.textContent = item.likes + (isLiked ? 1 : 0);
        likeBtn.classList.toggle('liked', isLiked);
    }
}

function navigateLightbox(direction) {
    if (direction === 'next') {
        currentLightboxIndex = (currentLightboxIndex + 1) % currentGalleryItems.length;
    } else {
        currentLightboxIndex = currentLightboxIndex === 0 
            ? currentGalleryItems.length - 1 
            : currentLightboxIndex - 1;
    }
    
    const item = currentGalleryItems[currentLightboxIndex];
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    if (lightboxImage && lightboxTitle && lightboxDescription) {
        lightboxImage.src = item.image;
        lightboxTitle.textContent = item.title;
        lightboxDescription.textContent = item.description;
        
        updateLightboxLike(item);
        loadLightboxComments(item.id);
    }
}

// Like System
function toggleLike(itemId, type) {
    const isLiked = userLikes[itemId];
    
    if (isLiked) {
        delete userLikes[itemId];
    } else {
        userLikes[itemId] = true;
    }
    
    try {
        localStorage.setItem('davibe_likes', JSON.stringify(userLikes));
    } catch (e) {
        console.warn('Could not save likes to localStorage');
    }
    
    updateLikeUI(itemId, type);
}

function updateLikeUI(itemId, type) {
    const likeButtons = document.querySelectorAll(`[data-id="${itemId}"]`);
    likeButtons.forEach(btn => {
        if (btn.classList.contains('like-btn')) {
            const heartIcon = btn.querySelector('i');
            const likeCount = btn.querySelector('.like-count');
            const isLiked = userLikes[itemId];
            
            if (heartIcon) {
                heartIcon.className = isLiked ? 'fas fa-heart' : 'far fa-heart';
            }
            
            btn.classList.toggle('liked', isLiked);
            
            // Update count
            const item = type === 'photo' 
                ? appData.samplePhotos.find(p => p.id === itemId)
                : appData.sampleVideos.find(v => v.id === itemId);
            
            if (item && likeCount) {
                likeCount.textContent = item.likes + (isLiked ? 1 : 0);
            }
        }
    });
}

// Comments System
function toggleComments() {
    const commentsSection = document.getElementById('commentsSection');
    if (commentsSection) {
        commentsSection.classList.toggle('active');
    }
}

function loadLightboxComments(itemId) {
    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;
    
    const comments = userComments[itemId] || [];
    
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsList.appendChild(commentElement);
    });
}

function addComment() {
    const nameInput = document.getElementById('commentName');
    const emailInput = document.getElementById('commentEmail');
    const textInput = document.getElementById('commentText');
    
    if (!nameInput || !emailInput || !textInput) return;
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const text = textInput.value.trim();
    
    if (!name || !email || !text) {
        showNotification('Please fill in all comment fields', 'error');
        return;
    }
    
    const currentItem = currentGalleryItems[currentLightboxIndex];
    const comment = {
        id: Date.now().toString(),
        name,
        email,
        text,
        date: new Date().toLocaleDateString()
    };
    
    if (!userComments[currentItem.id]) {
        userComments[currentItem.id] = [];
    }
    
    userComments[currentItem.id].push(comment);
    
    try {
        localStorage.setItem('davibe_comments', JSON.stringify(userComments));
    } catch (e) {
        console.warn('Could not save comments to localStorage');
    }
    
    // Clear inputs
    nameInput.value = '';
    emailInput.value = '';
    textInput.value = '';
    
    // Reload comments
    loadLightboxComments(currentItem.id);
    showNotification('Comment added successfully!', 'success');
}

function createCommentElement(comment) {
    const div = document.createElement('div');
    div.className = 'comment';
    div.innerHTML = `
        <div class="comment-author">${comment.name}</div>
        <div class="comment-text">${comment.text}</div>
        <div class="comment-date">${comment.date}</div>
    `;
    return div;
}

// Social Sharing
function shareContent(type, id) {
    const item = type === 'photo' 
        ? appData.samplePhotos.find(p => p.id === id)
        : appData.sampleVideos.find(v => v.id === id);
    
    if (!item) return;
    
    if (navigator.share) {
        navigator.share({
            title: `${item.title} - DaVibe Photography`,
            text: item.description,
            url: window.location.href
        }).catch(e => console.log('Error sharing:', e));
    } else {
        // Fallback: copy to clipboard
        const shareText = `Check out "${item.title}" by DaVibe Photography: ${window.location.href}`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                showNotification('Link copied to clipboard!');
            }).catch(() => {
                showNotification('Could not copy link', 'error');
            });
        } else {
            showNotification('Sharing not supported on this browser', 'error');
        }
    }
}

function shareImage() {
    const currentItem = currentGalleryItems[currentLightboxIndex];
    shareContent('photo', currentItem.id);
}

// Video Player (Simulation)
function playVideo(videoId) {
    const video = appData.sampleVideos.find(v => v.id === videoId);
    if (video) {
        // Simulate video playback
        showNotification(`Playing: ${video.title}`, 'info');
        
        // In a real app, this would open a video player
        setTimeout(() => {
            showNotification('Video playback simulation complete!');
        }, 3000);
    }
}

function openVideoComments(videoId) {
    showNotification('Video comments feature coming soon!', 'info');
}

// Booking Form
function setupFormValidation() {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', handleBookingSubmit);
        
        // Add input validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
        
        // Fix for service type dropdown
        const serviceSelect = form.querySelector('select[name="serviceType"]');
        if (serviceSelect) {
            // Ensure the select element is properly initialized
            serviceSelect.style.appearance = 'none';
            serviceSelect.style.webkitAppearance = 'none';
            serviceSelect.style.mozAppearance = 'none';
        }
    }
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const bookingData = {};
    
    // Collect form data
    for (let [key, value] of formData.entries()) {
        bookingData[key] = value;
    }
    
    // Validate form
    if (!validateBookingForm(bookingData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        form.reset();
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success modal
        openModal('successModal');
        
        // Simulate email notification
        console.log('Booking request sent:', bookingData);
        
    }, 2000);
}

function validateBookingForm(data) {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'serviceType', 'eventDate', 'venue'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    if (data.phone && !isValidPhone(data.phone)) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Date validation
    if (data.eventDate && new Date(data.eventDate) < new Date()) {
        showFieldError('eventDate', 'Event date must be in the future');
        isValid = false;
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(field.name);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field.name, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field.name, 'Please enter a valid email address');
        return false;
    }
    
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(field.name, 'Please enter a valid phone number');
        return false;
    }
    
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.style.borderColor = '#ff4757';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.color = '#ff4757';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }
}

function clearFieldError(e) {
    const fieldName = typeof e === 'string' ? e : e.target.name;
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Modal System
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Event Listeners
function setupEventListeners() {
    // Lightbox controls
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
        
        if (e.target.classList.contains('lightbox-prev')) {
            navigateLightbox('prev');
        }
        
        if (e.target.classList.contains('lightbox-next')) {
            navigateLightbox('next');
        }
        
        // Modal close buttons
        if (e.target.classList.contains('modal-close')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        }
        
        // Click outside to close modals
        if (e.target.classList.contains('modal') || e.target.classList.contains('lightbox')) {
            if (e.target.classList.contains('lightbox')) {
                closeLightbox();
            } else {
                closeModal(e.target.id);
            }
        }
        
        // Like buttons
        if (e.target.closest('.like-btn')) {
            const btn = e.target.closest('.like-btn');
            const itemId = btn.dataset.id;
            const type = btn.dataset.type;
            if (itemId && type) {
                toggleLike(itemId, type);
            }
        }
        
        // Share buttons
        if (e.target.closest('.share-btn')) {
            const btn = e.target.closest('.share-btn');
            const itemId = btn.dataset.id;
            const type = btn.dataset.type;
            if (itemId && type) {
                shareContent(type, itemId);
            }
        }
        
        // Play video buttons
        if (e.target.closest('.play-button')) {
            const btn = e.target.closest('.play-button');
            const videoId = btn.dataset.videoId;
            if (videoId) {
                playVideo(videoId);
            }
        }
        
        // Comment buttons (video)
        if (e.target.closest('.comment-btn[data-video-id]')) {
            const btn = e.target.closest('.comment-btn');
            const videoId = btn.dataset.videoId;
            if (videoId) {
                openVideoComments(videoId);
            }
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigateLightbox('prev');
                    break;
                case 'ArrowRight':
                    navigateLightbox('next');
                    break;
            }
        }
        
        // Close modals with Escape
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
    
    // Lightbox like button
    const lightboxLikeBtn = document.getElementById('lightbox-like');
    if (lightboxLikeBtn) {
        lightboxLikeBtn.addEventListener('click', () => {
            const currentItem = currentGalleryItems[currentLightboxIndex];
            toggleLike(currentItem.id, 'photo');
            updateLightboxLike(currentItem);
        });
    }
    
    // Admin login form
    const adminLoginForm = document.getElementById('adminLogin');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate admin login
            showNotification('Admin login simulation - Access granted!', 'success');
            closeModal('adminModal');
            
            setTimeout(() => {
                showNotification('Admin features: Content management, booking dashboard, analytics', 'info');
            }, 1000);
        });
    }
}

// Utility Functions
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#D4AF37' : type === 'error' ? '#ff4757' : '#5c6ac4'};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}
// ===========================================================================

// app.js
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const submitButton = document.querySelector('.btn-booking');

    // Form submission handler
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get form data
        const formData = new FormData(bookingForm);
        const bookingData = Object.fromEntries(formData.entries());
        
        // Validate form before submission
        if (!validateBookingForm(bookingData)) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        try {
            // Send booking data to server
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                showMessage('Booking request sent successfully! We will contact you soon.', 'success');
                bookingForm.reset(); // Clear form
            } else {
                showMessage(result.message || 'Failed to send booking request. Please try again.', 'error');
            }
            
        } catch (error) {
            console.error('Booking submission error:', error);
            showMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            setLoadingState(false);
        }
    });

    // Form validation function
    function validateBookingForm(data) {
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'serviceType', 'eventDate', 'venue'];
        
        for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                return false;
            }
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(data.phone)) {
            showMessage('Please enter a valid phone number.', 'error');
            return false;
        }
        
        // Date validation (not in the past)
        const eventDate = new Date(data.eventDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (eventDate < today) {
            showMessage('Event date cannot be in the past.', 'error');
            return false;
        }
        
        return true;
    }

    // Loading state management
    function setLoadingState(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Request...';
            submitButton.style.opacity = '0.7';
        } else {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-calendar-check"></i> Submit Booking Request';
            submitButton.style.opacity = '1';
        }
    }

    // Message display function
    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.booking-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `booking-message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Insert message before the form
        bookingForm.parentNode.insertBefore(messageDiv, bookingForm);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Real-time form validation
    const inputs = bookingForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        // Remove existing error styling
        field.classList.remove('error');
        
        // Required field validation
        if (field.required && !value) {
            field.classList.add('error');
            return false;
        }
        
        // Specific field validations
        switch (fieldName) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    field.classList.add('error');
                    return false;
                }
                break;
                
            case 'phone':
                const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
                if (value && !phoneRegex.test(value)) {
                    field.classList.add('error');
                    return false;
                }
                break;
                
            case 'eventDate':
                if (value) {
                    const eventDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    if (eventDate < today) {
                        field.classList.add('error');
                        return false;
                    }
                }
                break;
        }
        
        return true;
    }
});


// ===========================================================================

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', setupLazyLoading);

// Global functions for HTML onclick handlers
window.scrollToSection = scrollToSection;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;
window.toggleLike = toggleLike;
window.shareContent = shareContent;
window.shareImage = shareImage;
window.toggleComments = toggleComments;
window.addComment = addComment;
window.playVideo = playVideo;
window.openVideoComments = openVideoComments;
window.openModal = openModal;
window.closeModal = closeModal;
window.showNotification = showNotification;