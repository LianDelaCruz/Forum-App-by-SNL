import { onValue, ref, push, remove } from "firebase/database";
import { db, onvalueFunc, user } from "./modules/firebaseApp"; 

onvalueFunc(); 
user(); 