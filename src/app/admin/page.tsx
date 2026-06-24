"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["esmaltes", "base-brillo", "lamparas", "colecciones", "kit"] as const;
type Category = typeof CATEGORIES[number];

interface Product {
  _id: string;
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  description: string;
  stock: number;
  category: Category;
  line?: string;
  colorFamily?: string;
  finish?: string;
  size?: string;
  type?: string;
  quantity?: string;
}

// Nueva interfaz para los usuarios
interface UserType {
  _id: string;
  name: string;
  lastName?: string;
  email: string;
  role?: string;
}

const emptyForm: Omit<Product, "_id" | "id"> = {
  name: "", price: 0, discountPrice: undefined,
  image: "", description: "", stock: 0, category: "esmaltes",
  line: "", colorFamily: "", finish: "", size: "", type: "", quantity: "",
};

export default function AdminPage() {
  const router = useRouter();
  
  // Estados de Productos
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados de Usuarios
  const [users, setUsers] = useState<UserType[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  
  // Estado de Navegación del Panel
  const [activeTab, setActiveTab] = useState<"products" | "users">("products");
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Estados UI y Formularios
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [modal, setModal] = useState<"add" | "edit" | "delete" | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem("elizee_admin");
    if (!isAdmin) {
      router.push("/");
    } else {
      setIsAuthorized(true);
      fetchProducts();
      fetchUsers();
    }
  }, [router]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch {
      showToast("Error al cargar productos", "err");
    } finally {
      setLoading(false);
    }
  }

  // Función para obtener usuarios
  async function fetchUsers() {
    setLoadingUsers(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch {
      showToast("Error al cargar usuarios", "err");
    } finally {
      setLoadingUsers(false);
    }
  }

  // Función para cambiar rol
  async function handleRoleChange(userId: string, newRole: string) {
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, role: newRole }),
      });
      if (!res.ok) throw new Error();
      showToast("Rol actualizado exitosamente ✓", "ok");
      
      // Actualizamos el estado local sin necesidad de recargar de la base de datos
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
    } catch {
      showToast("Error al actualizar el rol", "err");
    }
  }

  function showToast(msg: string, type: "ok" | "err") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleLogout() {
    localStorage.removeItem("elizee_admin");
    window.dispatchEvent(new Event("adminStatusChanged"));
    router.push("/");
  }

  // Funciones del Modal de Productos
  function openAdd() { setForm(emptyForm); setSelected(null); setModal("add"); }
  function openEdit(p: Product) {
    setSelected(p);
    setForm({
      name: p.name, price: p.price, discountPrice: p.discountPrice,
      image: p.image, description: p.description, stock: p.stock, category: p.category,
      line: p.line || "", colorFamily: p.colorFamily || "", finish: p.finish || "",
      size: p.size || "", type: p.type || "", quantity: p.quantity || "",
    });
    setModal("edit");
  }
  function openDelete(p: Product) { setSelected(p); setModal("delete"); }

  async function handleSave() {
    setSaving(true);
    try {
      if (modal === "add") {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        showToast("Producto agregado ✓", "ok");
      } else if (modal === "edit" && selected) {
        const res = await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, _id: selected._id }),
        });
        if (!res.ok) throw new Error();
        showToast("Producto actualizado ✓", "ok");
      }
      setModal(null);
      fetchProducts();
    } catch {
      showToast("Error al guardar", "err");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/products?id=${selected._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("Producto eliminado ✓", "ok");
      setModal(null);
      fetchProducts();
    } catch {
      showToast("Error al eliminar", "err");
    } finally {
      setSaving(false);
    }
  }

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "all" || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  if (!isAuthorized) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#faf8f6", fontFamily: "system-ui, sans-serif" }}>
      
      {/* HEADER DEL PANEL */}
      <div style={{ background: "#1a1a1a", color: "#fff", padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#888", textTransform: "uppercase", marginBottom: 3 }}>Elizee</div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Panel de Administración</h1>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {activeTab === "products" && (
            <button onClick={openAdd} style={{ background: "#c8a882", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
              + Agregar producto
            </button>
          )}
          <button onClick={handleLogout} style={{ background: "#333", color: "#aaa", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 14, cursor: "pointer" }}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* PESTAÑAS (TABS) */}
      <div style={{ padding: "0 32px", background: "#fff", borderBottom: "1px solid #e8e0d8", display: "flex", gap: "32px" }}>
        <button 
          onClick={() => setActiveTab("products")}
          style={{ 
            padding: "16px 0", background: "none", border: "none", fontSize: 14, cursor: "pointer", outline: "none",
            borderBottom: activeTab === "products" ? "2px solid #1a1a1a" : "2px solid transparent",
            color: activeTab === "products" ? "#1a1a1a" : "#888",
            fontWeight: activeTab === "products" ? 600 : 400
          }}
        >
          Gestión de Productos
        </button>
        <button 
          onClick={() => setActiveTab("users")}
          style={{ 
            padding: "16px 0", background: "none", border: "none", fontSize: 14, cursor: "pointer", outline: "none",
            borderBottom: activeTab === "users" ? "2px solid #1a1a1a" : "2px solid transparent",
            color: activeTab === "users" ? "#1a1a1a" : "#888",
            fontWeight: activeTab === "users" ? 600 : 400
          }}
        >
          Gestión de Usuarios
        </button>
      </div>

      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, background: toast.type === "ok" ? "#2d6a4f" : "#c0392b", color: "#fff", padding: "12px 20px", borderRadius: 8, fontSize: 14, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
          {toast.msg}
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ padding: "24px 32px" }}>
        
        {/* VISTA DE PRODUCTOS */}
        {activeTab === "products" && (
          <>
            <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
              {[
                { label: "Total productos", value: products.length },
                { label: "Sin stock", value: products.filter(p => p.stock === 0).length },
                { label: "Stock bajo (≤5)", value: products.filter(p => p.stock > 0 && p.stock <= 5).length },
              ].map(s => (
                <div key={s.label} style={{ background: "#fff", border: "1px solid #e8e0d8", borderRadius: 10, padding: "14px 20px", minWidth: 140 }}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <input placeholder="Buscar producto..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ flex: 1, minWidth: 200, padding: "9px 12px", border: "1px solid #ddd", borderRadius: 7, fontSize: 14 }} />
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
                style={{ minWidth: 180, padding: "9px 12px", border: "1px solid #ddd", borderRadius: 7, fontSize: 14 }}>
                <option value="all">Todas las categorías</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: 60, color: "#888" }}>Cargando productos...</div>
            ) : (
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e0d8", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f5f0ea", borderBottom: "1px solid #e8e0d8" }}>
                      {["ID", "Nombre", "Categoría", "Precio", "Stock", "Acciones"].map(h => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#666", letterSpacing: 0.5 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr><td colSpan={6} style={{ padding: 40, textAlign: "center", color: "#aaa" }}>No se encontraron productos</td></tr>
                    ) : filteredProducts.map((p, i) => (
                      <tr key={p._id} style={{ borderBottom: "1px solid #f0ece6", background: i % 2 === 0 ? "#fff" : "#fdfcfb" }}>
                        <td style={{ padding: "12px 16px", fontSize: 14, color: "#333" }}>{p.id}</td>
                        <td style={{ padding: "12px 16px", fontSize: 14, color: "#333" }}>
                          <div style={{ fontWeight: 500 }}>{p.name}</div>
                          {p.line && <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{p.line}</div>}
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: 14 }}>
                          <span style={{ background: "#f0e8dc", color: "#8b5e3c", fontSize: 11, padding: "3px 8px", borderRadius: 20, fontWeight: 500 }}>{p.category}</span>
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: 14, color: "#333" }}>
                          <div style={{ fontWeight: 500 }}>${p.price.toLocaleString()}</div>
                          {p.discountPrice && <div style={{ fontSize: 11, color: "#c0392b" }}>${p.discountPrice.toLocaleString()}</div>}
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: 14 }}>
                          <span style={{ fontWeight: 600, color: p.stock === 0 ? "#c0392b" : p.stock <= 5 ? "#e67e22" : "#2d6a4f" }}>{p.stock}</span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => openEdit(p)} style={{ background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>Editar</button>
                            <button onClick={() => openDelete(p)} style={{ background: "#c0392b", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* VISTA DE USUARIOS */}
        {activeTab === "users" && (
          <>
            <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
              <div style={{ background: "#fff", border: "1px solid #e8e0d8", borderRadius: 10, padding: "14px 20px", minWidth: 140 }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a" }}>{users.length}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Usuarios Registrados</div>
              </div>
              <div style={{ background: "#fff", border: "1px solid #e8e0d8", borderRadius: 10, padding: "14px 20px", minWidth: 140 }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a" }}>{users.filter(u => u.role === "admin").length}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Administradores</div>
              </div>
            </div>

            {loadingUsers ? (
              <div style={{ textAlign: "center", padding: 60, color: "#888" }}>Cargando usuarios...</div>
            ) : (
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e0d8", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f5f0ea", borderBottom: "1px solid #e8e0d8" }}>
                      {["Nombre", "Email", "ID del Sistema", "Rol de Usuario"].map(h => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#666", letterSpacing: 0.5 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr><td colSpan={4} style={{ padding: 40, textAlign: "center", color: "#aaa" }}>No hay usuarios registrados</td></tr>
                    ) : users.map((u, i) => (
                      <tr key={u._id} style={{ borderBottom: "1px solid #f0ece6", background: i % 2 === 0 ? "#fff" : "#fdfcfb" }}>
                        <td style={{ padding: "12px 16px", fontSize: 14, color: "#333", fontWeight: 500 }}>
                          {u.name} {u.lastName || ""}
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: 14, color: "#555" }}>
                          {u.email}
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: 12, color: "#999", fontFamily: "monospace" }}>
                          {u._id}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <select 
                            value={u.role || "customer"} 
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                            style={{ 
                              padding: "6px 12px", 
                              borderRadius: 6, 
                              border: u.role === "admin" ? "1px solid #3b82f6" : "1px solid #ddd", 
                              background: u.role === "admin" ? "#eff6ff" : "#fff",
                              color: u.role === "admin" ? "#1d4ed8" : "#333",
                              fontSize: 13,
                              fontWeight: u.role === "admin" ? 600 : 400,
                              cursor: "pointer",
                              outline: "none"
                            }}
                          >
                            <option value="customer">Cliente</option>
                            <option value="admin">Administrador</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* MODALES DE PRODUCTOS (Add/Edit/Delete) */}
      {(modal === "add" || modal === "edit") && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 28, width: "100%", maxWidth: 700, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>{modal === "add" ? "Agregar producto" : "Editar producto"}</h2>
              <button onClick={() => setModal(null)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#666" }}>×</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Nombre *" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Categoría *</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #ddd", borderRadius: 7, fontSize: 14 }}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <Field label="Precio *" type="number" value={String(form.price)} onChange={v => setForm(f => ({ ...f, price: Number(v) }))} />
              <Field label="Precio con descuento" type="number" value={String(form.discountPrice || "")} onChange={v => setForm(f => ({ ...f, discountPrice: v ? Number(v) : undefined }))} />
              <Field label="Stock *" type="number" value={String(form.stock)} onChange={v => setForm(f => ({ ...f, stock: Number(v) }))} />
              <Field label="Imagen (ruta o URL) *" value={form.image} onChange={v => setForm(f => ({ ...f, image: v }))} />
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Descripción *</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={3} style={{ width: "100%", padding: "9px 12px", border: "1px solid #ddd", borderRadius: 7, fontSize: 14, resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <Field label="Línea" value={form.line || ""} onChange={v => setForm(f => ({ ...f, line: v }))} />
              <Field label="Familia de color" value={form.colorFamily || ""} onChange={v => setForm(f => ({ ...f, colorFamily: v }))} />
              <Field label="Acabado" value={form.finish || ""} onChange={v => setForm(f => ({ ...f, finish: v }))} />
              <Field label="Tamaño" value={form.size || ""} onChange={v => setForm(f => ({ ...f, size: v }))} />
              <Field label="Tipo" value={form.type || ""} onChange={v => setForm(f => ({ ...f, type: v }))} />
              <Field label="Cantidad" value={form.quantity || ""} onChange={v => setForm(f => ({ ...f, quantity: v }))} />
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 24 }}>
              <button onClick={() => setModal(null)} style={{ background: "#e8e0d8", color: "#333", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 14, cursor: "pointer" }}>Cancelar</button>
              <button onClick={handleSave} disabled={saving} style={{ background: "#c8a882", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                {saving ? "Guardando..." : modal === "add" ? "Agregar" : "Guardar cambios"}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === "delete" && selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 28, width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h2 style={{ margin: "0 0 12px", fontSize: 18 }}>Eliminar producto</h2>
            <p style={{ color: "#555", marginBottom: 24 }}>
              ¿Estás segura de que quieres eliminar <strong>{selected.name}</strong>? Esta acción no se puede deshacer.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button onClick={() => setModal(null)} style={{ background: "#e8e0d8", color: "#333", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 14, cursor: "pointer" }}>Cancelar</button>
              <button onClick={handleDelete} disabled={saving} style={{ background: "#c0392b", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                {saving ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        style={{ width: "100%", padding: "9px 12px", border: "1px solid #ddd", borderRadius: 7, fontSize: 14, boxSizing: "border-box" }} />
    </div>
  );
}