mod db;
mod http;

use db::Database;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

pub struct AppState {
    pub db: Mutex<Database>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Collection {
    pub id: Option<i64>,
    pub name: String,
    pub parent_id: Option<i64>,
    pub sort_order: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Request {
    pub id: Option<i64>,
    pub collection_id: Option<i64>,
    pub name: String,
    pub method: String,
    pub url: String,
    pub headers: String,
    pub body: String,
    pub body_type: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Environment {
    pub id: Option<i64>,
    pub name: String,
    pub is_active: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Variable {
    pub id: Option<i64>,
    pub environment_id: i64,
    pub key: String,
    pub value: String,
    pub enabled: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct HistoryItem {
    pub id: Option<i64>,
    pub method: String,
    pub url: String,
    pub status_code: Option<i32>,
    pub response_time: Option<i64>,
    pub created_at: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct HttpResponse {
    pub status: u16,
    pub headers: std::collections::HashMap<String, String>,
    pub body: String,
    pub time: u64,
    pub size: usize,
}

// Collection commands
#[tauri::command]
fn get_collections(state: State<AppState>) -> Result<Vec<Collection>, String> {
    state.db.lock().unwrap().get_collections().map_err(|e| e.to_string())
}

#[tauri::command]
fn create_collection(state: State<AppState>, name: String, parent_id: Option<i64>) -> Result<i64, String> {
    state.db.lock().unwrap().create_collection(&name, parent_id).map_err(|e| e.to_string())
}

#[tauri::command]
fn delete_collection(state: State<AppState>, id: i64) -> Result<(), String> {
    state.db.lock().unwrap().delete_collection(id).map_err(|e| e.to_string())
}

#[tauri::command]
fn rename_collection(state: State<AppState>, id: i64, name: String) -> Result<(), String> {
    state.db.lock().unwrap().rename_collection(id, &name).map_err(|e| e.to_string())
}

// Request commands
#[tauri::command]
fn get_requests(state: State<AppState>, collection_id: Option<i64>) -> Result<Vec<Request>, String> {
    state.db.lock().unwrap().get_requests(collection_id).map_err(|e| e.to_string())
}

#[tauri::command]
fn save_request(state: State<AppState>, request: Request) -> Result<i64, String> {
    state.db.lock().unwrap().save_request(&request).map_err(|e| e.to_string())
}

#[tauri::command]
fn delete_request(state: State<AppState>, id: i64) -> Result<(), String> {
    state.db.lock().unwrap().delete_request(id).map_err(|e| e.to_string())
}

// Environment commands
#[tauri::command]
fn get_environments(state: State<AppState>) -> Result<Vec<Environment>, String> {
    state.db.lock().unwrap().get_environments().map_err(|e| e.to_string())
}

#[tauri::command]
fn create_environment(state: State<AppState>, name: String) -> Result<i64, String> {
    state.db.lock().unwrap().create_environment(&name).map_err(|e| e.to_string())
}

#[tauri::command]
fn set_active_environment(state: State<AppState>, id: i64) -> Result<(), String> {
    state.db.lock().unwrap().set_active_environment(id).map_err(|e| e.to_string())
}

#[tauri::command]
fn delete_environment(state: State<AppState>, id: i64) -> Result<(), String> {
    state.db.lock().unwrap().delete_environment(id).map_err(|e| e.to_string())
}

// Variable commands
#[tauri::command]
fn get_variables(state: State<AppState>, environment_id: i64) -> Result<Vec<Variable>, String> {
    state.db.lock().unwrap().get_variables(environment_id).map_err(|e| e.to_string())
}

#[tauri::command]
fn save_variable(state: State<AppState>, variable: Variable) -> Result<i64, String> {
    state.db.lock().unwrap().save_variable(&variable).map_err(|e| e.to_string())
}

#[tauri::command]
fn delete_variable(state: State<AppState>, id: i64) -> Result<(), String> {
    state.db.lock().unwrap().delete_variable(id).map_err(|e| e.to_string())
}

// History commands
#[tauri::command]
fn get_history(state: State<AppState>) -> Result<Vec<HistoryItem>, String> {
    state.db.lock().unwrap().get_history().map_err(|e| e.to_string())
}

#[tauri::command]
fn clear_history(state: State<AppState>) -> Result<(), String> {
    state.db.lock().unwrap().clear_history().map_err(|e| e.to_string())
}

// HTTP command
#[tauri::command]
async fn send_request(
    state: State<'_, AppState>,
    method: String,
    url: String,
    headers: std::collections::HashMap<String, String>,
    body: Option<String>,
) -> Result<HttpResponse, String> {
    let response = http::send_request(&method, &url, headers, body).await?;
    
    // Save to history
    let _ = state.db.lock().unwrap().add_history(&method, &url, response.status as i32, response.time as i64);
    
    Ok(response)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let db = Database::new().expect("Failed to initialize database");
    
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(AppState { db: Mutex::new(db) })
        .invoke_handler(tauri::generate_handler![
            get_collections, create_collection, delete_collection, rename_collection,
            get_requests, save_request, delete_request,
            get_environments, create_environment, set_active_environment, delete_environment,
            get_variables, save_variable, delete_variable,
            get_history, clear_history,
            send_request
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
