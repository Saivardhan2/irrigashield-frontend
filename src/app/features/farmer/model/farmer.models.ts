export interface FarmerProfileRequest {
  fullName: string;
  phoneNumber: string;
  addressLine: string;
  village: string;
  district: string;
  state: string;
  postalCode: string;
  bankAccountLastFour: string;
}

export interface FarmerProfileResponse {
  farmerId: number;
  authUserId: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  addressLine: string;
  village: string;
  district: string;
  state: string;
  postalCode: string;
  bankAccountLastFour: string;
  verificationStatus: string;
  createdAt?: string;
  updatedAt?: string;
}
