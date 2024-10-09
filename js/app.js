// get data
const getCategoriesData = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch((error) => console.log(error))
}

const getVideoData = (searchText = "", sort = false) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => videoDisplay((data.videos), sort))
        .catch((error) => console.log(error))
}

const btnColorShift = (id, btnId, sort = false) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            const selectedBtn = document.getElementById(btnId);
            const allBtn = document.getElementsByClassName('all-btn');
            for (const btn of allBtn) {
                btn.classList.remove("bg-red-500", "text-white");
            }
            selectedBtn.classList.add("bg-red-500", "text-white");
            // btnColorChange(btnId)
            if (data.category.length === 0) {
                noVideoDisplay();
            }
            else {
                videoDisplay(data.category);
            }
        })
}
const showDetails = (video_id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`)
        .then(res => res.json())
        .then(data => modalDisplay(data.video))
        .catch((error) => console.log(error))
}

// show modal
const modalDisplay = (data) => {
    const modalContent = document.getElementById('modal-content')
    modalContent.innerHTML = `
     <h2 class="text-xl font-bold">${data.title}</h2>
       <img src="${data.thumbnail}" alt="" class="w-full lg:w-1/2 mx-auto object-cover">
       <p>${data.description}</p>
    `
    my_modal_5.showModal();
}


// empty array action

const noVideoDisplay = () => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.classList.remove('grid');
    cardContainer.innerHTML = '';
    const noVideo = document.createElement('div');
    noVideo.classList = "flex flex-col justify-center items-center gap-5 py-5";
    noVideo.innerHTML = `
     <img class="w-[300px]" src="./image/Icon.png" alt="">
            <h2 class="text-xl font-bold">Oops!! Sorry, There is no content here</h2>
    `
    cardContainer.append(noVideo);

}

// btn display
const displayCategories = (categories) => {
    const btnContainer = document.getElementById('button-container');
    categories.forEach(item => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
         <button class="btn all-btn" id= "btn-${item.category_id}" onclick="btnColorShift(${item.category_id}, 'btn-${item.category_id}')" >${item.category} </button>
        `;
        btnContainer.appendChild(btnDiv);

    });
}
// video display
const videoDisplay = (videos, sort) => {
    console.log(videos);
    let sortVideo = videos;
    if (sort) {
        sortVideo = [...videos].sort((t1, t2) => {
            if (t1.title < t2.title) {
                return -1; // t1 comes before t2
            }
            if (t1.title > t2.title) {
                return 1; // t1 comes after t2
            }
            return 0; // They are equal
        })
        console.log(sortVideo); // Log sorted videos
    }

    const cardContainer = document.getElementById('card-container');
    cardContainer.classList.add("grid");
    cardContainer.innerHTML = "";
    sortVideo.forEach(video => {

        const div = document.createElement('div');
        div.classList = "card card-compact rounded-lg";
        div.innerHTML = `<figure class="relative h-[200px]">
                    <img src="${video.thumbnail}" alt="Shoes" / class = "h-full w-full object-cover">
                    <span class="absolute right-4 bottom-2 bg-black text-white px-2 rounded">${video.others.posted_date == '' ? '' : dateformat(video.others.posted_date)
            }</span>
                </figure>
                <div class="py-3 flex items-center gap-4">
                    <div class="avatar">
                        <div class="w-10 h-10 rounded-full">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                    <div >
                        <h2 class="card-title font-bold">${video.title}</h2>
                        <div class="flex items-center gap-2 justify-center">
                            <div>
                                <span>${video.authors[0].profile_name}</span>
                            </div>
                            <div>
                            ${video.authors[0].verified == true ? '<img class="w-5 h-5" src="./image/check.png" alt=""></img>' : ''}
                            </div>
                            <button class="btn bg-red-400 text-white" onclick="showDetails('${video.video_id}')">Show Details</button>   
                        </div>
                    </div>
                </div>
        `
        cardContainer.append(div);
    })
}

// search
document.getElementById('Search').addEventListener('keyup', (e) => {
    getVideoData(e.target.value);
})

// sorting
document.getElementById('sort').addEventListener('click', () => {
    getVideoData('', true)

})


// call
getCategoriesData();
getVideoData();