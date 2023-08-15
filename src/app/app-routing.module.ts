import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard'

const routes: Routes = [
  { path: 'registration', loadChildren: './pages/registration/registration.module#RegistrationPageModule'},
  { path: 'otp-verify',  loadChildren: './pages/otp-verify/otp-verify.module#OtpVerifyPageModule'},
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]    
  },
  { path: 'create-saving', loadChildren: './pages/saving-goal/create-saving/create-saving.module#CreateSavingPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'saving-detail', loadChildren: './pages/saving-goal/saving-detail/saving-detail.module#SavingDetailPageModule' ,
    canActivate: [AuthGuard]
  },
  { path: 'saving-list', loadChildren: './pages/saving-goal/saving-list/saving-list.module#SavingListPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'deposit', loadChildren: './pages/transaction/deposit/deposit.module#DepositPageModule' ,
  canActivate: [AuthGuard]},
  { path: 'withdraw', loadChildren: './pages/transaction/withdraw/withdraw.module#WithdrawPageModule',
  canActivate: [AuthGuard] },
  { path: 'refund', loadChildren: './pages/transaction/refund/refund.module#RefundPageModule',
  canActivate: [AuthGuard] },
  { path: 'transaction-list', loadChildren: './pages/transaction/transaction-list/transaction-list.module#TransactionListPageModule' ,
  canActivate: [AuthGuard]},
  { path: 'payment', loadChildren: './pages/payment/payment/payment.module#PaymentPageModule' ,
  canActivate: [AuthGuard]},
  { path: 'after-payment', loadChildren: './pages/payment/after-payment/after-payment.module#AfterPaymentPageModule' ,
  canActivate: [AuthGuard]},
  { path: 'notification', loadChildren: './pages/notification/notification.module#NotificationPageModule' ,
  canActivate: [AuthGuard]},
  { path: 'user-profile', loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule' ,
  canActivate: [AuthGuard]},
  { path: 'ekyc-details', loadChildren: './pages/ekyc/ekyc-details/ekyc-details.module#EkycDetailsPageModule',  
  canActivate: [AuthGuard] },
  { path: 'edit-saving-goal', loadChildren: './pages/saving-goal/edit-saving-goal/edit-saving-goal.module#EditSavingGoalPageModule',
  canActivate: [AuthGuard] },   
  { path: 'subscription', loadChildren: './pages/payment/subscription/subscription.module#SubscriptionPageModule',
  canActivate: [AuthGuard] },
  { path: 'aspiration-list', loadChildren: './pages/aspiration/aspiration-list/aspiration-list.module#AspirationListPageModule',
  canActivate: [AuthGuard] },
  { path: 'aspiration-detail', loadChildren: './pages/aspiration/aspiration-detail/aspiration-detail.module#AspirationDetailPageModule',
  canActivate: [AuthGuard] },
  { path: 'complete', loadChildren: './pages/transaction/complete/complete.module#CompletePageModule',
  canActivate: [AuthGuard] },
  { path: 'subscription-complete', loadChildren: './pages/payment/subscription-complete/subscription-complete.module#SubscriptionCompletePageModule',
  canActivate: [AuthGuard] },
  { path: 'user-detail-prompt', loadChildren: './pages/user-detail-prompt/user-detail-prompt/user-detail-prompt.module#UserDetailPromptPageModule',
  canActivate: [AuthGuard] },
  { path: 'subscription-list', loadChildren: './pages/payment/subscription-list/subscription-list/subscription-list.module#SubscriptionListPageModule',
  canActivate: [AuthGuard] },
  { path: 'view-post', loadChildren: './pages/blog/view-post/view-post.module#ViewPostPageModule',
  canActivate: [AuthGuard] },
  { path: 'reminder-detail', loadChildren: './pages/reminder/reminder-detail/reminder-detail.module#ReminderDetailPageModule',
  canActivate: [AuthGuard] },
  { path: 'transaction-detail', loadChildren: './pages/transaction/transaction-detail/transaction-detail.module#TransactionDetailPageModule',
  canActivate: [AuthGuard] },
  { path: 'rewards', loadChildren: './pages/rewards/rewards.module#RewardsPageModule' },
  { path: 'referral', loadChildren: './pages/rewards/referral/referral.module#ReferralPageModule' },
  { path: 'scratch', loadChildren: './pages/rewards/scratch/scratch.module#ScratchPageModule' },
  { path: 'offers', loadChildren: './pages/offers/offers.module#OffersPageModule' },
  { path: 'offer-detail', loadChildren: './pages/offer-detail/offer-detail.module#OfferDetailPageModule' },
 
 ];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
