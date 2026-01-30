export const postcodeSearchAPI = async (postalCode: string): Promise<any> => {
  try {
    const response = await fetch(
      `https://api.getaddress.io/autocomplete/${postalCode}?api-key=6C3bvGzS7kOuEU7jf2ILiA3849&all=true&top=50`,
      { next: { revalidate: 60 * 60 * 24 * 7 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};

export const getLocationAPI = async (id: string): Promise<any> => {
  try {
    const response = await fetch(
      `https://api.getaddress.io/get/${id}/?api-key=6C3bvGzS7kOuEU7jf2ILiA3849&all=true`,
      { next: { revalidate: 60 * 60 * 24 * 7 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};
