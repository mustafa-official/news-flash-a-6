const allPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const allPostContainer = document.getElementById('all-post-container');
    data.posts.forEach((item) => {
        // console.log(item.isActive);

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
                                <p class="text-[#12132D] mulish font-black text-[18px] lg:text-xl">${item.title}</p>
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
                                    <button onclick="addToCard('${item.title}', '${item.view_count}')"><img class="mt-4 lg:mt-0" src="./images/message.png" alt=""></button>
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

}



allPost()