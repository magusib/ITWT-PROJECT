const itemPrices = {
            bangusItem: 250,
            lapuItem: 500,
            mayaItem: 600,
            galungongItem: 300,
            tilapiaItem: 180,
            tunaItem: 360,
            salmonItem: 800,
            tambanItem: 220,
            alumahanItem: 360,
            hitoItem: 300,
            hiponItem: 700,
            alimasagItem: 800,
            alimangoItem: 900,
            pusitItem: 480,
            octopusItem: 800,
            tahongItem: 250,
            talabaItem: 300,
            halaanItem: 300,
            lobsterItem: 900,
            seaItem: 500
        }

        const itemNames = {
            bangusItem: 'Bangus',
            lapuItem: 'Lapu-lapu',
            mayaItem: 'Maya-maya',
            galungongItem: 'Galunggong',
            tilapiaItem: 'Tilapia',
            tunaItem: 'Tuna',
            salmonItem: 'Salmon',
            tambanItem: 'Tamban',
            alumahanItem: 'Alumahan',
            hitoItem: 'Hito',
            hiponItem: 'Hipon',
            alimasagItem: 'Alimasag',
            alimangoItem: 'Alimango',
            pusitItem: 'Pusit',
            octopusItem: 'Octopus',
            tahongItem: 'Tahong',
            talabaItem: 'Talaba',
            halaanItem: 'Halaan',
            lobsterItem: 'Lobster',
            seaItem: 'Sea Urchin'
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        function addItem(itemId) {
            const existingItem = cart.find(item => item.id === itemId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: itemId,
                    name: itemNames[itemId],
                    price: itemPrices[itemId],
                    quantity: 1
                });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }

        function renderCart() {
            const cartElement = document.getElementById('cart');
            if (cart.length === 0) {
                cartElement.innerHTML = 'Cart is empty';
            } else {
                cartElement.innerHTML = cart.map((item, index) => `
                    <div class="cart-item">
                        <span>${item.name} - ₱${item.price} x ${item.quantity}</span>
                        <button onclick="editItem(${index})">Edit</button>
                        <button onclick="deleteItem(${index})">Delete</button>
                    </div>
                `).join('');
            }
            calculateTotal();
        }

        function editItem(index) {
            const newQuantity = prompt('Enter new quantity:', cart[index].quantity);
            if (newQuantity !== null && !isNaN(newQuantity) && newQuantity > 0) {
                cart[index].quantity = parseInt(newQuantity);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        }

        function deleteItem(index) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }

        function calculateTotal() {
            let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            document.getElementById('totalPrice').innerHTML = `<p>Total: ₱${total.toFixed(2)}</p>`;
        }

        renderCart();