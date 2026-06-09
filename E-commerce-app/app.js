const products = [
  {id:1,name:"iPhone 14",price:500,img:"https://images.unsplash.com/photo-1678685888221-3b1c1b0a0b0a?w=500"},
  {id:2,name:"Gaming Laptop",price:900,img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"},
  {id:3,name:"MacBook Pro",price:1200,img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"},
  {id:4,name:"Headphones",price:120,img:"https://images.unsplash.com/photo-1580894894513-541e068a3e2f?w=500"},
  {id:5,name:"Smart Watch",price:150,img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"},
  {id:6,name:"Shoes",price:80,img:"https://images.unsplash.com/photo-1528701800489-20be3c1c0c0f?w=500"},
  {id:7,name:"T-Shirt",price:25,img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"},
  {id:8,name:"Camera",price:600,img:"https://images.unsplash.com/photo-1519183071298-a2962be96f83?w=500"},
  {id:9,name:"Tablet",price:300,img:"https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500"},
  {id:10,name:"Speaker",price:90,img:"https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500"},
  {id:11,name:"Backpack",price:70,img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"},
  {id:12,name:"Keyboard",price:110,img:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500"}
];

let cart = [];
let wishlist = [];

/* SHOW PRODUCTS */
function show(){
  let box = document.getElementById("products");
  box.innerHTML = "";

  products.forEach(p=>{
    box.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>

        <button onclick="addCart(${p.id})">Add Cart</button>
        <button onclick="addWish(${p.id})">❤️</button>
      </div>
    `;
  });
}

/* CART FIX (NO LIMIT NOW) */
function addCart(id){
  let item = products.find(p=>p.id===id);

  let exist = cart.find(c=>c.id===id);
  if(exist){
    exist.qty++;
  }else{
    cart.push({...item,qty:1});
  }

  updateCart();
}

function updateCart(){
  document.getElementById("cartCount").innerText = cart.length;

  let html = "";
  let total = 0;

  cart.forEach((c,i)=>{
    total += c.price * c.qty;

    html += `
      <p>
        ${c.name} ($${c.price})
        <button onclick="change(${i},-1)">-</button>
        ${c.qty}
        <button onclick="change(${i},1)">+</button>
      </p>
    `;
  });

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("total").innerText = "Total: $" + total;
}

function change(i,val){
  cart[i].qty += val;
  if(cart[i].qty<=0) cart.splice(i,1);
  updateCart();
}

/* WISHLIST */
function addWish(id){
  let item = products.find(p=>p.id===id);
  if(!wishlist.find(w=>w.id===id)){
    wishlist.push(item);
  }

  document.getElementById("wishCount").innerText = wishlist.length;

  let html = "";
  wishlist.forEach(w=>{
    html += `<p>${w.name}</p>`;
  });

  document.getElementById("wishItems").innerHTML = html;
}

/* TOGGLES */
function toggleCart(){
  let c = document.getElementById("cart");
  c.style.display = c.style.display==="block"?"none":"block";
}

function toggleWishlist(){
  let w = document.getElementById("wishlist");
  w.style.display = w.style.display==="block"?"none":"block";
}

/* INIT */
show();
updateCart();