import React, { useEffect, useState } from 'react'

const DemoApi = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://viannejewels.com/wp-json/custom/v1/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && (
                <div>
                    <h2>Data from API:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}

export default DemoApi