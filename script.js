tailwind.config = { theme: { extend: { fontFamily: { display: ['"Bebas Neue"', 'sans-serif'] }, colors: { gold:'#D4AF37', silver:'#C0C0C0', cream:'#FFF8E7', ink:'#0a0a0a', card:'#1a1a1a' }, boxShadow: { glow:'0 0 0 1px rgba(212,175,55,.25), 0 0 35px rgba(212,175,55,.16)' } } } }

const cart = [];
let mode = 'Pickup';
const cartList = document.getElementById('cartList');
const subtotalEl = document.getElementById('subtotal');
const modeLabel = document.getElementById('modeLabel');
const fmt = n => '$' + n.toFixed(2);

function renderCart(){
  cartList.innerHTML = cart.length ? cart.map((it,i)=>`
    <div class="flex items-center justify-between gap-4 p-4 rounded-2xl bg-ink border border-gold/15">
      <div>
        <div class="font-bold text-cream">${it.name}</div>
        <div class="text-silver text-sm">${fmt(it.price)} each</div>
      </div>
      <div class="flex items-center gap-2">
        <button class="qty px-3 py-1 rounded-full border border-gold/20" data-i="${i}" data-d="-1">-</button>
        <span class="min-w-8 text-center">${it.qty}</span>
        <button class="qty px-3 py-1 rounded-full border border-gold/20" data-i="${i}" data-d="1">+</button>
      </div>
      <div class="w-20 text-right font-bold">${fmt(it.price*it.qty)}</div>
    </div>`).join('') : '<div class="text-silver p-6 text-center border border-dashed border-gold/20 rounded-2xl">Your cart is empty. Add a scoop and start the drip.</div>';
  const sub = cart.reduce((s,it)=>s + it.price*it.qty,0);
  subtotalEl.textContent = fmt(sub);
}
document.addEventListener('click', e=>{
  const add = e.target.closest('.add-btn');
  if(add){ cart.push({name:add.dataset.name, price:+add.dataset.price, qty:1}); renderCart(); }
  const q = e.target.closest('.qty');
  if(q){ const i=+q.dataset.i; cart[i].qty += +q.dataset.d; if(cart[i].qty<=0) cart.splice(i,1); renderCart(); }
  if(e.target.closest('.toggle')){
    mode = e.target.dataset.mode;
    document.querySelectorAll('.toggle').forEach(b=>{ b.className = 'toggle px-4 py-2 rounded-full font-bold ' + (b.dataset.mode===mode ? 'bg-gold text-ink' : 'border border-gold text-gold'); });
    modeLabel.textContent = mode + ' selected';
  }
  const book = e.target.closest('.bookBtn');
  if(book){
    const email = document.getElementById(book.dataset.name.toLowerCase().replace(/\s+/g,'') + 'Email')?.value || document.querySelector('#orderEmail')?.value || '';
    const name = document.getElementById(book.dataset.name.toLowerCase().replace(/\s+/g,'') + 'Name')?.value || document.querySelector('#orderName')?.value || '';
    window.__processPayment({ amountCents: Math.round(parseFloat(book.dataset.price) * 100), email, name, productName: book.dataset.name, productDescription: book.dataset.name + ' catering package', quantity: 1 });
  }
});
document.getElementById('checkoutBtn').addEventListener('click', ()=>{
  const sub = cart.reduce((s,it)=>s + it.price*it.qty,0);
  if(!cart.length) return alert('Add items to your cart first.');
  const email = document.getElementById('orderEmail').value.trim();
  const name = document.getElementById('orderName').value.trim();
  window.__processPayment({ amountCents: Math.round(sub * 100), email, name, productName: "Ryan's Ice Cream Shop Order", productDescription: mode + ' order from Bluffton, SC', quantity: 1 });
});
renderCart();