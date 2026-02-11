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

const displayLesson = (lessons) => {
  // 1 . get the container and empty
  const levelContainer = document.getElementById("level-Container");
  // 2 . get into every lesson
  for (let lesson of lessons) {
      console.log(lesson)
      // 3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button class="btn btn-outline btn-primary">
    <i class="fa-solid fa-circle-question"></i>LESSONS-${lesson.level_no}
    </button>
    `;
    // 4. Append Child 
    levelContainer.appendChild(btnDiv);
  }
};
loadLesson();
