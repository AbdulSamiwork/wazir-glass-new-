import { useState } from 'react';

export function useAdminListEditor(setLocalData) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [itemForm, setItemForm] = useState(null);

  const startAddListItem = (template) => {
    setEditingIndex('new');
    setItemForm(template);
  };

  const startEditListItem = (index, currentVal) => {
    setEditingIndex(index);
    setItemForm(JSON.parse(JSON.stringify(currentVal)));
  };

  const saveListItem = (section) => {
    setLocalData(prev => {
      if (!prev) return prev;
      const copy = JSON.parse(JSON.stringify(prev));
      const isList = section === 'gallery' ? 'projects' : (['services', 'beforeAfter', 'testimonials'].includes(section) ? 'items' : null);
      const arr = isList ? (copy[section][isList] = copy[section][isList] || []) : (copy[section] = copy[section] || []);
      if (editingIndex === 'new') {
        if (['gallery', 'beforeAfter'].includes(section)) {
          itemForm.id = arr.reduce((max, p) => (p && p.id > max ? p.id : max), 0) + 1;
        }
        arr.push(itemForm);
      } else {
        arr[editingIndex] = itemForm;
      }
      return copy;
    });
    setEditingIndex(null);
    setItemForm(null);
  };

  const deleteListItem = async (section, index) => {
    if (!await window.customConfirm("Are you sure you want to delete this item?")) return;
    setLocalData(prev => {
      if (!prev) return prev;
      const copy = JSON.parse(JSON.stringify(prev));
      const isList = section === 'gallery' ? 'projects' : (['services', 'beforeAfter', 'testimonials'].includes(section) ? 'items' : null);
      const arr = isList ? copy[section][isList] : copy[section];
      if (arr) arr.splice(index, 1);
      return copy;
    });
  };

  return {
    editingIndex,
    setEditingIndex,
    itemForm,
    setItemForm,
    startAddListItem,
    startEditListItem,
    saveListItem,
    deleteListItem
  };
}
