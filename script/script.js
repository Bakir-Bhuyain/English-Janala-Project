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
  const url = await fetch(
    `https://openapi.programming-hero.com/api/level/${id}`,
  );
  // console.log(url);
  const loadWord = await url.json();
  // console.log(loadWord.data);
  displayLevelWord(loadWord.data);
  // console.log(data);
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  // console.log(levelContainer);
  words.forEach((word) => {
      console.log(word)
      const card = document.createElement('div');
      card.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="text-2xl font-bold">${word.word}</h2>
        <p class="font-poppins text-2xl">Meaning/ Pronunciation</p>
        <div class="font-bangla text-2xl">"${word.meaning} / ${word.pronunciation}"</div>
        <div class="flex justify-between items-center">
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>`;
      wordContainer.appendChild(card)
  });
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
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
    <i class="fa-solid fa-circle-question"></i>LESSONS-${lesson.level_no}
    </button>
    `;
    // 4. Append Child
    levelContainer.appendChild(btnDiv);
  }
};
loadLesson();
