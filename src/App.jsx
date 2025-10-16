import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, Minus, Plus, Trash2, Check, X, ChevronRight, CreditCard, Phone, Home, Clock } from "lucide-react";
const BRAND={orange:"#FF6A00",aqua:"#15C6C3",dark:"#0F172A",light:"#F8FAFC",name:"TEMAKO",tagline:"Let's Sushi",phone:"912 345 678",email:"hello@temako.pt",hours:"Seg-Dom 12:00–23:00"};
const MENU=[
{id:"temako-simples-salmao",name:"Temako Simples (Salmão)",description:"salmão e cebolinho",price:6.95,image:"/assets/logo-temako.png",tags:["clássico","frio"],category:"temako"},
{id:"temako-simples-atum",name:"Temako Simples (Atum)",description:"atum e cebolinho",price:6.95,image:"/assets/logo-temako.png",tags:["clássico","frio"],category:"temako"},
{id:"temako-braseado",name:"Temako Braseado",description:"salmão braseado, filadélfia, cebolinho e teriyaki",price:6.95,image:"/assets/logo-temako.png",tags:["quente"],category:"temako"},
{id:"temako-filadelfia-salmao",name:"Temako Filadélfia (Salmão)",description:"salmão, filadélfia e cebolinho",price:6.95,image:"/assets/logo-temako.png",tags:["frio"],category:"temako"},
{id:"temako-filadelfia-atum",name:"Temako Filadélfia (Atum)",description:"atum, filadélfia e cebolinho",price:6.95,image:"/assets/logo-temako.png",tags:["frio"],category:"temako"},
{id:"temako-croqui",name:"Temako Croqui",description:"salmão, filadélfia, raspa de lima, gengibre e amêndoa tostada",price:6.95,image:"/assets/logo-temako.png",tags:["crunch"],category:"temako"},
{id:"temako-vegy",name:"Temako Vegy",description:"courgette panada, filadélfia, rúcula, manga, amêndoa, molho mostarda e mel",price:6.95,image:"/assets/logo-temako.png",tags:["veg"],category:"temako"},
{id:"temako-hot",name:"Temako Hot",description:"salmão tempura, filadélfia, agridoce, teriyaki e cebolinho",price:6.95,image:"/assets/logo-temako.png",tags:["quente","crocante"],category:"temako"},
{id:"temako-dragon",name:"Temako Dragon",description:"camarão frito, filadélfia, abacate, hotmayo, teriyaki e ovas laranja",price:6.95,image:"/assets/logo-temako.png",tags:["spicy","quente"],category:"temako"},
{id:"temako-spicy-salmao",name:"Temako Spicy (Salmão)",description:"salmão, filadélfia, extra de hotmayo e cebolinho",price:6.95,image:"/assets/logo-temako.png",tags:["spicy"],category:"temako"},
{id:"temako-spicy-atum",name:"Temako Spicy (Atum)",description:"atum, filadélfia, extra de hotmayo e cebolinho",price:6.95,image:"/assets/logo-temako.png",tags:["spicy"],category:"temako"},

{id:"mix-8",name:"Mix 8",description:"freestyle 8 peças",price:9.95,image:"/assets/logo-temako.png",tags:["combo"],category:"menu"},
{id:"mix-8-vegy",name:"Mix 8 Vegy",description:"freestyle 8 peças vegetarianas",price:10.95,image:"/assets/logo-temako.png",tags:["combo","veg"],category:"menu"},
{id:"mix-12",name:"Mix 12",description:"freestyle 12 peças",price:13.95,image:"/assets/logo-temako.png",tags:["combo"],category:"menu"},
{id:"mix-16",name:"Mix 16",description:"freestyle 12 peças + 4 hotroll",price:16.95,image:"/assets/logo-temako.png",tags:["combo","hot"],category:"menu"},
{id:"mix-32",name:"Mix 32",description:"freestyle 24 peças + 8 hotroll",price:31.95,image:"/assets/logo-temako.png",tags:["combo"],category:"menu"},
{id:"black-box",name:"Black Box",description:"sushi & sashimi, 40 peças premium",price:49.95,image:"/assets/logo-temako.png",tags:["premium"],category:"menu"},
{id:"mix-hot-kids",name:"Mix Hot / Kids Teriyaki",description:"seleção hot spicy ou kids teriyaki",price:18.95,image:"/assets/logo-temako.png",tags:["familia"],category:"menu"},
{id:"mix-mais-temako-vegy",name:"Mix + Temako Vegy",description:"menu com temako veggie",price:16.95,image:"/assets/logo-temako.png",tags:["veg"],category:"menu"},

{id:"miso-soup",name:"Miso Soup",description:"tofu, alho francês, cebolinho",price:3.5,image:"/assets/logo-temako.png",tags:["entrada"],category:"entrada"},
{id:"salmon-bite",name:"Salmon Bite (4un)",description:"4 unidades",price:4.5,image:"/assets/logo-temako.png",tags:["entrada"],category:"entrada"},
{id:"shrimp-bite",name:"Shrimp Bite (3un)",description:"3 unidades",price:5.5,image:"/assets/logo-temako.png",tags:["entrada"],category:"entrada"},
{id:"fat-shrimp-bite",name:"Fat Shrimp Bite (3un)",description:"3 unidades",price:5.5,image:"/assets/logo-temako.png",tags:["entrada"],category:"entrada"},
{id:"ebi",name:"Ebi (3un)",description:"3 camarões panados",price:6.95,image:"/assets/logo-temako.png",tags:["entrada"],category:"entrada"},
{id:"gyosas",name:"Gyosas (4un)",description:"frango e vegetais",price:6.95,image:"/assets/logo-temako.png",tags:["entrada"],category:"entrada"},
{id:"vegy-bite",name:"Vegy Bite (4un)",description:"4 unidades",price:4.5,image:"/assets/logo-temako.png",tags:["entrada","veg"],category:"entrada"},
{id:"carpaccio-salmao",name:"Carpaccio de Salmão",description:"fatias finas de salmão",price:5.5,image:"/assets/logo-temako.png",tags:["entrada"],category:"entrada"},

{id:"nigiri",name:"Nigiri (4 uni)",description:"4 nigiris freestyle",price:6.0,image:"/assets/logo-temako.png",tags:["sushi"],category:"sushi"},
{id:"gunkan",name:"Gunkan (4 uni)",description:"4 gunkans freestyle",price:7.95,image:"/assets/logo-temako.png",tags:["sushi"],category:"sushi"},
{id:"hossomaki",name:"Hossomaki (8 uni)",description:"8 hossomakis freestyle",price:7.95,image:"/assets/logo-temako.png",tags:["sushi"],category:"sushi"},
{id:"hotroll",name:"Hotroll (8 uni)",description:"8 rolos panados (freestyle)",price:4.95,image:"/assets/logo-temako.png",tags:["sushi","hot"],category:"sushi"},
{id:"sashimi-salmao",name:"Sashimi Salmão (4 uni)",description:"4 peças",price:5.5,image:"/assets/logo-temako.png",tags:["sushi"],category:"sushi"},
{id:"sashimi-atum",name:"Sashimi Atum (4 uni)",description:"4 peças",price:5.5,image:"/assets/logo-temako.png",tags:["sushi"],category:"sushi"},

{id:"extra-ingredientes",name:"Ingredientes extra",description:"porção extra",price:0.5,image:"/assets/logo-temako.png",tags:["suplemento"],category:"suplemento"},
{id:"adaptar",name:"Adaptar",description:"ajuste ao pedido",price:1.5,image:"/assets/logo-temako.png",tags:["suplemento"],category:"suplemento"},
{id:"molho-takeaway",name:"Molho Takeaway",description:"dose extra de molho",price:0.5,image:"/assets/logo-temako.png",tags:["suplemento"],category:"suplemento"},
];
const BASE_OPTIONS=[{id:"arroz",label:"Base: Arroz"},{id:"rucula",label:"Base: Rúcula"}];
function currency(n){return n.toLocaleString("pt-PT",{style:"currency",currency:"EUR"});}
function Tag({children}){return <span className="text-xs px-2 py-1 rounded-full bg-slate-100 border border-slate-200">{children}</span>;}

export default function App(){
  const [query,setQuery]=useState(""); const [cartOpen,setCartOpen]=useState(false);
  const [checkoutOpen,setCheckoutOpen]=useState(false); const [cart,setCart]=useState([]);
  const [filter,setFilter]=useState("todos"); const [orderId,setOrderId]=useState("");

  const filtered=useMemo(()=>{const q=query.trim().toLowerCase(); let list=MENU;
    if(filter!=="todos") list=list.filter(i=>i.category===filter||i.tags.includes(filter));
    if(!q) return list;
    return list.filter(i=>i.name.toLowerCase().includes(q)||i.description.toLowerCase().includes(q)||i.tags.some(t=>t.includes(q)));},[query,filter]);

  const subtotal=cart.reduce((s,it)=>s+it.price*it.qty,0); const delivery=cart.length?2.5:0; const total=subtotal+delivery;

  function addToCart(item,base="arroz"){const isTemako=item.category==="temako";
    setCart(prev=>{const key=isTemako?`${item.id}-${base}`:item.id; const idx=prev.findIndex(p=>isTemako?`${p.id}-${p.base}`===key:p.id===key);
      if(idx>=0){const copy=[...prev]; copy[idx]={...copy[idx],qty:copy[idx].qty+1}; return copy;}
      return [...prev,{id:item.id,name:item.name,base:isTemako?base:undefined,price:item.price,qty:1}];}); setCartOpen(true);}

  function updateQty(id,base,delta){setCart(prev=>prev.map(it=>it.id===id&&(it.base??"")===(base??"")?{...it,qty:Math.max(0,it.qty+delta)}:it).filter(it=>it.qty>0));}
  function removeItem(id,base){setCart(prev=>prev.filter(it=>!(it.id===id&&(it.base??"")===(base??""))));}

  function handleCheckoutSubmit(form){const required=["nome","telefone","endereco","quando","pagamento"]; const missing=required.filter(k=>!form[k]?.trim());
    if(missing.length) return {ok:false,error:"Preenche todos os campos."};
    const id=`TK-${Math.random().toString(36).slice(2,8).toUpperCase()}`; setOrderId(id); setCheckoutOpen(false); setCart([]); return {ok:true};}

  const FILTERS=[{id:"todos",label:"Todos"},{id:"temako",label:"Temakos"},{id:"menu",label:"Menus"},{id:"entrada",label:"Entradas"},{id:"sushi",label:"Sushi"},{id:"suplemento",label:"Suplementos"},{id:"spicy",label:"Spicy"},{id:"veg",label:"Veg"}];

  return (<div className="min-h-screen bg-white text-slate-800">
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70" style={{borderBottom:`3px solid ${BRAND.aqua}`}}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <img src="/assets/logo-temako.png" alt="TEMAKO" className="w-10 h-10 rounded-2xl border"/>
        <div className="leading-tight"><h1 className="font-extrabold text-xl" style={{color:BRAND.dark}}>{BRAND.name}</h1>
        <p className="text-xs" style={{color:BRAND.orange}}>{BRAND.tagline}</p></div>
        <div className="ml-auto relative w-full max-w-md"><div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white shadow-sm">
        <Search className="size-4"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Procurar no menu…" className="w-full outline-none text-sm"/></div></div>
        <button onClick={()=>setCartOpen(v=>!v)} className="ml-2 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm" style={{background:BRAND.aqua,color:BRAND.dark}}>
        <ShoppingCart className="size-4"/> Carrinho {cart.length>0&&(<span className="ml-1 rounded-full text-xs px-2 py-0.5 bg-white">{cart.reduce((s,i)=>s+i.qty,0)}</span>)}</button>
      </div>
    </header>

    <section className="max-w-6xl mx-auto px-4 mt-6"><div className="rounded-3xl overflow-hidden shadow" style={{background:BRAND.light}}>
      <div className="p-6 grid md:grid-cols-2 gap-6 items-center">
        <div><h2 className="text-2xl md:text-3xl font-extrabold mb-2">Escolhe, personaliza e… itadakimasu! 🍣</h2>
        <p className="text-sm text-slate-600 mb-4">Interface estilo UberEats com opções <strong>Arroz</strong> ou <strong>Rúcula</strong>, carrinho e checkout.</p>
        <ul className="text-sm space-y-1"><li>• Entregas a partir de 25 min</li><li>• Taxa de entrega dinâmica (simulada)</li><li>• Cores: <span style={{color:BRAND.orange}}>laranja</span> + <span style={{color:BRAND.aqua}}>aqua</span></li></ul></div>
        <img alt="Temakos" className="w-full h-56 object-cover rounded-2xl" src="/assets/logo-temako.png"/></div></div></section>

    <main className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-[1fr_360px] gap-8">
      <div>
        <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold">Menu</h3>
          <div className="flex gap-2">{FILTERS.map(f=>(<button key={f.id} onClick={()=>setFilter(f.id)} className={`text-xs px-3 py-1.5 rounded-full border hover:shadow ${filter===f.id?"bg-slate-900 text-white":""}`}>{f.label}</button>))}</div>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(item=>(<motion.div key={item.id} layout initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="rounded-3xl overflow-hidden border shadow-sm bg-white">
            <div className="aspect-[4/3] overflow-hidden"><img src={item.image} alt={item.name} className="w-full h-full object-cover"/></div>
            <div className="p-4"><div className="flex items-start justify-between gap-3"><div><h4 className="font-bold leading-snug">{item.name}</h4><p className="text-sm text-slate-600">{item.description}</p></div>
            <div className="font-bold whitespace-nowrap" style={{color:BRAND.orange}}>{currency(item.price)}</div></div>
            <div className="mt-3 flex items-center gap-2 flex-wrap">{item.tags.map(t=>(<Tag key={t}>{t}</Tag>))}</div>
            {item.category==="temako"?(<div className="mt-4 grid grid-cols-2 gap-2">{[{id:"arroz",label:"Base: Arroz"},{id:"rucula",label:"Base: Rúcula"}].map(b=>(<button key={b.id} onClick={()=>addToCart(item,b.id)} className="text-sm px-3 py-2 rounded-xl border hover:shadow flex items-center justify-between"><span>{b.label}</span><ChevronRight className="size-4"/></button>))}</div>)
            :(<div className="mt-4"><button onClick={()=>addToCart(item)} className="w-full text-sm px-3 py-2 rounded-xl border hover:shadow flex items-center justify-center gap-2"><ChevronRight className="size-4"/> Adicionar</button></div>)}
            </div></motion.div>))}
        </div>
      </div>
      <aside className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)] border rounded-3xl p-4 shadow-sm">
        <CartPanel cart={cart} subtotal={subtotal} delivery={delivery} total={total} updateQty={updateQty} removeItem={removeItem} onCheckout={()=>setCheckoutOpen(true)}/>
      </aside>
    </main>

    {checkoutOpen&&(<CheckoutDrawer onClose={()=>setCheckoutOpen(false)} total={total} onSubmit={form=>handleCheckoutSubmit(form)}/>)}

    <div className="lg:hidden fixed bottom-4 left-0 right-0 flex justify-center z-40">
      <button onClick={()=>setCartOpen(true)} className="shadow-xl px-5 py-3 rounded-2xl font-semibold" style={{background:BRAND.orange,color:"white"}}><ShoppingCart className="inline -mt-1 mr-2" size={18}/> Ver carrinho · {currency(total)}</button>
    </div>

    {cartOpen&&(<motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",bounce:0}} className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-l shadow-2xl z-50">
      <div className="p-4 flex items-center gap-3 border-b"><button onClick={()=>setCartOpen(false)} className="rounded-xl border p-2"><X className="size-4"/></button><h4 className="font-bold">O teu carrinho</h4></div>
      <div className="p-4"><CartPanel cart={cart} subtotal={subtotal} delivery={delivery} total={total} updateQty={updateQty} removeItem={removeItem} onCheckout={()=>{setCartOpen(False); setCheckoutOpen(true);}}/></div></motion.div>)}

    {orderId&&(<div className="fixed bottom-5 right-5 bg-white border shadow-xl rounded-xl p-4"><div className="font-bold">Encomenda confirmada</div><div className="text-sm">Número: {orderId}</div><div className="text-xs text-slate-500 mt-1">Recebeste um email com o resumo.</div></div>)}

    <footer className="mt-12 border-t"><div className="max-w-6xl mx-auto px-4 py-10 text-sm text-slate-600 grid md:grid-cols-3 gap-6">
      <div><div className="font-extrabold text-slate-900">{BRAND.name}</div><p>Sushi inspirado na tua fome. © {new Date().getFullYear()}</p></div>
      <div><div className="font-semibold mb-2">Contactos</div><p>Tel: {BRAND.phone}</p><p>Email: {BRAND.email}</p></div>
      <div><div className="font-semibold mb-2">Horários</div><p>{BRAND.hours}</p></div>
    </div></footer>
  </div>);
}

function CartPanel({cart,subtotal,delivery,total,updateQty,removeItem,onCheckout}){
  return (<div className="h-full flex flex-col">
    {cart.length===0?(<div className="text-sm text-slate-500">O carrinho está vazio. Adiciona um temako 🍣</div>):
    (<div className="space-y-4 overflow-auto pr-1">{cart.map(it=>(<div key={`${it.id}-${it.base??"no-base"}`} className="flex items-start gap-3 border rounded-2xl p-3">
      <div className="flex-1"><div className="font-semibold leading-snug">{it.name}</div>{it.base&&(<div className="text-xs text-slate-500 mb-1">{it.base==="arroz"?"Base: Arroz":"Base: Rúcula"}</div>)}
      <div className="text-sm font-semibold" style={{color:BRAND.orange}}>{currency(it.price)}</div></div>
      <div className="flex items-center gap-2"><button onClick={()=>updateQty(it.id,it.base,-1)} className="rounded-lg border p-1"><Minus size={16}/></button>
      <div className="w-6 text-center text-sm font-semibold">{it.qty}</div><button onClick={()=>updateQty(it.id,it.base,+1)} className="rounded-lg border p-1"><Plus size={16}/></button></div>
      <button onClick={()=>removeItem(it.id,it.base)} className="rounded-lg border p-1"><Trash2 size={16}/></button></div>))}</div>)}
    <div className="mt-auto space-y-2 pt-4 border-t"><div className="flex items-center justify-between text-sm"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
    <div className="flex items-center justify-between text-sm"><span>Entrega</span><span>{currency(delivery)}</span></div>
    <div className="flex items-center justify-between font-bold text-base" style={{color:BRAND.dark}}><span>Total</span><span>{currency(total)}</span></div>
    <button onClick={()=>onCheckout?.()} className="w-full mt-2 rounded-xl px-4 py-3 font-semibold shadow" style={{background:BRAND.aqua,color:BRAND.dark}}>Finalizar compra <Check className="inline -mt-1 ml-2" size={18}/></button></div>
  </div>);
}

function CheckoutDrawer({onClose,total,onSubmit}){
  const [form,setForm]=useState({nome:"",telefone:"",endereco:"",quando:"",pagamento:""}); const [error,setError]=useState("");
  function handleChange(e){const {name,value}=e.target; setForm(f=>({...f,[name]:value}));}
  function handleSubmit(e){e.preventDefault(); const res=onSubmit?.(form); if(!res?.ok) setError(res?.error||"Ocorreu um erro");}
  return (<motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",bounce:0}} className="fixed inset-y-0 right-0 w/full max-w-md bg-white border-l shadow-2xl z-50">
    <div className="p-4 flex items-center gap-3 border-b"><button onClick={onClose} className="rounded-xl border p-2"><X className="size-4"/></button><h4 className="font-bold">Checkout</h4></div>
    <form onSubmit={handleSubmit} className="p-4 space-y-4">{error&&(<div className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-lg p-2">{error}</div>)}
      <div><label className="text-xs font-semibold flex items-center gap-2"><Phone size={14}/> Nome</label><input name="nome" value={form.nome} onChange={handleChange} className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="O teu nome"/></div>
      <div><label className="text-xs font-semibold flex items-center gap-2"><Phone size={14}/> Telefone</label><input name="telefone" value={form.telefone} onChange={handleChange} className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="9xx xxx xxx"/></div>
      <div><label className="text-xs font-semibold flex items-center gap-2"><Home size={14}/> Morada de entrega</label><textarea name="endereco" value={form.endereco} onChange={handleChange} className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="Rua, nº, piso, porta, notas…"/></div>
      <div><label className="text-xs font-semibold flex items-center gap-2"><Clock size={14}/> Quando</label><input name="quando" value={form.quando} onChange={handleChange} className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="Ex: hoje 20:00"/></div>
      <div><label className="text-xs font-semibold flex items-center gap-2"><CreditCard size={14}/> Pagamento</label><select name="pagamento" value={form.pagamento} onChange={handleChange} className="mt-1 w-full border rounded-xl px-3 py-2 bg-white"><option value=''>Seleciona…</option><option value='mbway'>MB WAY</option><option value='visa'>VISA/Mastercard</option><option value='entrega'>Em dinheiro (na entrega)</option></select></div>
      <button type="submit" className="w-full rounded-xl px-4 py-3 font-semibold shadow" style={{background:BRAND.orange,color:"white"}}>Confirmar encomenda · {currency(total)}</button>
    </form></motion.div>);
}
