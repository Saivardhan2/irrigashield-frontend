import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  // Always include HTTP-only cookie IRRIGASHIELD_TOKEN on Gateway calls
  const apiReq = req.clone({ withCredentials: true });
  return next(apiReq);
};

