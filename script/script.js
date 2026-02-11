const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el} </span>`);
  return (htmlElements.join(" "));
};

const manageSpinner = (status)=>{
 if(status == true){
      document.getElementById("spinner").classList.remove('hidden');
      document.getElementById("word-container").classList.add('hidden');
 }else{
       document.getElementById("word-container").classList.remove("hidden");
       document.getElementById("spinner").classList.add("hidden"); 
 }
}

const loadLesson = async () => {
  //async hocche special magical word er moto behave kore
  try {
    const fetchedItems = await fetch(
      "https://openapi.programming-hero.com/api/levels/all",
    );
    const data = await fetchedItems.json();
    //     console.log(data.data);
    displayLesson(data.data);
  } catch (error) {
    console.log("error loading lession", error);
  }
};
const loadLevelWord = async (id) => {
  // console.log(id)
  manageSpinner (true);
  const url = await fetch(
    `https://openapi.programming-hero.com/api/level/${id}`,
  );
  // console.log(url);
  const loadWord = await url.json();
  // console.log(loadWord.data);
  //   const clickBtn = document.getElementById(`lesson-btn-${id}`);
  //   clickBtn.classList.add("active");
  displayLevelWord(loadWord.data);
  // console.log(data);
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  //   console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayWordsDetails(details.data);
};
const displayWordsDetails = (word) => {
//   console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
      <div class="">
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone"></i> ${word.pronunciation})</h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>
      `;
  document.getElementById("my_modal_2").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  // console.log(levelContainer);
  if (words.length === 0) {
    wordContainer.innerHTML = `
      <div class="text-center col-span-full rounded py-10 bangla-font">
      <img class="mx-auto" src ="./assets/alert-error.png">
        <p class=" font-poppins text-gray-400 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।,</p>
        <h2 class="text-2xl bangla-font font-semibold">নেক্সট Lesson এ যান।</h2>
      </div>
`;
manageSpinner(false);
    return;
  }
  words.forEach((word) => {
    //     console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায় নি!!"}</h2>
        <p class="font-poppins text-2xl">Meaning/ Pronunciation</p>
        <div class="font-bangla text-2xl">"${word.meaning ? word.meaning : "অর্থপাওয়া যায় নি!!"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায় নি!!"}"</div>
        <div class="flex justify-between items-center">
        <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>`;
    wordContainer.appendChild(card);
  });
  manageSpinner(false);
};

const displayLesson = (lessons) => {
  // 1 . get the container and empty
  const levelContainer = document.getElementById("level-Container");
  levelContainer.innerHTML = "";
  // 2 . get into every lesson
  for (let lesson of lessons) {
    // console.log(lesson)
    // 3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
    <i class="fa-solid fa-circle-question"></i>LESSONS-${lesson.level_no}
    </button>
    `;
    // 4. Append Child
    levelContainer.appendChild(btnDiv);
  }
};
loadLesson();
