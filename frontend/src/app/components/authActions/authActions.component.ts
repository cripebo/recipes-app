import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { Router, RouterLink } from '@angular/router';
import { LogIn, LogOut, LucideAngularModule, User } from 'lucide-angular';
import {
  AuthService,
  AvailableProviderName,
} from '../../services/auth.service';

@Component({
  selector: 'app-auth-actions',
  imports: [HlmButtonDirective, LucideAngularModule, RouterLink],
  templateUrl: `./authActions.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthActionsComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private currentUrl = signal(this.router.url);
  readonly UserIcon = User;
  readonly LogInIcon = LogIn;
  readonly LogOutIcon = LogOut;

  isLoggedIn = this.authService.isLoggedIn;
  isOnProfile = computed(() => this.currentUrl().includes('/profile'));

  onLogin(providerName: AvailableProviderName) {
    this.authService.login(providerName);
  }

  onLogut() {
    this.authService.logout();
  }
}
