import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  HlmAvatarImageDirective,
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
} from '@spartan-ng/ui-avatar-helm';
import {
  HlmCardContentDirective,
  HlmCardDirective,
} from '@spartan-ng/ui-card-helm';

@Component({
  selector: 'app-profile-info',
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmCardContentDirective,
    HlmCardDirective,
  ],
  template: `
    <section hlmCard>
      <div
        hlmCardContent
        class="flex flex-row items-center md:flex-col md:items-start gap-5 pt-6"
      >
        <div class="profile--info_picture">
          <hlm-avatar variant="large" class="md:w-24 md:h-24">
            <img
              [src]="profile().photoURL"
              alt="User profile picture"
              hlmAvatarImage
            />
            <span class="bg-[#868485] text-white" hlmAvatarFallback></span>
          </hlm-avatar>
        </div>
        <div class="profile--info_names">
          <ul>
            <li class="profile--info_names name ">
              <p class="font-bold text-lg line-clamp-1">
                {{ profile().displayName }}
              </p>
            </li>
            <li class="profile--info_names email">
              <p class="font-normal text-sm text-gray-400 line-clamp-1">
                {{ profile().email }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileInfoComponent {
  profile = input.required<User>();
}
