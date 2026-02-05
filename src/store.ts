import { create } from 'zustand';
import { invoke } from '@tauri-apps/api/core';

export interface Collection {
  id?: number;
  name: string;
  parent_id?: number;
  sort_order: number;
}

export interface Request {
  id?: number;
  collection_id?: number;
  name: string;
  method: string;
  url: string;
  headers: string;
  body: string;
  body_type: string;
}

export interface Environment {
  id?: number;
  name: string;
  is_active: boolean;
}

export interface Variable {
  id?: number;
  environment_id: number;
  key: string;
  value: string;
  enabled: boolean;
}

export interface HistoryItem {
  id?: number;
  method: string;
  url: string;
  status_code?: number;
  response_time?: number;
  created_at?: string;
}

export interface HttpResponse {
  status: number;
  headers: Record<string, string>;
  body: string;
  time: number;
  size: number;
}

interface AppState {
  collections: Collection[];
  requests: Request[];
  environments: Environment[];
  history: HistoryItem[];
  activeRequest: Request | null;
  response: HttpResponse | null;
  loading: boolean;
  activeEnvId: number | null;
  variables: Variable[];

  loadCollections: () => Promise<void>;
  loadRequests: (collectionId?: number) => Promise<void>;
  loadEnvironments: () => Promise<void>;
  loadHistory: () => Promise<void>;
  loadVariables: (envId: number) => Promise<void>;

  createCollection: (name: string, parentId?: number) => Promise<number>;
  deleteCollection: (id: number) => Promise<void>;
  renameCollection: (id: number, name: string) => Promise<void>;

  setActiveRequest: (req: Request | null) => void;
  saveRequest: (req: Request) => Promise<number>;
  deleteRequest: (id: number) => Promise<void>;

  createEnvironment: (name: string) => Promise<void>;
  setActiveEnvironment: (id: number) => Promise<void>;
  deleteEnvironment: (id: number) => Promise<void>;

  saveVariable: (variable: Variable) => Promise<void>;
  deleteVariable: (id: number) => Promise<void>;

  sendRequest: () => Promise<void>;
  clearHistory: () => Promise<void>;
  restoreFromHistory: (item: HistoryItem) => void;
}

export const useStore = create<AppState>((set, get) => ({
  collections: [],
  requests: [],
  environments: [],
  history: [],
  activeRequest: null,
  response: null,
  loading: false,
  activeEnvId: null,
  variables: [],

  loadCollections: async () => {
    const collections = await invoke<Collection[]>('get_collections');
    set({ collections });
  },

  loadRequests: async (collectionId?: number) => {
    const requests = await invoke<Request[]>('get_requests', { collectionId });
    set({ requests });
  },

  loadEnvironments: async () => {
    const environments = await invoke<Environment[]>('get_environments');
    const active = environments.find(e => e.is_active);
    set({ environments, activeEnvId: active?.id ?? null });
    if (active?.id) {
      get().loadVariables(active.id);
    }
  },

  loadHistory: async () => {
    const history = await invoke<HistoryItem[]>('get_history');
    set({ history });
  },

  loadVariables: async (envId: number) => {
    const variables = await invoke<Variable[]>('get_variables', { environmentId: envId });
    set({ variables });
  },

  createCollection: async (name: string, parentId?: number) => {
    const id = await invoke<number>('create_collection', { name, parentId });
    get().loadCollections();
    return id;
  },

  deleteCollection: async (id: number) => {
    await invoke('delete_collection', { id });
    get().loadCollections();
    get().loadRequests();
  },

  renameCollection: async (id: number, name: string) => {
    await invoke('rename_collection', { id, name });
    get().loadCollections();
  },

  setActiveRequest: (req: Request | null) => {
    set({ activeRequest: req, response: null });
  },

  saveRequest: async (req: Request) => {
    const id = await invoke<number>('save_request', { request: req });
    get().loadRequests();
    return id;
  },

  deleteRequest: async (id: number) => {
    await invoke('delete_request', { id });
    const { activeRequest } = get();
    if (activeRequest?.id === id) {
      set({ activeRequest: null });
    }
    get().loadRequests();
  },

  createEnvironment: async (name: string) => {
    await invoke('create_environment', { name });
    get().loadEnvironments();
  },

  setActiveEnvironment: async (id: number) => {
    await invoke('set_active_environment', { id });
    set({ activeEnvId: id });
    get().loadEnvironments();
  },

  deleteEnvironment: async (id: number) => {
    await invoke('delete_environment', { id });
    get().loadEnvironments();
  },

  saveVariable: async (variable: Variable) => {
    await invoke('save_variable', { variable });
    const { activeEnvId } = get();
    if (activeEnvId) get().loadVariables(activeEnvId);
  },

  deleteVariable: async (id: number) => {
    await invoke('delete_variable', { id });
    const { activeEnvId } = get();
    if (activeEnvId) get().loadVariables(activeEnvId);
  },

  sendRequest: async () => {
    const { activeRequest, variables } = get();
    if (!activeRequest?.url) return;

    set({ loading: true, response: null });

    let url = activeRequest.url;
    let headersStr = activeRequest.headers;
    let body = activeRequest.body;

    // Replace variables
    for (const v of variables.filter(v => v.enabled)) {
      const pattern = new RegExp(`\\{\\{${v.key}\\}\\}`, 'g');
      url = url.replace(pattern, v.value);
      headersStr = headersStr.replace(pattern, v.value);
      body = body.replace(pattern, v.value);
    }

    let headers: Record<string, string> = {};
    try {
      if (headersStr) headers = JSON.parse(headersStr);
    } catch {}

    try {
      const response = await invoke<HttpResponse>('send_request', {
        method: activeRequest.method,
        url,
        headers,
        body: body || null,
      });
      set({ response });
      get().loadHistory();
    } catch (e) {
      set({ response: { status: 0, headers: {}, body: String(e), time: 0, size: 0 } });
    } finally {
      set({ loading: false });
    }
  },

  clearHistory: async () => {
    await invoke('clear_history');
    set({ history: [] });
  },

  restoreFromHistory: (item: HistoryItem) => {
    set({
      activeRequest: {
        name: 'From History',
        method: item.method,
        url: item.url,
        headers: '',
        body: '',
        body_type: 'none',
      },
      response: null,
    });
  },
}));
