use std::{sync::Mutex, path::PathBuf, collections::HashMap};
use firestore::*;

pub struct DB {
    pub firestore: Mutex<FirestoreDb>,
}

pub struct Credentials {
    pub path: Mutex<PathBuf>,
}

pub struct Params(pub Mutex<HashMap<String,String>>);
