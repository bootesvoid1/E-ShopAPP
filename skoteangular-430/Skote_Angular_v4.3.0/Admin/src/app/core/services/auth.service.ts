import { Injectable } from "@angular/core";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable } from 'rxjs';
const firebaseConfig = environment.firebaseConfig;
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  createNewUser(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => { })
      .catch((error) => {
        console.log('Pb de création de nouveau compte', error.code, error.message);
        throw error;
      });
  }

  signInUser(email: string, password: string): Promise<void> {
    //  initializeApp(firebaseConfig);
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => { })
      .catch((error) => {
        throw error;
      });
  }

  signOutUser(): void {
    signOut(auth);
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(auth, email)
      .then(() => { })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  currentUser(): User | null {
    return getAuth().currentUser;
  }
}
