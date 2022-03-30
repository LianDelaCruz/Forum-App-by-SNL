import { onValue, ref, push, remove } from "firebase/database";
import { db, getBeerInDb, getFoodInDb, getWineInDb, user } from "./modules/firebaseApp"; 

getBeerInDb();
getFoodInDb();
getWineInDb()
user(); 