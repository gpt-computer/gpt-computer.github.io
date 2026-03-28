// github-api.ts

import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

/**
 * Fetches repositories for the specified organization.
 * @param org - The name of the organization.
 * @returns A promise that resolves to the list of repositories.
 */
export async function fetchRepositories(org: string): Promise<any> {
    try {
        const response = await octokit.repos.listForOrg({
            org,
            type: "all",
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching repositories: ${error}`);
        throw error;
    }
}