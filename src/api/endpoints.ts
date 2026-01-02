const API_BASE_URL = "https://fe-hometask-api.qa.vault.tryvault.com";

export const ENDPOINTS = {
  CORPORATION_VALIDATION: (number: string) => `${API_BASE_URL}/corporation-number/${number}`,
  PROFILE_DETAILS: `${API_BASE_URL}/profile-details`,
};
