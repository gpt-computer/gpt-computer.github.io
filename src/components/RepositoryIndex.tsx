import React from 'react';
import { useEffect, useState } from 'react';

const RepositoryIndex = () => {
    const [repositories, setRepositories] = useState([]);
    const categories = ['workspaces', 'platforms', 'plugins', 'skills', 'agents'];

    useEffect(() => {
        // Fetch repositories from the GitHub API for the organization
        const fetchRepositories = async () => {
            const response = await fetch('https://api.github.com/orgs/gpt-computer/repos');
            const data = await response.json();
            setRepositories(data);
        };

        fetchRepositories();
    }, []);

    return (
        <div>
            <h1>Repository Index</h1>
            {categories.map(category => (
                <div key={category} className="category">
                    <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                    <ul>
                        {repositories.filter(repo => repo.topics.includes(category)).map(repo => (
                            <li key={repo.id}>
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default RepositoryIndex;