const cart=[], orderState={type:'Pickup'};
    const money=n=>'$'+n.toFixed(2);
    const itemsEl=document.getElementById('cartItems'), subtotalEl=document.getElementById('subtotal');
    function renderCart(){
      itemsEl.innerHTML=cart.length?cart.map((i,idx)=>`<div class="flex items-center justify-between gap-3 rounded-2xl bg-black/35 border border-white/10 p-4"><div><div class="font-bold">${i.name}</div><div class="text-white/50 text-sm">${money(i.price)} each</div></div><div class="flex items-center gap-2"><button class="qty-btn w-8 h-8 rounded-full bg-white/10" data-idx="${idx}" data-d="-1">−</button><div class="min-w-8 text-center">${i.qty}</div><button class="qty-btn w-8 h-8 rounded-full bg-white/10" data-idx="${idx}" data-d="1">+</button><div class="w-24 text-right font-bold">${money(i.price*i.qty)}</div></div></div>`).join(''):'<div class="text-white/50 py-10 text-center border border-dashed border-white/10 rounded-2xl">Your cart is empty. Add a few dripped flavors.</div>';
      const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
      subtotalEl.textContent=money(subtotal);
    }
    document.querySelectorAll('.add-btn').forEach(btn=>btn.onclick=()=>{const c=btn.closest('.flavor-card');const name=c.dataset.name,price=parseFloat(c.dataset.price);const ex=cart.find(i=>i.name===name);ex?ex.qty++:cart.push({name,price,qty:1});renderCart()});
    itemsEl.addEventListener('click',e=>{if(!e.target.classList.contains('qty-btn')) return;const idx=+e.target.dataset.idx;cart[idx].qty+=+e.target.dataset.d;if(cart[idx].qty<=0) cart.splice(idx,1);renderCart()});
    document.querySelectorAll('.orderType').forEach(b=>b.onclick=()=>{document.querySelectorAll('.orderType').forEach(x=>x.className='orderType px-4 py-2 rounded-full text-white/70 text-xs font-bold uppercase');b.className='orderType px-4 py-2 rounded-full bg-[#d4af37] text-black text-xs font-bold uppercase';orderState.type=b.dataset.type;});
    document.getElementById('checkoutBtn').onclick=async()=>{
      if(!cart.length) return alert('Add items to your cart first.');
      const email=document.getElementById('email').value.trim(); if(!email) return alert('Enter your email to continue.');
      const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
      if(window.__processPayment){ await window.__processPayment({amountCents:Math.round(subtotal*100),email,productName:`Ryan's Ice Cream Shop Order (${orderState.type})`,productDescription:cart.map(i=>`${i.qty}x ${i.name}`).join(', '),name:'',quantity:1}); }
      else alert('Payment system unavailable.');
    };
    document.querySelectorAll('.bookBtn').forEach(btn=>btn.onclick=async()=>{const price=parseFloat(btn.dataset.price),email=prompt('Enter your email to book catering:'); if(!email) return; if(window.__processPayment){ await window.__processPayment({amountCents:Math.round(price*100),email,productName:`Ryan's Ice Cream Shop Catering - ${btn.dataset.name}`,productDescription:`Catering package: ${btn.dataset.name}`,name:'',quantity:1}); }});
    renderCart();