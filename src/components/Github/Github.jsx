import React from 'react';
import { useLoaderData } from 'react-router-dom';

function Github() {
    const usersData = useLoaderData();

    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {usersData.map((user, index) => (
                <div key={index} className="text-center m-4 bg-gray-600 text-white p-4 text-3xl rounded-md shadow-lg">
                    <p>{user.login}</p>
                    <p>Followers: {user.followers}</p>
                    <img 
                        className="my-4" 
                        src={user.avatar_url} 
                        alt={`${user.login}'s avatar`} 
                        width={300} 
                        style={{ borderRadius: '130px' }} 
                    />
                    <div className="mt-4">
                        <a 
                            href={user.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-300 hover:underline"
                        >
                            Visit Profile
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Github;

// Loader function to get data for multiple users
export const githubInfoLoader = async () => {
    // List of GitHub API URLs for different users
    const userUrls = [
        'https://api.github.com/users/Alex-Murmu',
        'https://api.github.com/users/mili-dhara',
        'https://api.github.com/users/Ander-z',
        'https://api.github.com/users/Nutan-Kumari-Marandi',
        'https://api.github.com/users/Anuraj4103'
    ];

    // Fetch data for each URL
    const userPromises = userUrls.map(url => fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }
        return response.json();
    }));

    // Wait for all promises to resolve and return the data

    
    const usersData = await Promise.all(userPromises);
    return usersData;
}
