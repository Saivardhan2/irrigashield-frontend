import { Routes } from '@angular/router';
import { authGuard } from './features/auth/guards/auth.guard';
import { roleGuard } from './features/auth/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/components/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/components/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  },
  {
    path: 'farmer',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['FARMER'] },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/farmer/components/farmer-dashboard/farmer-dashboard.component').then(m => m.FarmerDashboardComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/farmer/components/profile-form/profile-form.component').then(m => m.ProfileFormComponent)
      },
      {
        path: 'farms',
        loadComponent: () => import('./features/farmer/components/farm-list/farm-list.component').then(m => m.FarmListComponent)
      },
      {
        path: 'plans',
        loadComponent: () => import('./features/farmer/components/plan-catalog/plan-catalog.component').then(m => m.PlanCatalogComponent)
      },
      {
        path: 'applications',
        loadComponent: () => import('./features/farmer/components/application-wizard/application-wizard.component').then(m => m.ApplicationWizardComponent)
      },
      {
        path: 'policies',
        loadComponent: () => import('./features/farmer/components/my-policies/my-policies.component').then(m => m.MyPoliciesComponent)
      },
      {
        path: 'claims',
        loadComponent: () => import('./features/claims/components/farmer-claims-history/farmer-claims-history.component').then(m => m.FarmerClaimsHistoryComponent)
      }
    ]
  },
  {
    path: 'underwriter',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['UNDERWRITER', 'ADMIN'] },
    children: [
      { path: '', redirectTo: 'queue', pathMatch: 'full' },
      {
        path: 'queue',
        loadComponent: () => import('./features/underwriter/components/pending-queue/pending-queue.component').then(m => m.PendingQueueComponent)
      },
      {
        path: 'assessment/:applicationId',
        loadComponent: () => import('./features/underwriter/components/risk-assessment-scorecard/risk-assessment-scorecard.component').then(m => m.RiskAssessmentScorecardComponent)
      },
      {
        path: 'history',
        loadComponent: () => import('./features/underwriter/components/case-history/case-history.component').then(m => m.CaseHistoryComponent)
      }
    ]
  },
  {
    path: 'sensor-simulator',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['DATA_PROVIDER', 'ADMIN'] },
    loadComponent: () => import('./features/claims/components/sensor-simulator/sensor-simulator.component').then(m => m.SensorSimulatorComponent)
  },
  {
    path: 'claims',
    canActivate: [authGuard],
    children: [
      { path: 'history', redirectTo: '/farmer/claims', pathMatch: 'full' },
      { path: 'simulator', redirectTo: '/sensor-simulator', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        loadComponent: () => import('./features/admin/components/user-manager/user-manager.component').then(m => m.UserManagerComponent)
      },
      {
        path: 'plans',
        loadComponent: () => import('./features/admin/components/plan-builder/plan-builder.component').then(m => m.PlanBuilderComponent)
      },
      {
        path: 'plans/:planId/trigger-rules',
        loadComponent: () => import('./features/admin/components/trigger-rule-builder/trigger-rule-builder.component').then(m => m.TriggerRuleBuilderComponent)
      },
      {
        path: 'trigger-rules/:ruleId/slabs',
        loadComponent: () => import('./features/admin/components/payout-slab-builder/payout-slab-builder.component').then(m => m.PayoutSlabBuilderComponent)
      }
    ]
  }
];

