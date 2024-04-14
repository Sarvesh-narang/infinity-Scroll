const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let photosArray =[];
let imagesLoaded = 0;
let totalImages = 0;

// unsplash API
const count = 30;
const apiKey = 'fWHzZDWR2I9-nZuotXB6OQjc63mVXuw_a-CicL8qHrc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// chech if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;   
        console.log('ready=', ready);
    }
}
// helper function to set sttributes on DOM elements
function setAttributes(element, setAttributes) {
    for (const key in setAttributes) {
        element.setAttribute(key, setAttributes[key]);
    }
}

// create elements for links and photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
// run function for each abjst in photosArray
photosArray.forEach((photo) => {
    // create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
    })
    // create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    })
    // evenlistener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // put <img> inside <a>, the put both inside imageConstainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
});
}

// get photos from unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
    //  catch error here
    }
}  
// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        
        ready = false;
        getPhotos();
    }
})

// on load
getPhotos();