function createCategory(id, name) {
  return `
                    
            <div class="border p-4 mb-2 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <label class="flex items-center gap-2 font-semibold">
                  <input type="checkbox" id="${name}Check" onclick="toggleCategory('${name}Fields')">
                  ${name}
                </label>
                <button type="button" onclick="addKeyValue('${name}Fields')" class="text-green-500 bg-gray-200 rounded-md hover:bg-gray-300 px-3 font-bold text-2xl">+</button>
              </div>
              <div id="${name}Fields" class="space-y-2 hidden">
                <div class="flex gap-4 items-center">
                  <input type="text" placeholder="Key" class="p-2 border rounded w-1/2" name="${name}Key[]">
                  <input type="text" placeholder="Value" class="p-2 border rounded w-1/2" name="${name}Value[]">
                  <button type="button" onclick="removeBox(this)" class="text-red-500 bg-gray-200 rounded-md hover:bg-gray-300 px-3 font-bold text-2xl">×</button>
                </div>
              </div>
            </div>
          `;
}

// ];
const dropdown = document.getElementById("category");
const container = document.getElementById("categoriesContainer");
const saveBTN = document.getElementById("saveBTN");

// category dropdown
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

// Show/hide category fields
function toggleCategory(id) {
  const el = document.getElementById(id);
  el.classList.toggle("hidden");
}

// Add new key-value input pair
// function addKeyValue(containerId) {
// console.log(containerId);

//   const container = document.getElementById(containerId);
//   const div = document.createElement("div");
//   div.className = "flex gap-4 items-center";
//   div.innerHTML = `
//         <input type="text" placeholder="Key" class="p-2 border rounded w-1/2" name="${containerId}Key[]">
//         <input type="text" placeholder="Value" class="p-2 border rounded w-1/2" name="${containerId}Value[]">
//         <button type="button" onclick="removeBox(this)" class="text-red-600 font-bold text-xl">×</button>
//       `;
//   container.appendChild(div);
// }
// Add new key-value input pair
function addKeyValue(containerId) {
  const container = document.getElementById(containerId);
  const div = document.createElement("div");
  div.className = "flex gap-4 items-center";
  div.innerHTML = `
        <input type="text" placeholder="Key" class="p-2 border rounded w-1/2" name="${containerId}Key[]">
        <input type="text" placeholder="Value" class="p-2 border rounded w-1/2" name="${containerId}Value[]">
        <button type="button" onclick="removeBox(this)" class="text-red-600 font-bold text-xl">×</button>
      `;
  container.appendChild(div);
}

// Remove key-value input pair
function removeBox(button) {
  button.parentElement.remove();
}
