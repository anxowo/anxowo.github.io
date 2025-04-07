let products = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 3;

function displayProducts(list) {
    const container = document.getElementById("products");
    container.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = list.slice(startIndex, endIndex);

    paginatedItems.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `<strong>${product.name}</strong> - <em>${product.category}</em>`;
        container.appendChild(div);
    });

    renderPagination(list.length);
}

function filterProducts() {
    const category = document.getElementById("category").value;
    const search = document.getElementById("search").value.toLowerCase();

    filteredProducts = products;

    if (category !== "all") {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (search) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(search)
        );
    }

    currentPage = 1;
    displayProducts(filteredProducts);
}

function renderPagination(totalItems) {
    const container = document.getElementById("products");
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pagination = document.createElement("div");
    pagination.className = "pagination";

    const prevButton = document.createElement("button");
    prevButton.textContent = "Anterior";
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => {
        currentPage--;
        displayProducts(filteredProducts);
    };

    const nextButton = document.createElement("button");
    nextButton.textContent = "Siguiente";
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => {
        currentPage++;
        displayProducts(filteredProducts);
    };

    pagination.appendChild(prevButton);
    pagination.appendChild(document.createTextNode(` Página ${currentPage} de ${totalPages} `));
    pagination.appendChild(nextButton);

    container.appendChild(pagination);
}

window.onload = async () => {
    try {
        const response = await fetch("lolo.json");
        products = await response.json();
        filteredProducts = [...products];
        displayProducts(filteredProducts);
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
};

