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
