import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthActionsComponent } from '../../components/authActions/authActions.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileRecipesComponent } from './profile-recipes/profile-recipes.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [
    AuthActionsComponent,
    ProfileInfoComponent,
    ProfileRecipesComponent,
  ],
  templateUrl: `./profile.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  authService = inject(AuthService);

  profile = this.authService.user;
}
