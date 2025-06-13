use candid::{CandidType, Deserialize, Principal};
use ic_cdk_macros::*;
use serde::Serialize;
use std::cell::RefCell;

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Product {
    id: String,
    name: String,
    description: String,
    manufacturer: Principal,
    status: String,
    ethical_score: u32,
    materials: Vec<Material>,
    certifications: Vec<String>,
    timeline: Vec<TimelineEvent>,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Material {
    name: String,
    percentage: u32,
    source: String,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct TimelineEvent {
    date: String,
    event: String,
    location: String,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct TransferRequest {
    product_id: String,
    recipient: Principal,
    location: String,
    notes: String,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub enum Error {
    ProductNotFound,
    Unauthorized,
    InvalidInput,
}

type Result<T> = std::result::Result<T, Error>;

thread_local! {
    static PRODUCTS: RefCell<Vec<Product>> = RefCell::new(Vec::new());
}

#[init]
fn init() {
    PRODUCTS.with(|products| {
        products.borrow_mut().push(Product {
            id: "1".to_string(),
            name: "Organic Cotton T-Shirt".to_string(),
            description: "Made from 100% organic cotton".to_string(),
            manufacturer: ic_cdk::caller(),
            status: "In Production".to_string(),
            ethical_score: 85,
            materials: vec![Material {
                name: "Organic Cotton".to_string(),
                percentage: 100,
                source: "India".to_string(),
            }],
            certifications: vec!["GOTS Certified".to_string()],
            timeline: vec![TimelineEvent {
                date: "2024-03-15".to_string(),
                event: "Production Started".to_string(),
                location: "Bangladesh".to_string(),
            }],
        });
    });
}

#[query]
fn get_products() -> Vec<Product> {
    PRODUCTS.with(|products| products.borrow().clone())
}

#[query]
fn get_product(id: String) -> Result<Product> {
    PRODUCTS.with(|products| {
        products
            .borrow()
            .iter()
            .find(|p| p.id == id)
            .cloned()
            .ok_or(Error::ProductNotFound)
    })
}

#[update]
fn create_product(product: Product) -> Result<String> {
    let caller = ic_cdk::caller();
    if caller == Principal::anonymous() {
        return Err(Error::Unauthorized);
    }

    PRODUCTS.with(|products| {
        let mut products = products.borrow_mut();
        if products.iter().any(|p| p.id == product.id) {
            return Err(Error::InvalidInput);
        }
        products.push(product);
        Ok("Product created successfully".to_string())
    })
}

#[update]
fn transfer_product(request: TransferRequest) -> Result<String> {
    let caller = ic_cdk::caller();
    PRODUCTS.with(|products| {
        let mut products = products.borrow_mut();
        let product = products
            .iter_mut()
            .find(|p| p.id == request.product_id)
            .ok_or(Error::ProductNotFound)?;

        if product.manufacturer != caller {
            return Err(Error::Unauthorized);
        }

        product.status = format!("Transferred to {}", request.location);
        product.timeline.push(TimelineEvent {
            date: ic_cdk::api::time().to_string(),
            event: "Transfer".to_string(),
            location: request.location,
        });

        Ok("Product transferred successfully".to_string())
    })
}

#[query]
fn whoami() -> Principal {
    ic_cdk::caller()
} 