export async function fetchImages(breed) {
    const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random/4`
    );
    const data = await response.json();
    return data.message;
}

