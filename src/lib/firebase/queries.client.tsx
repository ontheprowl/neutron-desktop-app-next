
import { randomUUID } from "crypto";
import { fbDb, fbFirestore } from "./firebase-config";

import { collection, getDocs, addDoc, DocumentReference, DocumentData, doc, setDoc, query as FirestoreQuery, deleteDoc, getDoc, updateDoc, deleteField, arrayUnion, arrayRemove } from "firebase/firestore";
import { equalTo, onChildAdded, onValue, orderByChild, push, query, ref, set } from "firebase/database";
import { EventType, NeutronEvent } from "../models/events";



// * Integrate server-side caching here


export async function getFirebaseDocs(collectionName: string, onlyKeys?: boolean, path?: string): Promise<any[]> {
    const querySnapshot = await getDocs(collection(fbFirestore, collectionName, path ? path : ''));
    const result: any[] = []

    if (onlyKeys) {
        querySnapshot.forEach((doc) => {
            result.push(doc.id);
        });
    }
    else {
        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, data: doc.data() });
        });
    }

    return result;
}






export async function addFirestoreDocFromData(data: any, collectionName: string, path?: string): Promise<DocumentReference<any>> {

    const docRef = await addDoc(collection(fbFirestore, `${path ? `${collectionName}/${path}` : `${collectionName}`}`), data);
    return docRef
}

export async function addFirestoreDocsAndReturnIDs(data: any[], collectionName: string, path?: string): Promise<string[]> {
    let resultIDS = []
    for (const item of data) {
        const itemUploadRef = await addFirestoreDocFromData(item, collectionName, path);
        resultIDS.push(itemUploadRef.id)
    }
    return resultIDS;
}


export async function setFirestoreDocFromData(data: any, collectionName: string, path: string): Promise<DocumentReference<any>> {
    const pathString = `${collectionName}/${path}`
    // if (await hasKey(pathString)) {
    //     const result = await cacheObject(pathString, data)
    // }
    const docRef = doc(fbFirestore, pathString)
    await setDoc(docRef, data);
    return docRef;
}

export async function deleteFirestoreDoc(collectionName: string, path: string): Promise<DocumentReference<any>> {
    const docRef = doc(fbFirestore, `${collectionName}/${path}`)
    await deleteDoc(docRef);
    return docRef
}


export async function getSingleDoc(docPath: string): Promise<DocumentData | undefined> {
    const currentDoc = await getDoc(doc(fbFirestore, docPath));
    return currentDoc.data()

}


export async function sendChatMessage(message: string, from: string, to: string, key?: string): Promise<Boolean> {

    try {
        const messageKey = key ? from + to + key : from + to;
        const result = await set(push(ref(fbDb, 'messages/' + btoa((messageKey).split('').sort().join('')))), { text: message, to: to, from: from, timestamp: new Date().toUTCString() })
        return true
    }
    catch (e) {
        throw e
    }


}

/**
 * Asynchronous utility function that sends an event to the Neutron Events pipeline 
 * @param eventData The Neutron Event to be sent to the Events pipeline
 * @param viewers An array of UIDs that indicates which users can view this 
 * @param sandbox If true, the event being sent has been generated from a sandbox instance  
 * @returns a promise that returns true
 */
export async function sendEvent(eventData: NeutronEvent, indexes?: string[], sandbox?: boolean): Promise<boolean> {

    try {
        if (indexes) {
            for (const index of indexes) {
                const indexedByCustomIndex = await set(push(ref(fbDb, eventData.type + "/" + eventData.payload?.data[index])), { ...eventData, sandbox: sandbox ? sandbox : false, timestamp: new Date().getTime() })
            }
        } else {
            const indexedByID = await set(push(ref(fbDb, eventData.type + "/" + eventData.id)), { ...eventData, sandbox: sandbox ? sandbox : false, timestamp: new Date().getTime() })

        }
        return true
    }
    catch (e) {
        throw e
    }
}

export async function fetchEvents(type: EventType, id?: string, byUser?: boolean): Promise<NeutronEvent[]> {
    let eventsQuery
    if (id) {
        if (byUser) {
            eventsQuery = query(ref(fbDb, 'events/' + type), orderByChild("uid"), equalTo(id));
        }
        else {
            eventsQuery = query(ref(fbDb, 'events/' + type), orderByChild("id"), equalTo(id));
        }
    } else {
        eventsQuery = query(ref(db, 'events/' + type));
    }
    let fetchedEvents: NeutronEvent[] = []

    try {
        onValue(eventsQuery, (snapshot) => {
            const events = snapshot.val();
            if (events) {
                for (const [key, value] of Object.entries(events)) {
                    fetchedEvents.push(value)
                }
            }

        }, (error) => {
        })
        // const snapshot = await get(eventsQuery)
        // const events = snapshot.val();
        // if (events) {
        //     for (const [key, value] of Object.entries(events)) {
        //         fetchedEvents.push(value)
        //     }
        // }

        return fetchedEvents;
    } catch (e) {
        return []
    }
}


export async function fetchLatestEvent(type: EventType, uid?: string): Promise<NeutronEvent> {
    let eventsQuery;
    if (uid) {
        eventsQuery = query(ref(fbDb, 'events/' + type), orderByChild("id"), equalTo(uid));
    }
    else {
        eventsQuery = query(ref(fbDb, 'events/' + type));
    }
    let fetchedEvent: NeutronEvent;
    onChildAdded(eventsQuery, (snapshot) => {
        const event: NeutronEvent = snapshot.val();
        fetchedEvent = event;


    }, (error) => {
    })
    return fetchedEvent;
}


export async function updateFirestoreDocFromData(data: any, collectionName: string, path: string): Promise<DocumentReference<any>> {
    const updatedDocRef = doc(fbFirestore, collectionName, path)
    await updateDoc(updatedDocRef, data)
    return updatedDocRef
}


export async function deleteFieldsFromFirestoreDoc(fieldKeys: string[], collectionName: string, path: string): Promise<DocumentReference<any>> {
    const updatedDocRef = doc(fbFirestore, collectionName, path)
    const updateObject: { [x: string]: any } = {}
    for (const fieldKey of fieldKeys) {
        updateObject[`${fieldKey}`] = deleteField();
    }
    await updateDoc(updatedDocRef, updateObject)
    return updatedDocRef
}


export async function updateArrayInFirestoreDoc(data: any, arrayKey: string, collectionName: string, path: string): Promise<DocumentReference<any>> {
    const updatedDocRef = doc(fbFirestore, collectionName, path)
    const updateObject: { [x: string]: any } = {}
    updateObject[`${arrayKey}`] = arrayUnion(data)
    await updateDoc(updatedDocRef, updateObject)
    return updatedDocRef
}

export async function removeFromArrayInFirestoreDoc(data: any, arrayKey: string, collectionName: string, path: string): Promise<DocumentReference<any>> {
    const updatedDocRef = doc(fbFirestore , collectionName, path,)
    const updateObject: { [x: string]: any } = {}
    updateObject[`${arrayKey}`] = arrayRemove(data)
    await updateDoc(updatedDocRef, updateObject)
    return updatedDocRef
}