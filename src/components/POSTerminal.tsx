import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Store, 
  Plus, 
  Minus, 
  Trash2, 
  Receipt, 
  CheckCircle2, 
  Wifi, 
  WifiOff, 
  CloudLightning,
  Sparkles,
  CreditCard,
  DollarSign,
  QrCode
} from "lucide-react";

export interface POSItem {
  id: string;
  name: string;
  category: "bev" | "spice" | "craft" | "apparel";
  price: number;
  imageColor: string;
  emoji: string;
}

const LANKAN_ITEMS: POSItem[] = [
  { id: "1", name: "Premium Ceylon Black Tea", category: "bev", price: 1250, imageColor: "bg-amber-950", emoji: "☕" },
  { id: "2", name: "Organic Cinnamon Sticks", category: "spice", price: 1800, imageColor: "bg-orange-800", emoji: "🍂" },
  { id: "3", name: "Kandy Brass Elephant Sculpture", category: "craft", price: 4500, imageColor: "bg-yellow-700", emoji: "🐘" },
  { id: "4", name: "Traditional Peacock Mask", category: "craft", price: 3200, imageColor: "bg-teal-700", emoji: "👺" },
  { id: "5", name: "Spicy Lankan Sambal Paste", category: "spice", price: 850, imageColor: "bg-rose-900", emoji: "🌶️" },
  { id: "6", name: "Artisanal Handloom Sarong", category: "apparel", price: 2900, imageColor: "bg-emerald-800", emoji: "🧣" },
];

interface CartItem {
  item: POSItem;
  quantity: number;
}

interface POSTerminalProps {
  onSaleCompleted: (amount: number, itemCount: number) => void;
  brandColor: "blue" | "red" | "orange";
}

export function POSTerminal({ onSaleCompleted, brandColor }: POSTerminalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0); // percent
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "qr">("cash");
  const [isSyncing, setIsSyncing] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [lastReceipt, setLastReceipt] = useState<any>(null);

  // Filter items
  const filteredItems = selectedCategory === "all" 
    ? LANKAN_ITEMS 
    : LANKAN_ITEMS.filter(i => i.category === selectedCategory);

  const addToCart = (item: POSItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, amount: number) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.item.id === itemId) {
          const newQty = i.quantity + amount;
          return newQty > 0 ? { ...i, quantity: newQty } : i;
        }
        return i;
      }).filter(i => i.quantity > 0);
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  // Calculate fields
  const subtotal = cart.reduce((acc, current) => acc + (current.item.price * current.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxRate = 0.08; // 8% VAT
  const taxAmount = (subtotal - discountAmount) * taxRate;
  const total = subtotal - discountAmount + taxAmount;
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Trigger checkout animation & trigger parent sync
  const handlePayment = () => {
    if (cart.length === 0) return;
    setIsProcessing(true);

    setTimeout(() => {
      // Simulate POS thermal printer delay
      const receiptData = {
        id: "RC-" + Math.floor(Math.random() * 900000 + 100000),
        date: new Date().toLocaleTimeString(),
        items: [...cart],
        subtotal,
        discountAmount,
        taxAmount,
        total,
        paymentMethod,
        cashier: "Anupa K."
      };
      
      setLastReceipt(receiptData);
      setIsProcessing(false);
      setShowReceipt(true);
      onSaleCompleted(total, totalItemsCount);
      clearCart();
    }, 1200);
  };

  // Color mappings
  const themeStyles = {
    blue: {
      accent: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
      accentLight: "bg-blue-50 text-blue-600 border-blue-100",
      text: "text-blue-600",
      ring: "focus:ring-blue-500",
      badge: "bg-blue-500",
      gradient: "from-blue-600 to-indigo-700",
      borderActive: "border-blue-600",
    },
    red: {
      accent: "bg-rose-600 hover:bg-rose-700 active:bg-rose-800",
      accentLight: "bg-rose-50 text-rose-600 border-rose-100",
      text: "text-rose-600",
      ring: "focus:ring-rose-500",
      badge: "bg-rose-500",
      gradient: "from-rose-600 to-red-700",
      borderActive: "border-rose-600",
    },
    orange: {
      accent: "bg-orange-500 hover:bg-orange-600 active:bg-orange-700",
      accentLight: "bg-orange-50 text-orange-600 border-orange-100",
      text: "text-orange-600",
      ring: "focus:ring-orange-500",
      badge: "bg-orange-500",
      gradient: "from-orange-500 to-amber-600",
      borderActive: "border-orange-500",
    }
  }[brandColor];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-950/40">
      {/* Top Bar of Dev Terminal */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-500 block" />
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 block" />
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 block" />
          </div>
          <span className="text-xs font-mono text-slate-400">Terminal #POS-0994 Colombo HQ</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSyncing(!isSyncing)}
            className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-md hover:bg-slate-800"
          >
            <span className={`relative flex h-2 w-2`}>
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSyncing ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isSyncing ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
            </span>
            <span className="text-xs font-mono text-slate-300">
              {isSyncing ? "Cloud Sync Active" : "Offline Cache Mode"}
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 h-[650px]">
        {/* Left Side: Product catalog (Grid 7 columns) */}
        <div className="lg:col-span-7 p-6 overflow-y-auto bg-slate-900/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <Store className="w-5 h-5 text-slate-400" />
                Quick Catalog
              </h3>
              <div className="flex gap-2">
                {["all", "bev", "spice", "craft", "apparel"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      selectedCategory === cat 
                        ? `bg-white text-slate-900` 
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat === "all" ? "All" : cat === "bev" ? "Teas" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Items */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => addToCart(item)}
                  className="bg-slate-950/60 hover:bg-slate-950 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between h-36 relative overflow-hidden group select-none"
                >
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <div className={`${item.imageColor} w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner`}>
                    {item.emoji}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white/95 tracking-tight truncate leading-tight">{item.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">Rs. {item.price.toLocaleString()}.00</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="mt-8 pt-4 border-t border-slate-800/60 grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/40">
              <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Fast-Moving</span>
              <p className="text-sm font-bold text-slate-300 mt-0.5">Ceylon Tea</p>
            </div>
            <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/40">
              <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Terminal Peak</span>
              <p className="text-sm font-bold text-slate-300 mt-0.5">14:00 - 15:30</p>
            </div>
            <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/40">
              <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">SaaS Latency</span>
              <p className="text-sm font-bold text-emerald-400 font-mono mt-0.5">12ms</p>
            </div>
          </div>
        </div>

        {/* Right Side: Sale Counter Pane (Grid 5 columns) */}
        <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-800/80 bg-slate-950/80 p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/60">
              <span className="font-display font-bold text-white text-md">Customer Receipt</span>
              {cart.length > 0 && (
                <button 
                  onClick={clearCart} 
                  className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              )}
            </div>

            {/* Cart Items List */}
            <div className="h-[230px] overflow-y-auto space-y-3 pr-1">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center gap-3">
                  <Receipt className="w-10 h-10 stroke-[1.2] opacity-45" />
                  <p className="text-sm">Empty terminal cart.<br />Tap catalog items to build invoice.</p>
                </div>
              ) : (
                cart.map(({ item, quantity }) => (
                  <div key={item.id} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/30 flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="text-xs font-semibold text-white/95 truncate">{item.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Rs. {item.price.toLocaleString()}.00</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-800/50 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center font-mono text-xs text-white">{quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-800/50 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-mono text-xs text-slate-200 w-[70px] text-right font-semibold">
                        Rs. {(item.price * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pricing Summary Bottom Pane */}
          <div className="space-y-4 pt-4 border-t border-slate-800/60">
            {/* Payment Method Selector */}
            {cart.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "cash", label: "Cash (Rs.)", icon: <DollarSign className="w-3.5 h-3.5" /> },
                  { id: "card", label: "Debit Card", icon: <CreditCard className="w-3.5 h-3.5" /> },
                  { id: "qr", label: "LankaQR Scan", icon: <QrCode className="w-3.5 h-3.5" /> }
                ].map((pay) => (
                  <button
                    key={pay.id}
                    onClick={() => setPaymentMethod(pay.id as any)}
                    className={`py-2 rounded-xl text-[10px] font-bold border flex flex-col items-center gap-1.5 transition-all uppercase tracking-wider ${
                      paymentMethod === pay.id 
                        ? `bg-white/10 text-white ${themeStyles.borderActive}` 
                        : "bg-slate-900 text-slate-400 border-transparent hover:bg-slate-900/60"
                    }`}
                  >
                    {pay.icon}
                    {pay.label}
                  </button>
                ))}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal</span>
                <span className="font-mono">Rs. {subtotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  Discount
                  <select 
                    value={discount} 
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="bg-slate-900 text-slate-100 border border-slate-800 rounded px-1 py-0.5 text-[10px] outline-none"
                  >
                    <option value={0}>0%</option>
                    <option value={5}>5%</option>
                    <option value={10}>10%</option>
                    <option value={15}>15%</option>
                  </select>
                </span>
                <span className="font-mono text-rose-400">- Rs. {discountAmount.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400 pb-2 border-b border-slate-800/40">
                <span>VAT (8% LKR)</span>
                <span className="font-mono">Rs. {taxAmount.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between items-end pt-1">
                <span className="text-sm font-bold text-white uppercase tracking-wider">Total Bill</span>
                <span className={`text-xl font-extrabold font-mono ${themeStyles.text}`}>
                  Rs. {total.toLocaleString()}.00
                </span>
              </div>
            </div>

            {/* Pay Action Button */}
            <button
              onClick={handlePayment}
              disabled={cart.length === 0 || isProcessing}
              className={`w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all text-white select-none ${
                cart.length === 0 
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800" 
                  : `${themeStyles.accent} shadow-lg`
              }`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing Core POS Invoice...
                </>
              ) : (
                <>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                    {totalItemsCount}
                  </div>
                  Charge &amp; Transmit Sync
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modern Thermal Receipt Printing Dialog Animation */}
      <AnimatePresence>
        {showReceipt && lastReceipt && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 100 }}
              className="bg-white text-slate-900 rounded-2xl w-full max-w-sm overflow-hidden flex flex-col items-center border border-slate-200 shadow-2xl relative"
            >
              <div className="w-full bg-slate-950 p-4 text-center border-b border-dashed border-slate-200 flex justify-between items-center text-white">
                <span className="font-mono text-xs tracking-wider text-emerald-400 flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> PAY SUCCESSFUL
                </span>
                <button 
                  onClick={() => setShowReceipt(false)}
                  className="text-white/60 hover:text-white font-bold text-sm px-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Thermal Paper roll body */}
              <div className="p-6 w-full font-mono text-xs leading-relaxed max-h-[450px] overflow-y-auto select-all">
                <div className="text-center mb-4 space-y-0.5">
                  <p className="font-display font-extrabold text-xl tracking-tight uppercase">RETAILCORE LANKA</p>
                  <p className="text-[10px] text-slate-500">POS & Cloud Ecosystems</p>
                  <p className="text-[10px] text-slate-500">Duplication Road, Colombo S3</p>
                  <p className="text-[10px] text-slate-500">Tel: +94 (11) 250-9944</p>
                </div>

                <div className="border-t border-b border-dashed border-slate-300 py-2 my-2 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Invoice:</span>
                    <span>{lastReceipt.id}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Date/Time:</span>
                    <span>{lastReceipt.date}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Host Operator:</span>
                    <span>{lastReceipt.cashier}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Payment Type:</span>
                    <span className="uppercase">{lastReceipt.paymentMethod}</span>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-2 py-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-600 border-b border-dashed border-slate-200 pb-1">
                    <span>DESC × QTY</span>
                    <span>LKR AMT</span>
                  </div>
                  {lastReceipt.items.map(({ item, quantity }: any) => (
                    <div key={item.id} className="flex justify-between text-[11px]">
                      <div className="max-w-[200px] truncate">
                        <span>{item.name}</span>
                        <div className="text-[10px] text-slate-500">LKR {item.price.toLocaleString()} × {quantity}</div>
                      </div>
                      <span className="font-semibold text-slate-800">Rs. {(item.price * quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-dashed border-slate-300 pt-2 mt-4 space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>Subtotal</span>
                    <span>Rs. {lastReceipt.subtotal.toLocaleString()}.00</span>
                  </div>
                  {lastReceipt.discountAmount > 0 && (
                    <div className="flex justify-between text-[11px] text-rose-600 font-medium">
                      <span>Discount (Dis)</span>
                      <span>- Rs. {lastReceipt.discountAmount.toLocaleString()}.00</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>VAT TAX (8.00%)</span>
                    <span>Rs. {lastReceipt.taxAmount.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between text-[14px] font-extrabold text-slate-900 pt-1 mt-1 border-t border-slate-200">
                    <span>TOTAL BILL</span>
                    <span>Rs. {lastReceipt.total.toLocaleString()}.00</span>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-6 space-y-1.5 pt-4 border-t border-dashed border-slate-200">
                  <p className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">Sync ID Upload Verified</p>
                  <p className="text-[9px] text-slate-400">Database entry is encrypted and verified.<br />Retailcore Cloud Sync latency: 14ms</p>
                  <div className="flex justify-center pt-2 opacity-80">
                    <div className="w-32 h-6 bg-slate-900 rounded flex items-center justify-around overflow-hidden p-1 text-[8px] text-white">
                      || | |||| | || | ||| || |
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-2">ーー Thank You ーー</p>
                </div>
              </div>

              {/* Close and Download */}
              <div className="w-full bg-slate-50 p-4 border-t border-slate-100 flex gap-2">
                <button 
                  onClick={() => setShowReceipt(false)}
                  className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Done File Receipt
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
