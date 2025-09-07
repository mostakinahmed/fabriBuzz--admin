feather.replace();
function showSection(sectionId) {
  const sections = ["dashboard", "products", "categories", "orders", "users"];
  sections.forEach((id) => {
    document.getElementById(id).classList.add("hidden");
  });
  document.getElementById(sectionId).classList.remove("hidden");

  // Fetch products when the Products section is shown
  if (sectionId === "products") {
    fetchProducts();
  }
  //fetch dashboard data when dashboard is shown
  if (sectionId === "dashboard") {
    fetchDashboardData();
  }
  //fetch category data when category is shown
  if (sectionId === "categories") {
    fetchCategoryData();
  }
}

//popup maintainer
function showPopup() {
  document.getElementById("popup").style.display = "flex";
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Show/hide add product form
const form = document.getElementById("add-product-form");
function showAddProduct() {
  form.classList.toggle("hidden");
}

// Show/hide add category form
function showAddCategory() {
  const form = document.getElementById("add-category-form");
  form.classList.toggle("hidden");
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("-translate-x-full");
}

// Add new product
const addBtn = document.getElementById("addProductBtn");
addBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  const form = e.target.form;
  const data = {
    name: form.name.value,
    price: form.price.value,
    category: form.category.value,
    description: form.description.value,
    images: form.images.value,
  };

  if (
    data.name === "" ||
    data.price === "" ||
    data.category === "" ||
    data.images === "" ||
    data.description === ""
  ) {
    alert("Please fill in all fields");
    return;
  } else {
    //console.log("All fields are filled");

    const response = await fetch("https://fabribuzz.onrender.com/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.text();
    //reset form and hide it
    form.reset();
    fetchProducts();
    showAddProduct();
  }
});

// //show all products
async function fetchProducts() {
  const response = await fetch("https://fabribuzz.onrender.com/api/product");
  const products = await response.json();
  countProduct = products.length;
  const productsContainer = document.getElementById("product-table-body");

  productsContainer.innerHTML = "";
  products.forEach((product, index) => {
    // Create table row
    const productRow = document.createElement("tr");

    productRow.innerHTML = `
    <td class="px-6 py-4">${index + 1}</td>
    <td class="px-6 py-4">${product.name}</td>
    <td class="px-6 py-4">$${product.price}</td>
    <td class="px-6 py-4">${product.category}</td>
    <td class="px-6 py-4">
      <img src="${product.images}" alt="${
      product.name
    }" class="h-12 w-12 object-cover rounded-md" />
    </td>

    <td class="px-6 py-4 space-x-2">
      <button class="bg-yellow-400 text-white px-2 py-1 rounded-lg hover:bg-yellow-500">
        Edit
      </button>
      <button class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600">
        Delete
      </button>
    </td>
  `;
    // Append to tbody
    productsContainer.appendChild(productRow);
  });
}
fetchProducts();

//---------------------Add new category------------------
const addCategoryBtn = document.getElementById("addCategoryBtn");
addCategoryBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  //  const categoryForm = document.getElementById("categoryForm");
  const categoryFormData = e.target.form;
  const data = {
    catName: categoryFormData.catname.value,
    catID: categoryFormData.catid.value,
  };
  console.log(data);
  if (data.catName === "" || data.catID === "") {
    alert("Please fill in all fields");
    return;
  } else {
    const response = await fetch(
      "https://fabribuzz.onrender.com/api/category",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    showPopup();
    //reset form and hide it
    categoryForm.reset();
    fetchCategories();
    showAddCategory();
  }
});

// fetch Categories
async function fetchCategories() {
  const response = await fetch("https://fabribuzz.onrender.com/api/category");
  const categories = await response.json();
  catCount = categories.length;
  const categoriesContainer = document.getElementById("category-table-body");

  categoriesContainer.innerHTML = "";
  categories.forEach((category, index) => {
    // Create table row
    const categoryRow = document.createElement("tr");

    categoryRow.innerHTML = `
    <td class="px-6 py-4">${index + 1}</td>
      <td class="px-6 py-4">${category.catID}</td>
    <td class="px-6 py-4">${category.catName}</td>
  
    <td class="px-6 py-4">
      <button class="bg-yellow-400 text-white px-2 py-1 rounded-lg hover:bg-yellow-500">
        Edit
      </button>
      <button class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600">
        Delete
      </button>
    </td>
  `;

    // Append to tbody
    categoriesContainer.appendChild(categoryRow);
  });
}
fetchCategories(); // Run automatically when page loads

// Run automatically when page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchDashboardData();
  fetchCategories();
  fetchProducts();
});

//fetch dashboard data
async function fetchDashboardData() {
  const dashboard = document.getElementById("dashboard");

  //product count
  const response = await fetch("https://fabribuzz.onrender.com/api/product");
  const pData = await response.json();
  const catResponse = await fetch(
    "https://fabribuzz.onrender.com/api/category"
  );
  const cData = await catResponse.json();
  catCount = cData.length;
  countProduct = pData.length;

  // Update dashboard elements

  // document.getElementById("total-products").innerText = data.totalProducts;
  // document.getElementById("total-orders").innerText = data.totalOrders;
  // document.getElementById("total-users").innerText = data.totalUsers;
  // document.getElementById("total-categories").innerText = data.totalCategories;

  // You can also update charts or other dashboard elements here
  dashboard.innerHTML = ""; //reset dashboard content
  dashboard.innerHTML = `
     <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 class="text-gray-500">Total Products</h2>
              <p class="text-2xl font-bold mt-2">${countProduct}</p>
            </div>
            <div
              class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 class="text-gray-500">Total Orders</h2>
              <p class="text-2xl font-bold mt-2">0</p>
            </div>
            <div
              class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 class="text-gray-500">Total Users</h2>
              <p class="text-2xl font-bold mt-2">0</p>
            </div>
            <div
              class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 class="text-gray-500">Total Categories</h2>
              <p class="text-2xl font-bold mt-2">${catCount}</p>
            </div>
          </div>
  `;
}
