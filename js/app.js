// get data
const getCategoriesData = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch((error) => console.log(error))
}

const getVideoData = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => videoDisplay(data.videos))
        .catch((error) => console.log(error))
}


// btn display
const displayCategories = (categories) => {
    const btnContainer = document.getElementById('button-container');
    categories.forEach(item => {
        const btn = document.createElement('button');
        btn.classList = 'btn';
        btn.innerText = `${item.category}`;
        btnContainer.appendChild(btn);

    });
}
// video display
const videoDisplay = (videos) => {
    const cardContainer = document.getElementById('card-container');
    videos.forEach(video => {
        console.log(video);
        const div = document.createElement('div');
        div.classList = "card card-compact rounded-lg";
        div.innerHTML = `<figure class="relative h-[200px]">
                    <img src="${video.thumbnail}" alt="Shoes" / class = "h-full w-full object-cover">
                    <span class="absolute right-4 bottom-2 bg-black text-white px-2 rounded">${video.others.posted_date}</span>
                </figure>
                <div class="py-3 flex items-center gap-4">
                    <div class="avatar">
                        <div class="w-10 h-10 rounded-full">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                    <div >
                        <h2 class="card-title font-bold">${video.title}</h2>
                        <div class="flex items-center gap-2">
                            <div>
                                <span>${video.authors[0].profile_name}</span>
                            </div>
                            <div>
                            ${video.authors[0].verified == true ? '<img class="w-5 h-5" src="./image/check.png" alt=""></img>' : ''}
                               
                            </div>
                        </div>
                    </div>
                </div>
        `
        cardContainer.append(div);
    })
}



// call
getCategoriesData();
getVideoData();