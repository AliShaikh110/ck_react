export async function fetchQuestions(page = 1, pageSize = 10) {
    const url = `https://admin.onlyeducation.co.in/api/t-questions?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=hint:ASC`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 396dcb5c356426f8c3ce8303bcdc6feb5ecb1fd4aa4aaa59e42e1c7f82b6385cf4107d023cc58cfd61294adb023993a8e58e0aad8759fbf44fc020c1ac02f492c9d42d1f7dc12fc05c8144fbe80f06850c79d4b823241c83c5e153b03d1f8d0316fb9dec1a531c0df061e1f242bab549f17f715b900ba9546f6a6351fdd7dfa8'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('data: ', data);
        return data; // Strapi returns { data: [...], meta: { pagination... } }
    } catch (error) {
        console.error("Error fetching questions:", error);
        return null;
    }
}
