const axios = require('axios');

export default async function Page({ params }) {
    const response = fetch(`http://localhost:4000/weather/${params.city}`);
    const cityData = await response.json();
    return (
        <div>City: {com}</div>
    );
}