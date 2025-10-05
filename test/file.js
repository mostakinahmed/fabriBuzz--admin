//category show
categoryDropdown.addEventListener("focus", async () => {
  const selectedValue = categoryDropdown.value; // keep current selection

  const response = await fetch("https://fabribuzz.onrender.com/api/category");
  const catData = await response.json();

  categoryDropdown.innerHTML = `<option value="">-- Select Category --</option>`;
  catData.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.catName;
    option.textContent = category.catName;
    if (option.value === selectedValue) {
      option.selected = true; // restore previous selection
    }
    categoryDropdown.appendChild(option);
  });

  //dynamic filed view
  categoryDropdown.onchange = function () {
    saveBTN.classList.add("hidden");
    container.innerHTML = "";
    const currentCat = this.value;
    console.log("current category is : " + currentCat);

    //data load from api.. all sub cat list
    const specification = catData.find(
      (cat) => cat.catName === currentCat
    ).specifications;

    console.log(specification);

    specification.forEach((name) => {
      container.innerHTML += createCategory(name);
    });
    saveBTN.classList.remove("hidden");
  };
});
