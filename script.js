function saveItem() {
    const item = {
      code: document.getElementById('itemCode').value,
      name: document.getElementById('itemName').value,
      unit: document.getElementById('unit').value,
      stock: parseFloat(document.getElementById('openingStock').value),
      purchase: parseFloat(document.getElementById('purchaseRate').value),
      sale: parseFloat(document.getElementById('saleRate').value)
    };
  
    if (!item.code || !item.name) {
      alert("Item Code and Name are required.");
      return;
    }
  
    let items = JSON.parse(localStorage.getItem('items')) || [];
  
    // Check if item already exists (edit)
    const index = items.findIndex(i => i.code === item.code);
    if (index > -1) {
      items[index] = item;
    } else {
      items.push(item);
    }
  
    localStorage.setItem('items', JSON.stringify(items));
    loadItems();
    clearForm();
  }
  
  function loadItems() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const tbody = document.querySelector("#itemTable tbody");
    tbody.innerHTML = "";
  
    items.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.code}</td>
        <td>${item.name}</td>
        <td>${item.unit}</td>
        <td>${item.stock}</td>
        <td>${item.purchase}</td>
        <td>${item.sale}</td>
        <td>
          <button onclick="editItem('${item.code}')">Edit</button>
          <button onclick="deleteItem('${item.code}')">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }
  
  function clearForm() {
    document.getElementById('itemCode').value = "";
    document.getElementById('itemName').value = "";
    document.getElementById('unit').value = "";
    document.getElementById('openingStock').value = "";
    document.getElementById('purchaseRate').value = "";
    document.getElementById('saleRate').value = "";
  }
  
  function editItem(code) {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const item = items.find(i => i.code === code);
    if (item) {
      document.getElementById('itemCode').value = item.code;
      document.getElementById('itemName').value = item.name;
      document.getElementById('unit').value = item.unit;
      document.getElementById('openingStock').value = item.stock;
      document.getElementById('purchaseRate').value = item.purchase;
      document.getElementById('saleRate').value = item.sale;
    }
  }
  
  function deleteItem(code) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items = items.filter(i => i.code !== code);
    localStorage.setItem('items', JSON.stringify(items));
    loadItems();
  }
  
  window.onload = loadItems;
  