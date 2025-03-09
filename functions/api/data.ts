// Import the official Cloudflare Workers types
import type { PagesFunction } from '@cloudflare/workers-types';

// Use the proper environment type pattern
export type Env = Record<string, unknown>;

export const onRequest: PagesFunction<Env> = async () => {
  // Create a Response object with the mock data
  const mockData = {
    message: "Hello from Cloudflare Pages Functions!",
    timestamp: new Date().toISOString(),
    data: [
      { id: 1, name: "Item 1", description: "Description for item 1" },
      { id: 2, name: "Item 2", description: "Description for item 2" },
      { id: 3, name: "Item 3", description: "Description for item 3" },
    ]
  };

  // Use Response with just the basic options needed
  return new Response(JSON.stringify(mockData), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}; 
