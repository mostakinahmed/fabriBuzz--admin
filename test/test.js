function createCategory(name) {
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

// const categories = [
//     { id: "hardware", name: "Hardware" },
//     { id: "cpu", name: "CPU" },
//     { id: "network", name: "Network" },
//     { id: "gpu", name: "GPU" },
//     { id: "display", name: "Display" },
//     { id: "battery", name: "Battery" },
//     { id: "software", name: "Software" },
//     { id: "ports", name: "Ports" },
//     { id: "audio", name: "Audio" },
//     { id: "dimensions", name: "Dimensions" },
//     { id: "color", name: "Color" },
// ];
const dropdown = document.getElementById("category");
const container = document.getElementById("categoriesContainer");
const saveBTN = document.getElementById("saveBTN");

const categories = [
  {
    id: "mobile",
    name: "Mobile",
    specifications: [
      "Hardware",
      "CPU",
      "GPU",
      "Display",
      "Battery",
      "Network",
      "Software",
      "Ports",
      "Audio",
      "Dimensions",
      "Color",
    ],
  },
  {
    id: "laptop",
    name: "Laptop",
    specifications: [
      "Hardware",
      "CPU",
      "GPU",
      "Display",
      "Battery",
      "Network",
      "Software",
      "Ports",
      "Audio",
      "Dimensions",
      "Color",
    ],
  },
  {
    id: "watch",
    name: "Watch",
    specifications: [
      "Hardware",
      "CPU",
      "Display",
      "Battery",
      "Network",
      "Software",
      "Dimensions",
      "Color",
      "Audio",
    ],
  },
  {
    id: "tshirt",
    name: "T-Shirt",
    specifications: [
      "Material",
      "Size",
      "Color",
      "Pattern",
      "Brand",
      "Fit",
      "Care Instructions",
    ],
  },
  {
    id: "wallet",
    name: "Wallet",
    specifications: [
      "Material",
      "Color",
      "Dimensions",
      "Compartments",
      "Brand",
      "Closure Type",
      "Style",
    ],
  },
  {
    id: "mouse",
    name: "Mouse",
    specifications: [
      "Type",
      "Connectivity",
      "DPI",
      "Buttons",
      "Weight",
      "Color",
      "Brand",
      "Battery Life",
    ],
  },
  {
    id: "headphones",
    name: "Headphones",
    specifications: [
      "Type",
      "Connectivity",
      "Battery Life",
      "Microphone",
      "Noise Cancellation",
      "Brand",
      "Color",
      "Weight",
    ],
  },
  {
    id: "shoes",
    name: "Shoes",
    specifications: [
      "Material",
      "Size",
      "Color",
      "Sole Type",
      "Brand",
      "Closure Type",
      "Style",
    ],
  },
  {
    id: "backpack",
    name: "Backpack",
    specifications: [
      "Material",
      "Capacity",
      "Compartments",
      "Dimensions",
      "Color",
      "Closure Type",
      "Water Resistance",
      "Brand",
    ],
  },
  {
    id: "camera",
    name: "Camera",
    specifications: [
      "Sensor",
      "Resolution",
      "Lens",
      "Battery",
      "Connectivity",
      "Storage",
      "Weight",
      "Dimensions",
      "Brand",
    ],
  },
];

dropdown.onchange = function () {
  saveBTN.classList.add("hidden");
  container.innerHTML = "";
  const currentCat = this.value;
  console.log("current category is : " + currentCat);

  const laptopSpecs = categories.find(
    (cat) => cat.id === currentCat
  ).specifications;

  console.log(laptopSpecs);

  laptopSpecs.forEach((name) => {
    console.log(name);

    container.innerHTML += createCategory(name);
  });
  saveBTN.classList.remove("hidden");
};

// const container = document.getElementById("categoriesContainer");
// categories.forEach((cat) => {
//   container.innerHTML += createCategory(cat.id, cat.name);
// });

// Show/hide category fields
function toggleCategory(id) {
  const el = document.getElementById(id);
  el.classList.toggle("hidden");
}

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
