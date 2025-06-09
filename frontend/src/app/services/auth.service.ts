import { computed, inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  AuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

export type AvailableProviderName = 'google';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  public user: Signal<User | null | undefined> = toSignal(user(this.auth));
  public isLoggedIn = computed(() => !!this.user());

  private providers: Record<AvailableProviderName, AuthProvider> = {
    google: new GoogleAuthProvider(),
  };

  public async login(providerName: AvailableProviderName) {
    try {
      const provider = this.providers[providerName];
      const response = await signInWithPopup(this.auth, provider);

      if (!response.user) {
        throw new Error('Login failed');
      }

      this.router.navigate(['/']);
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  }

  public async logout() {
    try {
      await this.auth.signOut();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}
