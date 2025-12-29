const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetcher(endpoint: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        data = await response.json();
    } else {
        const text = await response.text();
        // If it's HTML or plain text error
        try {
            data = JSON.parse(text);
        } catch (e) {
            // Not JSON
            throw new Error(`API Error (${response.status}): Received non-JSON response: ${text.substring(0, 100)}...`);
        }
    }

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
}

export const api = {
    auth: {
        signup: (body: any) => fetcher('/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
        login: (body: any) => fetcher('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    },
    url: {
        create: (body: any) => fetcher('/url/create', { method: 'POST', body: JSON.stringify(body) }),
        getMyUrls: () => fetcher('/url/mine'),
        getDetails: (id: string) => fetcher(`/url/${id}`),
        delete: (id: string) => fetcher(`/url/${id}`, { method: 'DELETE' }),
        toggle: (id: string) => fetcher(`/url/${id}/toggle`, { method: 'PATCH' }),
        updateAlias: (id: string, customAlias: string) => fetcher(`/url/${id}/alias`, { method: 'PATCH', body: JSON.stringify({ customAlias }) }),
        updatePrivacy: (id: string, isPrivate: boolean, password?: string) => fetcher(`/url/${id}/privacy`, { method: 'PATCH', body: JSON.stringify({ isPrivate, password }) }),
    },
    analytics: {
        getSummary: (id: string) => fetcher(`/analytics/${id}/summary`),
        getChart: (id: string) => fetcher(`/analytics/${id}/chart`),
        getBreakdown: (id: string) => fetcher(`/analytics/${id}/breakdown`),
    },
    qr: {
        get: (id: string) => fetcher(`/qr/${id}`),
    },
    unlock: {
        submit: (shortId: string, password: string) => fetcher(`/unlock/${shortId}`, { method: 'POST', body: JSON.stringify({ password }) }),
    }
};
