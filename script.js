//variable
const searchProductBtn = document.getElementById("search-product-btn");
const stockUpdateDiv = document.getElementById("stockUpdateDiv");
const updateSearchProductForm = document.getElementById("stock-search-form");
const productNotFound = document.getElementById("product-not-found");
const loadingForSearchData = document.getElementById("loadingForSearchData");
const loadingForAddProduct = document.getElementById("loadingForAddProduct");
const loadingForEdit = document.getElementById("loadingForEdit");
const loadingForAddCat = document.getElementById("loadingForAddCat");
const addCatform = document.getElementById("add-category-form");
const addCategoryCancel = document.getElementById("addCategoryCancel");
const addProductCancel = document.getElementById("addProductCancel");
const stockUpdateCancel = document.getElementById("stockUpdateCancel");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const editProductForm = document.getElementById("editProductForm");
const catListForm = document.getElementById("catList");
const allProductTable = document.getElementById("allProductTable");
const form = document.getElementById("add-product-form");
const editForm = document.getElementById("edit-product-form");
const loadingDashboard = document.getElementById("loadingDashboard");
const searchInput = updateSearchProductForm.querySelector('input[name="pID"]');
const addNewPro_name = form.querySelector('input[name="name"]');
const addNewPro_price = form.querySelector('input[name="price"]');
const addNewPro_category = form.querySelector('select[name="category"]');
const addNewPro_images = form.querySelector('input[name="images"]');
const addNewPro_description = form.querySelector(
  'textarea[name="description"]'
);
loadingDashboard.classList.remove("hidden");
// loadingForSearchData.classList.add("hidden");
//feather all
feather.replace();
function showSection(sectionId) {
  const sections = ["dashboard", "products", "categories", "orders", "users"];
  sections.forEach((id) => {
    document.getElementById(id).classList.add("hidden");
  });

  // Hide all product info after click in another tab
  updateSearchProductForm.classList.add("hidden");
  if (searchInput) searchInput.value = "";
  stockUpdateDiv.classList.add("hidden");
  productNotFound.classList.add("hidden");

  //hide all add new pro form data after click another section
  form.classList.add("hidden");
  if (addNewPro_name) addNewPro_name.value = "";
  if (addNewPro_price) addNewPro_price.value = "";
  if (addNewPro_category) addNewPro_category.value = "";
  if (addNewPro_images) addNewPro_images.value = "";
  if (addNewPro_description) addNewPro_description.value = "";

  //hide all cat data
  addCatform.classList.add("hidden");
  catListForm.classList.remove("hidden"); //show this section when other section is active
  //only show the selected section
  document.getElementById(sectionId).classList.remove("hidden");

  // Fetch products when the Products section is shown
  if (sectionId === "products") {
    fetchProducts();
    allProductTable.classList.remove("hidden");
    editForm.classList.add("hidden");
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
function showAddProduct() {
  productNotFound.classList.add("hidden");
  updateSearchProductForm.classList.add("hidden");
  stockUpdateDiv.classList.add("hidden");
  allProductTable.classList.add("hidden");
  form.classList.remove("hidden");
}

// Show/hide update stock form
function showUpdateStock() {
  productNotFound.classList.add("hidden");
  form.classList.add("hidden");
  allProductTable.classList.add("hidden");
  updateSearchProductForm.classList.remove("hidden");

  stockUpdateDiv.classList.add("hidden");
  //input field make empty
  if (searchInput) searchInput.value = "";
}

// Show/hide add new category form
function showAddCategory() {
  catListForm.classList.add("hidden");
  addCatform.classList.remove("hidden");
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

  //cat data
  const response = await fetch("https://fabribuzz.onrender.com/api/category");
  const allCatData = await response.json();

  const data = {
    pID: "NULL",
    name: form.name.value,
    price: form.price.value,
    category: form.category.value,
    description: form.description.value,
    images: form.images.value,
  };

  //replace category name with id
  allCatData.forEach((category) => {
    if (category.catName === data.category) {
      data.category = category.catID;
    }
  });

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
    loadingForAddProduct.classList.remove("hidden");
    //console.log("All fields are filled");

    const response = await fetch("https://fabribuzz.onrender.com/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // await response.text();
    await response.json();
    //reset form and hide it
    form.reset();
    loadingForAddProduct.classList.add("hidden");
    showSection("products");
  }
});

//cancel button
addProductCancel.addEventListener("click", (e) => {
  e.preventDefault();

  form.classList.add("hidden");
  allProductTable.classList.remove("hidden");
});

// Show all products
async function fetchProducts() {
  const response = await fetch("https://fabribuzz.onrender.com/api/product");
  const products = await response.json();
  countProduct = products.length;
  const productsContainer = document.getElementById("product-table-body");

  // Fetch categories
  const response2 = await fetch("https://fabribuzz.onrender.com/api/category");
  const cData = await response2.json();

  productsContainer.innerHTML = "";

  products.forEach((product, index) => {
    // Find matching category by ID
    const category = cData.find((cat) => cat.catID === product.category);

    // Replace ID with category name (if found)
    const categoryName = category ? category.catName : "Unknown";

    // Create table row
    const productRow = document.createElement("tr");
    productRow.innerHTML = `
      <td class="px-6 py-4">${index + 1}</td>
      <td class="px-6 py-4">${product.pID}</td>
      <td class="px-6 py-4">${product.name}</td>
      <td class="px-6 py-4">$${product.price}</td>
      <td class="px-6 py-4">${product.stock}</td>
      <td class="px-6 py-4">${categoryName}</td>
      <td class="px-6 py-4">
        <img src="${product.images}" alt="${product.name}" 
             class="h-12 w-12 object-cover rounded-md" />
      </td>
     <td class="px-6 py-4 flex items-center space-x-2">
  <!-- Edit button -->
  <button class="bg-yellow-400 text-white px-2 py-1 rounded-lg hover:bg-yellow-500" onclick="editFunction(event, '${
    product._id
  }')">
    Edit
  </button>

  <!-- Delete button -->
  <button
    class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
    onclick="deleteFunction(event, '${product._id}')"
  >
    Delete
  </button>

  <!-- Loader-->
  <div
    id="loadingForDelete"
    class="hidden flex items-left space-x-2"
  >
    <div class="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    <span class="text-gray-600 text-[15px] font-medium">Deleting...</span>
  </div>
</td>
    `;
    // const loadingForDelete = getElementById("loadingForDelete");
    productsContainer.appendChild(productRow);
  });
}
fetchProducts();

//delete pro function
async function deleteFunction(event, productID) {
  event.preventDefault(); // prevents reload

  // loader is the next sibling of the Delete button
  const loaderForDelete = event.target.nextElementSibling;
  loaderForDelete.classList.remove("hidden");

  try {
    const response = await fetch(
      `https://fabribuzz.onrender.com/api/product/delete/${productID}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      result = { message: "Product deleted (no JSON returned)" };
    }

    if (response.ok) {
      // alert(result.message);
      loaderForDelete.classList.add("hidden"); // hide loader
      // remove row from table
      const row = event.target.closest("tr");
      if (row) row.remove();
    } else {
      alert(result.message || "Delete failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting product");
  }
}

//Update Product
async function editFunction(event, productID) {
  event.preventDefault(); // prevents reload
  loadingForEdit.classList.remove("hidden");
  allProductTable.classList.add("hidden");
  const response = await fetch("https://fabribuzz.onrender.com/api/product");
  const products = await response.json();
  const product = products.find((p) => p._id === productID);
  //all product data
  editForm.classList.remove("hidden");
  allProductTable.classList.add("hidden");
  loadingForEdit.classList.add("hidden");
  editProductForm.innerHTML = ""; //reset dashboard content
  editProductForm.innerHTML = `<input
                type="text"
                name="name"
                value="${product.name}"
                class="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                required
              />
              <input
                type="number"
                name="price"
                value="${product.price}"
                class="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                required
              />
               <input
               name = "stock"
                type="number"
                disabled
                value="${product.stock}"
                class="w-full border p-2 rounded-lg  text-gray-500  focus:ring-2 focus:ring-indigo-400"
                required
              />
          
              <select
                id="categoryDropdownForEditProduct"
                name="category"
                class="w-full border p-2 rounded-lg"
                disabled
                required
              >
                <option value="${product.category}">${product.category}</option>
              </select>

              <input
                type="text"
                name="images"
                value="${product.images}"
                class="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                required
              />

             <textarea
  name="description"
  class="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
  required
>${product.description}</textarea>
               <button
                class="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg shadow hover:from-green-600 hover:to-teal-600" 
                onclick="updateProductFunction(event,'${product._id}')"
              >
                Update Product
              </button>
               <button
                id="editCancel"
                class="bg-gradient-to-r from-red-500 to-red-500 text-white px-4 py-2 rounded-lg shadow hover:from-red-600 hover:to-red-600"
              >
                Cancel
              </button>
  `;

  //cancel button
  const editCancel = document.getElementById("editCancel");
  editCancel.addEventListener("click", (e) => {
    e.preventDefault();

    editForm.classList.add("hidden");
    allProductTable.classList.remove("hidden");
  });

  //category dropdown for edit product
  categoryDropdownForEditProduct.addEventListener("focus", async () => {
    const selectedValue = categoryDropdownForEditProduct.value; // keep current selection

    const response = await fetch("https://fabribuzz.onrender.com/api/category");
    const catData = await response.json();

    categoryDropdownForEditProduct.innerHTML = `<option value="">-- Select Category --</option>`;
    catData.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.catName;
      option.textContent = category.catName;
      if (option.value === selectedValue) {
        option.selected = true; // restore previous selection
      }
      categoryDropdownForEditProduct.appendChild(option);
    });
  });
}

//Edit Product Button
async function updateProductFunction(event, productID) {
  event.preventDefault();
  loadingForEdit.classList.remove("hidden");
  editForm.classList.add("hidden");
  const form = editProductForm;
  const data = {
    name: form.name.value,
    price: form.price.value,
    description: form.description.value,
    images: form.images.value,
    stock: form.stock.value,
    category: form.category.value,
  };

  //sent put req to api
  const response = await fetch(
    `https://fabribuzz.onrender.com/api/product/update/${productID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  loadingForEdit.classList.add("hidden");

  fetchProducts();
  allProductTable.classList.remove("hidden");
  console.log(data);
}

//---------------------Add new category------------------
addCategoryBtn.addEventListener("click", async function (e) {
  loadingForAddCat.classList.remove("hidden");
  e.preventDefault();
  //  const categoryForm = document.getElementById("categoryForm");
  const categoryFormData = e.target.form;
  const data = {
    catName: categoryFormData.catname.value,
    catID: categoryFormData.catid.value,
  };

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
    loadingForAddCat.classList.add("hidden");
    //reset form and hide it
    categoryForm.reset();
    fetchCategories();
    showSection("categories");
  }
});

//cancel button
//stock search Cancel
addCategoryCancel.addEventListener("click", (e) => {
  e.preventDefault();

  addCatform.classList.add("hidden");
  fetchCategories();
  showSection("categories");
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
  
    <td class="px-6 py-4 flex items-center space-x-2">
  <!-- Edit button -->
  <button class="bg-yellow-400 text-white px-2 py-1 rounded-lg hover:bg-yellow-500">
    Edit
  </button>

  <!-- Delete button -->
  <button
    class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
    onclick="deleteCategoryFunction(event, '${category._id}')"
  >
    Delete
  </button>

  <!-- Loader-->
  <div
    id="loadingForCatDelete"
    class=" hidden flex items-left pl-6 space-x-2"
  >
    <div class="w-5 h-5 mt-1 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    <span class="text-gray-600 text-[17px] font-medium">Deleting...</span>
  </div>
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

//delete cat function
async function deleteCategoryFunction(event, categoryID) {
  event.preventDefault(); // prevents reload

  // loader is the next sibling of the Delete button
  const loadingForCatDelete = event.target.nextElementSibling;
  loadingForCatDelete.classList.remove("hidden");

  try {
    const response = await fetch(
      `https://fabribuzz.onrender.com/api/category/delete/${categoryID}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      result = { message: "Product deleted (no JSON returned)" };
    }

    if (response.ok) {
      // alert(result.message);
      loadingForCatDelete.classList.add("hidden"); // hide loader
      // remove row from table
      const row = event.target.closest("tr");
      if (row) row.remove();
    } else {
      alert(result.message || "Delete failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting product");
  }
}

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
  // You can also update charts or other dashboard elements here
  dashboard.innerHTML = ""; //reset dashboard content
  dashboard.innerHTML = `
     <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div class="bg-gradient-to-r from-green-400 to-emerald-600 p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-white/80 text-sm font-medium">Total Products</h2>
      <p class="text-3xl font-extrabold text-white mt-2">${countProduct}</p>
    </div>
    <div class="bg-white/20 p-3 rounded-full">
      <!-- Box icon for products -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4m16 0l-8 8m8-8l-8-8" />
      </svg>
    </div>
  </div>
</div>

            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-white/80 text-sm font-medium">Total Categories</h2>
      <p class="text-3xl font-extrabold text-white mt-2">${catCount}</p>
    </div>
    <div class="bg-white/20 p-3 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    </div>
  </div>
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
            
          </div>
  `;
  loadingDashboard.classList.add("hidden");
}

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

//--------------stock update----------------
//search product
searchProductBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  loadingForSearchData.classList.remove("hidden");
  productNotFound.classList.add("hidden");
  stockUpdateDiv.classList.add("hidden");
  const form = e.target.form;
  pid = form.pID.value;

  //handle empty input
  if (pid == "") {
    loadingForSearchData.classList.add("hidden");
    alert("Please input Product ID");
    return;
  }
  //get product data
  const response = await fetch("https://fabribuzz.onrender.com/api/product");
  const proData = await response.json();

  let found = 0;
  let foundData;
  proData.forEach((product) => {
    if (product.pID === pid) {
      found = 1;
      foundData = product;
      return;
    }
  });

  if (found == 1) {
    loadingForSearchData.classList.add("hidden");
    stockUpdateDiv.classList.remove("hidden");
    productNotFound.classList.add("hidden");

    // stockUpdate(pid);
    showDataDiv(pid, foundData);
  } else if (found == 0) {
    loadingForSearchData.classList.add("hidden");
    productNotFound.classList.remove("hidden");
    stockUpdateDiv.classList.add("hidden");
  }
});

//stock search Cancel
stockUpdateCancel.addEventListener("click", (e) => {
  e.preventDefault();

  updateSearchProductForm.classList.add("hidden");
  fetchProducts();
  allProductTable.classList.remove("hidden");
});

//show div
function showDataDiv(ID, foundData) {
  const stockUpdateDiv = document.getElementById("stockUpdateDiv");

  stockUpdateDiv.innerHTML = "";
  stockUpdateDiv.innerHTML = ` <div class="flex-shrink-0 w-full md:w-1/3">
              <img
                id="product-image"
                src="${foundData.images}"
                alt="Product Image"
                class="w-full h-full object-cover rounded-xl border border-gray-200"
              />
            </div>

            <!-- Product Details & Update Stock -->
            <div class="flex-1 flex flex-col justify-between space-y-4">
              <!-- Product Info -->
              <div class="space-y-3">
                <h3
                  class="text-3xl font-extrabold text-gray-900 tracking-tight"
                  id="product-name"
                >
                  ${foundData.name}
                </h3>
                <div class="grid grid-cols-2 gap-4 text-gray-700">
                  <p class="font-medium">
                    <span class="text-gray-500">ID:</span>
                    <span id="product-id">${foundData.pID}</span>
                  </p>
                  <p class="font-medium">
                    <span class="text-gray-500">Price:</span> $<span
                      id="product-price"
                      >${foundData.price}</span
                    >
                  </p>
                  <p class="font-medium">
                    <span class="text-gray-500">Current Stock:</span>
                    <span id="product-stock">${foundData.stock}</span>
                  </p>

                </div>
              </div>

              <!-- Update Stock Form -->
              <form
                id="update-stock-form"
                class="mt-4 flex flex-col sm:flex-row items-center gap-3"
              >
                <input
                  type="number"
                  name="stock"
                  placeholder="Enter new stock"
                  class="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  required
                />
                <!-- Small loading spinner beside button -->
<div id="loadingForUpdateStock" class="flex items-center space-x-2 hidden">
  <!-- Spinner -->
  <div class="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
  <!-- Text -->
  <span class="text-gray-600 text-sm font-medium">Updating...</span>
</div>
                <button
                id="update-stock-button"
                  type="submit"
                  class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transform transition"
                >
                  Update Stock
                </button>
              </form>
              <!-- loader -->
            </div>
  `;

  //for loader
  const loadingForUpdateStock = document.getElementById(
    "loadingForUpdateStock"
  );
  //for button
  const updateStockButton = document.getElementById("update-stock-button");
  //update stock button
  updateStockButton.addEventListener("click", (e) => {
    e.preventDefault();

    const form = e.target.form;
    let stockValue = form.stock.value;
    if (stockValue === "") {
      alert("Please input stock value.");
      return;
    }
    loadingForUpdateStock.classList.remove("hidden");
    stockValue = Number(stockValue);
    stockValue = stockValue + foundData.stock;
    stockUpdate(foundData.pID, stockValue);
  });
}

async function stockUpdate(pID, stockValue) {
  const data = { stock: stockValue };
  console.log(pID);
  const response = await fetch(
    `https://fabribuzz.onrender.com/api/product/${pID}/stock`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (response.ok) {
    loadingForUpdateStock.classList.add("hidden");
    showSection("products");
  }
  if (!response.ok) {
    throw new Error(`Failed to update stock: ${response.status}`);
  }
}
