const spinnerOne = document.getElementById('spinner-one');
const spinnerTwo = document.getElementById('spinner-two');
const allPostContainer = document.getElementById('all-post-container');
const latestPostContainer = document.getElementById('latest-post-container');
setTimeout(() => {
    spinnerOne.classList.add('hidden');
    spinnerTwo.classList.add('hidden');
    allPostContainer.classList.remove('hidden');
    latestPostContainer.classList.remove('hidden');
}, 2000);

const allPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const allPostContainer = document.getElementById('all-post-container');
    data.posts.forEach((item) => {
        const a = item.title;
        const titleModify = a.replace(/'/g, "&acute;");

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="flex lg:flex-row flex-col bg-[#F3F3F5] rounded-2xl mb-5 gap-4 p-8">

                            <div class="img w-[50px] h-[50px] relative">
                                <img class="rounded-lg" src="${item.image}" alt="">
                                <div class="w-3 online-check h-3 rounded-full absolute left-10 bottom-11 border border-white">
                                </div>
                            </div>

                            <div class="w-full">
                                <div
                                    class="flex flex-wrap items-center gap-5 text-[14px] inter font-medium text-[#12132DCC">
                                    <p># ${item.category}</p>
                                    <p>Author : ${item.author.name}</p>
                                </div>
                                <p class="text-[#12132D] mulish font-black text-[18px] lg:text-xl">${titleModify}</p>
                                <p class="text-[#12132D99] text-[16px] mt-2 inter">${item.description}</p>
                                <hr class="border-dashed border-[1px] border-[#12132D40] my-5">
                                <div class="flex flex-wrap justify-between items-center">
                                    <div class="flex flex-wrap gap-7 text-[16px] text-[#12132D99]">
                                        <div class="flex items-center gap-4">
                                            <img src="./images/text.png" alt="">
                                            <p>${item.comment_count}</p>
                                        </div>
                                        <div class="flex items-center gap-4">
                                            <img src="./images/eye.png" alt="">
                                            <p>${item.view_count}</p>
                                        </div>
                                        <div class="flex items-center gap-4">
                                            <img src="./images/time.png" alt="">
                                            <p>${item.posted_time} min</p>
                                        </div>

                                    </div>
                                    <button onclick="addToCard('${titleModify}', '${item.view_count}')"><img class="mt-4 lg:mt-0" src="./images/message.png" alt=""></button>
                                </div>
                                
                            </div>
                        </div>
        `;
        const activeCheck = item.isActive;
        const onlineCheck = div.querySelector('.online-check');
        if (activeCheck) {
            onlineCheck.classList.add('bg-green-500');
        } else {
            onlineCheck.classList.add('bg-red-500');
        }
        allPostContainer.appendChild(div);
    })

}

let cardCounter = 0;
const addToCard = (title, viewCount) => {
    console.log(title);

    cardCounter++;
    const saveCard = document.getElementById('save-card');
    console.log(title, viewCount);
    const div = document.createElement('div');
    div.className = `flex items-center gap-2 bg-white p-3 rounded-lg my-3 text-[#12132D] text-[16px] mulish font-black`;
    const p = document.createElement('p');
    p.innerText = title;
    const imgDiv = document.createElement('div');
    imgDiv.innerHTML = `
    <img class="w-full h-full" src="./images/eye.png" alt="">
    `;
    console.log(imgDiv);
    const p2 = document.createElement('p');
    p2.innerText = viewCount;
    div.appendChild(p);
    div.appendChild(imgDiv);
    div.appendChild(p2);
    saveCard.appendChild(div);

    const markCount = document.getElementById('mark-count');
    markCount.innerText = cardCounter;

};

const latestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const latestPostContainer = document.getElementById('latest-post-container');
    data.forEach((item) => {
        const div = document.createElement('div');
        div.className = `border border-[#12132D26] p-6 rounded-2xl`;
        div.innerHTML = `
        <div class="h-[190px]"><img class="rounded-xl" src="${item.cover_image}" alt=""></div>
                    <div class="flex items-center gap-2 mt-0 lg:mt-16 my-3">
                        <img src="./images/date.png" alt="">
                        <p class="mulish text-[18px] text-[#12132D99]">${item.author.posted_date ? item.author.posted_date : "No publish date"}</p>
                    </div>
                    <p class="text-[18px] lg:text-xl text-[#12132D] font-black mulish">${item.title}</p>
                    <p class="mulish text-[18px] text-[#12132D99] my-3">${item.description}</p>
                    <div class="flex lg:flex-row flex-col gap-4">
                        <div class="w-[50px] h-[50px]"><img class="rounded-full" src="${item.profile_image}" alt=""></div>
                        <div>
                            <p class="text-[18px] lg:text-xl text-[#12132D] font-extrabold mulish">${item.author.name}</p>
                            <p class="mulish text-[18px] text-[#12132D99]">${item.author.designation ? item.author.designation : "Unknown"}</p>
                        </div>
                    </div>
        `;
        latestPostContainer.appendChild(div)


    });

};

const categoryPost = async (category) => {
    console.log(category);

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
    const data = await res.json();
    const allPostContainer = document.getElementById('all-post-container');
    allPostContainer.innerHTML = "";
    data.posts.forEach((item) => {
        // console.log(item.title);
        const a = item.title;
        const titleModify = a.replace(/'/g, "&acute;");

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="flex lg:flex-row flex-col bg-[#F3F3F5] rounded-2xl mb-5 gap-4 p-8">

                            <div class="img w-[50px] h-[50px] relative">
                                <img class="rounded-lg" src="${item.image}" alt="">
                                <div class="w-3 online-check h-3 rounded-full absolute left-10 bottom-11 border border-white">
                                </div>
                            </div>

                            <div class="w-full">
                                <div
                                    class="flex flex-wrap items-center gap-5 text-[14px] inter font-medium text-[#12132DCC">
                                    <p># ${item.category}</p>
                                    <p>Author : ${item.author.name}</p>
                                </div>
                                <p class="text-[#12132D] mulish font-black text-[18px] lg:text-xl">${titleModify}</p>
                                <p class="text-[#12132D99] text-[16px] mt-2 inter">${item.description}</p>
                                <hr class="border-dashed border-[1px] border-[#12132D40] my-5">
                                <div class="flex flex-wrap justify-between items-center">
                                    <div class="flex flex-wrap gap-7 text-[16px] text-[#12132D99]">
                                        <div class="flex items-center gap-4">
                                            <img src="./images/text.png" alt="">
                                            <p>${item.comment_count}</p>
                                        </div>
                                        <div class="flex items-center gap-4">
                                            <img src="./images/eye.png" alt="">
                                            <p>${item.view_count}</p>
                                        </div>
                                        <div class="flex items-center gap-4">
                                            <img src="./images/time.png" alt="">
                                            <p>${item.posted_time} min</p>
                                        </div>

                                    </div>
                                    <button onclick="addToCard('${titleModify}', '${item.view_count}')"><img class="mt-4 lg:mt-0" src="./images/message.png" alt=""></button>
                                </div>
                                
                            </div>
                        </div>
        `;
        const activeCheck = item.isActive;
        const onlineCheck = div.querySelector('.online-check');
        if (activeCheck) {
            onlineCheck.classList.add('bg-green-500');
        } else {
            onlineCheck.classList.add('bg-red-500');
        }
        allPostContainer.appendChild(div);
    })



}
const searchBtn = () => {
    const inputField = document.getElementById('text-field');
    const getValue = inputField.value
    if (getValue) {
        spinnerOne.classList.remove('hidden');
        allPostContainer.classList.add('hidden');
        setTimeout(() => {
            spinnerOne.classList.add('hidden');
            allPostContainer.classList.remove('hidden');
            document.getElementById('text-field').value = '';
        }, 2000);
        categoryPost(getValue);
    } else {
        alert('Please type any category');
    }
}

allPost();
latestPost();