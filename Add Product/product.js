// window.location.href = window.location.href + "#top";
//category dropdown
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
});

document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop default reload

  // 1️⃣ Collect General Info
  const product = {
    productName: document.getElementById("productName").value.trim(),
    brandName: document.getElementById("brandName").value.trim(),
    price: parseFloat(document.getElementById("price").value) || 0,
    stock: parseInt(document.getElementById("stock").value) || 0,
    category: document.getElementById("categoryDropdown").value,
    image: document.getElementById("image").value.trim(),
    specifications: {}, // will hold dynamic categories
  };

  // 2️⃣ Collect Dynamic specifications
  const categories = [
    "hardware",
    "cpu",
    "network",
    "gpu",
    "display",
    "battery",
    "software",
    "ports",
    "audio",
    "dimensions",
    "color",
  ];

  categories.forEach((cat) => {
    const container = document.getElementById(cat + "Fields");
    const checkbox = document.getElementById(cat + "Check");
    if (container && checkbox && checkbox.checked) {
      const keys = container.querySelectorAll(`input[name='${cat}Key[]']`);
      const values = container.querySelectorAll(`input[name='${cat}Value[]']`);
      product.specifications[cat] = [];

      keys.forEach((keyInput, i) => {
        const valInput = values[i];
        if (keyInput.value.trim() && valInput.value.trim()) {
          product.specifications[cat].push({
            key: keyInput.value.trim(),
            value: valInput.value.trim(),
          });
        }
      });
    }
  });

  // 🔹 This is what you'll send to backend

  // // 3️⃣ Send to backend (example using fetch)
  fetch("https://fabribuzz.onrender.com/api/product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Product saved!");
      console.log(product);

      // optionally reset form here
      document.getElementById("productForm").reset();
      // hide all dynamic spec sections
      categories.forEach((cat) =>
        document.getElementById(cat + "Fields")?.classList.add("hidden")
      );
    })
    .catch((err) => console.error(err));
});

// const saveBtn = document.getElementById("save-product");

// saveBtn.addEventListener((e) => {
//   e.preventDefault();
//   console.log("save data");
// });
