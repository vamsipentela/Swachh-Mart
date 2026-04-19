const API_URL = `${import.meta.env.VITE_API_URL}/api/categories`;

export const initData = async () => {
  // Try to pre-fetch data
  await getCategories();
};

export const getCategories = async () => {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const fetched = await response.json();
      return fetched || [];
    } else {
      console.error("Failed to fetch from DB:", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Database unavailable:", error);
    return [];
  }
};

export const saveCategories = async (categories) => {
  try {
    const response = await fetch(`${API_URL}/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categories)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Sync failed on server:", errorData);
      return false;
    } 
    
    console.log("Database updated successfully");
    return true;
  } catch (error) {
    console.error("Critical: Could not connect to database service", error);
    return false;
  }
};
