feather.replace();

function showSection(sectionId) {
  const sections = ["dashboard", "products", "categories", "orders", "users"];
  sections.forEach((id) => {
    document.getElementById(id).classList.add("hidden");
  });
  document.getElementById(sectionId).classList.remove("hidden");
}

function showAddProduct() {
  const form = document.getElementById("add-product-form");
  form.classList.toggle("hidden");
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("-translate-x-full");
}

const addBtn = document.getElementById("addBtn");

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

  const response = await fetch("http://localhost:3000/api/product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.text();
  //reset form and hide it
  form.reset();
  form.classList.add("hidden");
});
