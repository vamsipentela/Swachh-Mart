import React, { useState, useEffect } from 'react';
import { getCategories, saveCategories } from '../data/categories';
import './AdminPanel.css';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ phone: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Forms state
  const [catForm, setCatForm] = useState({ name: '', section: '', image: '' });
  const [subForm, setSubForm] = useState({ categoryId: '', name: '' });
  const [itemForm, setItemForm] = useState({
    categoryId: '',
    subcategoryId: '',
    name: '',
    image: ''
  });

  const [editMode, setEditMode] = useState({ type: null, id: null, catId: null, subId: null });
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

  const showNotification = (text, type = 'success') => {
    setStatusMsg({ text, type });
    setTimeout(() => setStatusMsg({ text: '', type: '' }), 5000);
  };

  const handleCancelEdit = () => {
    setEditMode({ type: null, id: null, catId: null, subId: null });
    setCatForm({ name: '', section: '', image: '' });
    setSubForm({ categoryId: '', name: '' });
    setItemForm({ categoryId: '', subcategoryId: '', name: '', image: '' });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.phone === import.meta.env.VITE_ADMIN_PHONE && loginForm.password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid phone number or password');
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!catForm.name) return;

    let updated;
    if (editMode.type === 'category') {
      updated = categories.map(c => c.id === editMode.id ? { 
        ...c, 
        name: catForm.name, 
        section: catForm.section || 'Our Assortment', 
        image: catForm.image 
      } : c);
    } else {
      const newCategory = {
        id: "cat_" + Date.now(),
        name: catForm.name,
        section: catForm.section || 'Our Assortment',
        image: catForm.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80",
        subcategories: []
      };
      updated = [...categories, newCategory];
    }

    try {
      setCategories(updated);
      const success = await saveCategories(updated);
      if (editMode.type === 'category') handleCancelEdit();
      else setCatForm({ name: '', section: '', image: '' });
      
      if (success) showNotification(editMode.type === 'category' ? "Category updated & saved to DB!" : "Category added & saved to DB!");
      else showNotification("Saved locally, but server sync failed.", "error");
    } catch (error) {
      showNotification("Error saving changes.", "error");
    }
  };

  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    if (!subForm.categoryId || !subForm.name) return;

    let updated = [...categories];
    const newSubData = {
      id: editMode.type === 'subcategory' ? editMode.id : "sub_" + Date.now(),
      name: subForm.name,
      items: []
    };

    if (editMode.type === 'subcategory') {
      let oldItems = [];
      updated.forEach(cat => {
        if (cat.id === editMode.catId) {
          const sub = cat.subcategories.find(s => s.id === editMode.id);
          if (sub) oldItems = sub.items || [];
        }
      });
      newSubData.items = oldItems;

      updated = updated.map(cat => {
        if (cat.id === editMode.catId) {
          return { ...cat, subcategories: cat.subcategories.filter(s => s.id !== editMode.id) };
        }
        return cat;
      });
    }

    updated = updated.map(cat => {
      if (cat.id === subForm.categoryId) {
        return {
          ...cat,
          subcategories: [...(cat.subcategories || []), newSubData]
        };
      }
      return cat;
    });

    try {
      setCategories(updated);
      const success = await saveCategories(updated);
      if (editMode.type === 'subcategory') handleCancelEdit();
      else setSubForm({ ...subForm, name: '' });
      
      if (success) showNotification(editMode.type === 'subcategory' ? "Subcategory updated in DB!" : "Subcategory added to DB!");
      else showNotification("Saved locally; server error.", "error");
    } catch (error) {
       showNotification("Failed to save.", "error");
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!itemForm.categoryId || !itemForm.subcategoryId || !itemForm.name) return;

    let updated = [...categories];
    const newItemData = {
      id: editMode.type === 'item' ? editMode.id : "item_" + Date.now(),
      name: itemForm.name,
      image: itemForm.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80"
    };

    if (editMode.type === 'item') {
      updated = updated.map(cat => {
        if (cat.id === editMode.catId) {
          return {
            ...cat,
            subcategories: cat.subcategories.map(sub => {
              if (sub.id === editMode.subId) {
                return { ...sub, items: (sub.items || []).filter(i => i.id !== editMode.id) };
              }
              return sub;
            })
          };
        }
        return cat;
      });
    }

    updated = updated.map(cat => {
      if (cat.id === itemForm.categoryId) {
        return {
          ...cat,
          subcategories: cat.subcategories.map(sub => {
            if (sub.id === itemForm.subcategoryId) {
              return { ...sub, items: [...(sub.items || []), newItemData] };
            }
            return sub;
          })
        };
      }
      return cat;
    });

    try {
      setCategories(updated);
      const success = await saveCategories(updated);
      if (editMode.type === 'item') handleCancelEdit();
      else setItemForm({ ...itemForm, name: '', image: '' });
      
      if (success) showNotification(editMode.type === 'item' ? "Item updated in DB!" : "Item added to DB!");
      else showNotification("Saved locally only.", "error");
    } catch (error) {
       showNotification("Failed to save.", "error");
    }
  };

  const handleDeleteCategory = async (catId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    const updated = categories.filter(c => c.id !== catId);
    setCategories(updated);
    await saveCategories(updated);
    showNotification("Category removed.");
  };

  const handleDeleteSubcategory = async (catId, subId) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?")) return;
    const updated = categories.map(cat => {
      if (cat.id === catId) {
        return { ...cat, subcategories: (cat.subcategories || []).filter(s => s.id !== subId) };
      }
      return cat;
    });
    setCategories(updated);
    await saveCategories(updated);
    showNotification("Subcategory removed.");
  };

  const handleDeleteItem = async (catId, subId, itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    const updated = categories.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          subcategories: cat.subcategories.map(sub => {
            if (sub.id === subId) {
              return { ...sub, items: (sub.items || []).filter(i => i.id !== itemId) };
            }
            return sub;
          })
        };
      }
      return cat;
    });
    setCategories(updated);
    await saveCategories(updated);
    showNotification("Item removed.");
  };

  const handleEditCategory = (cat) => {
    setEditMode({ type: 'category', id: cat.id, catId: null, subId: null });
    setCatForm({ name: cat.name, section: cat.section || '', image: cat.image || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditSubcategory = (catId, sub) => {
    setEditMode({ type: 'subcategory', id: sub.id, catId, subId: null });
    setSubForm({ categoryId: catId, name: sub.name });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditItem = (catId, subId, item) => {
    setEditMode({ type: 'item', id: item.id, catId, subId });
    setItemForm({
      categoryId: catId,
      subcategoryId: subId,
      name: item.name,
      image: item.image || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedCategory = categories.find(c => c.id === itemForm.categoryId);

  const existingSections = Array.from(new Set(categories.map(c => c.section).filter(Boolean)));

  if (!isLoggedIn) {
     return (
      <div className="admin-page login-container">
        <div className="admin-card login-card">
          <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
          {loginError && <div className="login-error">{loginError}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={loginForm.phone}
                onChange={e => setLoginForm({ ...loginForm, phone: e.target.value })}
                placeholder="Enter phone number"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="btn-admin" style={{ width: '100%', marginTop: '10px' }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Catalog Admin Panel</h1>
          </div>
          <div className="header-actions">
            <button onClick={() => setIsLoggedIn(false)} className="btn-admin btn-secondary">Logout</button>
          </div>
        </div>

        <div className="admin-grid">
          {/* Add Category */}
          <div className="admin-card">
            <h2>1. Add Category Box</h2>
            <form onSubmit={handleAddCategory}>
              <div className="form-group">
                <label>Category Box Name</label>
                <input
                  type="text"
                  value={catForm.name}
                  onChange={e => setCatForm({ ...catForm, name: e.target.value })}
                  placeholder="e.g. Fresh Fruits & Vegetables"
                  required
                />
              </div>
              <div className="form-group">
                <label>Main Heading Section</label>
                <div className="form-row">
                  <select
                    value={catForm.section || ''}
                    onChange={e => setCatForm({ ...catForm, section: e.target.value })}
                  >
                    <option value="">-- Select Existing --</option>
                    {existingSections.map(sec => (
                      <option key={sec} value={sec}>{sec}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={catForm.section || ''}
                    onChange={e => setCatForm({ ...catForm, section: e.target.value })}
                    placeholder="Or type new heading"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  value={catForm.image}
                  onChange={e => setCatForm({ ...catForm, image: e.target.value })}
                  placeholder="Paste Unsplash URL"
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn-admin">
                  {editMode.type === 'category' ? 'Update Category' : 'Add Category'}
                </button>
                {editMode.type === 'category' && (
                  <button type="button" onClick={handleCancelEdit} className="btn-admin btn-secondary">Cancel</button>
                )}
              </div>
            </form>
          </div>

          {/* Add Subcategory */}
          <div className="admin-card">
            <h2>2. Add Subcategory</h2>
            <form onSubmit={handleAddSubcategory}>
              <div className="form-group">
                <label>Select Category Box</label>
                <select
                  value={subForm.categoryId}
                  onChange={e => setSubForm({ ...subForm, categoryId: e.target.value })}
                  required
                >
                  <option value="">-- Select --</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Subcategory Name</label>
                <input
                  type="text"
                  value={subForm.name}
                  onChange={e => setSubForm({ ...subForm, name: e.target.value })}
                  placeholder="e.g. Daily Veggies"
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn-admin">
                  {editMode.type === 'subcategory' ? 'Update Subcategory' : 'Add Subcategory'}
                </button>
                {editMode.type === 'subcategory' && (
                  <button type="button" onClick={handleCancelEdit} className="btn-admin btn-secondary">Cancel</button>
                )}
              </div>
            </form>
          </div>

          {/* Add Item */}
          <div className="admin-card item-card">
            <h2>3. Add Final Item Details</h2>
            <form onSubmit={handleAddItem}>
              <div className="form-row">
                <div className="form-group">
                  <label>Select Category Box</label>
                  <select
                    value={itemForm.categoryId}
                    onChange={e => setItemForm({ ...itemForm, categoryId: e.target.value, subcategoryId: '' })}
                    required
                  >
                    <option value="">-- Select --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Subcategory</label>
                  <select
                    value={itemForm.subcategoryId}
                    onChange={e => setItemForm({ ...itemForm, subcategoryId: e.target.value })}
                    required
                  >
                    <option value="">-- Select --</option>
                    {selectedCategory && selectedCategory.subcategories && selectedCategory.subcategories.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Item Name</label>
                <input
                  type="text"
                  value={itemForm.name}
                  onChange={e => setItemForm({ ...itemForm, name: e.target.value })}
                  placeholder="e.g. Shimla Apple"
                  required
                />
              </div>


              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  value={itemForm.image}
                  onChange={e => setItemForm({ ...itemForm, image: e.target.value })}
                  placeholder="Paste item image URL"
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn-admin">
                  {editMode.type === 'item' ? 'Update Item' : 'Add Item'}
                </button>
                {editMode.type === 'item' && (
                  <button type="button" onClick={handleCancelEdit} className="btn-admin btn-secondary">Cancel</button>
                )}
              </div>
            </form>
          </div>

          {/* Current Catalog View */}
          <div className="admin-card item-card">
            <h2>Current Catalog</h2>
            <div className="catalog-tree">
              {loading ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <i className="bi bi-arrow-repeat spin" style={{ fontSize: '2rem' }}></i>
                  <p>Loading Catalog from Database...</p>
                </div>
              ) : categories.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '20px' }}>No categories found in database.</p>
              ) : (
                categories.map(cat => (
                  <div key={cat.id} className="tree-node-category">
                  <div className="node-header">
                    <h3 className="node-title">
                      {cat.name} <span className="node-subtitle">({cat.section || 'Our Assortment'})</span>
                    </h3>
                    <div className="node-actions">
                      <button onClick={() => handleEditCategory(cat)} className="btn-admin" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>Edit</button>
                      <button onClick={() => handleDeleteCategory(cat.id)} className="btn-admin btn-danger" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>Delete</button>
                    </div>
                  </div>
                  <div className="tree-sub-list">
                    {cat.subcategories && cat.subcategories.length > 0 ? cat.subcategories.map(sub => (
                      <div key={sub.id} className="tree-node-subcategory">
                        <div className="node-header">
                          <h4 className="node-title" style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                            ↳ {sub.name}
                          </h4>
                          <div className="node-actions">
                            <button onClick={() => handleEditSubcategory(cat.id, sub)} className="btn-admin" style={{ padding: '2px 6px', fontSize: '0.7rem' }}>Edit</button>
                            <button onClick={() => handleDeleteSubcategory(cat.id, sub.id)} className="btn-admin btn-danger" style={{ padding: '2px 6px', fontSize: '0.7rem' }}>Delete</button>
                          </div>
                        </div>
                        <ul className="item-list">
                          {sub.items && sub.items.length > 0 ? sub.items.map(item => (
                            <li key={item.id} className="item-list-item">
                              <strong>{item.name}</strong>
                              <div className="node-actions">
                                <button onClick={() => handleEditItem(cat.id, sub.id, item)} className="btn-admin btn-secondary" style={{ padding: '2px 6px', fontSize: '0.65rem' }}>Edit</button>
                                <button onClick={() => handleDeleteItem(cat.id, sub.id, item.id)} className="btn-admin btn-danger" style={{ padding: '2px 6px', fontSize: '0.65rem' }}>Delete</button>
                              </div>
                            </li>
                          )) : (
                            <li style={{ color: '#9ca3af', fontStyle: 'italic', paddingLeft: '8px', fontSize: '0.8rem' }}>No items added yet</li>
                          )}
                        </ul>
                      </div>
                    )) : (
                      <p style={{ color: '#9ca3af', fontStyle: 'italic', margin: 0, fontSize: '0.85rem' }}>No subcategories added yet</p>
                    )}
                  </div>
                </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
      {statusMsg.text && (
        <div className={`status-notification ${statusMsg.type}`}>
          {statusMsg.text}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
